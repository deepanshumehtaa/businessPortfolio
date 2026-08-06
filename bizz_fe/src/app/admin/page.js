"use client";

import { useState, useEffect } from "react";

export default function AdminPage() {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  
  // Dashboard states
  const [stats, setStats] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard"); // dashboard, enquiries, calls, demos, blogs
  const [loading, setLoading] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [categories, setCategories] = useState([]);

  // Form states for creating blogs
  const [blogForm, setBlogForm] = useState({ title: "", slug: "", author: "Admin", category: "", content: "", image_url: "", meta_title: "", meta_description: "" });
  const [blogSuccess, setBlogSuccess] = useState(false);

  useEffect(() => {
    const savedToken = localStorage.getItem("admin-token");
    if (savedToken) {
      setToken(savedToken);
      fetchDashboard(savedToken);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/api/admin/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("admin-token", data.token);
        setToken(data.token);
        fetchDashboard(data.token);
      } else {
        const data = await res.json();
        setLoginError(data.error || "Invalid username or password.");
      }
    } catch (err) {
      setLoginError("Could not connect to authentication API.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin-token");
    setToken(null);
    setStats(null);
    setDataList([]);
  };

  const fetchDashboard = async (authToken) => {
    try {
      const res = await fetch("http://localhost:8000/api/admin/dashboard/", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (res.ok) {
        const data = await res.json();
        setStats(data.stats);
      } else if (res.status === 401) {
        handleLogout();
      }
    } catch (err) {
      console.error("Failed to load dashboard statistics.");
    }
  };

  const fetchTabDetails = async (tabName) => {
    if (!token) return;
    setLoading(true);
    let url = "";
    if (tabName === "enquiries") url = "http://localhost:8000/api/admin/enquiries/";
    if (tabName === "calls") url = "http://localhost:8000/api/admin/calls/";
    if (tabName === "demos") url = "http://localhost:8000/api/admin/demos/";
    if (tabName === "blogs") {
      url = "http://localhost:8000/api/admin/blogs/";
      // Fetch categories for form options
      fetchCategories();
    }

    try {
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setDataList(data);
      } else if (res.status === 401) {
        handleLogout();
      }
    } catch (err) {
      console.error(`Failed to load details for ${tabName}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/blogs/categories/");
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
        if (data.length > 0 && !blogForm.category) {
          setBlogForm(prev => ({ ...prev, category: data[0].id }));
        }
      }
    } catch (err) {
      console.error("Failed to load categories");
    }
  };

  const handleUpdateEnquiryStatus = async (id, currentStatus) => {
    const nextStatus = currentStatus === "New" ? "In Progress" : "Resolved";
    try {
      const res = await fetch(`http://localhost:8000/api/admin/enquiries/${id}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: nextStatus }),
      });
      if (res.ok) {
        // Reload enquiries list
        fetchTabDetails("enquiries");
        fetchDashboard(token);
      }
    } catch (err) {
      console.error("Failed to update status");
    }
  };

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setBlogSuccess(false);

    try {
      const res = await fetch("http://localhost:8000/api/admin/blogs/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(blogForm),
      });

      if (res.ok) {
        setBlogSuccess(true);
        setBlogForm({ title: "", slug: "", author: "Admin", category: categories[0]?.id || "", content: "", image_url: "", meta_title: "", meta_description: "" });
        // Reload list
        fetchTabDetails("blogs");
        fetchDashboard(token);
      }
    } catch (err) {
      console.error("Failed to save post");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBlog = async (id) => {
    if (!confirm("Are you sure you want to delete this article?")) return;
    try {
      const res = await fetch(`http://localhost:8000/api/admin/blogs/${id}/`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        fetchTabDetails("blogs");
        fetchDashboard(token);
      }
    } catch (err) {
      console.error("Failed to delete post");
    }
  };

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    if (tabName !== "dashboard") {
      fetchTabDetails(tabName);
    } else {
      fetchDashboard(token);
    }
  };

  // ----------------------------------------------------
  // LOGIN PANEL VIEW
  // ----------------------------------------------------
  if (!token) {
    return (
      <div className="flex-1 flex items-center justify-center py-12 px-6">
        <div className="w-full max-w-md bg-zinc-900 border border-white/5 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-12 -left-12 w-24 h-24 bg-primary/10 rounded-full blur-2xl"></div>
          
          <div className="text-center flex flex-col gap-2 mb-8 relative z-10">
            <span className="text-xs uppercase font-semibold text-primary font-mono tracking-wider">Restricted Area</span>
            <h1 className="text-2xl font-black text-white tracking-tight">Admin Login</h1>
            <p className="text-zinc-400 text-xs leading-relaxed">
              Authenticate using your Django superuser credentials to manage leads and publish articles.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 relative z-10">
            {loginError && (
              <div className="bg-red-950/40 border border-red-500/50 text-red-200 px-4 py-2.5 rounded-lg text-xs font-mono">
                {loginError}
              </div>
            )}
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">Username</label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-primary"
                placeholder="admin"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-primary"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-primary hover:bg-primary-hover text-white rounded-lg font-bold text-xs uppercase tracking-wider transition-colors disabled:opacity-50 cursor-pointer shadow-lg shadow-primary/10"
            >
              {loading ? "Verifying Token..." : "Authenticate"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // ADMIN PANEL VIEWS
  // ----------------------------------------------------
  return (
    <div className="max-w-7xl mx-auto px-6 w-full py-6 flex flex-col md:grid md:grid-cols-12 gap-8 items-start">
      {/* Sidebar Navigation */}
      <div className="md:col-span-3 w-full bg-zinc-900/60 border border-white/5 rounded-2xl p-4 flex flex-col gap-1.5">
        <div className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider mb-2 px-3">Controls</div>
        <button
          onClick={() => handleTabChange("dashboard")}
          className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
            activeTab === "dashboard" ? "bg-primary text-white" : "text-zinc-400 hover:text-white"
          }`}
        >
          📊 Dashboard Metrics
        </button>
        <button
          onClick={() => handleTabChange("enquiries")}
          className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
            activeTab === "enquiries" ? "bg-primary text-white" : "text-zinc-400 hover:text-white"
          }`}
        >
          ✉ Customer Enquiries ({stats?.totalEnquiries || 0})
        </button>
        <button
          onClick={() => handleTabChange("calls")}
          className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
            activeTab === "calls" ? "bg-primary text-white" : "text-zinc-400 hover:text-white"
          }`}
        >
          📞 Scheduled Calls ({stats?.totalCalls || 0})
        </button>
        <button
          onClick={() => handleTabChange("demos")}
          className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
            activeTab === "demos" ? "bg-primary text-white" : "text-zinc-400 hover:text-white"
          }`}
        >
          🛍️ Demo Bookings ({stats?.totalDemos || 0})
        </button>
        <button
          onClick={() => handleTabChange("blogs")}
          className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
            activeTab === "blogs" ? "bg-primary text-white" : "text-zinc-400 hover:text-white"
          }`}
        >
          📝 Manage Blog Feed
        </button>

        <div className="h-px bg-white/5 my-2"></div>
        
        <button
          onClick={handleLogout}
          className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
        >
          🚪 Terminate Session
        </button>
      </div>

      {/* Main Content Area */}
      <div className="md:col-span-9 w-full bg-zinc-900/30 border border-white/5 rounded-2xl p-6 min-h-[400px]">
        {/* Active Tab Header */}
        <div className="border-b border-white/5 pb-4 mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white tracking-tight capitalise">
            {activeTab === "dashboard" ? "Dashboard Metrics" : activeTab === "enquiries" ? "Customer Enquiries" : activeTab === "calls" ? "Scheduled Calls" : activeTab === "demos" ? "Booked Demos" : "Manage Blog Feed"}
          </h2>
          {loading && <span className="text-[10px] text-zinc-500 font-mono">Syncing Database...</span>}
        </div>

        {/* 1. Dashboard Tab */}
        {activeTab === "dashboard" && stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-zinc-900 border border-white/5 p-4 rounded-xl">
              <div className="text-[9px] uppercase tracking-wider font-bold text-zinc-500 mb-1">Enquiries</div>
              <div className="text-2xl font-black text-white">{stats.totalEnquiries}</div>
            </div>
            <div className="bg-zinc-900 border border-white/5 p-4 rounded-xl">
              <div className="text-[9px] uppercase tracking-wider font-bold text-zinc-500 mb-1">Scheduled Calls</div>
              <div className="text-2xl font-black text-white">{stats.totalCalls}</div>
            </div>
            <div className="bg-zinc-900 border border-white/5 p-4 rounded-xl">
              <div className="text-[9px] uppercase tracking-wider font-bold text-zinc-500 mb-1">Demo Bookings</div>
              <div className="text-2xl font-black text-white">{stats.totalDemos}</div>
            </div>
            <div className="bg-zinc-900 border border-white/5 p-4 rounded-xl">
              <div className="text-[9px] uppercase tracking-wider font-bold text-zinc-500 mb-1">Blog Articles</div>
              <div className="text-2xl font-black text-white">{stats.totalBlogs}</div>
            </div>
          </div>
        )}

        {/* 2. Enquiries Tab */}
        {activeTab === "enquiries" && (
          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-500">
                  <th className="pb-3 font-semibold px-2">Client Details</th>
                  <th className="pb-3 font-semibold px-2">Type</th>
                  <th className="pb-3 font-semibold px-2">Message</th>
                  <th className="pb-3 font-semibold px-2">Date</th>
                  <th className="pb-3 font-semibold px-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50">
                {dataList.map((enq) => (
                  <tr key={enq.id} className="hover:bg-zinc-900/40">
                    <td className="py-3 px-2 font-medium">
                      <div className="text-white font-bold">{enq.name}</div>
                      <div className="text-[10px] text-zinc-500">{enq.email} | {enq.phone || "No phone"}</div>
                      <div className="text-[10px] text-zinc-400 font-mono">{enq.company || "No Company"}</div>
                    </td>
                    <td className="py-3 px-2 font-mono text-[10px] text-zinc-400">{enq.enquiry_type}</td>
                    <td className="py-3 px-2 text-zinc-400 max-w-xs truncate" title={enq.message}>
                      {enq.message}
                    </td>
                    <td className="py-3 px-2 text-zinc-500">{new Date(enq.created_at).toLocaleDateString()}</td>
                    <td className="py-3 px-2">
                      <button
                        onClick={() => handleUpdateEnquiryStatus(enq.id, enq.status)}
                        className={`px-2 py-0.5 rounded-full text-[9px] font-bold cursor-pointer transition-colors ${
                          enq.status === "New"
                            ? "bg-red-500/10 text-red-400 hover:bg-red-500/25"
                            : enq.status === "In Progress"
                            ? "bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/25"
                            : "bg-green-500/10 text-green-400 hover:bg-green-500/25"
                        }`}
                      >
                        {enq.status}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 3. Scheduled Calls Tab */}
        {activeTab === "calls" && (
          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-500">
                  <th className="pb-3 font-semibold px-2">Client</th>
                  <th className="pb-3 font-semibold px-2">Scheduled Datetime</th>
                  <th className="pb-3 font-semibold px-2">Notes</th>
                  <th className="pb-3 font-semibold px-2">Submitted</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50">
                {dataList.map((call) => (
                  <tr key={call.id} className="hover:bg-zinc-900/40">
                    <td className="py-3 px-2 font-medium">
                      <div className="text-white font-bold">{call.name}</div>
                      <div className="text-[10px] text-zinc-500">{call.email} | {call.phone}</div>
                    </td>
                    <td className="py-3 px-2 text-primary font-mono font-bold">
                      {new Date(call.scheduled_datetime).toLocaleString()}
                    </td>
                    <td className="py-3 px-2 text-zinc-400 max-w-xs truncate" title={call.notes}>
                      {call.notes || "None"}
                    </td>
                    <td className="py-3 px-2 text-zinc-500">{new Date(call.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 4. Booked Demos Tab */}
        {activeTab === "demos" && (
          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-500">
                  <th className="pb-3 font-semibold px-2">Client Details</th>
                  <th className="pb-3 font-semibold px-2">Service Required</th>
                  <th className="pb-3 font-semibold px-2">Booking Datetime</th>
                  <th className="pb-3 font-semibold px-2">Logged</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50">
                {dataList.map((demo) => (
                  <tr key={demo.id} className="hover:bg-zinc-900/40">
                    <td className="py-3 px-2 font-medium">
                      <div className="text-white font-bold">{demo.name}</div>
                      <div className="text-[10px] text-zinc-500">{demo.email}</div>
                      <div className="text-[10px] text-zinc-400 font-mono">{demo.company || "No Company"}</div>
                    </td>
                    <td className="py-3 px-2 font-bold text-zinc-300">{demo.service_required}</td>
                    <td className="py-3 px-2 text-primary font-mono">
                      {demo.booking_date} @ {demo.booking_time}
                    </td>
                    <td className="py-3 px-2 text-zinc-500">{new Date(demo.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 5. Blogs Managing & CRUD tab */}
        {activeTab === "blogs" && (
          <div className="space-y-12">
            {/* Create Blog Form */}
            <div className="bg-zinc-900 border border-white/5 p-6 rounded-2xl">
              <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-4">Publish a new article</h3>
              {blogSuccess && (
                <div className="bg-green-950/40 border border-green-500/50 text-green-200 px-4 py-2.5 rounded-lg text-xs mb-4">
                  Article published successfully!
                </div>
              )}
              <form onSubmit={handleBlogSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-zinc-400 mb-1">Title *</label>
                    <input
                      type="text"
                      required
                      value={blogForm.title}
                      onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary"
                      placeholder="e.g. Next.js vs. Vanilla React"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 mb-1">Slug *</label>
                    <input
                      type="text"
                      required
                      value={blogForm.slug}
                      onChange={(e) => setBlogForm({ ...blogForm, slug: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary"
                      placeholder="nextjs-vs-vanilla-react"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-zinc-400 mb-1">Category *</label>
                    <select
                      value={blogForm.category}
                      onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary"
                    >
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-zinc-400 mb-1">Image URL</label>
                    <input
                      type="text"
                      value={blogForm.image_url}
                      onChange={(e) => setBlogForm({ ...blogForm, image_url: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary"
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1">Content (Markdown supported) *</label>
                  <textarea
                    required
                    rows="5"
                    value={blogForm.content}
                    onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary font-mono"
                    placeholder="### Technical title..."
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-lg font-bold transition-colors cursor-pointer"
                >
                  Publish Article
                </button>
              </form>
            </div>

            {/* List current blogs for delete */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400">Current Articles</h3>
              <div className="divide-y divide-zinc-800">
                {dataList.map((post) => (
                  <div key={post.id} className="py-3 flex items-center justify-between text-xs gap-4">
                    <div>
                      <h4 className="font-bold text-white">{post.title}</h4>
                      <span className="text-[10px] text-zinc-500 font-mono">Category: {post.category_name} | Slug: {post.slug}</span>
                    </div>
                    <button
                      onClick={() => handleDeleteBlog(post.id)}
                      className="px-3 py-1 bg-red-950/40 hover:bg-red-500/25 border border-red-500/30 text-red-300 rounded-lg cursor-pointer transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
