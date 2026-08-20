import { NextResponse } from "next/server";
import { getServiceBySlug } from "@/lib/db";

export async function GET(request, { params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) {
    return NextResponse.json({ error: "Service not found" }, { status: 44 });
  }
  return NextResponse.json(service);
}
