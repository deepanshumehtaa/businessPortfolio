import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";
import { updateDemo, deleteDemo } from "@/lib/db";

export async function PATCH(request, { params }) {
  const authHeader = request.headers.get("authorization") || "";
  const token = authHeader.replace("Bearer ", "").trim();

  if (!verifyToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const updated = updateDemo(id, body);
  return NextResponse.json(updated);
}

export async function DELETE(request, { params }) {
  const authHeader = request.headers.get("authorization") || "";
  const token = authHeader.replace("Bearer ", "").trim();

  if (!verifyToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  deleteDemo(id);
  return NextResponse.json({ message: "Demo booking deleted successfully" });
}
