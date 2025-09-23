import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireInternalAuth } from "@/lib/internalAuth";

// GET - lista compras
export async function GET() {
  try {
    const buys = await prisma.buy.findMany({
      include: { user: true, item: true },
    });
    return NextResponse.json(buys);
  } catch {
    return NextResponse.json({ error: "Erro ao buscar compras" }, { status: 500 });
  }
}

// POST - cria compra
export async function POST(req: Request) {
  try {
     const auth = requireInternalAuth(req);
  if (auth) return auth; 
    const body = await req.json();

    if (!body.userid || !body.itemid) {
      return NextResponse.json({ error: "Json inválido" }, { status: 400 });
    }

    const newBuy = await prisma.buy.create({
      data: {
        userid: body.userid,
        itemid: body.itemid,
      },
    });

    return NextResponse.json(newBuy, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Erro ao criar compra" }, { status: 500 });
  }
}

// PUT - não faz sentido atualizar compra (normalmente é imutável)
// Mas se quiser, aqui está:
export async function PUT(req: Request) {
 
  try {
     const auth = requireInternalAuth(req);
  if (auth) return auth; 
    const body = await req.json();
    if (!body.id) {
      return NextResponse.json({ error: "Id é obrigatório" }, { status: 400 });
    }

    const { id, ...data } = body;

    const updatedBuy = await prisma.buy.update({
      where: { id },
      data,
    });

    return NextResponse.json(updatedBuy);
  } catch {
    return NextResponse.json({ error: "Erro ao atualizar compra" }, { status: 500 });
  }
}

// DELETE - remove compra
export async function DELETE(req: Request) {

  try {
     const auth = requireInternalAuth(req);
  if (auth) return auth; 
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Id é obrigatório" }, { status: 400 });
    }

    await prisma.buy.delete({ where: { id } });

    return NextResponse.json({ message: "Compra deletada" });
  } catch {
    return NextResponse.json({ error: "Erro ao deletar compra" }, { status: 500 });
  }
}
