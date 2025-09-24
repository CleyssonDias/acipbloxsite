import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Buy from "@/models/Buy";

const ACCESS_TOKEN = process.env.MERCADOPAGO_ACCESS_TOKEN || "";

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

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const paymentId = searchParams.get("id");
    if (!paymentId) return NextResponse.json({ error: "paymentId é obrigatório" }, { status: 400 });

    let mpResponse;
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
