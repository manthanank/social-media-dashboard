import { NextResponse } from "next/server";
import { SocialPost } from "@/lib/types";
import { INITIAL_POSTS } from "@/lib/mock-data";

let serverFeed: SocialPost[] = [...INITIAL_POSTS];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const platform = searchParams.get("platform");
  const query = searchParams.get("q")?.toLowerCase();

  let filtered = [...serverFeed];

  if (platform && platform !== "all") {
    filtered = filtered.filter((p) => p.platform.toLowerCase() === platform.toLowerCase());
  }

  if (query) {
    filtered = filtered.filter(
      (p) =>
        p.content.toLowerCase().includes(query) ||
        p.author.toLowerCase().includes(query) ||
        p.handle.toLowerCase().includes(query)
    );
  }

  return NextResponse.json({
    success: true,
    count: filtered.length,
    posts: filtered,
    redisCacheHit: true,
    executionTimeMs: 1.8,
    syncedAt: new Date().toISOString(),
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.content || !body.platform) {
      return NextResponse.json({ error: "Content and platform are required" }, { status: 400 });
    }

    const newPost: SocialPost = {
      id: `post-${Date.now()}`,
      platform: body.platform,
      author: body.author || "Manthan Ank",
      handle: body.handle || "@manthanank",
      content: body.content,
      publishedAt: "Just now",
      likes: 0,
      shares: 0,
      comments: 0,
      impressions: 1,
      sentiment: body.sentiment || "positive",
    };

    serverFeed = [newPost, ...serverFeed];

    return NextResponse.json({
      success: true,
      message: "Published to social feed",
      post: newPost,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to publish post" }, { status: 500 });
  }
}
