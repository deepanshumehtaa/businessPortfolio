"use client";

import { useState, useEffect } from "react";

export default function AdminPage() {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Dashboard states
  const [stats, setStats] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [loading, setLoading] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [demoArchivedView, setDemoArchivedView] = useState(false);

  // Form states for creating blogs
  const [blogForm, setBlogForm] = useState({
    title: "",
    slug: "",
    author: "Admin",
    category: "",
    content: "",
    image_url: "",
    meta_title: "",
    meta_description: "",
  });
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
      const res = await fetch("/api/admin/login/", {
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
      const res = await fetch("/api/admin/dashboard/", {
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

  const fetchTabDetails = async (tabName, archivedDemos = false) => {
    if (!token) return;
    setLoading(true);
    let url = "";
    if (tabName === "enquiries") url = "/api/admin/enquiries/";
    if (tabName === "calls") url = "/api/admin/calls/";
    if (tabName === "demos") url = `/api/admin/demos/?archived=${archivedDemos}`;
    if (tabName === "blogs") {
      url = "/api/admin/blogs/";
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
      const res = await fetch("/api/blogs/categories/");
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
        if (data.length > 0 && !blogForm.category) {
          setBlogForm((prev) => ({ ...prev, category: data[0].id }));
        }
      }
    } catch (err) {
      console.error("Failed to load categories");
    }
  };

  const handleUpdateEnquiryStatus = async (id, currentStatus) => {
    const nextStatus = currentStatus === "New" ? "In Progress" : "Resolved";
    try {
      const res = await fetch(`/api/admin/enquiries/${id}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: nextStatus }),
      });
      if (res.ok) {
        fetchTabDetails("enquiries");
        fetchDashboard(token);
      }
    } catch (err) {
      console.error("Failed to update status");
    }
  };

  // Demo Actions: Toggle Read, Toggle Archive, Delete
  const handleToggleDemoRead = async (id, currentReadState) => {
    try {
      const res = await fetch(`/api/admin/demos/${id}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ is_read: !currentReadState }),
      });
      if (res.ok) {
        fetchTabDetails("demos", demoArchivedView);
      }
    } catch (err) {
      console.error("Failed to update demo read status");
    }
  };

  const handleToggleDemoArchive = async (id, currentArchivedState) => {
    try {
      const res = await fetch(`/api/admin/demos/${id}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ is_archived: !currentArchivedState }),
      });
      if (res.ok) {
        fetchTabDetails("demos", demoArchivedView);
        fetchDashboard(token);
      }
    } catch (err) {
      console.error("Failed to update demo archive status");
    }
  };

  const handleDeleteDemo = async (id) => {
    if (!confirm("Are you sure you want to delete this demo booking permanently?")) return;
    try {
      const res = await fetch(`/api/admin/demos/${id}/`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        fetchTabDetails("demos", demoArchivedView);
        fetchDashboard(token);
      }
    } catch (err) {
      console.error("Failed to delete demo booking");
    }
  };

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setBlogSuccess(false);

    try {
      const res = await fetch("/api/admin/blogs/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(blogForm),
      });

      if (res.ok) {
        setBlogSuccess(true);
        setBlogForm({
          title: "",
          slug: "",
          author: "Admin",
          category: categories[0]?.id || "",
          content: "",
          image_url: "",
          meta_title: "",
          meta_description: "",
        });
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
      const res = await fetch(`/api/admin/blogs/${id}/`, {
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
    if (tabName === "demos") {
      setDemoArchivedView(false);
      fetchTabDetails("demos", false);
    } else if (tabName !== "dashboard") {
      fetchTabDetails(tabName);
    } else {
      fetchDashboard(token);
    }
  };

  // LOGIN VIEW
  if (!token) {
    return (
      <div className="admin-panel-root flex-1 flex items-center justify-center py-12 px-6">
        <div className="w-full max-w-md bg-white border border-slate-300 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          <div className="text-center flex flex-col gap-2 mb-8 relative z-10">
            <span className="text-xs uppercase font-extrabold text-[#008f60] font-mono tracking-wider">Restricted Access</span>
            <h1 className="text-3xl font-black text-slate-950 tracking-tight">Admin Login</h1>
            <p className="text-slate-700 text-xs font-medium leading-relaxed">
              Authenticate using your credentials to manage leads and publish articles.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 relative z-10">
            {loginError && (
              <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-2.5 rounded-lg text-xs font-mono font-bold">
                {loginError}
              </div>
            )}
            <div>
              <label className="block text-xs font-extrabold text-slate-900 mb-1">Username</label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-xs text-slate-950 font-medium focus:outline-none focus:border-[#00b87c]"
                placeholder="admin"
              />
            </div>
            <div>
              <label className="block text-xs font-extrabold text-slate-900 mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-xs text-slate-950 font-medium focus:outline-none focus:border-[#00b87c]"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#00b87c] hover:bg-[#008f60] text-white rounded-full font-extrabold text-xs uppercase tracking-wider transition-colors disabled:opacity-50 cursor-pointer shadow-lg shadow-[#00b87c]/20"
            >
              {loading ? "Verifying Credentials..." : "Authenticate"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ADMIN DASHBOARD VIEW
  return (
    <div className="admin-panel-root max-w-7xl mx-auto px-6 w-full py-6 flex flex-col md:grid md:grid-cols-12 gap-8 items-start">
      {/* Sidebar Navigation */}
      <div className="md:col-span-3 w-full bg-white border border-slate-300 rounded-3xl p-4 flex flex-col gap-1.5 shadow-md">
        <div className="text-xs uppercase font-extrabold text-slate-500 tracking-wider mb-2 px-3">Controls</div>
        <button
          onClick={() => handleTabChange("dashboard")}
          className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-extrabold transition-colors cursor-pointer ${
            activeTab === "dashboard" ? "bg-[#00b87c] text-white" : "text-slate-800 hover:bg-slate-100"
          }`}
        >
          📊 Dashboard Metrics
        </button>
        <button
          onClick={() => handleTabChange("enquiries")}
          className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-extrabold transition-colors cursor-pointer ${
            activeTab === "enquiries" ? "bg-[#00b87c] text-white" : "text-slate-800 hover:bg-slate-100"
          }`}
        >
          ✉ Customer Enquiries ({stats?.totalEnquiries || 0})
        </button>
        <button
          onClick={() => handleTabChange("calls")}
          className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-extrabold transition-colors cursor-pointer ${
            activeTab === "calls" ? "bg-[#00b87c] text-white" : "text-slate-800 hover:bg-slate-100"
          }`}
        >
          📞 Scheduled Calls ({stats?.totalCalls || 0})
        </button>
        <button
          onClick={() => handleTabChange("demos")}
          className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-extrabold transition-colors cursor-pointer ${
            activeTab === "demos" ? "bg-[#00b87c] text-white" : "text-slate-800 hover:bg-slate-100"
          }`}
        >
          🛍️ Demo Bookings ({stats?.totalDemos || 0})
        </button>
        <button
          onClick={() => handleTabChange("blogs")}
          className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-extrabold transition-colors cursor-pointer ${
            activeTab === "blogs" ? "bg-[#00b87c] text-white" : "text-slate-800 hover:bg-slate-100"
          }`}
        >
          📝 Manage Blog Feed
        </button>

        <div className="h-px bg-slate-200 my-2"></div>

        <button
          onClick={handleLogout}
          className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-extrabold text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
        >
          🚪 Terminate Session
        </button>
      </div>

      {/* Main Content Area */}
      <div className="md:col-span-9 w-full bg-white border border-slate-300 rounded-3xl p-6 md:p-8 min-h-[400px] shadow-md">
        {/* Active Tab Header */}
        <div className="border-b border-slate-200 pb-4 mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-black text-slate-950 tracking-tight">
            {activeTab === "dashboard"
              ? "Dashboard Metrics"
              : activeTab === "enquiries"
              ? "Customer Enquiries"
              : activeTab === "calls"
              ? "Scheduled Calls"
              : activeTab === "demos"
              ? "Booked Demos"
              : "Manage Blog Feed"}
          </h2>
          {loading && <span className="text-xs text-slate-500 font-mono font-bold">Syncing Database...</span>}
        </div>

        {/* 1. Dashboard Tab */}
        {activeTab === "dashboard" && stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div
              onClick={() => handleTabChange("enquiries")}
              className="bg-slate-50 border border-slate-300 hover:border-[#00b87c] hover:shadow-lg p-5 rounded-2xl cursor-pointer transition-all group"
            >
              <div className="text-xs uppercase tracking-wider font-extrabold text-slate-500 mb-1 group-hover:text-[#008f60]">
                Enquiries ↗
              </div>
              <div className="text-3xl font-black text-slate-950">{stats.totalEnquiries}</div>
            </div>
            <div
              onClick={() => handleTabChange("calls")}
              className="bg-slate-50 border border-slate-300 hover:border-[#00b87c] hover:shadow-lg p-5 rounded-2xl cursor-pointer transition-all group"
            >
              <div className="text-xs uppercase tracking-wider font-extrabold text-slate-500 mb-1 group-hover:text-[#008f60]">
                Scheduled Calls ↗
              </div>
              <div className="text-3xl font-black text-slate-950">{stats.totalCalls}</div>
            </div>
            <div
              onClick={() => handleTabChange("demos")}
              className="bg-slate-50 border border-slate-300 hover:border-[#00b87c] hover:shadow-lg p-5 rounded-2xl cursor-pointer transition-all group"
            >
              <div className="text-xs uppercase tracking-wider font-extrabold text-slate-500 mb-1 group-hover:text-[#008f60]">
                Demo Bookings ↗
              </div>
              <div className="text-3xl font-black text-slate-950">{stats.totalDemos}</div>
            </div>
            <div
              onClick={() => handleTabChange("blogs")}
              className="bg-slate-50 border border-slate-300 hover:border-[#00b87c] hover:shadow-lg p-5 rounded-2xl cursor-pointer transition-all group"
            >
              <div className="text-xs uppercase tracking-wider font-extrabold text-slate-500 mb-1 group-hover:text-[#008f60]">
                Blog Articles ↗
              </div>
              <div className="text-3xl font-black text-slate-950">{stats.totalBlogs}</div>
            </div>
          </div>
        )}

        {/* 2. Enquiries Tab */}
        {activeTab === "enquiries" && (
          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-300 text-slate-500">
                  <th className="pb-3 font-extrabold px-2">Client Details</th>
                  <th className="pb-3 font-extrabold px-2">Type</th>
                  <th className="pb-3 font-extrabold px-2">Message</th>
                  <th className="pb-3 font-extrabold px-2">Date</th>
                  <th className="pb-3 font-extrabold px-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {dataList.map((enq) => (
                  <tr key={enq.id} className="hover:bg-slate-50 font-medium">
                    <td className="py-3 px-2">
                      <div className="text-slate-950 font-bold">{enq.name}</div>
                      <div className="text-[11px] text-slate-600">
                        {enq.email} | {enq.phone || "No phone"}
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono">{enq.company || "No Company"}</div>
                    </td>
                    <td className="py-3 px-2 font-mono text-xs text-slate-800 font-bold">{enq.enquiry_type}</td>
                    <td className="py-3 px-2 text-slate-700 max-w-xs truncate" title={enq.message}>
                      {enq.message}
                    </td>
                    <td className="py-3 px-2 text-slate-600 font-mono">{new Date(enq.created_at).toLocaleDateString()}</td>
                    <td className="py-3 px-2">
                      <button
                        onClick={() => handleUpdateEnquiryStatus(enq.id, enq.status)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold cursor-pointer transition-colors ${
                          enq.status === "New"
                            ? "bg-red-100 text-red-700 hover:bg-red-200"
                            : enq.status === "In Progress"
                            ? "bg-amber-100 text-amber-800 hover:bg-amber-200"
                            : "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
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
                <tr className="border-b border-slate-300 text-slate-500">
                  <th className="pb-3 font-extrabold px-2">Client</th>
                  <th className="pb-3 font-extrabold px-2">Scheduled Datetime</th>
                  <th className="pb-3 font-extrabold px-2">Notes</th>
                  <th className="pb-3 font-extrabold px-2">Submitted</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {dataList.map((call) => (
                  <tr key={call.id} className="hover:bg-slate-50 font-medium">
                    <td className="py-3 px-2">
                      <div className="text-slate-950 font-bold">{call.name}</div>
                      <div className="text-[11px] text-slate-600">
                        {call.email} | {call.phone}
                      </div>
                    </td>
                    <td className="py-3 px-2 text-[#008f60] font-mono font-bold">
                      {new Date(call.scheduled_datetime).toLocaleString()}
                    </td>
                    <td className="py-3 px-2 text-slate-700 max-w-xs truncate" title={call.notes}>
                      {call.notes || "None"}
                    </td>
                    <td className="py-3 px-2 text-slate-600 font-mono">{new Date(call.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 4. Booked Demos Tab (With Mark Read, Archive, and Delete features) */}
        {activeTab === "demos" && (
          <div>
            {/* Active vs Archive Toggle Filter */}
            <div className="flex items-center gap-2 mb-6 border-b border-slate-200 pb-3">
              <button
                onClick={() => {
                  setDemoArchivedView(false);
                  fetchTabDetails("demos", false);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-extrabold cursor-pointer transition-colors ${
                  !demoArchivedView
                    ? "bg-[#00b87c] text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                Active Bookings
              </button>
              <button
                onClick={() => {
                  setDemoArchivedView(true);
                  fetchTabDetails("demos", true);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-extrabold cursor-pointer transition-colors ${
                  demoArchivedView
                    ? "bg-[#00b87c] text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                📁 Archived Demos
              </button>
            </div>

            <div className="overflow-x-auto text-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-300 text-slate-500">
                    <th className="pb-3 font-extrabold px-2">Client Details</th>
                    <th className="pb-3 font-extrabold px-2">Service Required</th>
                    <th className="pb-3 font-extrabold px-2">Booking Datetime</th>
                    <th className="pb-3 font-extrabold px-2">Read State</th>
                    <th className="pb-3 font-extrabold px-2 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {dataList.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="py-8 text-center text-slate-500 font-medium">
                        No {demoArchivedView ? "archived" : "active"} demo bookings found.
                      </td>
                    </tr>
                  ) : (
                    dataList.map((demo) => (
                      <tr key={demo.id} className="hover:bg-slate-50 font-medium">
                        <td className="py-3 px-2">
                          <div className="text-slate-950 font-bold flex items-center gap-2">
                            {demo.name}
                            {!demo.is_read && (
                              <span className="w-2 h-2 rounded-full bg-red-500 inline-block" title="Unread"></span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-600">
                            {demo.email} {demo.phone ? `| ${demo.phone}` : ""}
                          </div>
                          <div className="text-[11px] text-slate-500 font-mono">{demo.company || "No Company"}</div>
                        </td>
                        <td className="py-3 px-2 font-bold text-slate-900">{demo.service_required}</td>
                        <td className="py-3 px-2 text-[#008f60] font-mono font-bold">
                          {demo.booking_date} @ {demo.booking_time}
                        </td>
                        <td className="py-3 px-2">
                          <button
                            onClick={() => handleToggleDemoRead(demo.id, demo.is_read)}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold cursor-pointer transition-colors ${
                              demo.is_read
                                ? "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                            }`}
                          >
                            {demo.is_read ? "✓ Read" : "● Mark Read"}
                          </button>
                        </td>
                        <td className="py-3 px-2 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleToggleDemoArchive(demo.id, demo.is_archived)}
                              className="px-3 py-1 bg-amber-100 hover:bg-amber-200 text-amber-900 text-[11px] font-extrabold rounded-lg cursor-pointer transition-colors"
                            >
                              {demo.is_archived ? "Unarchive" : "Archive"}
                            </button>
                            <button
                              onClick={() => handleDeleteDemo(demo.id)}
                              className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 text-[11px] font-extrabold rounded-lg cursor-pointer transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 5. Blogs Managing Tab */}
        {activeTab === "blogs" && (
          <div className="space-y-12">
            {/* Create Blog Form */}
            <div className="bg-slate-50 border border-slate-300 p-6 rounded-2xl">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#008f60] mb-4">
                Publish a new article
              </h3>
              {blogSuccess && (
                <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 px-4 py-2.5 rounded-lg text-xs mb-4 font-bold">
                  Article published successfully!
                </div>
              )}
              <form onSubmit={handleBlogSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-900 font-extrabold mb-1">Title *</label>
                    <input
                      type="text"
                      required
                      value={blogForm.title}
                      onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-950 font-medium focus:outline-none focus:border-[#00b87c]"
                      placeholder="e.g. Next.js vs. Vanilla React"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-900 font-extrabold mb-1">Slug *</label>
                    <input
                      type="text"
                      required
                      value={blogForm.slug}
                      onChange={(e) => setBlogForm({ ...blogForm, slug: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-950 font-medium focus:outline-none focus:border-[#00b87c]"
                      placeholder="nextjs-vs-vanilla-react"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-900 font-extrabold mb-1">Category *</label>
                    <select
                      value={blogForm.category}
                      onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-950 font-medium focus:outline-none focus:border-[#00b87c]"
                    >
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-900 font-extrabold mb-1">Image URL</label>
                    <input
                      type="text"
                      value={blogForm.image_url}
                      onChange={(e) => setBlogForm({ ...blogForm, image_url: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-950 font-medium focus:outline-none focus:border-[#00b87c]"
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-900 font-extrabold mb-1">
                    Content (Markdown supported) *
                  </label>
                  <textarea
                    required
                    rows="5"
                    value={blogForm.content}
                    onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-950 font-mono"
                    placeholder="### Technical title..."
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#00b87c] hover:bg-[#008f60] text-white rounded-full font-extrabold transition-colors cursor-pointer uppercase tracking-wider text-xs"
                >
                  Publish Article
                </button>
              </form>
            </div>

            {/* List current blogs */}
            <div className="space-y-4">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Current Articles</h3>
              <div className="divide-y divide-slate-200">
                {dataList.map((post) => (
                  <div key={post.id} className="py-3 flex items-center justify-between text-xs gap-4 font-medium">
                    <div>
                      <a
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-slate-950 hover:text-[#00b87c] hover:underline flex items-center gap-1 group"
                      >
                        {post.title}
                        <span className="text-slate-400 group-hover:text-[#00b87c] transition-colors text-[10px]">
                          ↗
                        </span>
                      </a>
                      <span className="text-[11px] text-slate-500 font-mono">
                        Category: {post.category_name} | Slug: {post.slug}
                      </span>
                    </div>
                    <button
                      onClick={() => handleDeleteBlog(post.id)}
                      className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 font-bold rounded-lg cursor-pointer transition-colors"
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
