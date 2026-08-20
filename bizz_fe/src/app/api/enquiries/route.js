import { NextResponse } from "next/server";
import { addEnquiry } from "@/lib/db";

export async function POST(request) {
  try {
    const body = await request.json();
    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: "Name and email are required fields." },
        { status: 400 }
      );
    }
    const newEnquiry = addEnquiry(body);
    return NextResponse.json(newEnquiry, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to process enquiry." },
      { status: 500 }
    );
  }
}
