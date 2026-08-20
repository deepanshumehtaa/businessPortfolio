"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function BlogDetailPage({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const { slug } = params;

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const staticPosts = {
    "why-nextjs-and-django-are-the-ultimate-tech-stack": {
      title: "Why Next.js and Django are the Ultimate Tech Stack for Modern SaaS",
      author: "Tech Architect",
      category_name: "Technology",
      image_url: "https://images.unsplash.com/photo-1618401471353-b98aedd07871?auto=format&fit=crop&w=800&q=80",
      published_at: "2026-08-01T10:00:00Z",
      content: "Building a Software-as-a-Service (SaaS) application requires balancing speed-to-market with database safety, performance, and API load metrics.\n\n### The Frontend: Next.js\nNext.js offers out-of-the-box Server-Side Rendering (SSR), Static Site Generation (SSG), and incremental builds. This guarantees that your SaaS pages load instantly, helping you secure perfect search rank scores.\n\n### The Backend: Python Django\nDjango provides security features natively—preventing SQL Injection, XSS, and CSRF attacks by default. Additionally, Django's Object-Relational Mapper (ORM) makes structural changes simple, while Django REST Framework gives you class-based views to compose RESTful APIs quickly.\n\nCombined, this is the stack of choice for high-volume enterprise software products in 2026."
    },
    "scaling-business-sales-with-whatsapp-api": {
      title: "Scaling Business Sales by 10X using WhatsApp Business API Automation",
      author: "Growth Strategist",
      category_name: "Marketing & ROI",
      image_url: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&q=80",
      published_at: "2026-08-03T12:00:00Z",
      content: "Traditional email marketing click rates have dropped to less than 2% in the current landscape. WhatsApp Business API, however, offers up to a **98% open rate** and a **45% reply rate**.\n\n### Integrating WhatsApp into custom CRM systems\nBy connecting Meta's API directly to your sales pipeline, you can:\n* Trigger automated cart reminders when a client steps away.\n* Send PDF bills, shipping tracking numbers, and onboarding videos instantly.\n* Set up interactive Flows with buttons allowing users to book sales appointments inside the chat window.\n\nStop wasting thousands on cold calls. Meet your customers where they are."
    },
    "understanding-neural-automation-ai-agents": {
      title: "Understanding Neural Automation: Building private AI Agents for Enterprise",
      author: "AI Researcher",
      category_name: "AI & Automation",
      image_url: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80",
      published_at: "2026-08-05T09:00:00Z",
      content: "Artificial Intelligence is no longer just a chatbot widget on landing pages. Enterprises are now building **private Neural Automation agents** connected to internal document lakes.\n\n### How private RAG Agents operate\nRetrieval-Augmented Generation (RAG) feeds a secure, restricted database of your technical manuals, support tickets, and pricing plans directly to an LLM. When a question is asked, the model retrieves the exact documents first, ensuring 100% accurate responses without hallucinating.\n\nThis technology automates up to **80% of customer support tickets**, freeing your developers and specialists to focus on high-priority issues."
    }
  };

  useEffect(() => {
    async function fetchBlogDetail() {
      try {
        const res = await fetch(`/api/blogs/posts/${slug}/`);
        if (res.ok) {
          const data = await res.json();
          setPost(data);
        } else {
          if (staticPosts[slug]) {
            setPost(staticPosts[slug]);
          } else {
            setError(true);
          }
        }
      } catch (err) {
        if (staticPosts[slug]) {
          setPost(staticPosts[slug]);
        } else {
          setError(true);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchBlogDetail();
  }, [slug]);

  if (error) {
    return notFound();
  }

  // Markdown parser
  const renderMarkdown = (text) => {
    if (!text) return null;
    return text.split("\n\n").map((para, index) => {
      if (para.startsWith("### ")) {
        return (
          <h3 key={index} className="text-xl md:text-2xl font-bold text-white mt-8 mb-4 tracking-tight">
            {para.replace("### ", "")}
          </h3>
        );
      }
      if (para.startsWith("* ")) {
        return (
          <ul key={index} className="space-y-2 pl-4 my-4 list-disc text-zinc-400 text-sm md:text-base leading-relaxed">
            {para.split("\n").map((li, i) => (
              <li key={i}>{li.replace("* ", "")}</li>
            ))}
          </ul>
        );
      }
      return (
        <p key={index} className="text-zinc-400 text-sm md:text-base leading-relaxed mb-4">
          {/* Support strong bold parsing **text** */}
          {para.split("**").map((chunk, i) => 
            i % 2 === 1 ? <strong key={i} className="text-white font-bold">{chunk}</strong> : chunk
          )}
        </p>
      );
    });
  };

  return (
    <>
      {post && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              "headline": post.title,
              "image": post.image_url,
              "author": {
                "@type": "Person",
                "name": post.author,
              },
              "datePublished": post.published_at,
              "publisher": {
                "@type": "Organization",
                "name": "Software Solutions",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://softwaresolutions.co.in/assets/images/ss-logo.png",
                },
              },
            }),
          }}
        />
      )}

      {loading ? (
        <div className="max-w-3xl mx-auto px-6 py-12 w-full animate-pulse space-y-6">
          <div className="h-4 bg-zinc-800 w-1/4 rounded"></div>
          <div className="h-10 bg-zinc-800 w-2/3 rounded"></div>
          <div className="h-64 bg-zinc-800 w-full rounded-2xl"></div>
        </div>
      ) : (
        <article className="max-w-3xl mx-auto px-6 py-6 w-full flex flex-col gap-6">
          {/* Breadcrumbs */}
          <div className="text-xs text-zinc-500 font-medium">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">&gt;</span>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <span className="mx-2">&gt;</span>
            <span className="text-zinc-300">{post.title}</span>
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-xs font-semibold text-primary uppercase font-mono tracking-wider">
              {post.category_name}
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-xs text-zinc-500 font-mono">
              <span>Published by {post.author}</span>
              <span>•</span>
              <span>{new Date(post.published_at).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Banner Image */}
          <div className="w-full h-64 md:h-[400px] relative rounded-2xl overflow-hidden bg-zinc-950 border border-white/5 shadow-xl">
            <img
              src={post.image_url || "https://images.unsplash.com/photo-1618401471353-b98aedd07871?auto=format&fit=crop&w=800&q=80"}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Article Content */}
          <div className="mt-4 flex flex-col gap-2">
            {renderMarkdown(post.content)}
          </div>
        </article>
      )}
    </>
  );
}
