"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState("");
  const [loading, setLoading] = useState(true);

  const staticCategories = [
    { name: "Technology", slug: "technology" },
    { name: "Marketing & ROI", slug: "marketing-roi" },
    { name: "AI & Automation", slug: "ai-automation" }
  ];

  const staticPosts = [
    {
      id: 1,
      title: "Why Next.js and Django are the Ultimate Tech Stack for Modern SaaS",
      slug: "why-nextjs-and-django-are-the-ultimate-tech-stack",
      author: "Tech Architect",
      category_name: "Technology",
      category_slug: "technology",
      summary: "Building a Software-as-a-Service (SaaS) application requires balancing speed-to-market with database safety, performance, and API load metrics.",
      image_url: "https://images.unsplash.com/photo-1618401471353-b98aedd07871?auto=format&fit=crop&w=800&q=80",
      published_at: "2026-08-01T10:00:00Z"
    },
    {
      id: 2,
      title: "Scaling Business Sales by 10X using WhatsApp Business API Automation",
      slug: "scaling-business-sales-with-whatsapp-api",
      author: "Growth Strategist",
      category_name: "Marketing & ROI",
      category_slug: "marketing-roi",
      summary: "Traditional email marketing click rates have dropped to less than 2% in the current landscape. WhatsApp Business API, however, offers up to a 98% open rate.",
      image_url: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&q=80",
      published_at: "2026-08-03T12:00:00Z"
    },
    {
      id: 3,
      title: "Understanding Neural Automation: Building private AI Agents for Enterprise",
      slug: "understanding-neural-automation-ai-agents",
      author: "AI Researcher",
      category_name: "AI & Automation",
      category_slug: "ai-automation",
      summary: "Artificial Intelligence is no longer just a chatbot widget on landing pages. Enterprises are now building private Neural Automation agents.",
      image_url: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80",
      published_at: "2026-08-05T09:00:00Z"
    }
  ];

  useEffect(() => {
    async function fetchBlogData() {
      setLoading(true);
      try {
        const catRes = await fetch("/api/blogs/categories/");
        if (catRes.ok) {
          const catData = await catRes.json();
          setCategories(catData);
        } else {
          setCategories(staticCategories);
        }

        const postUrl = selectedCat
          ? `/api/blogs/posts/?category=${selectedCat}`
          : "/api/blogs/posts/";

        const postRes = await fetch(postUrl);
        if (postRes.ok) {
          const postData = await postRes.json();
          setPosts(postData);
        } else {
          const filtered = selectedCat
            ? staticPosts.filter(p => p.category_slug === selectedCat)
            : staticPosts;
          setPosts(filtered);
        }
      } catch (err) {
        setCategories(staticCategories);
        const filtered = selectedCat
          ? staticPosts.filter(p => p.category_slug === selectedCat)
          : staticPosts;
        setPosts(filtered);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogData();
  }, [selectedCat]);

  return (
    <div className="max-w-7xl mx-auto px-6 w-full flex flex-col gap-12 py-6">
      {/* Header */}
      <div className="flex flex-col gap-4 max-w-3xl">
        <span className="inline-flex items-center gap-2 self-start text-xs font-extrabold text-[#008f60] uppercase tracking-widest bg-[#e6f9f3] px-4 py-1.5 rounded-full border border-[#00b87c]/30">
          ⚡ Technical Articles & Insights
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-slate-950 tracking-tight leading-tight">
          Engineering Insights & <span className="text-[#00b87c]">Growth</span>
        </h1>
        <p className="text-slate-700 text-base md:text-lg font-medium leading-relaxed">
          Deep dives into custom backend systems, advanced LLM workflows, API integrations, and conversion architectures to keep your business ahead.
        </p>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2.5 border-b border-slate-300 pb-6">
        <button
          onClick={() => setSelectedCat("")}
          className={`px-5 py-2 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
            selectedCat === ""
              ? "bg-[#00b87c] text-white shadow-md shadow-[#00b87c]/20"
              : "bg-white border border-slate-300 text-slate-900 hover:border-[#00b87c]"
          }`}
        >
          All Topics
        </button>
        {categories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => setSelectedCat(cat.slug)}
            className={`px-5 py-2 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
              selectedCat === cat.slug
                ? "bg-[#00b87c] text-white shadow-md shadow-[#00b87c]/20"
                : "bg-white border border-slate-300 text-slate-900 hover:border-[#00b87c]"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-96 bg-slate-200 border border-slate-300 rounded-3xl"></div>
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-24 border border-dashed border-slate-300 rounded-3xl bg-white">
          <p className="text-slate-600 font-bold text-sm">No articles found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link
              href={`/blog/${post.slug}`}
              key={post.slug}
              className="bg-white border border-slate-300 rounded-3xl overflow-hidden flex flex-col justify-between group card-light-hover"
            >
              <div>
                {/* Post Cover Photo */}
                <div className="h-52 relative overflow-hidden bg-slate-900">
                  <img
                    src={post.image_url || "https://images.unsplash.com/photo-1618401471353-b98aedd07871?auto=format&fit=crop&w=800&q=80"}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                {/* Content */}
                <div className="p-6 flex flex-col gap-3">
                  <span className="text-xs font-extrabold text-[#008f60] uppercase font-mono tracking-wider">
                    {post.category_name}
                  </span>
                  <h2 className="text-xl font-black text-slate-950 tracking-tight leading-snug group-hover:text-[#00b87c] transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-slate-700 text-xs font-medium leading-relaxed line-clamp-3">
                    {post.summary || post.content.substring(0, 150) + "..."}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-3 flex items-center justify-between border-t border-slate-200 text-xs text-slate-600 font-bold font-mono">
                <span>By {post.author}</span>
                <span>{new Date(post.published_at).toLocaleDateString()}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
