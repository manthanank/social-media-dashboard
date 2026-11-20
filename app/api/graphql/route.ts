import { NextRequest, NextResponse } from "next/server";
import { INITIAL_SUMMARY, INITIAL_POSTS, INITIAL_SCHEDULED } from "@/lib/mock-data";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const query = body.query || "";

    // Simulate Redis Cache-Aside check
    const isCached = !query.includes("bypassCache");
    const executionTimeMs = isCached ? 2.4 : 86.2;

    let responseData = {};

    if (query.includes("getSummaryMetrics")) {
      responseData = {
        data: {
          getSummaryMetrics: {
            ...INITIAL_SUMMARY,
            redisCacheHit: isCached,
            executionTimeMs,
          },
        },
      };
    } else if (query.includes("getFeed")) {
      responseData = {
        data: {
          getFeed: INITIAL_POSTS,
        },
      };
    } else if (query.includes("getScheduledPosts")) {
      responseData = {
        data: {
          getScheduledPosts: INITIAL_SCHEDULED,
        },
      };
    } else {
      // General fallback
      responseData = {
        data: {
          getSummaryMetrics: INITIAL_SUMMARY,
          getFeed: INITIAL_POSTS.slice(0, 3),
        },
      };
    }

    return NextResponse.json(responseData, {
      headers: {
        "X-Cache-Status": isCached ? "HIT" : "MISS",
        "X-Cache-Key": "redis:feed:all:metrics",
        "X-Cache-TTL": "60",
        "X-Execution-Time": `${executionTimeMs}ms`,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { errors: [{ message: "Invalid GraphQL query payload" }] },
      { status: 400 }
    );
  }
}
