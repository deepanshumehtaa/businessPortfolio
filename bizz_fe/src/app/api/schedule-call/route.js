import { NextResponse } from "next/server";
import { addCall } from "@/lib/db";

export async function POST(request) {
  try {
    const body = await request.json();
    if (!body.name || !body.email || !body.scheduled_datetime) {
      return NextResponse.json(
        { error: "Name, email, and scheduled datetime are required." },
        { status: 400 }
      );
    }
    const newCall = addCall(body);
    return NextResponse.json(newCall, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to schedule call." },
      { status: 500 }
    );
  }
}
