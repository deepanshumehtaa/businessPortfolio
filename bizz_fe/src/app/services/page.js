"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import DemoModal from "@/components/DemoModal";

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  const staticServices = [
    {
      id: 1,
      title: "Custom Software Development",
      slug: "custom-software-development",
      summary: "Tailor-made software architectures, enterprise ERP, CRM, and bespoke billing engines built to automate your operations.",
      icon: "cpu",
      category: "Software Engineering",
    },
    {
      id: 2,
      title: "AI & Machine Learning Automation",
      slug: "ai-ml-automation",
      summary: "Neural automation, intelligent chatbots, predictive analytics, and customized generative AI tools designed to optimize business logic.",
      icon: "robot",
      category: "AI & Automation",
    },
    {
      id: 3,
      title: "SaaS Platform Engineering",
      slug: "saas-platform-engineering",
      summary: "Scalable, secure, and multi-tenant SaaS cloud platforms featuring subscriptions, metered usage, and high-speed API backends.",
      icon: "cloud-arrow-up",
      category: "Software Engineering",
    },
    {
      id: 4,
      title: "Mobile App Development",
      slug: "mobile-app-development",
      summary: "Premium cross-platform and native iOS & Android applications featuring offline synchronization, animations, and geofencing.",
      icon: "phone-vibrate",
      category: "Mobile Apps",
    },
    {
      id: 5,
      title: "Performance Marketing & Analytics",
      slug: "performance-marketing-analytics",
      summary: "ROI-focused Google Ads, Meta Ads, and custom analytics setups engineered to maximize acquisition without wasting budget.",
      icon: "graph-up-arrow",
      category: "Marketing Solutions",
    },
    {
      id: 6,
      title: "WhatsApp Business API Marketing",
      slug: "whatsapp-business-api-marketing",
      summary: "Verified business API templates, interactive automated chat buttons, and automated marketing broadcast managers.",
      icon: "whatsapp",
      category: "Marketing Solutions",
    },
    {
      id: 7,
      title: "RCS Messaging & Automation",
      slug: "rcs-messaging-automation",
      summary: "Rich Communication Services to send interactive SMS with logos, image carousels, and quick reply actions directly to native dialers.",
      icon: "chat-left-text",
      category: "Marketing Solutions",
    }
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

  const openBooking = (svcTitle) => {
    setSelectedService(svcTitle);
    setModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 w-full flex flex-col gap-12 py-6">
      <div className="flex flex-col gap-4 max-w-2xl">
        <span className="text-xs font-semibold text-primary uppercase tracking-widest">
          ⚡ Our Core Solutions
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
          Complete Software Solutions under one roof
        </h1>
        <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
          From fullstack application development and Generative AI training to automated marketing alerts and conversion funnel setups, we deliver technical systems built to grow sales.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-64 bg-zinc-900 border border-white/5 rounded-2xl"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc) => (
            <div
              key={svc.slug}
              className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6 flex flex-col justify-between glow-card transition-all"
            >
              <div className="flex flex-col gap-4">
                <div className="inline-flex items-center self-start bg-primary/10 border border-primary/20 rounded-full px-3 py-1 text-[10px] text-primary font-medium">
                  {svc.category}
                </div>
                <h2 className="text-xl font-bold text-white tracking-tight">{svc.title}</h2>
                <p className="text-zinc-400 text-xs md:text-sm leading-relaxed mb-4">
                  {svc.summary}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-2">
                <Link
                  href={`/services/${svc.slug}`}
                  className="text-xs font-bold text-zinc-300 hover:text-white transition-colors"
                >
                  View Details &rarr;
                </Link>
                <button
                  onClick={() => openBooking(svc.title)}
                  className="text-xs font-bold bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-full transition-colors cursor-pointer"
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
        services={services}
      />
    </div>
  );
}
