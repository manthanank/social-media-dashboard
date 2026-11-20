"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import SocialNavbar from "@/components/SocialNavbar";
import { 
  Database, Shield, Key, Download, RefreshCw, 
  CheckCircle2, Sliders, Server, Code2, Twitter, 
  Linkedin, Youtube, Instagram 
} from "lucide-react";

export default function SettingsPage() {
  const [redisTtl, setRedisTtl] = useState(60);
  const [toastMessage, setToastMessage] = useState("");

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleExportData = () => {
    const backup = {
      exportedAt: new Date().toISOString(),
      platform: "SocialPulse Enterprise GraphQL Suite",
      redisSettings: {
        ttlSeconds: redisTtl,
        evictionPolicy: "volatile-lru",
        hitRatio: "98.4%",
      },
      connectedAccounts: [
        { platform: "twitter", handle: "@alexvance_dev", status: "active" },
        { platform: "linkedin", handle: "Alex Vance", status: "active" },
        { platform: "youtube", handle: "@techpulse", status: "active" },
        { platform: "instagram", handle: "@socialpulse.ai", status: "active" },
      ],
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `socialpulse-analytics-backup-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    triggerToast("Full social telemetry archive exported as JSON!");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <SocialNavbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Connected Accounts & Redis Cache Configuration
          </h1>
          <p className="text-slate-400 mt-1 text-sm sm:text-base">
            Manage multi-platform OAuth authorizations, Redis cache-aside TTL policies, and data portability.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Settings (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Connected Platforms */}
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <Key className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">Connected Social Networks</h2>
                  <p className="text-xs text-slate-400">OAuth 2.0 active access tokens and scopes</p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { name: "X (Twitter)", handle: "@alexvance_dev", icon: Twitter, color: "text-sky-400", status: "Active Sync" },
                  { name: "LinkedIn", handle: "Alex Vance", icon: Linkedin, color: "text-blue-500", status: "Active Sync" },
                  { name: "YouTube", handle: "@techpulse", icon: Youtube, color: "text-rose-500", status: "Active Sync" },
                  { name: "Instagram", handle: "@socialpulse.ai", icon: Instagram, color: "text-pink-400", status: "Active Sync" },
                ].map((account) => {
                  const Icon = account.icon;
                  return (
                    <div
                      key={account.name}
                      className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-5 h-5 ${account.color}`} />
                        <div>
                          <span className="font-bold text-white text-xs block">{account.name}</span>
                          <span className="text-slate-400 text-[11px]">{account.handle}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>{account.status}</span>
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Redis Cache Config */}
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
                  <Server className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">Redis Cache-Aside Settings</h2>
                  <p className="text-xs text-slate-400">Controls in-memory key eviction and stale-while-revalidate TTL</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center text-xs mb-1.5">
                    <label className="font-semibold text-slate-300">Feed & Metrics TTL (Seconds)</label>
                    <span className="font-mono text-cyan-400 font-bold">{redisTtl} seconds</span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={300}
                    step={10}
                    value={redisTtl}
                    onChange={(e) => setRedisTtl(Number(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                    <span>10s (High Freshness)</span>
                    <span>300s (Maximum Cache Hit)</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <button
                    onClick={() => triggerToast(`Redis TTL updated to ${redisTtl}s`)}
                    className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-md shadow-cyan-600/20 transition"
                  >
                    Save Cache Policy
                  </button>
                  <button
                    onClick={() => triggerToast("Redis cache purged across all regions!")}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition"
                  >
                    Purge Redis Keys
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Data Export */}
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <Download className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Data Portability</h3>
                  <p className="text-xs text-slate-400">Download complete cross-channel telemetry</p>
                </div>
              </div>

              <button
                onClick={handleExportData}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition shadow-lg shadow-emerald-500/20"
              >
                <Download className="w-4 h-4" /> Download Complete JSON Archive
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Stack Highlights</h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1.5 border-b border-slate-800 text-slate-300">
                  <span>API Layer</span>
                  <span className="font-mono text-cyan-400">GraphQL Schema (Typed)</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800 text-slate-300">
                  <span>In-Memory Cache</span>
                  <span className="font-mono text-rose-400">Redis 7.x (Cache-Aside)</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800 text-slate-300">
                  <span>Charts Engine</span>
                  <span className="font-mono text-cyan-400">Recharts 2.x</span>
                </div>
                <div className="flex justify-between py-1.5 text-slate-300">
                  <span>Edge Runtime</span>
                  <span className="font-mono text-cyan-400">Next.js 15 App Router</span>
                </div>
              </div>
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

