"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import DemoModal from "@/components/DemoModal";

export default function Home() {
  const [activeTab, setActiveTab] = useState("Frontend");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("demo");
  const [heroSlide, setHeroSlide] = useState(0);

  const heroSlides = [
    {
      tag: "Best Software Agency",
      title: "Custom Software & AI Automation Solutions",
      desc: "We build scalable custom software solutions, enterprise CRM/ERP cloud platforms, mobile applications, and Generative AI tools to automate your operations.",
    },
    {
      tag: "High ROI Channels",
      title: "Performance Marketing & Acquisition Systems",
      desc: "Note: We are not a social media posting agency. We build performance ad funnels, search engine domination strategies, and conversion analytics to scale your revenue.",
    },
    {
      tag: "Verified Integrations",
      title: "WhatsApp API & RCS Messaging Engines",
      desc: "Scale customer support and broadcasts with up to 98% open rates directly in WhatsApp and native mobile messaging dialers.",
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const handleOpenModal = (type) => {
    setModalType(type);
    setModalOpen(true);
  };

  const techStack = {
    Frontend: [
      { name: "Next.js", desc: "For Server-Side Rendering and high-speed web apps" },
      { name: "React", desc: "For interactive, modular clientside component builds" },
      { name: "Tailwind CSS", desc: "For highly custom responsive styles" },
      { name: "TypeScript", desc: "For compile-time type-safety" },
    ],
    Backend: [
      { name: "Django", desc: "For bulletproof authentication & safe ORM logic" },
      { name: "Python", desc: "For scalable machine learning and server logic" },
      { name: "FastAPI", desc: "For asynchronous, high-throughput microservice endpoints" },
      { name: "Node.js", desc: "For fast backend API systems" },
    ],
    Mobile: [
      { name: "Flutter", desc: "For swift cross-platform layouts on iOS & Android" },
      { name: "React Native", desc: "For React-driven cross-platform applications" },
      { name: "Swift", desc: "For memory-critical native iOS application code" },
      { name: "Kotlin", desc: "For native Android features and SDKs" },
    ],
    "Cloud & DevOps": [
      { name: "PostgreSQL", desc: "For relational business data structures" },
      { name: "AWS", desc: "For highly available cloud migrations" },
      { name: "Docker", desc: "For isolated container environments" },
      { name: "Kubernetes", desc: "For container orchestration at scale" },
    ],
    "AI & Data": [
      { name: "PyTorch", desc: "For neural networks and model development" },
      { name: "TensorFlow", desc: "For large-scale deep learning models" },
      { name: "OpenAI API", "desc": "For custom Generative AI agents" },
      { name: "Pandas", desc: "For processing high-volume analytical sheets" },
    ],
  };

  return (
    <div className="flex flex-col gap-24">
      {/* 1. FUTURISTIC HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center max-w-7xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 self-start bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 text-xs text-primary font-medium tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              {heroSlides[heroSlide].tag}
            </div>

            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight transition-all duration-500">
              {heroSlides[heroSlide].title.split(" & ").map((word, i) => (
                <span key={i}>
                  {i > 0 && " & "}
                  {word === "AI Automation" || word === "Acquisition Systems" || word === "RCS Messaging Engines" ? (
                    <span className="text-primary text-transparent bg-clip-text bg-gradient-to-r from-primary to-rose-500">{word}</span>
                  ) : (
                    word
                  )}
                </span>
              ))}
            </h1>

            <p className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-2xl transition-all duration-500">
              {heroSlides[heroSlide].desc}
            </p>

            <div className="flex flex-wrap gap-4 mt-2">
              <button
                onClick={() => handleOpenModal("demo")}
                className="px-8 py-3 bg-primary hover:bg-primary-hover text-white rounded-full font-bold transition-all shadow-lg shadow-primary/25 hover:shadow-primary/45 cursor-pointer text-sm"
              >
                Book a Demo
              </button>
              <button
                onClick={() => handleOpenModal("call")}
                className="px-8 py-3 border border-zinc-800 hover:border-zinc-500 text-zinc-300 rounded-full font-semibold transition-all cursor-pointer text-sm"
              >
                Schedule a Call
              </button>
            </div>

            {/* Quick Hero Tabs */}
            <div className="flex gap-2 border-t border-white/5 pt-6 mt-4">
              {heroSlides.map((slide, index) => (
                <button
                  key={index}
                  onClick={() => setHeroSlide(index)}
                  className={`flex-1 text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                    heroSlide === index
                      ? "bg-zinc-900 border-primary/30 text-white"
                      : "bg-transparent border-transparent text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  <div className="text-xs font-bold uppercase tracking-wider mb-1">0{index + 1}</div>
                  <div className="text-xs font-semibold truncate">{slide.tag}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Hero Right Visual (Mockup Compilation Card) */}
          <div className="lg:col-span-5 relative w-full">
            <div className="w-full glassmorphism rounded-2xl p-6 relative shadow-2xl border-white/5 overflow-hidden">
              {/* Card Window Bar */}
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <div className="text-[10px] font-mono text-zinc-500">Core_Processor_v4.ai</div>
                <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></div>
              </div>

              {/* Code Metrics */}
              <div className="space-y-4 font-mono text-xs text-zinc-400">
                <div className="bg-zinc-950 p-4 rounded-xl border border-white/5 space-y-1">
                  <div className="text-zinc-600">&gt; npm run start:analytics</div>
                  <div className="text-green-400">✔ Loaded SLA cloud configurations successfully.</div>
                  <div className="text-white">Cloud SLA Uptime: <span className="text-accent">99.99%</span></div>
                  <div className="text-white">API Response Latency: <span className="text-primary">24ms</span></div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-zinc-950 p-4 rounded-xl border border-white/5">
                    <div className="text-zinc-500 uppercase text-[9px] tracking-wider mb-1">Delivered Products</div>
                    <div className="text-2xl font-bold text-white">100+</div>
                  </div>
                  <div className="bg-zinc-950 p-4 rounded-xl border border-white/5">
                    <div className="text-zinc-500 uppercase text-[9px] tracking-wider mb-1">Active Tech Stack</div>
                    <div className="text-2xl font-bold text-white">20+ Tools</div>
                  </div>
                </div>

                <div className="bg-zinc-950 p-4 rounded-xl border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse"></span>
                    <span className="text-[10px] text-zinc-300 font-semibold uppercase">WhatsApp Gateway</span>
                  </div>
                  <span className="text-[10px] bg-accent/10 text-accent px-2 py-0.5 rounded-full">ACTIVE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PERFORMANCE MARKETING & ROI GROWTH HUB */}
      <section className="bg-zinc-950/40 border-y border-white/5 py-24 w-full">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto flex flex-col gap-4 mb-16">
            <span className="text-xs font-semibold text-primary uppercase tracking-widest">
              ⚡ ROI-Focused Marketing
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
              Scaling Online Visibility & Customer Leads
            </h2>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
              We fuse technical search engine optimization, laser-targeted ad campaigns, and detailed user analytics. <span className="text-primary font-semibold">Note: We are not a social media management agency.</span> We build performance funnels designed strictly to convert traffic into sales.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Audits & SEO */}
            <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6 flex flex-col gap-4 glow-card transition-all">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center text-xl font-bold">
                🔎
              </div>
              <h3 className="text-lg font-bold text-white">Search Engine Optimization</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Technical core vitals optimization, JSON-LD Schema integration, and intent-focused keywords to secure page-one search ranks.
              </p>
              <ul className="text-xs text-zinc-500 space-y-1 mt-2">
                <li>• Technical Site Speed Audits</li>
                <li>• Schema & Rich Snippets Setup</li>
                <li>• Keyword Intent Analytics</li>
              </ul>
            </div>

            {/* Performance Ads */}
            <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6 flex flex-col gap-4 glow-card transition-all">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center text-xl font-bold">
                🎯
              </div>
              <h3 className="text-lg font-bold text-white">Performance Ads</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Laser-targeted Google Search ads and Meta retargeting campaigns optimized to secure maximum customer acquisition.
              </p>
              <ul className="text-xs text-zinc-500 space-y-1 mt-2">
                <li>• High-Intent Search Ads</li>
                <li>• Meta Retargeting funnels</li>
                <li>• Bid Optimization strategy</li>
              </ul>
            </div>

            {/* Analytics & GA4 */}
            <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6 flex flex-col gap-4 glow-card transition-all">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center text-xl font-bold">
                📈
              </div>
              <h3 className="text-lg font-bold text-white">Analytics & Conversion</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Setup detailed Google Analytics 4 tracks, scroll heatmaps, and funnel dropoff charts to convert viewers into clients.
              </p>
              <ul className="text-xs text-zinc-500 space-y-1 mt-2">
                <li>• GA4 Custom Event Setup</li>
                <li>• Heatmaps & User Session logs</li>
                <li>• Landing page A/B splits</li>
              </ul>
            </div>

            {/* Messaging channels */}
            <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6 flex flex-col gap-4 glow-card transition-all">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center text-xl font-bold">
                💬
              </div>
              <h3 className="text-lg font-bold text-white">WhatsApp & RCS Engines</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Verified API setups sending rich interactive carousels and reply buttons directly to customers with up to 98% open rates.
              </p>
              <ul className="text-xs text-zinc-500 space-y-1 mt-2">
                <li>• Official API Verifications</li>
                <li>• Rich Carousel broadcasts</li>
                <li>• Quick Action Reply Buttons</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ZIG-ZAG DEVELOPMENT ROADMAP */}
      <section className="max-w-7xl mx-auto px-6 w-full">
        <div className="text-center max-w-3xl mx-auto flex flex-col gap-4 mb-16">
          <span className="text-xs font-semibold text-primary uppercase tracking-widest">
            ⚡ Structured Engineering
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Our Agile Engineering Timeline
          </h2>
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
            We follow a milestone-based zig-zag methodology to take your software solution from initial code blueprints to secure production release.
          </p>
        </div>

        <div className="relative border-l border-zinc-800 ml-4 md:ml-0 md:grid md:grid-cols-9 md:gap-4 md:border-none space-y-12 md:space-y-0">
          {/* Line for desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-zinc-800 -translate-x-1/2"></div>

          {/* Node 1: Left */}
          <div className="md:contents">
            <div className="relative pl-8 md:pl-0 md:col-span-4 bg-zinc-950/20 border border-white/5 p-6 rounded-2xl hover:border-primary/20 transition-all">
              <span className="absolute -left-3.5 md:left-auto md:right-0 md:translate-x-1/2 w-7 h-7 rounded-full bg-primary border-4 border-background z-10 flex items-center justify-center text-[10px] font-bold text-white font-mono">
                01
              </span>
              <div className="text-xs font-bold text-primary mb-1">DAYS 1 - 3</div>
              <h4 className="text-base font-bold text-white mb-2">Requirement Scope & Architecture</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                System blueprints, PostgreSQL database schema designs, REST API mappings, and milestone timelines.
              </p>
            </div>
            <div className="hidden md:block md:col-span-1"></div>
            <div className="hidden md:block md:col-span-4"></div>
          </div>

          {/* Node 2: Right */}
          <div className="md:contents">
            <div className="hidden md:block md:col-span-4"></div>
            <div className="hidden md:block md:col-span-1"></div>
            <div className="relative pl-8 md:pl-0 md:col-span-4 bg-zinc-950/20 border border-white/5 p-6 rounded-2xl hover:border-primary/20 transition-all">
              <span className="absolute -left-3.5 md:left-0 md:-translate-x-1/2 w-7 h-7 rounded-full bg-zinc-800 border-4 border-background z-10 flex items-center justify-center text-[10px] font-bold text-white font-mono">
                02
              </span>
              <div className="text-xs font-bold text-primary mb-1">DAYS 4 - 8</div>
              <h4 className="text-base font-bold text-white mb-2">UI/UX Component Design</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Designing interactive wireframes, component design systems, and responsive user flows in Figma.
              </p>
            </div>
          </div>

          {/* Node 3: Left */}
          <div className="md:contents">
            <div className="relative pl-8 md:pl-0 md:col-span-4 bg-zinc-950/20 border border-white/5 p-6 rounded-2xl hover:border-primary/20 transition-all">
              <span className="absolute -left-3.5 md:left-auto md:right-0 md:translate-x-1/2 w-7 h-7 rounded-full bg-zinc-800 border-4 border-background z-10 flex items-center justify-center text-[10px] font-bold text-white font-mono">
                03
              </span>
              <div className="text-xs font-bold text-primary mb-1">DAYS 9 - 22</div>
              <h4 className="text-base font-bold text-white mb-2">Code Sprints & Backend Integration</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Django Class-Based view setups, frontend Next.js routing assemblies, and external API mappings.
              </p>
            </div>
            <div className="hidden md:block md:col-span-1"></div>
            <div className="hidden md:block md:col-span-4"></div>
          </div>

          {/* Node 4: Right */}
          <div className="md:contents">
            <div className="hidden md:block md:col-span-4"></div>
            <div className="hidden md:block md:col-span-1"></div>
            <div className="relative pl-8 md:pl-0 md:col-span-4 bg-zinc-950/20 border border-white/5 p-6 rounded-2xl hover:border-primary/20 transition-all">
              <span className="absolute -left-3.5 md:left-0 md:-translate-x-1/2 w-7 h-7 rounded-full bg-zinc-800 border-4 border-background z-10 flex items-center justify-center text-[10px] font-bold text-white font-mono">
                04
              </span>
              <div className="text-xs font-bold text-primary mb-1">DAYS 23 - 26</div>
              <h4 className="text-base font-bold text-white mb-2">Speed Tuning & QA Audits</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Accessibility checks, security penetrations, cross-browser compatibility, and speed optimization audits.
              </p>
            </div>
          </div>

          {/* Node 5: Left */}
          <div className="md:contents">
            <div className="relative pl-8 md:pl-0 md:col-span-4 bg-zinc-950/20 border border-white/5 p-6 rounded-2xl hover:border-primary/20 transition-all">
              <span className="absolute -left-3.5 md:left-auto md:right-0 md:translate-x-1/2 w-7 h-7 rounded-full bg-zinc-800 border-4 border-background z-10 flex items-center justify-center text-[10px] font-bold text-white font-mono">
                05
              </span>
              <div className="text-xs font-bold text-primary mb-1">ONGOING</div>
              <h4 className="text-base font-bold text-white mb-2">Cloud Release & 24/7 Support</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Zero-downtime server migrations with scheduled backups, health audits, and 24/7 SLA maintenance.
              </p>
            </div>
            <div className="hidden md:block md:col-span-1"></div>
            <div className="hidden md:block md:col-span-4"></div>
          </div>
        </div>
      </section>

      {/* 4. IRIS SOFTWARE-STYLE TABBED TECH STACK SHOWCASE */}
      <section className="bg-zinc-950/40 border-y border-white/5 py-24 w-full" id="technologies">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto flex flex-col gap-4 mb-16">
            <span className="text-xs font-semibold text-primary uppercase tracking-widest">
              ⚡ Tools & Technologies
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
              Our Modern Technology Stack
            </h2>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
              We leverage production-proven tools and scalable languages to ensure fast response parameters and clean application state.
            </p>
          </div>

          {/* Tab buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {Object.keys(techStack).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all cursor-pointer ${
                  activeTab === cat
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : "bg-zinc-900 border border-white/5 text-zinc-400 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Tab content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
            {techStack[activeTab].map((tech) => (
              <div
                key={tech.name}
                className="bg-zinc-900/60 border border-white/5 rounded-2xl p-6 flex flex-col gap-3 hover:border-primary/20 transition-colors"
              >
                <div className="font-mono text-zinc-500 text-xs">Category: {activeTab}</div>
                <h4 className="text-lg font-bold text-white">{tech.name}</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-6 w-full mb-12">
        <div className="w-full bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl">
          {/* Subtle Background Glows */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl"></div>

          <div className="flex flex-col gap-4 relative z-10 max-w-2xl">
            <span className="text-xs font-semibold text-primary uppercase tracking-widest">
              Ready to automate?
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Let&apos;s build your software blueprint today
            </h2>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
              Schedule a technical consulting call with our solutions architects or book a live product demo to review our customized portals.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 relative z-10 w-full sm:w-auto">
            <button
              onClick={() => handleOpenModal("demo")}
              className="px-8 py-3.5 bg-primary hover:bg-primary-hover text-white rounded-full font-bold transition-all text-center cursor-pointer shadow-lg shadow-primary/20 text-sm"
            >
              Book a Demo
            </button>
            <button
              onClick={() => handleOpenModal("call")}
              className="px-8 py-3.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-full font-bold transition-all text-center cursor-pointer text-sm"
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
