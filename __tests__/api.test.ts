import { describe, it, expect } from "vitest";
import { GET as getFeed } from "../app/api/feed/route";

describe("Social Media Dashboard API Routes", () => {
  it("GET /api/feed returns social metrics feed", async () => {
    const req = new Request("http://localhost:3000/api/feed");
    const res = await getFeed(req);
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.success).toBe(true);
    expect(Array.isArray(data.posts)).toBe(true);
  });
});
