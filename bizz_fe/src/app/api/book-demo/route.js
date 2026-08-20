import { NextResponse } from "next/server";
import { addDemo } from "@/lib/db";

export async function POST(request) {
  try {
    const body = await request.json();
    if (!body.name || !body.email || !body.booking_date) {
      return NextResponse.json(
        { error: "Name, email, and booking date are required." },
        { status: 400 }
      );
    }
    const newDemo = addDemo(body);
    return NextResponse.json(newDemo, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to book demo." },
      { status: 500 }
    );
  }
}
