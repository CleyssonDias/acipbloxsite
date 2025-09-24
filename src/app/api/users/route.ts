import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import User from "@/models/User";
import Buy from "@/models/Buy";
import { requireInternalAuth } from "@/lib/internalAuth";

// GET - lista usuários
export async function GET() {
  try {
    await connectDB();
    const users = await User.find();
    // Buscar compras relacionadas para cada usuário
    const usersWithBuys = await Promise.all(
      users.map(async (user) => {
        const buys = await Buy.find({ userid: user._id }).populate("itemid");
        return { ...user.toObject(), buys };
      })
    );
    return NextResponse.json(usersWithBuys);
  } catch {
    return NextResponse.json({ error: "Erro ao buscar usuários" }, { status: 500 });
  }
}

// POST - cria usuário
export async function POST(req: Request) {
  try {
     const auth = requireInternalAuth(req);
  if (auth) return auth; 
    const body = await req.json();

    if (!body.name || !body.email) {
      return NextResponse.json({ error: "Json inválido" }, { status: 400 });
    }

    await connectDB();
    const newUser = await User.create({
      name: body.name,
      email: body.email,
    });
    return NextResponse.json(newUser, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Erro ao criar usuário" }, { status: 500 });
  }
}

// PUT - atualiza usuário
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
    const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });
    return NextResponse.json(updatedUser);
  } catch {
    return NextResponse.json({ error: "Erro ao atualizar usuário" }, { status: 500 });
  }
}

// DELETE - remove usuário
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
  await User.findByIdAndDelete(id);
  return NextResponse.json({ message: "Usuário deletado" });
  } catch {
    return NextResponse.json({ error: "Erro ao deletar usuário" }, { status: 500 });
  }
}
