"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import DemoModal from "@/components/DemoModal";
import StarsBackground from "@/components/StarsBackground";

export default function Home() {
  const [activeTab, setActiveTab] = useState("Frontend");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("demo");
  const [heroTab, setHeroTab] = useState(0);

  const heroTabsData = [
    {
      title: "Custom Software & AI Automation",
      subtitle: "We build scalable custom software solutions, enterprise CRM/ERP cloud platforms, mobile applications, and AI automation tools for startups, SMEs, and growing enterprises.",
      tag: "Best Software Company in Kolkata",
      pills: ["Custom ERP/CRM", "SaaS Cloud Agency", "AI Automation Tools", "Mobile Apps"]
    },
    {
      title: "Performance Digital Growth Engine",
      subtitle: "Note: We are strictly NOT a social media posting company. We specialize in high-intent PPC ad campaigns, search engine dominance, and data analytics.",
      tag: "High ROAS Acquisition",
      pills: ["Google Search PPC", "Meta Funnel Ads", "GA4 Conversion Analytics", "Landing Page CRO"]
    },
    {
      title: "WhatsApp API & RCS Messaging",
      subtitle: "Scale sales and customer support directly inside WhatsApp & native mobile SMS inboxes with up to 98% open rates.",
      tag: "Verified Meta Integration",
      pills: ["Meta Verified API", "Transaction Alerts", "Interactive Flow Bots", "RCS Rich Carousels"]
    }
  ];

  const handleOpenModal = (type) => {
    setModalType(type);
    setModalOpen(true);
  };

  const techStack = {
    Frontend: [
      { name: "Next.js", category: "React Framework", desc: "For Server-Side Rendering and fast web apps" },
      { name: "React", category: "UI Library", desc: "For modular interactive component builds" },
      { name: "Tailwind CSS", category: "CSS Framework", desc: "For custom responsive styling" },
      { name: "TypeScript", category: "Language", desc: "For type-safe code logic" },
    ],
    Backend: [
      { name: "Django", category: "Python Framework", desc: "For secure Class-Based API views & ORM" },
      { name: "Python", category: "Language", desc: "For ML models and scalable microservices" },
      { name: "FastAPI", category: "Async Framework", desc: "For high-performance API endpoints" },
      { name: "Node.js", category: "Runtime", desc: "For fast backend API microservices" },
    ],
    Mobile: [
      { name: "Flutter", category: "Cross-Platform", desc: "For fast iOS & Android mobile apps" },
      { name: "React Native", category: "Cross-Platform", desc: "For React-driven cross-platform builds" },
      { name: "Swift", category: "iOS Native", desc: "For native iOS performance" },
      { name: "Kotlin", category: "Android Native", desc: "For native Android features & SDKs" },
    ],
    "Cloud & Database": [
      { name: "PostgreSQL", category: "Database", desc: "For relational enterprise data" },
      { name: "AWS", category: "Cloud Provider", desc: "For cloud infrastructure" },
      { name: "Docker", category: "Container", desc: "For isolated deployment environments" },
      { name: "Kubernetes", category: "Orchestration", desc: "For scaling cloud containers" },
    ],
    "AI & Data Science": [
      { name: "PyTorch", category: "AI Framework", desc: "For deep learning model design" },
      { name: "TensorFlow", category: "AI Framework", desc: "For neural automation pipeline builds" },
      { name: "OpenAI API", category: "Generative AI", desc: "For RAG agents & LLM integration" },
      { name: "Pandas", category: "Data Science", desc: "For processing high-volume datasets" },
    ],
  };

  return (
    <div className="flex flex-col">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-b from-[#e6f9f3] via-white to-slate-100 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Content */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <span className="inline-flex items-center gap-2 self-start bg-[#e6f9f3] border border-[#00b87c]/40 text-[#008f60] px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider shadow-xs">
              <span className="pulse-dot"></span> {heroTabsData[heroTab].tag}
            </span>

            <h1 className="text-4xl md:text-6xl font-black text-slate-950 tracking-tight leading-tight">
              {heroTabsData[heroTab].title.split(" & ").map((part, i) => (
                <span key={i}>
                  {i > 0 && " & "}
                  {part === "AI Automation" || part === "Acquisition" || part === "RCS Messaging" ? (
                    <span className="text-[#00b87c]">{part}</span>
                  ) : (
                    part
                  )}
                </span>
              ))}
            </h1>

            <p className="text-slate-700 text-base md:text-lg leading-relaxed font-medium">
              {heroTabsData[heroTab].subtitle}
            </p>

            {/* Interactive Pills */}
            <div className="flex flex-wrap gap-2 my-2">
              {heroTabsData[heroTab].pills.map((pill, idx) => (
                <span key={idx} className="bg-white border border-slate-300 text-slate-900 px-3.5 py-1.5 rounded-full text-xs font-bold shadow-xs">
                  ✓ {pill}
                </span>
              ))}
            </div>

            {/* Hero CTA Buttons */}
            <div className="flex flex-wrap gap-4 mt-2">
              <button
                onClick={() => handleOpenModal("demo")}
                className="px-8 py-3.5 bg-[#00b87c] hover:bg-[#008f60] text-white rounded-full font-extrabold transition-all shadow-lg shadow-[#00b87c]/30 hover:shadow-[#00b87c]/50 cursor-pointer text-sm tracking-wide"
              >
                Get A Free Quote &rarr;
              </button>
              <a
                href="tel:+918961716583"
                className="px-8 py-3.5 bg-white border border-slate-300 hover:border-[#00b87c] text-slate-900 rounded-full font-extrabold transition-all cursor-pointer text-sm shadow-xs flex items-center gap-2"
              >
                📞 Call: +91-8961716583
              </a>
            </div>

            {/* Trust Bar */}
            <div className="grid grid-cols-3 gap-4 border-t border-slate-300 pt-6 mt-4">
              <div>
                <div className="text-xs text-slate-500 font-extrabold uppercase tracking-wider">Trusted Partner</div>
                <div className="text-base font-black text-slate-950">100+ Businesses</div>
              </div>
              <div>
                <div className="text-xs text-slate-500 font-extrabold uppercase tracking-wider">Industry Exp</div>
                <div className="text-base font-black text-slate-950">5+ Years</div>
              </div>
              <div>
                <div className="text-xs text-slate-500 font-extrabold uppercase tracking-wider">Dedicated Support</div>
                <div className="text-base font-black text-slate-950">24/7 Hours</div>
              </div>
            </div>
          </div>

          {/* Right Visual Cyber Card */}
          <div className="lg:col-span-5 relative">
            <div className="bg-[#070d19] border border-[#00b87c]/40 rounded-3xl p-6 text-white shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                </div>
                <span className="text-xs font-mono text-slate-300 font-bold">SoftwareSolutions_Core_V4.ai</span>
                <span className="text-xs bg-[#00b87c]/20 text-[#00f5a0] px-2.5 py-0.5 rounded-full font-mono font-bold">LIVE</span>
              </div>

              <div className="space-y-4 font-mono text-xs text-slate-200">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
                  <div className="text-slate-400">&gt; compiling backend endpoints...</div>
                  <div className="text-[#00f5a0] font-bold">✔ Django Class-Based APIs active</div>
                  <div className="text-white">SLA Uptime: <span className="text-[#00f5a0] font-bold">99.9%</span></div>
                  <div className="text-white">API Latency: <span className="text-[#00b87c] font-bold">24ms</span></div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div className="text-xs text-slate-400 uppercase font-bold">Enterprise Apps</div>
                    <div className="text-xl font-black text-white mt-1">10,000+ Users</div>
                  </div>
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div className="text-xs text-slate-400 uppercase font-bold">Verification</div>
                    <div className="text-xl font-black text-[#00f5a0] mt-1">Meta Verified</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. COMPLETE DIGITAL SOLUTIONS UNDER ONE ROOF (WHITE BACKGROUND SECTION) */}
      <section className="py-24 bg-white border-b border-slate-200" id="services">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto flex flex-col gap-3 mb-16">
            <span className="inline-flex items-center gap-2 justify-center text-xs font-extrabold text-[#008f60] uppercase tracking-widest bg-[#e6f9f3] px-4 py-1.5 rounded-full border border-[#00b87c]/30 self-center">
              Our Core Engineering
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-950 tracking-tight">
              Complete <span className="text-[#00b87c]">Digital Solutions</span> Under One Roof
            </h2>
            <p className="text-slate-700 text-base md:text-lg font-medium leading-relaxed">
              From custom software engineering to AI automation and mobile apps, we deliver solutions that drive real business growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1: Custom Software */}
            <div className="bg-white border border-slate-300 rounded-3xl p-8 card-light-hover flex flex-col justify-between">
              <div className="flex flex-col gap-4">
                <div className="w-14 h-14 bg-[#e6f9f3] text-[#008f60] rounded-2xl flex items-center justify-center text-2xl font-bold border border-[#00b87c]/30">
                  ⚙️
                </div>
                <h3 className="text-2xl font-black text-slate-950">Custom Software Development</h3>
                <p className="text-slate-700 text-sm leading-relaxed font-medium">
                  Tailor-made software architectures, enterprise ERP, CRM, and bespoke billing engines built to automate your operations.
                </p>
                <ul className="space-y-2.5 text-xs text-slate-800 font-semibold pt-3 border-t border-slate-200">
                  <li className="flex items-center gap-2"><span className="text-[#00b87c] font-black text-sm">✔</span> Legacy System Modernization</li>
                  <li className="flex items-center gap-2"><span className="text-[#00b87c] font-black text-sm">✔</span> Enterprise ERP & CRM Modules</li>
                  <li className="flex items-center gap-2"><span className="text-[#00b87c] font-black text-sm">✔</span> Custom Billing & Invoicing Systems</li>
                </ul>
              </div>
              <Link href="/services/custom-software-development" className="mt-6 inline-flex text-xs font-extrabold text-[#008f60] hover:text-[#00b87c] hover:underline uppercase tracking-wider">
                Explore Solution &rarr;
              </Link>
            </div>

            {/* Card 2: AI & ML Automation */}
            <div className="bg-white border border-slate-300 rounded-3xl p-8 card-light-hover flex flex-col justify-between">
              <div className="flex flex-col gap-4">
                <div className="w-14 h-14 bg-[#e6f9f3] text-[#008f60] rounded-2xl flex items-center justify-center text-2xl font-bold border border-[#00b87c]/30">
                  🤖
                </div>
                <h3 className="text-2xl font-black text-slate-950">AI Tools & Neural Automation</h3>
                <p className="text-slate-700 text-sm leading-relaxed font-medium">
                  Neural automation, RAG support bots, predictive analytics, and customized generative AI tools designed for your data.
                </p>
                <ul className="space-y-2.5 text-xs text-slate-800 font-semibold pt-3 border-t border-slate-200">
                  <li className="flex items-center gap-2"><span className="text-[#00b87c] font-black text-sm">✔</span> Private Generative AI & LLMs</li>
                  <li className="flex items-center gap-2"><span className="text-[#00b87c] font-black text-sm">✔</span> RAG Customer Support Chatbots</li>
                  <li className="flex items-center gap-2"><span className="text-[#00b87c] font-black text-sm">✔</span> Document Data OCR Extraction</li>
                </ul>
              </div>
              <Link href="/services/ai-ml-automation" className="mt-6 inline-flex text-xs font-extrabold text-[#008f60] hover:text-[#00b87c] hover:underline uppercase tracking-wider">
                Explore Solution &rarr;
              </Link>
            </div>

            {/* Card 3: Mobile Apps */}
            <div className="bg-white border border-slate-300 rounded-3xl p-8 card-light-hover flex flex-col justify-between">
              <div className="flex flex-col gap-4">
                <div className="w-14 h-14 bg-[#e6f9f3] text-[#008f60] rounded-2xl flex items-center justify-center text-2xl font-bold border border-[#00b87c]/30">
                  📱
                </div>
                <h3 className="text-2xl font-black text-slate-950">Mobile App Development</h3>
                <p className="text-slate-700 text-sm leading-relaxed font-medium">
                  Premium cross-platform and native iOS & Android applications featuring offline synchronization, animations, and geofencing.
                </p>
                <ul className="space-y-2.5 text-xs text-slate-800 font-semibold pt-3 border-t border-slate-200">
                  <li className="flex items-center gap-2"><span className="text-[#00b87c] font-black text-sm">✔</span> Flutter & React Native Cross-Platform</li>
                  <li className="flex items-center gap-2"><span className="text-[#00b87c] font-black text-sm">✔</span> Native Swift (iOS) & Kotlin (Android)</li>
                  <li className="flex items-center gap-2"><span className="text-[#00b87c] font-black text-sm">✔</span> Offline-First Synchronization</li>
                </ul>
              </div>
              <Link href="/services/mobile-app-development" className="mt-6 inline-flex text-xs font-extrabold text-[#008f60] hover:text-[#00b87c] hover:underline uppercase tracking-wider">
                Explore Solution &rarr;
              </Link>
            </div>

            {/* Card 4: Performance Marketing */}
            <div className="bg-white border border-slate-300 rounded-3xl p-8 card-light-hover flex flex-col justify-between">
              <div className="flex flex-col gap-4">
                <div className="w-14 h-14 bg-[#e6f9f3] text-[#008f60] rounded-2xl flex items-center justify-center text-2xl font-bold border border-[#00b87c]/30">
                  🎯
                </div>
                <h3 className="text-2xl font-black text-slate-950">Performance Marketing</h3>
                <p className="text-slate-700 text-sm leading-relaxed font-medium">
                  Note: NOT a simple social media posting company. We specialize strictly in performance PPC ad campaigns, search engine dominance, and ROAS.
                </p>
                <ul className="space-y-2.5 text-xs text-slate-800 font-semibold pt-3 border-t border-slate-200">
                  <li className="flex items-center gap-2"><span className="text-[#00b87c] font-black text-sm">✔</span> High-Intent Google Search PPC Ads</li>
                  <li className="flex items-center gap-2"><span className="text-[#00b87c] font-black text-sm">✔</span> Meta Retargeting Sales Funnels</li>
                  <li className="flex items-center gap-2"><span className="text-[#00b87c] font-black text-sm">✔</span> Core Web Vitals 99+ Speed Tuning</li>
                </ul>
              </div>
              <Link href="/services/performance-marketing-analytics" className="mt-6 inline-flex text-xs font-extrabold text-[#008f60] hover:text-[#00b87c] hover:underline uppercase tracking-wider">
                Explore Solution &rarr;
              </Link>
            </div>

            {/* Card 5: WhatsApp Business API */}
            <div className="bg-white border border-slate-300 rounded-3xl p-8 card-light-hover flex flex-col justify-between">
              <div className="flex flex-col gap-4">
                <div className="w-14 h-14 bg-[#e6f9f3] text-[#008f60] rounded-2xl flex items-center justify-center text-2xl font-bold border border-[#00b87c]/30">
                  💬
                </div>
                <h3 className="text-2xl font-black text-slate-950">WhatsApp API Marketing</h3>
                <p className="text-slate-700 text-sm leading-relaxed font-medium">
                  Official Meta verified WhatsApp Business API integration. Send automated transaction alerts, shipping links, and marketing broadcasts.
                </p>
                <ul className="space-y-2.5 text-xs text-slate-800 font-semibold pt-3 border-t border-slate-200">
                  <li className="flex items-center gap-2"><span className="text-[#00b87c] font-black text-sm">✔</span> Official Meta Green Badge Verification</li>
                  <li className="flex items-center gap-2"><span className="text-[#00b87c] font-black text-sm">✔</span> Automated Transaction & Invoice Alerts</li>
                  <li className="flex items-center gap-2"><span className="text-[#00b87c] font-black text-sm">✔</span> Interactive Flow Chatbot Buttons</li>
                </ul>
              </div>
              <Link href="/services/whatsapp-business-api-marketing" className="mt-6 inline-flex text-xs font-extrabold text-[#008f60] hover:text-[#00b87c] hover:underline uppercase tracking-wider">
                Explore Solution &rarr;
              </Link>
            </div>

            {/* Card 6: RCS Messaging */}
            <div className="bg-white border border-slate-300 rounded-3xl p-8 card-light-hover flex flex-col justify-between">
              <div className="flex flex-col gap-4">
                <div className="w-14 h-14 bg-[#e6f9f3] text-[#008f60] rounded-2xl flex items-center justify-center text-2xl font-bold border border-[#00b87c]/30">
                  ✉️
                </div>
                <h3 className="text-2xl font-black text-slate-950">RCS Messaging & Automation</h3>
                <p className="text-slate-700 text-sm leading-relaxed font-medium">
                  Upgrade SMS to rich interactive conversations with product carousels, action buttons, and verified sender logos.
                </p>
                <ul className="space-y-2.5 text-xs text-slate-800 font-semibold pt-3 border-t border-slate-200">
                  <li className="flex items-center gap-2"><span className="text-[#00b87c] font-black text-sm">✔</span> Verified Sender Inbox Profiles</li>
                  <li className="flex items-center gap-2"><span className="text-[#00b87c] font-black text-sm">✔</span> Rich Product Image Carousels</li>
                  <li className="flex items-center gap-2"><span className="text-[#00b87c] font-black text-sm">✔</span> Real-Time Delivery & Read Receipts</li>
                </ul>
              </div>
              <Link href="/services/rcs-messaging-automation" className="mt-6 inline-flex text-xs font-extrabold text-[#008f60] hover:text-[#00b87c] hover:underline uppercase tracking-wider">
                Explore Solution &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ENGINEERING DEVELOPMENT ROADMAP (DARK CYBER NAVY WITH STARS BACKGROUND) */}
      <section className="py-24 bg-[#070d19] text-white relative overflow-hidden" id="roadmap">
        {/* Interactive Stars Background Canvas */}
        <StarsBackground />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto flex flex-col gap-3 mb-16">
            <span className="inline-flex items-center gap-2 justify-center text-xs font-extrabold text-[#00f5a0] uppercase tracking-widest bg-[#00b87c]/20 px-4 py-1.5 rounded-full border border-[#00b87c]/40 self-center">
              ⚡ Interactive Cyber Universe Journey
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
              Our Engineering <span className="text-[#00b87c]">Development Roadmap</span>
            </h2>
            <p className="text-slate-200 text-base md:text-lg font-medium leading-relaxed">
              Experience our alternating Zig-Zag methodology through the particle cyber universe.
            </p>
          </div>

          <div className="relative border-l-2 border-[#00b87c]/40 ml-4 md:ml-0 md:grid md:grid-cols-9 md:gap-4 md:border-none space-y-12 md:space-y-0">
            {/* Desktop Center Vertical Line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#00b87c] via-[#00f5a0] to-[#00b87c] -translate-x-1/2"></div>

            {/* STEP 01 (LEFT) */}
            <div className="md:contents">
              <div className="relative pl-8 md:pl-0 md:col-span-4 zigzag-card-dark px-8 md:px-10 py-7 rounded-2xl">
                <span className="absolute -left-4 md:left-auto md:right-0 md:translate-x-1/2 w-8 h-8 rounded-full bg-[#00b87c] border-4 border-[#070d19] z-10 flex items-center justify-center text-xs font-black text-white font-mono shadow-lg shadow-[#00b87c]/50">
                  01
                </span>
                <span className="inline-block bg-[#00b87c]/20 text-[#00f5a0] text-xs font-extrabold uppercase tracking-wider px-3 py-0.5 rounded-full mb-2">DAYS 1 - 3</span>
                <h3 className="text-xl font-black text-white mb-2">AI Discovery & Requirement Scope</h3>
                <p className="text-xs text-slate-200 leading-relaxed font-medium mb-3">
                  Deep technical analysis, architecture mapping, SRS documentation, and milestone planning with client team.
                </p>
                <div className="text-xs text-[#00f5a0] font-mono font-bold flex items-center gap-1">
                  💻 System Blueprint Completed
                </div>
              </div>
              <div className="hidden md:block md:col-span-1"></div>
              <div className="hidden md:block md:col-span-4"></div>
            </div>

            {/* STEP 02 (RIGHT) */}
            <div className="md:contents">
              <div className="hidden md:block md:col-span-4"></div>
              <div className="hidden md:block md:col-span-1"></div>
              <div className="relative pl-8 md:pl-0 md:col-span-4 zigzag-card-dark px-8 md:px-10 py-7 rounded-2xl">
                <span className="absolute -left-4 md:left-0 md:-translate-x-1/2 w-8 h-8 rounded-full bg-[#00b87c] border-4 border-[#070d19] z-10 flex items-center justify-center text-xs font-black text-white font-mono shadow-lg shadow-[#00b87c]/50">
                  02
                </span>
                <span className="inline-block bg-[#00b87c]/20 text-[#00f5a0] text-xs font-extrabold uppercase tracking-wider px-3 py-0.5 rounded-full mb-2">DAYS 4 - 10</span>
                <h3 className="text-xl font-black text-white mb-2">UI/UX Prototyping & Design</h3>
                <p className="text-xs text-slate-200 leading-relaxed font-medium mb-3">
                  Interactive wireframing, component design systems, and responsive user journey prototypes in Figma.
                </p>
                <div className="text-xs text-[#00f5a0] font-mono font-bold flex items-center gap-1">
                  🎨 Figma Prototype Approved
                </div>
              </div>
            </div>

            {/* STEP 03 (LEFT) */}
            <div className="md:contents">
              <div className="relative pl-8 md:pl-0 md:col-span-4 zigzag-card-dark px-8 md:px-10 py-7 rounded-2xl">
                <span className="absolute -left-4 md:left-auto md:right-0 md:translate-x-1/2 w-8 h-8 rounded-full bg-[#00b87c] border-4 border-[#070d19] z-10 flex items-center justify-center text-xs font-black text-white font-mono shadow-lg shadow-[#00b87c]/50">
                  03
                </span>
                <span className="inline-block bg-[#00b87c]/20 text-[#00f5a0] text-xs font-extrabold uppercase tracking-wider px-3 py-0.5 rounded-full mb-2">DAYS 11 - 25</span>
                <h3 className="text-xl font-black text-white mb-2">Agile Code Sprint & Cloud Setup</h3>
                <p className="text-xs text-slate-200 leading-relaxed font-medium mb-3">
                  Modular backend API construction, Next.js frontend component assembly, database optimization, and CI/CD pipelines.
                </p>
                <div className="text-xs text-[#00f5a0] font-mono font-bold flex items-center gap-1">
                  ⚡ Agile Production Sprints
                </div>
              </div>
              <div className="hidden md:block md:col-span-1"></div>
              <div className="hidden md:block md:col-span-4"></div>
            </div>

            {/* STEP 04 (RIGHT) */}
            <div className="md:contents">
              <div className="hidden md:block md:col-span-4"></div>
              <div className="hidden md:block md:col-span-1"></div>
              <div className="relative pl-8 md:pl-0 md:col-span-4 zigzag-card-dark px-8 md:px-10 py-7 rounded-2xl">
                <span className="absolute -left-4 md:left-0 md:-translate-x-1/2 w-8 h-8 rounded-full bg-[#00b87c] border-4 border-[#070d19] z-10 flex items-center justify-center text-xs font-black text-white font-mono shadow-lg shadow-[#00b87c]/50">
                  04
                </span>
                <span className="inline-block bg-[#00b87c]/20 text-[#00f5a0] text-xs font-extrabold uppercase tracking-wider px-3 py-0.5 rounded-full mb-2">DAYS 26 - 30</span>
                <h3 className="text-xl font-black text-white mb-2">QA Audit & Penetration Testing</h3>
                <p className="text-xs text-slate-200 leading-relaxed font-medium mb-3">
                  Comprehensive vulnerability testing, load balancing checks, cross-device responsiveness, and speed tuning.
                </p>
                <div className="text-xs text-[#00f5a0] font-mono font-bold flex items-center gap-1">
                  🛡️ Security Audit Passed
                </div>
              </div>
            </div>

            {/* STEP 05 (LEFT) */}
            <div className="md:contents">
              <div className="relative pl-8 md:pl-0 md:col-span-4 zigzag-card-dark px-8 md:px-10 py-7 rounded-2xl">
                <span className="absolute -left-4 md:left-auto md:right-0 md:translate-x-1/2 w-8 h-8 rounded-full bg-[#00b87c] border-4 border-[#070d19] z-10 flex items-center justify-center text-xs font-black text-white font-mono shadow-lg shadow-[#00b87c]/50">
                  05
                </span>
                <span className="inline-block bg-[#00b87c]/20 text-[#00f5a0] text-xs font-extrabold uppercase tracking-wider px-3 py-0.5 rounded-full mb-2">ONGOING SLA</span>
                <h3 className="text-xl font-black text-white mb-2">Deployment & 24/7 Support</h3>
                <p className="text-xs text-slate-200 leading-relaxed font-medium mb-3">
                  Zero-downtime server release with continuous monitoring, automated backups, and 24/7 SLA maintenance.
                </p>
                <div className="text-xs text-[#00f5a0] font-mono font-bold flex items-center gap-1">
                  📞 Live System Monitoring
                </div>
              </div>
              <div className="hidden md:block md:col-span-1"></div>
              <div className="hidden md:block md:col-span-4"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TECHNOLOGIES WE WORK WITH */}
      <section className="py-24 bg-slate-100 border-b border-slate-300" id="technologies">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto flex flex-col gap-3 mb-16">
            <span className="inline-flex items-center gap-2 justify-center text-xs font-extrabold text-[#008f60] uppercase tracking-widest bg-[#e6f9f3] px-4 py-1.5 rounded-full border border-[#00b87c]/30 self-center">
              Technologies We Work With
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-950 tracking-tight">
              Our Modern <span className="text-[#00b87c]">Technology Stack</span>
            </h2>
            <p className="text-slate-700 text-base md:text-lg font-medium leading-relaxed">
              We leverage production-proven tools and scalable languages to ensure fast response parameters and clean application state.
            </p>
          </div>

          {/* Tab Categories */}
          <div className="flex flex-wrap justify-center gap-2.5 mb-12">
            {Object.keys(techStack).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-6 py-2.5 rounded-full font-extrabold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === cat
                    ? "bg-[#00b87c] text-white shadow-md shadow-[#00b87c]/30"
                    : "bg-white border border-slate-300 text-slate-900 hover:border-[#00b87c]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Tab Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
            {techStack[activeTab].map((tech) => (
              <div
                key={tech.name}
                className="bg-white border border-slate-300 rounded-2xl p-6 flex flex-col gap-3 card-light-hover"
              >
                <span className="text-xs font-mono text-[#008f60] uppercase font-bold">{tech.category}</span>
                <h4 className="text-xl font-black text-slate-950">{tech.name}</h4>
                <p className="text-xs text-slate-700 font-medium leading-relaxed">{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-6 w-full py-16">
        <div className="w-full bg-gradient-to-r from-[#070d19] via-[#0b172a] to-[#070d19] border border-[#00b87c]/40 rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 text-white shadow-2xl relative overflow-hidden">
          <div className="flex flex-col gap-3 max-w-2xl relative z-10">
            <span className="text-xs font-extrabold text-[#00f5a0] uppercase tracking-widest">
              Ready to automate?
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
              Let&apos;s build your software blueprint today
            </h2>
            <p className="text-slate-200 text-sm md:text-base font-medium leading-relaxed">
              Schedule a technical consulting call with our solutions architects or book a live product demo to review our customized portals.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 relative z-10 w-full sm:w-auto">
            <button
              onClick={() => handleOpenModal("demo")}
              className="px-8 py-3.5 bg-[#00b87c] hover:bg-[#008f60] text-white rounded-full font-extrabold transition-all text-center cursor-pointer shadow-lg shadow-[#00b87c]/30 text-sm tracking-wide"
            >
              Get A Free Quote
            </button>
            <button
              onClick={() => handleOpenModal("call")}
              className="px-8 py-3.5 bg-white/10 hover:bg-white/20 border border-white/30 text-white rounded-full font-extrabold transition-all text-center cursor-pointer text-sm tracking-wide"
            >
              Schedule a Call
            </button>
          </div>
        </div>
      </section>

      {/* Embedded Demo Modal */}
      <DemoModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialType={modalType}
      />
    </div>
  );
}
