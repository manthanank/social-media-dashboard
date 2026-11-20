# SocialPulse Enterprise - AI Architecture & Context Blueprint

## Overview
SocialPulse is a multi-network social media intelligence and scheduling platform built with Next.js 15, GraphQL, and Redis cache-aside architecture. It unifies analytics and content publishing across X (Twitter), LinkedIn, YouTube, and Instagram.

## Tech Stack
- Framework: Next.js 15 (App Router)
- Language: TypeScript 5.7+
- Styling: Tailwind CSS & Lucide Icons
- Graph API: GraphQL Schema & Resolvers (`graphql/schema.graphql`)
- Caching: Redis Key-Value Store with TTL & Cache-Aside pattern
- Visualization: Recharts (Impression trends, engagement rates)
- Analytics: Vercel Analytics & Speed Insights

## Key Routes
- `/`: Enterprise marketing landing page with interactive GraphQL query & Redis cache hit simulator, pricing, and FAQ.
- `/feed`: Multi-channel consolidated stream with engagement counters (likes, retweets, comments) and sentiment badges.
- `/analytics`: Cross-channel reach curves, follower velocity, and audience engagement distributions.
- `/scheduler`: Multi-network post composer and calendar queue with platform character validation.
- `/graphql`: Interactive GraphQL playground and schema documentation explorer.
- `/settings`: Connected social accounts, Redis cache TTL configuration, and JSON export.
- `/api/graphql`: GraphQL API endpoint.
