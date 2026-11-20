"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import SocialNavbar from "@/components/SocialNavbar";
import { INITIAL_SCHEDULED } from "@/lib/mock-data";
import { ScheduledPost, Platform } from "@/lib/types";
import { 
  Calendar, Clock, Send, Sparkles, CheckCircle2, 
  Trash2, Twitter, Linkedin, Youtube, Instagram, AlertCircle 
} from "lucide-react";

export default function SchedulerPage() {
  const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>(INITIAL_SCHEDULED);
  const [targetPlatform, setTargetPlatform] = useState<Platform>("twitter");
  const [postContent, setPostContent] = useState("");
  const [scheduledTime, setScheduledTime] = useState("Tomorrow at 10:00 AM EST");
  const [toastMessage, setToastMessage] = useState("");

  React.useEffect(() => {
    try {
      const stored = localStorage.getItem("socialpulse_scheduled");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) setScheduledPosts(parsed);
      }
    } catch (e) {}
  }, []);

  const saveScheduled = (updated: ScheduledPost[]) => {
    setScheduledPosts(updated);
    try {
      localStorage.setItem("socialpulse_scheduled", JSON.stringify(updated));
    } catch (e) {}
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const getCharLimit = (plat: Platform) => {
    switch (plat) {
      case "twitter": return 280;
      case "linkedin": return 3000;
      case "instagram": return 2200;
      case "youtube": return 5000;
    }
  };

  const charLimit = getCharLimit(targetPlatform);
  const charRemaining = charLimit - postContent.length;

  const handleSchedulePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postContent.trim()) return;

    const newPost: ScheduledPost = {
      id: `sch-${Date.now()}`,
      platform: targetPlatform,
      content: postContent,
      scheduledFor: scheduledTime,
      status: "queued",
    };

    saveScheduled([newPost, ...scheduledPosts]);
    setPostContent("");
    triggerToast(`Post queued for ${scheduledTime} on ${targetPlatform}!`);
  };

  const handlePublishNow = () => {
    if (!postContent.trim()) return;

    const livePost = {
      id: `post-${Date.now()}`,
      platform: targetPlatform,
      authorName: "Alex Vance",
      authorHandle: "@alexvance_dev",
      authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80",
      content: postContent,
      publishedAt: "Just now",
      likes: 1,
      shares: 0,
      comments: 0,
      views: 12,
      sentiment: "positive",
      tags: ["Omnichannel", targetPlatform.toUpperCase()],
    };

    try {
      const stored = localStorage.getItem("socialpulse_posts");
      const current = stored ? JSON.parse(stored) : [];
      localStorage.setItem("socialpulse_posts", JSON.stringify([livePost, ...current]));
    } catch (e) {}

    setPostContent("");
    triggerToast(`Dispatched live to ${targetPlatform} feed! Check /feed to view.`);
  };

  const handleDeleteScheduled = (id: string) => {
    saveScheduled(scheduledPosts.filter((p) => p.id !== id));
    triggerToast("Post removed from publishing queue.");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <SocialNavbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Cross-Network Publisher & Content Queue
          </h1>
          <p className="text-slate-400 mt-1 text-sm sm:text-base">
            Draft, validate character limits, and schedule synchronized releases across platforms.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Post Composer (Left 7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-cyan-400" />
                <span>Multi-Platform Composer</span>
              </h2>

              {/* Platform Selector */}
              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-2">Publishing Target</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: "twitter" as Platform, name: "X (Twitter)", icon: Twitter, color: "text-sky-400" },
                    { id: "linkedin" as Platform, name: "LinkedIn", icon: Linkedin, color: "text-blue-500" },
                    { id: "youtube" as Platform, name: "YouTube", icon: Youtube, color: "text-rose-500" },
                    { id: "instagram" as Platform, name: "Instagram", icon: Instagram, color: "text-pink-400" },
                  ].map((p) => {
                    const Icon = p.icon;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setTargetPlatform(p.id)}
                        className={`p-3 rounded-xl border flex items-center gap-2 text-xs font-semibold transition ${
                          targetPlatform === p.id
                            ? "bg-cyan-500/10 border-cyan-500 text-white shadow-md shadow-cyan-500/10"
                            : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700"
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${p.color}`} />
                        <span>{p.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Text Area */}
              <div>
                <div className="flex justify-between items-center mb-1.5 text-xs">
                  <label className="font-semibold text-slate-400">Post Copy</label>
                  <span className={`font-mono ${charRemaining < 0 ? "text-rose-400 font-bold" : "text-slate-500"}`}>
                    {charRemaining} characters remaining
                  </span>
                </div>
                <textarea
                  rows={5}
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  placeholder={`Draft your ${targetPlatform} post with hashtags and URLs...`}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Scheduling Timeslot */}
              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1.5">Scheduled Release Slot</label>
                <input
                  type="text"
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleSchedulePost}
                  disabled={!postContent.trim() || charRemaining < 0}
                  className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-lg shadow-cyan-600/20 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  <Clock className="w-4 h-4" />
                  <span>Queue for Automated Publishing</span>
                </button>
                <button
                  type="button"
                  onClick={handlePublishNow}
                  disabled={!postContent.trim() || charRemaining < 0}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-lg shadow-emerald-600/20 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Publish Instantly</span>
                </button>
              </div>
            </div>
          </div>

          {/* Queue (Right 5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
              Publishing Queue ({scheduledPosts.length})
            </h2>

            <div className="space-y-3">
              {scheduledPosts.map((post) => (
                <div
                  key={post.id}
                  className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      {post.platform}
                    </span>
                    <button
                      onClick={() => handleDeleteScheduled(post.id)}
                      className="p-1 text-slate-500 hover:text-rose-400 transition"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                    "{post.content}"
                  </p>

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-cyan-400" />
                      {post.scheduledFor}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-semibold">
                      Queued
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Toast Notification */}
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-cyan-500/40 text-cyan-300 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3"
        >
          <CheckCircle2 className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </motion.div>
      )}
    </div>
  );
}

