import { NextResponse } from "next/server";
import { getPosts } from "@/lib/db";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const categorySlug = searchParams.get("category") || "";
  const posts = getPosts(categorySlug);
  return NextResponse.json(posts);
}
