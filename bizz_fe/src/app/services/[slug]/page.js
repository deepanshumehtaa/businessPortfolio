"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import DemoModal from "@/components/DemoModal";

export default function ServiceDetailPage({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const { slug } = params;

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState(false);

  const staticServices = {
    "custom-software-development": {
      title: "Custom Software Development",
      category: "Software Engineering",
      summary: "Tailor-made software architectures, enterprise ERP, CRM, and bespoke billing engines built to automate your operations.",
      features: ["Legacy Modernization", "Bespoke ERP/CRM", "Multi-tenant SaaS", "Custom Billing Engines"],
      description: "### Tailored Software Engineering for Global Enterprises\n\nWe design, build, and deploy robust, custom software solutions that integrate seamlessly with your existing infrastructure. From legacy modernization to building new ERP/CRM systems from scratch, our software is engineered for scale, speed, and absolute security.\n\n#### What We Deliver:\n* **Enterprise Resource Planning (ERP):** Centralize operations, HR, finance, and logistics.\n* **Customer Relationship Management (CRM):** Sales tracking, pipeline management, and contact logs.\n* **Custom Billing Systems:** Complex multi-tenant subscription models and custom invoicing pipelines.\n* **Legacy Systems Modernization:** Upgrade older systems to modern web frameworks without downtime.",
    },
    "ai-ml-automation": {
      title: "AI & Machine Learning Automation",
      category: "AI & Automation",
      summary: "Neural automation, intelligent chatbots, predictive analytics, and customized generative AI tools designed to optimize business logic.",
      features: ["Generative AI & LLMs", "Predictive Analytics", "RAG Support Agents", "Computer Vision & OCR"],
      description: "### Automating Workflows with Smart Machine Learning Models\n\nBridge the gap between data and action. We build intelligent automation systems using machine learning, computer vision, and Large Language Models (LLMs) to automate customer support, extract structured insights, and predict sales trends.\n\n#### What We Deliver:\n* **Generative AI Platforms:** Private instances of custom LLMs tuned on your corporate knowledge base.\n* **Predictive Analytics:** Forecasting sales, stock demand, and customer behavior with ML models.\n* **Intelligent Chatbots:** RAG-powered bots capable of solving customer tickets in real-time.\n* **Document Data Extraction:** Auto-scanning invoices, resumes, and PDFs using OCR and AI classifiers.",
    },
    "saas-platform-engineering": {
      title: "SaaS Platform Engineering",
      category: "Software Engineering",
      summary: "Scalable, secure, and multi-tenant SaaS cloud platforms featuring subscriptions, metered usage, and high-speed API backends.",
      features: ["Multi-tenant Databases", "Stripe Metered Billing", "FastAPI/DRF Backends", "OAuth & SSO integration"],
      description: "### Launching Enterprise SaaS Products at Speed\n\nTurn your SaaS ideas into scalable cloud platforms. We build clean, multi-tenant architectures featuring robust API structures, secure JWT/OAuth session controls, Stripe/PayPal payment hooks, and serverless background workers.\n\n#### What We Deliver:\n* **Multi-tenant Infrastructure:** Secure data isolation between accounts with seamless cross-region performance.\n* **Metered Billing & Subscriptions:** Usage-based tracking, subscription tiers, and recurring credit systems.\n* **Restful & GraphQL APIs:** High-throughput backend endpoints optimized for React/Next.js/Mobile clients.\n* **Third-Party Integrations:** Connect seamlessly with HubSpot, Salesforce, Slack, Sendgrid, and Twilio.",
    },
    "mobile-app-development": {
      title: "Mobile App Development",
      category: "Mobile Apps",
      summary: "Premium cross-platform and native iOS & Android applications featuring offline synchronization, animations, and geofencing.",
      features: ["React Native & Flutter", "Native Swift & Kotlin", "Offline Synchronization", "Push Alerts & Geofencing"],
      description: "### Engaging Mobile Experiences Engineered for Scale\n\nWe build high-performance mobile apps with fluid animations, intuitive layouts, and swift responsiveness. Utilizing native Kotlin/Swift and cross-platform Flutter/React Native frameworks, we deliver features like background sync, push alerts, and location routing.\n\n#### What We Deliver:\n* **Cross-Platform Apps:** Flutter & React Native setups to launch on iOS and Android with a single codebase.\n* **Native iOS & Android:** Swift and Kotlin code for memory-critical, high-performance needs.\n* **Offline-First Synchronization:** Work seamlessly without internet connection; auto-sync data on connection restore.\n* **Geofencing & CoreLocation:** Real-time user tracking, map routing, and proximity alerts.",
    },
    "performance-marketing-analytics": {
      title: "Performance Marketing & Analytics",
      category: "Marketing Solutions",
      summary: "ROI-focused Google Ads, Meta Ads, and custom analytics setups engineered to maximize acquisition without wasting budget.",
      features: ["Google Search PPC Ads", "Meta Remarketing Funnels", "GA4 Event Architectures", "Landing Page A/B Testing"],
      description: "### Data-Driven Acquisition for Software & Technology Brands\n\nNote: We are not a simple social media posting agency. We specialize strictly in performance-driven PPC campaigns, high-intent Google Search ads, Meta sales retargeting, and Google Analytics 4 conversion architectures to scale customer acquisitions.\n\n#### What We Deliver:\n* **Google Search & Shopping Ads:** Capture high-intent buyer clicks for your services or products.\n* **Meta Sales Funnels:** Retarget visitors with structured ad creatives to secure demo bookings.\n* **GA4 & Funnel Tracking:** Setup end-to-end custom event tracking to measure cost-per-acquisition (CPA).\n* **Conversion Rate Optimization (CRO):** Run landing page A/B tests to double click-to-lead percentages.",
    },
    "whatsapp-business-api-marketing": {
      title: "WhatsApp Business API Marketing",
      category: "Marketing Solutions",
      summary: "Verified business API templates, interactive automated chat buttons, and automated marketing broadcast managers.",
      features: ["Meta API Verification", "Automated Alerts", "Flow Interactive Bots", "Broadcast Campaign Panels"],
      description: "### Scale Sales and Engagement Directly inside WhatsApp\n\nWe integrate the official Meta WhatsApp Business API into your custom software. Send automated transaction alerts, shipping links, and marketing broadcasts with rich buttons, achieving a 98% open rate compared to standard email.\n\n#### What We Deliver:\n* **Automated Transaction Alerts:** Trigger WhatsApp messages for order bookings, invoice links, or appointments.\n* **Marketing Broadcast Managers:** Securely blast newsletters to thousands of opt-in users with quick-reply buttons.\n* **Interactive Flow Chatbots:** Capture user feedback, book call appointments, and answer FAQs inside WhatsApp.\n* **Green Badge Verification:** Technical support in getting your brand account verified with Meta.",
    },
    "rcs-messaging-automation": {
      title: "RCS Messaging & Automation",
      category: "Marketing Solutions",
      summary: "Rich Communication Services to send interactive SMS with logos, image carousels, and quick reply actions directly to native dialers.",
      features: ["Branded Inboxes", "Rich Product Carousels", "Quick-Reply Actions", "Read Receipt Analytics"],
      description: "### Upgrading SMS to Rich, Interactive Brand Conversations\n\nTake advantage of next-gen mobile messaging. RCS (Rich Communication Services) allows businesses to send rich branded cards, carousels of products, and active action buttons directly to native phone SMS apps—no app download required.\n\n#### What We Deliver:\n* **Branded Sender Profiles:** Display verified brand logos, colors, and verification badges instead of random numbers.\n* **Rich Interactive Carousels:** Show product lists, brochures, and image feeds inside the inbox.\n* **Quick-Action Buttons:** Single-tap buttons to 'Call Agent', 'Open Map Route', or 'Confirm Appointment'.\n* **Real-time Delivery Analytics:** Read receipts, click-through rates, and message reply tracking.",
    }
  };

  useEffect(() => {
    async function fetchDetail() {
      try {
        const res = await fetch(`http://localhost:8000/api/services/${slug}/`);
        if (res.ok) {
          const data = await res.json();
          setService(data);
        } else {
          if (staticServices[slug]) setService(staticServices[slug]);
          else setError(true);
        }
      } catch (err) {
        if (staticServices[slug]) setService(staticServices[slug]);
        else setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchDetail();
  }, [slug]);

  if (error) return notFound();

  const renderMarkdown = (text) => {
    if (!text) return null;
    return text.split("\n\n").map((para, index) => {
      if (para.startsWith("### ")) {
        return (
          <h3 key={index} className="text-2xl font-black text-slate-950 mt-6 mb-4 tracking-tight">
            {para.replace("### ", "")}
          </h3>
        );
      }
      if (para.startsWith("#### ")) {
        return (
          <h4 key={index} className="text-lg font-bold text-[#008f60] mt-6 mb-3">
            {para.replace("#### ", "")}
          </h4>
        );
      }
      if (para.startsWith("* ")) {
        return (
          <ul key={index} className="space-y-2.5 my-4 pl-4 text-sm font-medium leading-relaxed text-slate-700">
            {para.split("\n").map((li, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-[#00b87c] font-black">•</span>
                <span>{li.replace("* ", "")}</span>
              </li>
            ))}
          </ul>
        );
      }
      return (
        <p key={index} className="text-slate-700 text-sm md:text-base font-medium leading-relaxed mb-4">
          {para}
        </p>
      );
    });
  };

  return (
    <>
      {service && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              "serviceType": service.title,
              "provider": {
                "@type": "LocalBusiness",
                "name": "Software Solutions",
                "url": "https://softwaresolutions.co.in",
                "telephone": "+918961716583",
              },
              "description": service.summary,
            }),
          }}
        />
      )}

      {loading ? (
        <div className="max-w-4xl mx-auto px-6 py-12 w-full animate-pulse space-y-6">
          <div className="h-4 bg-slate-200 w-1/4 rounded"></div>
          <div className="h-10 bg-slate-200 w-2/3 rounded"></div>
          <div className="h-64 bg-slate-200 w-full rounded-3xl"></div>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto px-6 py-6 w-full flex flex-col gap-8">
          {/* Breadcrumbs */}
          <div className="text-xs text-slate-500 font-extrabold tracking-wide">
            <Link href="/" className="hover:text-[#00b87c] transition-colors">Home</Link>
            <span className="mx-2">&gt;</span>
            <Link href="/services" className="hover:text-[#00b87c] transition-colors">Services</Link>
            <span className="mx-2">&gt;</span>
            <span className="text-slate-900">{service.title}</span>
          </div>

          {/* Heading */}
          <div className="flex flex-col gap-4">
            <span className="inline-flex self-start bg-[#e6f9f3] border border-[#00b87c]/30 rounded-full px-3.5 py-1 text-xs text-[#008f60] font-extrabold uppercase font-mono tracking-wider">
              {service.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-slate-950 tracking-tight leading-tight">
              {service.title}
            </h1>
            <p className="text-slate-700 text-base md:text-lg font-medium leading-relaxed max-w-3xl">
              {service.summary}
            </p>
          </div>

          <hr className="border-slate-200" />

          {/* Details Body */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 flex flex-col gap-2">
              {renderMarkdown(service.description)}
            </div>

            {/* Sticky Actions Sidebar */}
            <div className="lg:col-span-4 relative">
              <div className="sticky top-28 bg-white border border-slate-300 rounded-3xl p-6 flex flex-col gap-6 shadow-xl">
                <div>
                  <h3 className="text-xs font-extrabold uppercase text-slate-500 tracking-wider mb-3">Core Capabilities</h3>
                  <div className="flex flex-col gap-2">
                    {service.features && service.features.map((feat, index) => (
                      <div key={index} className="flex items-center gap-2 text-xs text-slate-900 font-bold">
                        <span className="w-2 h-2 rounded-full bg-[#00b87c]"></span>
                        {feat}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="h-px bg-slate-200"></div>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => setModalOpen(true)}
                    className="w-full py-3.5 bg-[#00b87c] hover:bg-[#008f60] text-white rounded-full font-extrabold transition-all shadow-md shadow-[#00b87c]/25 cursor-pointer text-center text-xs uppercase tracking-wider"
                  >
                    Request Demo / Quote
                  </button>
                  <Link
                    href="/contact"
                    className="w-full py-3.5 bg-slate-50 border border-slate-300 hover:border-[#00b87c] text-slate-900 font-extrabold rounded-full transition-all text-center text-xs uppercase tracking-wider"
                  >
                    Contact Sales
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Embedded Demo Modal */}
          <DemoModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            initialType="demo"
            services={[service]}
          />
        </div>
      )}
    </>
  );
}
