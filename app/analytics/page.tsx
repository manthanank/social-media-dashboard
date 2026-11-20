"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SocialNavbar from "@/components/SocialNavbar";
import { 
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, 
  Tooltip, ResponsiveContainer, Cell, PieChart, Pie 
} from "recharts";
import { 
  BarChart2, ArrowUpRight, TrendingUp, Users, 
  Eye, Heart, Zap, Database, Activity 
} from "lucide-react";

export default function AnalyticsPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const impressionTrendData = [
    { day: "Mon", impressions: 142000, engagement: 8200 },
    { day: "Tue", impressions: 198000, engagement: 12400 },
    { day: "Wed", impressions: 245000, engagement: 16800 },
    { day: "Thu", impressions: 215000, engagement: 14200 },
    { day: "Fri", impressions: 320000, engagement: 21500 },
    { day: "Sat", impressions: 165000, engagement: 9100 },
    { day: "Sun", impressions: 143500, engagement: 8900 },
  ];

  const platformShareData = [
    { name: "Twitter / X", impressions: 580000, fill: "#38bdf8" },
    { name: "LinkedIn", impressions: 420000, fill: "#3b82f6" },
    { name: "YouTube", impressions: 290000, fill: "#f43f5e" },
    { name: "Instagram", impressions: 138500, fill: "#ec4899" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <SocialNavbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Cross-Network Intelligence & Reach
            </h1>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Unified telemetry across X, LinkedIn, YouTube, and Meta with GraphQL field aggregation.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 self-start sm:self-auto px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>Redis Cache Hit Rate: 98.4%</span>
          </div>
        </div>

        {/* 4 Analytics Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "7-Day Total Impressions", val: "1,428,500", change: "+24.8%", sub: "vs last week" },
            { label: "Average Engagement Rate", val: "6.05%", change: "+0.84%", sub: "Industry high" },
            { label: "Net Followers Gained", val: "+4,890", change: "+14.2%", sub: "Cross-platform" },
            { label: "Redis Cache Latency", val: "2.4ms", change: "-1.1ms", sub: "Cache-aside hit" }
          ].map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800"
            >
              <div className="text-xs font-semibold text-slate-400">{item.label}</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white mt-1.5">{item.val}</div>
              <div className="flex items-center gap-1.5 mt-2 text-xs font-medium text-cyan-400">
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>{item.change}</span>
                <span className="text-slate-500 text-[11px] font-normal">({item.sub})</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Impression & Engagement Graph */}
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-base font-bold text-white">Daily Multi-Platform Impressions & Engagement</h3>
              <p className="text-xs text-slate-400">Aggregated time-series retrieved via GraphQL `getSummaryMetrics`</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-medium">
              <span className="flex items-center gap-1.5 text-cyan-400">
                <span className="w-2.5 h-2.5 rounded bg-cyan-500" /> Impressions
              </span>
              <span className="flex items-center gap-1.5 text-rose-400">
                <span className="w-2.5 h-2.5 rounded bg-rose-500" /> Interactions
              </span>
            </div>
          </div>

          <div className="h-72 w-full pt-4">
            {isMounted && (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={impressionTrendData} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="impGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="engGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={11} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "12px", color: "#fff" }}
                  />
                  <Area type="monotone" dataKey="impressions" stroke="#06b6d4" strokeWidth={2} fillOpacity={1} fill="url(#impGrad)" />
                  <Area type="monotone" dataKey="engagement" stroke="#f43f5e" strokeWidth={2} fillOpacity={1} fill="url(#engGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Platform Share Bar */}
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
          <div>
            <h3 className="text-base font-bold text-white">Share of Voice by Network</h3>
            <p className="text-xs text-slate-400">Total impressions generated per connected social provider</p>
          </div>

          <div className="h-64 w-full pt-4">
            {isMounted && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={platformShareData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <XAxis type="number" stroke="#64748b" fontSize={11} />
                  <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={12} width={120} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "12px", color: "#fff" }}
                    formatter={(val) => [`${Number(val).toLocaleString()} views`, "Impressions"]}
                  />
                  <Bar dataKey="impressions" radius={[0, 8, 8, 0]}>
                    {platformShareData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
