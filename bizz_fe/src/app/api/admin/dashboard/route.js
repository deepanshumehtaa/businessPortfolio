import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";
import { getStats } from "@/lib/db";

export async function GET(request) {
  const authHeader = request.headers.get("authorization") || "";
  const token = authHeader.replace("Bearer ", "").trim();

  const user = verifyToken(token);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const stats = getStats();
  return NextResponse.json({ stats });
}
