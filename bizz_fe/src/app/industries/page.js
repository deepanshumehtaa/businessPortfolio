"use client";

import Link from "next/link";

export default function IndustriesPage() {
  const industries = [
    {
      title: "Fintech & Banking Solutions",
      desc: "Custom automated processing engines, transaction pipelines, compliance trackers, risk management engines, and high-volume billing systems. (Note: No cryptocurrency or blockchain products).",
      icon: "🏦",
      solutions: ["Automated processing", "Risk analysis", "Custom invoicing"]
    },
    {
      title: "Logistics & Supply Chain",
      desc: "Real-time geofenced asset tracking, dynamic route optimizations, warehouse inventory managers, automated SMS/WhatsApp delivery updates, and driver logs.",
      icon: "🚛",
      solutions: ["Geofenced maps", "Auto tracking", "Route optimizing"]
    },
    {
      title: "Retail & E-Commerce",
      desc: "Custom multi-tenant storefront platforms, Stripe/PayPal transaction APIs, metered subscription controllers, automated abandoned checkout reminders on WhatsApp, and inventory APIs.",
      icon: "🛍️",
      solutions: ["Multi-tenant shops", "Custom Stripe API", "WhatsApp Alerts"]
    },
    {
      title: "Healthcare & Medtech",
      desc: "Secure patient portals, doctor appointment schedulers, OCR document scanners for medical prescriptions, and automated health follow-up SMS triggers.",
      icon: "🏥",
      solutions: ["Appointment booking", "OCR scanners", "Patient portals"]
    },
    {
      title: "Real Estate & Proptech",
      desc: "Dynamic property databases with search/filter queries, automated landlord-tenant rent invoice systems, and interactive scheduling for site visits.",
      icon: "🏢",
      solutions: ["Property filters", "Automated rent bills", "Booking systems"]
    },
    {
      title: "Edtech & Online Learning",
      desc: "Custom Learning Management Systems (LMS) with secure video streaming, automated grading panels, multi-student dashboard dashboards, and class timetables.",
      icon: "🎓",
      solutions: ["LMS portals", "Timetable managers", "Grading panels"]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 w-full flex flex-col gap-12 py-6">
      <div className="flex flex-col gap-4 max-w-3xl">
        <span className="inline-flex items-center gap-2 self-start text-xs font-extrabold text-[#008f60] uppercase tracking-widest bg-[#e6f9f3] px-4 py-1.5 rounded-full border border-[#00b87c]/30">
          ⚡ Core Verticals
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-slate-950 tracking-tight leading-tight">
          Sectors We <span className="text-[#00b87c]">Transform</span>
        </h1>
        <p className="text-slate-700 text-base md:text-lg font-medium leading-relaxed">
          We construct modular custom software systems tailored for major sectors. We align with corporate rules to deliver compliance-driven tools that integrate with your physical workflows.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {industries.map((ind, index) => (
          <div
            key={index}
            className="bg-white border border-slate-300 rounded-3xl p-8 card-light-hover flex flex-col justify-between gap-4"
          >
            <div className="flex flex-col gap-3">
              <div className="text-4xl">{ind.icon}</div>
              <h2 className="text-2xl font-black text-slate-950 tracking-tight">{ind.title}</h2>
              <p className="text-slate-700 text-sm font-medium leading-relaxed">
                {ind.desc}
              </p>
            </div>
            
            <div className="border-t border-slate-200 pt-4 mt-auto">
              <h4 className="text-[11px] uppercase font-extrabold text-slate-500 tracking-wider mb-2">Key Offerings</h4>
              <div className="flex flex-wrap gap-2">
                {ind.solutions.map((sol, idx) => (
                  <span key={idx} className="text-xs font-bold bg-slate-100 text-slate-900 px-3 py-1 rounded-md border border-slate-300">
                    ✓ {sol}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
