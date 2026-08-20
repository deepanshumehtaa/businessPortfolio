import { NextResponse } from "next/server";
import { getTechnologies } from "@/lib/db";

export async function GET() {
  const technologies = getTechnologies();
  return NextResponse.json(technologies);
}
