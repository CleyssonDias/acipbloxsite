import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Category from "@/models/Category";
import Item from "@/models/Item";
import { requireInternalAuth } from "@/lib/internalAuth";

export async function GET() {
  try {
    await connectDB();
    const categories = await Category.find();
    // Buscar itens relacionados para cada categoria
    const categoriesWithItems = await Promise.all(
      categories.map(async (cat) => {
        const items = await Item.find({ categoryId: cat._id });
        return { ...cat.toObject(), items };
      })
    );
    return NextResponse.json(categoriesWithItems);
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

    await connectDB();
    const newCategory = await Category.create({
      name: body.name,
      img: body.img,
      des: body.des,
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

    await connectDB();
    const updatedCategory = await Category.findByIdAndUpdate(id, data, { new: true });
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

  await connectDB();
  await Category.findByIdAndDelete(id);
  return NextResponse.json({ message: "Categoria deletada" });
  } catch {
    return NextResponse.json({ error: "Erro ao deletar categoria" }, { status: 500 });
  }
}
