"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import DemoModal from "@/components/DemoModal";

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const staticServices = [
    {
      id: 1,
      title: "Custom Software Development",
      slug: "custom-software-development",
      category: "Software Engineering",
      summary: "Tailor-made software architectures, enterprise ERP, CRM, and bespoke billing engines built to automate your operations.",
      features: ["Legacy Modernization", "Bespoke ERP/CRM", "Multi-tenant SaaS", "Custom Billing Engines"],
    },
    {
      id: 2,
      title: "AI & Machine Learning Automation",
      slug: "ai-ml-automation",
      category: "AI & Automation",
      summary: "Neural automation, intelligent chatbots, predictive analytics, and customized generative AI tools designed to optimize business logic.",
      features: ["Generative AI & LLMs", "Predictive Analytics", "RAG Support Agents", "Computer Vision & OCR"],
    },
    {
      id: 3,
      title: "SaaS Platform Engineering",
      slug: "saas-platform-engineering",
      category: "Software Engineering",
      summary: "Scalable, secure, and multi-tenant SaaS cloud platforms featuring subscriptions, metered usage, and high-speed API backends.",
      features: ["Multi-tenant Databases", "Stripe Metered Billing", "FastAPI/DRF Backends", "OAuth & SSO integration"],
    },
    {
      id: 4,
      title: "Mobile App Development",
      slug: "mobile-app-development",
      category: "Mobile Apps",
      summary: "Premium cross-platform and native iOS & Android applications featuring offline synchronization, animations, and geofencing.",
      features: ["React Native & Flutter", "Native Swift & Kotlin", "Offline Synchronization", "Push Alerts & Geofencing"],
    },
    {
      id: 5,
      title: "Performance Marketing & Analytics",
      slug: "performance-marketing-analytics",
      category: "Marketing Solutions",
      summary: "ROI-focused Google Ads, Meta Ads, and custom analytics setups engineered to maximize acquisition without wasting budget.",
      features: ["Google Search PPC Ads", "Meta Remarketing Funnels", "GA4 Event Architectures", "Landing Page A/B Testing"],
    },
    {
      id: 6,
      title: "WhatsApp Business API Marketing",
      slug: "whatsapp-business-api-marketing",
      category: "Marketing Solutions",
      summary: "Verified business API templates, interactive automated chat buttons, and automated marketing broadcast managers.",
      features: ["Meta API Verification", "Automated Alerts", "Flow Interactive Bots", "Broadcast Campaign Panels"],
    },
    {
      id: 7,
      title: "RCS Messaging & Automation",
      slug: "rcs-messaging-automation",
      category: "Marketing Solutions",
      summary: "Rich Communication Services to send interactive SMS with logos, image carousels, and quick reply actions directly to native dialers.",
      features: ["Branded Inboxes", "Rich Product Carousels", "Quick-Reply Actions", "Read Receipt Analytics"],
    },
  ];

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch("http://localhost:8000/api/services/");
        if (res.ok) {
          const data = await res.json();
          setServices(data);
        } else {
          setServices(staticServices);
        }
      } catch (err) {
        setServices(staticServices);
      } finally {
        setLoading(false);
      }
    }
    fetchServices();
  }, []);

  const handleOpenDemoModal = (service) => {
    setSelectedService(service);
    setModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 w-full flex flex-col gap-12 py-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 max-w-3xl">
        <span className="inline-flex items-center gap-2 self-start text-xs font-extrabold text-[#008f60] uppercase tracking-widest bg-[#e6f9f3] px-4 py-1.5 rounded-full border border-[#00b87c]/30">
          ⚡ Software Engineering Directory
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-slate-950 tracking-tight leading-tight">
          Enterprise <span className="text-[#00b87c]">Software Solutions</span> & Growth Services
        </h1>
        <p className="text-slate-700 text-base md:text-lg font-medium leading-relaxed">
          Explore our suite of tailor-made software solutions, multi-tenant cloud platforms, AI automation systems, and high-conversion acquisition channels built for modern businesses.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-64 bg-slate-200 border border-slate-300 rounded-3xl"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.slug}
              className="bg-white border border-slate-300 rounded-3xl p-8 card-light-hover flex flex-col justify-between"
            >
              <div className="flex flex-col gap-4">
                <span className="inline-flex self-start bg-[#e6f9f3] text-[#008f60] px-3 py-1 rounded-full text-xs font-extrabold uppercase font-mono tracking-wider border border-[#00b87c]/30">
                  {service.category}
                </span>

                <h2 className="text-2xl font-black text-slate-950 tracking-tight">
                  {service.title}
                </h2>

                <p className="text-slate-700 text-sm font-medium leading-relaxed">
                  {service.summary}
                </p>

                {/* Features Tags */}
                <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-200">
                  {service.features &&
                    service.features.map((feat, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-bold bg-slate-100 text-slate-800 px-2.5 py-1 rounded-md border border-slate-300"
                      >
                        ✓ {feat}
                      </span>
                    ))}
                </div>
              </div>

              {/* Action Hooks */}
              <div className="flex items-center justify-between border-t border-slate-200 pt-6 mt-6">
                <Link
                  href={`/services/${service.slug}`}
                  className="text-xs font-extrabold text-[#008f60] hover:text-[#00b87c] hover:underline uppercase tracking-wider"
                >
                  View Details &rarr;
                </Link>

                <button
                  onClick={() => handleOpenDemoModal(service)}
                  className="px-4 py-2 bg-[#00b87c] hover:bg-[#008f60] text-white rounded-full text-xs font-extrabold transition-all shadow-md shadow-[#00b87c]/20 cursor-pointer"
                >
                  Book Demo
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Embedded Demo Modal */}
      <DemoModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialType="demo"
        services={selectedService ? [selectedService] : services}
      />
    </div>
  );
}
