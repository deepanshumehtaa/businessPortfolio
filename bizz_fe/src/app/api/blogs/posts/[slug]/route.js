import { NextResponse } from "next/server";
import { getPostBySlug } from "@/lib/db";

export async function GET(request, { params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    return NextResponse.json({ error: "Article not found" }, { status: 404 });
  }
  return NextResponse.json(post);
}
