import { NextResponse } from "next/server";

export function requireInternalAuth(req: Request) {
  const authHeader = req.headers.get("authorization");
  const secret = process.env.INTERNAL_SECRET;

  if (!authHeader || authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  return null;
}
