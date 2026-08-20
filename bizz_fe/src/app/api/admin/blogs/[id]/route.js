import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";
import { deletePost } from "@/lib/db";

export async function DELETE(request, { params }) {
  const authHeader = request.headers.get("authorization") || "";
  const token = authHeader.replace("Bearer ", "").trim();

  if (!verifyToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  deletePost(id);
  return NextResponse.json({ message: "Article deleted successfully" });
}
