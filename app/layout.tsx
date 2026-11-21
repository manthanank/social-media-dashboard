import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://social-media-dashboard-beta-ten.vercel.app"),
  title: "SocialPulse • GraphQL & Redis Multi-Channel Analytics Suite",
  description:
    "Cross-platform social media intelligence, engagement tracking, and post scheduler powered by Next.js 15, GraphQL, and Redis cache-aside.",
  keywords: ["social media", "graphql", "redis", "analytics", "dashboard", "nextjs", "scheduling"],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: "SocialPulse Enterprise Analytics",
    description: "Cross-platform social media intelligence powered by GraphQL and Redis.",
    type: "website",
    url: "https://social-media-dashboard-beta-ten.vercel.app",
    siteName: "SocialPulse",
  },
  twitter: {
    card: "summary_large_image",
    title: "SocialPulse • GraphQL & Redis Multi-Channel Analytics",
    description: "Real-time social telemetry, Redis caching benchmarks, and post composer.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "SocialPulse Analytics Dashboard",
    applicationCategory: "MarketingApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: {
      "@type": "Person",
      name: "Manthan Ank",
      url: "https://github.com/manthanank",
    },
  };

  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500 selection:text-white">
        <AuthProvider>
          {children}
        </AuthProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
