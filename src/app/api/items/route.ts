// src/app/api/items/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Item from "@/models/Item";
import Category from "@/models/Category";
import { requireInternalAuth } from "@/lib/internalAuth";

export async function GET() {
  try {
    await connectDB();
    const items = await Item.find().populate("categoryId");
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar itens" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
     const auth = requireInternalAuth(req);
  if (auth) return auth; 
    const body = await req.json();

    if (!body.name || !body.value || !body.stock || !body.img || !body.des || !body.categoryId) {
      return NextResponse.json({ error: "Json inválido" }, { status: 400 });
    }

    await connectDB();
    const newItem = await Item.create({
      name: body.name,
      value: body.value,
      stock: body.stock,
      img: body.img,
      des: body.des,
      categoryId: body.categoryId,
    });
    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao criar item" }, { status: 500 });
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

    await connectDB();
    const updatedItem = await Item.findByIdAndUpdate(id, data, { new: true });
    return NextResponse.json(updatedItem, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao atualizar item" }, { status: 500 });
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

    await connectDB();
    await Item.findByIdAndDelete(id);

    return NextResponse.json({ message: "Item deletado com sucesso" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao deletar item" }, { status: 500 });
  }
}
