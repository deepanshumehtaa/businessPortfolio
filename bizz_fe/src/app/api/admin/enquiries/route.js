import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";
import { getEnquiries } from "@/lib/db";

export async function GET(request) {
  const authHeader = request.headers.get("authorization") || "";
  const token = authHeader.replace("Bearer ", "").trim();

  if (!verifyToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const enquiries = getEnquiries();
  return NextResponse.json(enquiries);
}
