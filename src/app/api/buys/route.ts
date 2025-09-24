import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Buy from "@/models/Buy";
import Item from "@/models/Item";
import User from "@/models/User";
import { requireInternalAuth } from "@/lib/internalAuth";


const ACCESS_TOKEN = process.env.MERCADOPAGO_ACCESS_TOKEN || "";

function gerarIdempotencyKey() {
  return (
    "pix-" +
    Math.random().toString(36).substring(2, 10) +
    "-" +
    Date.now().toString(36)
  );
}

async function createMercadoPagoPayment(paymentData: any) {
  const idempotencyKey = gerarIdempotencyKey();
  const response = await fetch("https://api.mercadopago.com/v1/payments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${ACCESS_TOKEN}`,
      "X-Idempotency-Key": idempotencyKey
    },
    body: JSON.stringify(paymentData)
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Erro ao criar pagamento MercadoPago");
  return { body: data };
}

async function getMercadoPagoPayment(paymentId: string) {
  const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${ACCESS_TOKEN}`
    }
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Erro ao consultar pagamento MercadoPago");
  return { body: data };
}

// GET - lista compras

export async function GET() {
  try {
    await connectDB();
    const buys = await Buy.find().populate("userid").populate("itemid").sort({ createdAt: -1 });
    const buysWithResumo = await Promise.all(buys.map(async buy => {
      let mp = buy.mercadoPago || {};
      if (buy.paymentId) {
        const mpAtual = await getMercadoPagoPayment(buy.paymentId);
        if (mpAtual) {
          mp = mpAtual;
          await Buy.findByIdAndUpdate(buy._id, { mercadoPago: mp, status: mp.status });
        }
      }
      // Formata datas
      const dataCriacao = mp.date_created ? new Date(mp.date_created).toLocaleString("pt-BR") : undefined;
      const dataConsulta = mp.last_modified ? new Date(mp.last_modified).toLocaleString("pt-BR") : undefined;
      // Só inclui resumo se houver dados reais
      const resumo = (mp.transaction_amount || mp.status || dataCriacao)
        ? {
            id: mp.id || buy.paymentId,
            valor: mp.transaction_amount,
            dataCriacao,
            dataConsulta,
            status: mp.status
          }
        : undefined;
      const obj = { ...buy.toObject() };
      if (resumo) obj.mercadoPagoResumo = resumo;
      return obj;
    }));
    return NextResponse.json(buysWithResumo);
  } catch (err) {
    return NextResponse.json({ error: "Erro ao buscar compras", details: String(err) }, { status: 500 });
  }
}

// POST - cria compra e cria pagamento Pix via MercadoPago, retorna QR e dados do MP
export async function POST(req: Request) {
  try {
    const auth = requireInternalAuth(req);
    if (auth) return auth;
    const body = await req.json();
    const { userid, itemid, email } = body;
    if (!userid || !itemid) {
      return NextResponse.json({ error: "Json inválido: userid e itemid são obrigatórios" }, { status: 400 });
    }
    await connectDB();
    const user = await User.findById(userid);
    if (!user) return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
    const item = await Item.findById(itemid);
    if (!item) return NextResponse.json({ error: "Item não encontrado" }, { status: 404 });
    const paymentData = {
      transaction_amount: Number(item.value) || 0,
      description: item.name,
      payment_method_id: "pix",
      installments: 1,
      payer: { email: email || user.email || "comprador@exemplo.com" },
    };
    let mpResponse;
    try {
      mpResponse = await createMercadoPagoPayment(paymentData);
    } catch (e) {
      return NextResponse.json({ error: "Erro MercadoPago", details: String(e) }, { status: 500 });
    }
    const qrCode = mpResponse?.body?.point_of_interaction?.transaction_data?.qr_code;
    const qrCodeBase64 = mpResponse?.body?.point_of_interaction?.transaction_data?.qr_code_base64;
    const paymentId = String(mpResponse?.body?.id || "");
    const newBuy = await Buy.create({ userid, itemid, paymentId, status: mpResponse?.body?.status, mercadoPago: mpResponse?.body });
    const buyObj = {
      ...newBuy.toObject(),
      item: {
        name: item.name,
        value: item.value
      }
    };
    return NextResponse.json({ buy: buyObj, qrCode, qrCodeBase64, paymentId, mercadoPago: mpResponse?.body }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Erro ao criar compra", details: String(err) }, { status: 500 });
  }
}

// PUT - atualizar compra
export async function PUT(req: Request) {
  try {
    const auth = requireInternalAuth(req);
    if (auth) return auth;
    const body = await req.json();
    const { id, ...data } = body;
    if (!id) return NextResponse.json({ error: "Id é obrigatório" }, { status: 400 });

    await connectDB();
    const updated = await Buy.findByIdAndUpdate(id, data, { new: true });
    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json({ error: "Erro ao atualizar compra", details: String(err) }, { status: 500 });
  }
}

// DELETE - remove compra
export async function DELETE(req: Request) {
  try {
    const auth = requireInternalAuth(req);
    if (auth) return auth;
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Id é obrigatório" }, { status: 400 });

    await connectDB();
    await Buy.findByIdAndDelete(id);
    return NextResponse.json({ message: "Compra deletada" });
  } catch (err) {
    return NextResponse.json({ error: "Erro ao deletar compra", details: String(err) }, { status: 500 });
  }
}

// GET_STATUS - consulta status do pagamento MercadoPago
export async function GET_STATUS(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const paymentId = searchParams.get("id");
    if (!paymentId) return NextResponse.json({ error: "paymentId é obrigatório" }, { status: 400 });

    let mpResponse: any;
    try {
      mpResponse = await getMercadoPagoPayment(paymentId);
    } catch (e) {
      return NextResponse.json({ error: "Erro MercadoPago", details: String(e) }, { status: 500 });
    }

    const status = mpResponse?.body?.status;
    const statusDetail = mpResponse?.body?.status_detail;

    try {
      await connectDB();
      await Buy.findOneAndUpdate({ paymentId }, { status, mercadoPago: mpResponse?.body });
    } catch (e) {
      // ignore
    }

    return NextResponse.json({ paymentId, status, statusDetail, mercadoPago: mpResponse?.body });
  } catch (err) {
    return NextResponse.json({ error: "Erro ao consultar status", details: String(err) }, { status: 500 });
  }
}
