import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://social-media-dashboard-manthan.vercel.app"),
  title: "SocialPulse • GraphQL & Redis Multi-Channel Analytics Suite",
  description: "Cross-platform social media intelligence, engagement tracking, and post scheduler powered by Next.js 15, GraphQL, and Redis cache-aside.",
  keywords: ["social media", "graphql", "redis", "analytics", "dashboard", "nextjs", "scheduling"],
  openGraph: {
    title: "SocialPulse Enterprise Analytics",
    description: "Cross-platform social media intelligence powered by GraphQL and Redis.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500 selection:text-white">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
