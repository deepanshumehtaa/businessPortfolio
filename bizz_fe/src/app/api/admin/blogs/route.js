import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";
import { getPosts, addPost } from "@/lib/db";

export async function GET(request) {
  const authHeader = request.headers.get("authorization") || "";
  const token = authHeader.replace("Bearer ", "").trim();

  if (!verifyToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const posts = getPosts();
  return NextResponse.json(posts);
}

export async function POST(request) {
  const authHeader = request.headers.get("authorization") || "";
  const token = authHeader.replace("Bearer ", "").trim();

  if (!verifyToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    if (!body.title || !body.slug || !body.content) {
      return NextResponse.json(
        { error: "Title, slug, and content are required." },
        { status: 400 }
      );
    }
    const newPost = addPost(body);
    return NextResponse.json(newPost, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to publish article." },
      { status: 500 }
    );
  }
}
