"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import SocialNavbar from "@/components/SocialNavbar";
import { INITIAL_POSTS } from "@/lib/mock-data";
import { SocialPost, Platform } from "@/lib/types";
import { 
  Rss, Heart, Repeat, MessageCircle, Eye, Sparkles, 
  RefreshCw, Filter, ExternalLink, Twitter, Linkedin, 
  Youtube, Instagram, CheckCircle2 
} from "lucide-react";

export default function FeedPage() {
  const [posts, setPosts] = useState<SocialPost[]>(INITIAL_POSTS);
  const [selectedPlatform, setSelectedPlatform] = useState<string>("all");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});

  React.useEffect(() => {
    fetch("/api/feed")
      .then((res) => res.json())
      .then((data) => {
        try {
          const stored = localStorage.getItem("socialpulse_posts");
          if (stored) {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed) && parsed.length > 0) {
              setPosts([...parsed, ...(data.posts || INITIAL_POSTS)]);
              return;
            }
          }
          if (data.posts && Array.isArray(data.posts)) {
            setPosts(data.posts);
          }
        } catch (e) {
          if (data.posts) setPosts(data.posts);
        }
      })
      .catch(() => {
        try {
          const stored = localStorage.getItem("socialpulse_posts");
          if (stored) {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed) && parsed.length > 0) setPosts([...parsed, ...INITIAL_POSTS]);
          }
        } catch (e) {}
      });
  }, []);

  const filteredPosts = posts.filter((p) =>
    selectedPlatform === "all" ? true : p.platform === selectedPlatform
  );

  const handleLike = (id: string) => {
    setLikedPosts((prev) => ({ ...prev, [id]: !prev[id] }));
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, likes: likedPosts[id] ? p.likes - 1 : p.likes + 1 }
          : p
      )
    );
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  const getPlatformIcon = (platform: Platform) => {
    switch (platform) {
      case "twitter": return <Twitter className="w-4 h-4 text-sky-400" />;
      case "linkedin": return <Linkedin className="w-4 h-4 text-blue-500" />;
      case "youtube": return <Youtube className="w-4 h-4 text-rose-500" />;
      case "instagram": return <Instagram className="w-4 h-4 text-pink-400" />;
    }
  };

  const getSentimentBadge = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Positive (94%)</span>;
      case "negative":
        return <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">Critical (62%)</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-300">Neutral</span>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <SocialNavbar />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Consolidated Multi-Channel Feed
            </h1>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Real-time inbound social streams across X, LinkedIn, YouTube, and Instagram.
            </p>
          </div>

          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="self-start sm:self-auto flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 text-xs font-semibold transition"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-cyan-400" : ""}`} />
            <span>{isRefreshing ? "Updating Redis Cache..." : "Refresh Stream"}</span>
          </button>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 border-b border-slate-800">
          {[
            { id: "all", label: "All Networks" },
            { id: "twitter", label: "X (Twitter)" },
            { id: "linkedin", label: "LinkedIn" },
            { id: "youtube", label: "YouTube" },
            { id: "instagram", label: "Instagram" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedPlatform(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                selectedPlatform === tab.id
                  ? "bg-cyan-600/20 border border-cyan-500/40 text-cyan-300 shadow-md shadow-cyan-500/10"
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Posts Stream */}
        <div className="space-y-4">
          {filteredPosts.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center">
                    {getPlatformIcon(post.platform)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">{post.author}</span>
                      <span className="text-xs text-slate-500">{post.handle}</span>
                    </div>
                    <span className="text-[11px] text-slate-500">{post.publishedAt}</span>
                  </div>
                </div>

                <div>{getSentimentBadge(post.sentiment)}</div>
              </div>

              <p className="text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
                {post.content}
              </p>

              {/* Engagement Metrics Bar */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-6">
                  <button
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center gap-1.5 transition ${
                      likedPosts[post.id] ? "text-rose-400 font-bold" : "hover:text-rose-400"
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${likedPosts[post.id] ? "fill-rose-400" : ""}`} />
                    <span>{post.likes.toLocaleString()}</span>
                  </button>

                  <div className="flex items-center gap-1.5 hover:text-emerald-400 transition cursor-pointer">
                    <Repeat className="w-4 h-4" />
                    <span>{post.shares.toLocaleString()}</span>
                  </div>

                  <div className="flex items-center gap-1.5 hover:text-sky-400 transition cursor-pointer">
                    <MessageCircle className="w-4 h-4" />
                    <span>{post.comments.toLocaleString()}</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-slate-500">
                    <Eye className="w-4 h-4" />
                    <span>{post.impressions.toLocaleString()} views</span>
                  </div>
                </div>

                <span className="text-[10px] font-mono text-slate-500">
                  Cached in Redis
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}

