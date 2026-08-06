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
        const catRes = await fetch("http://localhost:8000/api/blogs/categories/");
        if (catRes.ok) {
          const catData = await catRes.json();
          setCategories(catData);
        } else {
          setCategories(staticCategories);
        }

        const url = selectedCat
          ? `http://localhost:8000/api/blogs/posts/?category=${selectedCat}`
          : "http://localhost:8000/api/blogs/posts/";

        const postRes = await fetch(url);
        if (postRes.ok) {
          const postData = await postRes.json();
          setPosts(postData);
        } else {
          // Filter static posts manually
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
      <div className="flex flex-col gap-4 max-w-2xl">
        <span className="text-xs font-semibold text-primary uppercase tracking-widest">
          ⚡ Technical Articles
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
          Engineering Insights & Growth
        </h1>
        <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
          Deep dives into custom backend systems, advanced LLM workflows, API integrations, and conversion architectures to keep your business ahead.
        </p>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 border-b border-white/5 pb-6">
        <button
          onClick={() => setSelectedCat("")}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
            selectedCat === ""
              ? "bg-primary text-white"
              : "bg-zinc-900 text-zinc-400 hover:text-white"
          }`}
        >
          All Topics
        </button>
        {categories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => setSelectedCat(cat.slug)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              selectedCat === cat.slug
                ? "bg-primary text-white"
                : "bg-zinc-900 text-zinc-400 hover:text-white"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-80 bg-zinc-900 border border-white/5 rounded-2xl"></div>
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-24 border border-dashed border-zinc-800 rounded-2xl">
          <p className="text-zinc-500 text-sm">No articles found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              href={`/blog/${post.slug}`}
              key={post.slug}
              className="bg-zinc-900/40 border border-white/5 rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-primary/20 transition-all shadow-xl"
            >
              <div>
                {/* Post Cover Photo */}
                <div className="h-48 relative overflow-hidden bg-zinc-950">
                  <img
                    src={post.image_url || "https://images.unsplash.com/photo-1618401471353-b98aedd07871?auto=format&fit=crop&w=800&q=80"}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                {/* Content */}
                <div className="p-6 flex flex-col gap-3">
                  <span className="text-[10px] font-semibold text-primary uppercase font-mono tracking-wider">
                    {post.category_name}
                  </span>
                  <h2 className="text-lg font-bold text-white tracking-tight leading-snug group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-zinc-400 text-xs leading-relaxed line-clamp-3">
                    {post.summary || post.content.substring(0, 150) + "..."}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-white/5 mt-2 text-[10px] text-zinc-500 font-mono">
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
