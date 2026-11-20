import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SocialPulse • GraphQL & Redis Multi-Channel Analytics",
    short_name: "SocialPulse",
    description: "Cross-platform social media intelligence, engagement tracking, and post scheduler powered by GraphQL and Redis.",
    start_url: "/",
    display: "standalone",
    background_color: "#030712",
    theme_color: "#f43f5e",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
