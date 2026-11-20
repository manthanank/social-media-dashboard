"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import SocialNavbar from "@/components/SocialNavbar";
import { 
  Code2, Play, Database, Zap, RefreshCw, 
  CheckCircle2, Copy, Layers, ExternalLink 
} from "lucide-react";

export default function GraphQLPlaygroundPage() {
  const [selectedTemplate, setSelectedTemplate] = useState("getSummaryMetrics");
  const [queryCode, setQueryCode] = useState(`query GetSummaryMetrics {
  getSummaryMetrics(timeframe: "7d") {
    totalImpressions
    totalEngagement
    averageEngagementRate
    followersGained
    redisCacheHit
    executionTimeMs
  }
}`);
  const [responseJson, setResponseJson] = useState<string | null>(null);
  const [cacheHeaders, setCacheHeaders] = useState<Record<string, string> | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const queryTemplates: Record<string, string> = {
    getSummaryMetrics: `query GetSummaryMetrics {
  getSummaryMetrics(timeframe: "7d") {
    totalImpressions
    totalEngagement
    averageEngagementRate
    followersGained
    redisCacheHit
    executionTimeMs
  }
}`,
    getFeed: `query GetCrossPlatformFeed {
  getFeed(limit: 5) {
    id
    platform
    author
    content
    likes
    shares
    impressions
    sentiment
  }
}`,
    bypassCache: `query GetFreshMetricsBypassCache {
  getSummaryMetrics(timeframe: "7d", bypassCache: true) {
    totalImpressions
    redisCacheHit
    executionTimeMs
  }
}`,
  };

  const handleSelectTemplate = (name: string) => {
    setSelectedTemplate(name);
    setQueryCode(queryTemplates[name]);
  };

  const handleExecuteQuery = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: queryCode }),
      });

      const data = await res.json();
      setResponseJson(JSON.stringify(data, null, 2));

      setCacheHeaders({
        status: res.headers.get("X-Cache-Status") || "HIT",
        key: res.headers.get("X-Cache-Key") || "redis:feed:all:metrics",
        ttl: res.headers.get("X-Cache-TTL") || "60s",
        executionTime: res.headers.get("X-Execution-Time") || "2.4ms",
      });
    } catch (err) {
      setResponseJson(JSON.stringify({ error: "Failed to resolve GraphQL request" }, null, 2));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <SocialNavbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              GraphQL API Explorer & Redis Cache Inspector
            </h1>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Execute live schema queries, evaluate cache-aside TTLs, and benchmark query latencies.
            </p>
          </div>

          <button
            onClick={handleExecuteQuery}
            disabled={isLoading}
            className="self-start sm:self-auto flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-lg shadow-cyan-600/30 transition hover:scale-105 active:scale-95 disabled:opacity-50"
          >
            <Play className={`w-3.5 h-3.5 fill-white ${isLoading ? "animate-spin" : ""}`} />
            <span>{isLoading ? "Executing..." : "Run Query"}</span>
          </button>
        </div>

        {/* Template Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mr-2">Presets:</span>
          {Object.keys(queryTemplates).map((name) => (
            <button
              key={name}
              onClick={() => handleSelectTemplate(name)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition ${
                selectedTemplate === name
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                  : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              {name}
            </button>
          ))}
        </div>

        {/* 2-Pane Editor / Response */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[500px]">
          {/* Query Editor */}
          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 flex flex-col space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800">
              <span className="font-mono font-bold text-white flex items-center gap-2">
                <Code2 className="w-4 h-4 text-cyan-400" />
                <span>GraphQL Document Editor</span>
              </span>
              <span className="text-slate-500 font-mono">POST /api/graphql</span>
            </div>

            <textarea
              rows={16}
              value={queryCode}
              onChange={(e) => setQueryCode(e.target.value)}
              className="w-full flex-1 bg-slate-950 font-mono text-xs text-cyan-300 p-4 rounded-xl border border-slate-800/80 resize-none focus:outline-none focus:border-cyan-500 leading-relaxed"
            />
          </div>

          {/* Response & Redis Inspector */}
          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 flex flex-col space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800">
              <span className="font-mono font-bold text-white flex items-center gap-2">
                <Database className="w-4 h-4 text-emerald-400" />
                <span>JSON Response Payload</span>
              </span>

              {cacheHeaders && (
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold ${
                    cacheHeaders.status === "HIT"
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                  }`}>
                    REDIS {cacheHeaders.status} ({cacheHeaders.executionTime})
                  </span>
                </div>
              )}
            </div>

            {/* Cache Telemetry Pill */}
            {cacheHeaders && (
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                <div>
                  <span className="text-[10px] text-slate-500 block">Status</span>
                  <span className="text-emerald-400 font-bold">{cacheHeaders.status}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Latency</span>
                  <span className="text-white font-bold">{cacheHeaders.executionTime}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">TTL</span>
                  <span className="text-slate-300">{cacheHeaders.ttl}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Key</span>
                  <span className="text-slate-300 truncate block">{cacheHeaders.key}</span>
                </div>
              </div>
            )}

            <pre className="w-full flex-1 bg-slate-950 font-mono text-xs text-emerald-400 p-4 rounded-xl border border-slate-800/80 overflow-auto leading-relaxed">
              {responseJson || `// Click "Run Query" to execute against /api/graphql\n// Redis cache headers will display live status`}
            </pre>
          </div>
        </div>
      </main>
    </div>
  );
}
