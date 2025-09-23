import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireInternalAuth } from "@/lib/internalAuth";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: { items: true },
    });
    return NextResponse.json(categories);
  } catch {
    return NextResponse.json({ error: "Erro ao buscar categorias" }, { status: 500 });
  }
}

export async function POST(req: Request) {
    
  try {
     const auth = requireInternalAuth(req);
  if (auth) return auth; 
    const body = await req.json();

    if (!body.name || !body.img || !body.des) {
      return NextResponse.json({ error: "Json inválido" }, { status: 400 });
    }

    const newCategory = await prisma.category.create({
      data: {
        name: body.name,
        img: body.img,
        des: body.des,
      },
    });

    return NextResponse.json(newCategory, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Erro ao criar categoria" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
     const auth = requireInternalAuth(req);
  if (auth) return auth; 
    const body = await req.json();

    if (!body.id) {
      return NextResponse.json({ error: "Id é obrigatório" }, { status: 400 });
    }

    const { id, ...data } = body;

    const updatedCategory = await prisma.category.update({
      where: { id },
      data,
    });

    return NextResponse.json(updatedCategory);
  } catch {
    return NextResponse.json({ error: "Erro ao atualizar categoria" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
     const auth = requireInternalAuth(req);
  if (auth) return auth; 
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Id é obrigatório" }, { status: 400 });
    }

    await prisma.category.delete({ where: { id } });

    return NextResponse.json({ message: "Categoria deletada" });
  } catch {
    return NextResponse.json({ error: "Erro ao deletar categoria" }, { status: 500 });
  }
}
