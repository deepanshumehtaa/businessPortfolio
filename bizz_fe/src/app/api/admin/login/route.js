import { NextResponse } from "next/server";
import { signToken } from "@/lib/jwt";

export async function POST(request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // Verify admin credentials
    if (username === "admin" && password === "admin123") {
      const token = signToken({ username: "admin", role: "superuser" });
      return NextResponse.json({ token, message: "Authentication successful" });
    }

    return NextResponse.json(
      { error: "Invalid username or password credentials." },
      { status: 401 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to process authentication request." },
      { status: 500 }
    );
  }
}
