# SocialPulse — Unified Multi-Platform Social Analytics & Scheduler

SocialPulse is a social media management and analytics platform built with Next.js 15, TypeScript, and Tailwind CSS. It provides live aggregated feeds, automated post scheduling, and audience engagement telemetry.

## Key Features

- **Live Aggregated Feed (`/feed` & `/api/feed`)**: Unified multi-platform timeline across X/Twitter, LinkedIn, and YouTube with sentiment tags.
- **Visual Post Scheduler (`/scheduler`)**: Multi-platform composer with character counters, platform selector, and schedule queue.
- **Interactive GraphQL Cockpit (`/graphql`)**: Live interactive query playground demonstrating schema queries for posts and metric summaries.
- **Engagement Telemetry (`/analytics`)**: Impressions graphs, click-through curves, and follower acquisition velocity.

## Tech Stack

- **Framework**: Next.js 15 (App Router, Route Handlers)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, Lucide Icons, Recharts
- **API**: REST Feed API (`/api/feed`) + GraphQL Route (`/api/graphql`)
- **Deployment**: Vercel

## API Endpoints

- `GET /api/feed`: Retrieve multi-platform feed items with platform filtering.
- `POST /api/feed`: Dispatch an instant or scheduled post.
- `POST /api/graphql`: Execute GraphQL queries and mutations.

## Getting Started

1. Navigate to the project directory:
   ```bash
   cd c:\Users\manth\projects\social-media-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000).
