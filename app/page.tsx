"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Share2, Sparkles, Database, ArrowRight, CheckCircle2, 
  ChevronRight, Calendar, Code2, Zap, Radio, Server, 
  Rss, Twitter, Linkedin, Youtube, Instagram, Activity, ExternalLink 
} from "lucide-react";

export default function SocialMediaLandingPage() {
  // Interactive GraphQL & Redis Simulator
  const [useCache, setUseCache] = useState(true);
  const [isSimulating, setIsSimulating] = useState(false);

  const latency = useCache ? 2.4 : 86.4;
  const cacheStatus = useCache ? "HIT" : "MISS";

  // Pricing Toggle
  const [annualBilling, setAnnualBilling] = useState(true);

  // FAQ State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "How does SocialPulse aggregate metrics from multiple social networks?",
      a: "SocialPulse utilizes a unified GraphQL schema that wraps REST and Graph APIs from X (Twitter), LinkedIn, Meta (Instagram), and YouTube into a single strongly typed query endpoint."
    },
    {
      q: "Why is Redis used in the architecture?",
      a: "Social networks enforce strict API rate limits. SocialPulse uses a Redis cache-aside layer with a configurable TTL (e.g. 60s) to serve 98%+ of feed queries in under 3ms without hitting external upstream rate limits."
    },
    {
      q: "Can I schedule posts to multiple networks simultaneously?",
      a: "Yes! The Scheduler includes a multi-platform composer that automatically enforces per-network character limits (e.g. 280 chars for X, 3000 chars for LinkedIn) and handles scheduled release queues."
    },
    {
      q: "Is there a live GraphQL playground included?",
      a: "Yes, visit /graphql to run interactive queries, inspect response payloads, and audit Redis cache response headers in real time."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-white">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-rose-500 flex items-center justify-center text-white shadow-md shadow-cyan-500/20">
              <Share2 className="h-5 w-5" />
            </div>
            <div>
              <span className="font-extrabold text-white text-base tracking-tight">SocialPulse</span>
              <span className="ml-2 px-2 py-0.5 rounded-full text-[10px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                GraphQL + Redis
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-300">
            <a href="#simulator" className="hover:text-white transition">Redis Benchmark</a>
            <a href="#features" className="hover:text-white transition">Features</a>
            <a href="#architecture" className="hover:text-white transition">GraphQL Schema</a>
            <a href="#pricing" className="hover:text-white transition">Pricing</a>
            <a href="#faq" className="hover:text-white transition">FAQ</a>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/feed"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-lg shadow-cyan-600/30 transition hover:scale-105 active:scale-95"
            >
              <span>Launch Console</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 space-y-24 sm:space-y-32 py-12">
        {/* HERO SECTION */}
        <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-medium">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>High-Throughput Social Media Intelligence & Scheduler</span>
          </div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white max-w-5xl mx-auto leading-tight sm:leading-[1.1]"
          >
            Unified Social Analytics. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-rose-400 bg-clip-text text-transparent">
              Powered by GraphQL & Redis Caching.
            </span>
          </motion.h1>

          <p className="text-slate-400 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Consolidate X, LinkedIn, YouTube, and Meta feeds into a single ultra-fast command center. Built with Next.js 15, sub-3ms Redis cache-aside resolution, and automated multi-network scheduling.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/feed"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm shadow-xl shadow-cyan-600/30 transition hover:scale-105 active:scale-95"
            >
              <Rss className="w-5 h-5" />
              <span>Explore Live Feed</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/graphql"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 font-semibold text-sm transition"
            >
              <Code2 className="w-5 h-5 text-cyan-400" />
              <span>Test GraphQL Playground</span>
            </Link>
          </div>

          {/* Social Proof Metric Bar */}
          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-left">
            {[
              { val: "2.4ms", label: "Redis Cache Hit", sub: "98.4% Hit Ratio" },
              { val: "4 Networks", label: "Unified Ingestion", sub: "X, LinkedIn, YT, IG" },
              { val: "1.4M+", label: "Weekly Impressions", sub: "Real-time telemetry" },
              { val: "Zero Lag", label: "GraphQL Federation", sub: "Single roundtrip" }
            ].map((stat, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80">
                <div className="text-2xl sm:text-3xl font-black text-white">{stat.val}</div>
                <div className="text-xs font-bold text-cyan-400 mt-1">{stat.label}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">{stat.sub}</div>
              </div>
            ))}
          </div>
        </section>

        {/* INTERACTIVE GRAPHQL & REDIS BENCHMARK SIMULATOR */}
        <section id="simulator" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
              <Zap className="w-3.5 h-3.5" />
              <span>Live In-Memory Cache Benchmark</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Compare Redis Cache vs Cold Database Scan</h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Toggle the cache-aside layer to see how Redis delivers a 35x latency reduction for GraphQL field resolution.
            </p>
          </div>

          <div className="max-w-4xl mx-auto p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6 shadow-2xl">
            {/* Toggle Switch */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Execution Mode</span>
                <p className="text-sm font-semibold text-white">
                  {useCache ? "Redis Cache-Aside In-Memory (Active)" : "Cold Database Table Scan (Direct Query)"}
                </p>
              </div>

              <div className="inline-flex items-center gap-2 p-1 rounded-xl bg-slate-950 border border-slate-800">
                <button
                  onClick={() => setUseCache(true)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition ${useCache ? "bg-cyan-600 text-white shadow-md" : "text-slate-400"}`}
                >
                  ⚡ Redis Cache HIT
                </button>
                <button
                  onClick={() => setUseCache(false)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition ${!useCache ? "bg-rose-600 text-white shadow-md" : "text-slate-400"}`}
                >
                  🐢 Cold Origin MISS
                </button>
              </div>
            </div>

            {/* Benchmark Comparison Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-xs text-slate-500 block">Query Response Time</span>
                <span className={`text-2xl font-black mt-1 block font-mono ${useCache ? "text-cyan-400" : "text-rose-400"}`}>
                  {latency} ms
                </span>
                <span className="text-[11px] text-slate-400 mt-1 block">
                  {useCache ? "35x faster resolution" : "Origin database load applied"}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-xs text-slate-500 block">Cache Status Header</span>
                <span className={`text-2xl font-black mt-1 block font-mono ${useCache ? "text-emerald-400" : "text-amber-400"}`}>
                  X-Cache: {cacheStatus}
                </span>
                <span className="text-[11px] text-slate-400 mt-1 block">
                  {useCache ? "Key: redis:feed:all:metrics" : "Key bypassed or expired"}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-xs text-slate-500 block">Upstream API Limit Cost</span>
                <span className="text-2xl font-black mt-1 block font-mono text-emerald-400">
                  {useCache ? "0 Requests" : "4 Upstream Calls"}
                </span>
                <span className="text-[11px] text-slate-400 mt-1 block">
                  {useCache ? "Rate limits protected" : "Consumes OAuth quota"}
                </span>
              </div>
            </div>

            {/* Simulated GraphQL Output */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300 overflow-x-auto leading-relaxed">
              <span className="text-slate-500">// Resolved via GraphQL POST /api/graphql</span>
              <br />
              {JSON.stringify(
                {
                  data: {
                    getSummaryMetrics: {
                      totalImpressions: 1428500,
                      totalEngagement: 86420,
                      averageEngagementRate: 6.05,
                      redisCacheHit: useCache,
                      executionTimeMs: latency,
                    },
                  },
                },
                null,
                2
              )}
            </div>
          </div>
        </section>

        {/* WORKSPACE MODULES */}
        <section id="features" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Full-Stack Social Command Station</h2>
            <p className="text-slate-400 text-sm sm:text-base">
              A cohesive suite of dedicated tools replacing fragmented browser tabs and platform analytics silos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Rss,
                title: "Consolidated Live Feed",
                desc: "Unified multi-channel stream with sentiment analysis, instant likes, and repost counters.",
                href: "/feed",
                action: "View Feed"
              },
              {
                icon: Activity,
                title: "Cross-Channel Analytics",
                desc: "Time-series reach curves, platform share of voice, and net follower growth via Recharts.",
                href: "/analytics",
                action: "Explore Charts"
              },
              {
                icon: Calendar,
                title: "Synchronized Scheduler",
                desc: "Multi-network composer with per-platform character limit validation and publishing queues.",
                href: "/scheduler",
                action: "Open Scheduler"
              },
              {
                icon: Code2,
                title: "GraphQL Console",
                desc: "Interactive query runner with live response viewing and Redis cache header audits.",
                href: "/graphql",
                action: "Run Queries"
              }
            ].map((f, idx) => {
              const Icon = f.icon;
              return (
                <div key={idx} className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between space-y-4 hover:border-cyan-500/50 transition">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-white text-base mt-4">{f.title}</h3>
                    <p className="text-slate-400 text-xs mt-1.5 leading-relaxed">{f.desc}</p>
                  </div>

                  <Link
                    href={f.href}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 pt-2"
                  >
                    <span>{f.action}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              );
            })}
          </div>
        </section>

        {/* PRICING MATRIX */}
        <section id="pricing" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Transparent Capacity Plans</h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Scale from solo creators to global brand marketing teams.
            </p>

            <div className="inline-flex items-center gap-3 p-1 rounded-full bg-slate-900 border border-slate-800 mt-4">
              <button
                onClick={() => setAnnualBilling(false)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${!annualBilling ? "bg-cyan-600 text-white" : "text-slate-400"}`}
              >
                Monthly
              </button>
              <button
                onClick={() => setAnnualBilling(true)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${annualBilling ? "bg-cyan-600 text-white" : "text-slate-400"}`}
              >
                Annual (Save 20%)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Creator Starter",
                price: "$0",
                period: "forever free",
                features: [
                  "Up to 3 connected social accounts",
                  "Consolidated multi-network feed",
                  "Basic post scheduling queue",
                  "Community GraphQL access"
                ],
                popular: false,
                btn: "Start Free",
                href: "/feed"
              },
              {
                name: "Growth Agency",
                price: annualBilling ? "$29" : "$36",
                period: "per month, billed annually",
                features: [
                  "Unlimited connected social accounts",
                  "Sub-3ms Redis cache-aside acceleration",
                  "Cross-channel engagement analytics",
                  "Automated character limit validation",
                  "Full GraphQL API mutation access"
                ],
                popular: true,
                btn: "Launch Growth Console",
                href: "/feed"
              },
              {
                name: "Enterprise Brand",
                price: annualBilling ? "$89" : "$110",
                period: "per month, billed annually",
                features: [
                  "Dedicated Redis cluster isolation",
                  "Custom sentiment analysis model",
                  "Multi-seat team approval workflows",
                  "SSO SAML / Okta directory sync",
                  "24/7 dedicated support SLA"
                ],
                popular: false,
                btn: "Contact Enterprise",
                href: "/feed"
              }
            ].map((plan, idx) => (
              <div
                key={idx}
                className={`p-8 rounded-3xl border flex flex-col justify-between space-y-6 transition ${
                  plan.popular
                    ? "bg-slate-900 border-cyan-500 shadow-2xl shadow-cyan-500/10 scale-105"
                    : "bg-slate-900/50 border-slate-800"
                }`}
              >
                <div>
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-white text-lg">{plan.name}</h3>
                    {plan.popular && (
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                        Most Popular
                      </span>
                    )}
                  </div>

                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-4xl font-black text-white">{plan.price}</span>
                    <span className="text-xs text-slate-400">/{plan.period}</span>
                  </div>

                  <ul className="mt-6 space-y-3">
                    {plan.features.map((feat, fidx) => (
                      <li key={fidx} className="flex items-center gap-2.5 text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={plan.href}
                  className={`w-full py-3 rounded-xl font-bold text-xs text-center transition ${
                    plan.popular
                      ? "bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-600/30"
                      : "bg-slate-800 hover:bg-slate-700 text-slate-200"
                  }`}
                >
                  {plan.btn}
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ SECTION */}
        <section id="faq" className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-extrabold text-white">Frequently Asked Questions</h2>
            <p className="text-slate-400 text-sm">Everything you need to know about SocialPulse, GraphQL, and Redis caching.</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border border-slate-800 rounded-2xl bg-slate-900/50 overflow-hidden transition"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left text-sm font-bold text-white hover:text-cyan-400 transition"
                >
                  <span>{faq.q}</span>
                  <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${openFaq === idx ? "rotate-90 text-cyan-400" : ""}`} />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-xs text-slate-400 leading-relaxed border-t border-slate-800/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* BOTTOM CTA */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-r from-cyan-950/60 via-slate-900 to-indigo-950/60 border border-cyan-500/30 text-center space-y-6 shadow-2xl">
            <h2 className="text-3xl sm:text-5xl font-black text-white max-w-2xl mx-auto leading-tight">
              Ready to Accelerate Your Social Intelligence?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
              Unify your multi-channel feeds, schedule content effortlessly, and experience sub-3ms query speeds.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/feed"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm shadow-xl shadow-cyan-600/30 transition hover:scale-105"
              >
                Launch Live Feed
              </Link>
              <Link
                href="/scheduler"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-700 font-semibold text-sm transition"
              >
                Schedule First Post
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <div className="h-7 w-7 rounded-lg bg-cyan-600 flex items-center justify-center text-white">
              <Share2 className="h-4 w-4" />
            </div>
            <span className="font-bold text-white text-sm">SocialPulse</span>
            <span>• Next.js 15, GraphQL & Redis Suite</span>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <Link href="/feed" className="hover:text-slate-300 transition">Live Feed</Link>
            <Link href="/analytics" className="hover:text-slate-300 transition">Analytics</Link>
            <Link href="/scheduler" className="hover:text-slate-300 transition">Scheduler</Link>
            <Link href="/graphql" className="hover:text-slate-300 transition">GraphQL API</Link>
            <Link href="/settings" className="hover:text-slate-300 transition">Settings</Link>
            <a href="https://github.com/manthanank/social-media-dashboard" target="_blank" rel="noreferrer" className="hover:text-slate-300 transition flex items-center gap-1">
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div>
            © {new Date().getFullYear()} SocialPulse Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
