export type Platform = "twitter" | "linkedin" | "youtube" | "instagram";
export type Sentiment = "positive" | "neutral" | "negative";

export interface SocialPost {
  id: string;
  platform: Platform;
  author: string;
  handle: string;
  content: string;
  publishedAt: string;
  likes: number;
  shares: number; // Retweets, reposts, or shares
  comments: number;
  impressions: number;
  sentiment: Sentiment;
  url?: string;
}

export interface MetricSummary {
  totalImpressions: number;
  totalEngagement: number;
  averageEngagementRate: number;
  followersGained: number;
  redisCacheHit: boolean;
  executionTimeMs: number;
}

export interface ScheduledPost {
  id: string;
  platform: Platform;
  content: string;
  scheduledFor: string;
  status: "queued" | "publishing" | "published" | "failed";
}
