"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    enquiry_type: "General Inquiry",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:8000/api/enquiries/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccess(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          enquiry_type: "General Inquiry",
          message: "",
        });
      } else {
        const errData = await res.json();
        setError(JSON.stringify(errData) || "Failed to submit. Please check your data.");
      }
    } catch (err) {
      setError("Failed to connect to the backend server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 w-full py-6 flex flex-col gap-16">
      {/* Introduction Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 flex flex-col gap-4">
          <span className="text-xs font-semibold text-primary uppercase tracking-widest">
            ⚡ Get In Touch
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            We&apos;re here to help
          </h1>
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-3xl">
            Whether you&apos;re exploring custom software for your organization, need to integrate verified WhatsApp marketing templates, or want to build a private AI RAG model, our team is ready to align. Get in touch today for technical scoping or implementation estimates.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Contact Form Section */}
        <div className="lg:col-span-7 bg-zinc-900/40 border border-white/5 rounded-3xl p-6 md:p-10 shadow-2xl relative">
          <h2 className="text-xl font-bold text-white mb-6 tracking-tight">Make an Enquiry</h2>

          {success ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                ✓
              </div>
              <h3 className="text-2xl font-semibold mb-2">Message Sent!</h3>
              <p className="text-zinc-400 text-sm mb-6">
                Your enquiry has been successfully logged. Our engineering lead will contact you within 1 business day.
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="px-6 py-2 bg-primary hover:bg-primary-hover text-white rounded-full text-xs font-bold transition-colors cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-950/40 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg text-xs font-mono">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-primary"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-primary"
                    placeholder="john@company.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-primary"
                    placeholder="+91-8961716583"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">Company Name</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-primary"
                    placeholder="Acme Inc"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">Enquiry Type *</label>
                <select
                  name="enquiry_type"
                  value={formData.enquiry_type}
                  onChange={handleChange}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-primary"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Custom Software Development">Custom Software Development</option>
                  <option value="AI & ML Automation">AI & ML Automation</option>
                  <option value="SaaS Cloud Engineering">SaaS Cloud Engineering</option>
                  <option value="Mobile App Development">Mobile App Development</option>
                  <option value="WhatsApp/RCS Marketing">WhatsApp/RCS Marketing</option>
                  <option value="Pricing / Rates Scopes">Pricing / Rates Scopes</option>
                  <option value="Technical Support">Technical Support</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">Message *</label>
                <textarea
                  name="message"
                  required
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-primary"
                  placeholder="Tell us about your project features, expected timelines, or technical stack..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-primary hover:bg-primary-hover text-white rounded-lg font-bold text-xs uppercase tracking-wider transition-colors disabled:opacity-50 cursor-pointer shadow-lg shadow-primary/20"
              >
                {loading ? "Submitting..." : "Send Enquiry"}
              </button>
            </form>
          )}
        </div>

        {/* Directory Contacts & Addresses */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Call / Email Card */}
          <div className="bg-zinc-900/30 border border-white/5 rounded-2xl p-6 flex flex-col gap-4">
            <h3 className="text-sm font-semibold uppercase text-zinc-400 tracking-wider">Direct Channels</h3>
            
            <div className="flex flex-col gap-4 text-xs font-mono text-zinc-300">
              <div className="flex flex-col">
                <span className="text-[10px] text-zinc-500 font-bold">SALES ENQUIRIES</span>
                <a href="tel:+918961716583" className="text-white hover:text-primary transition-colors text-sm font-semibold">+91 89617 16583</a>
                <a href="mailto:sales@softwaresolutions.co.in" className="hover:text-primary transition-colors">sales@softwaresolutions.co.in</a>
              </div>

              <div className="flex flex-col border-t border-white/5 pt-4">
                <span className="text-[10px] text-zinc-500 font-bold">TECH SUPPORT & SLA</span>
                <a href="mailto:support@softwaresolutions.co.in" className="text-white hover:text-primary transition-colors text-sm font-semibold">support@softwaresolutions.co.in</a>
              </div>

              <div className="flex flex-col border-t border-white/5 pt-4">
                <span className="text-[10px] text-zinc-500 font-bold">BILLING & ACCOUNTS</span>
                <a href="mailto:accounts@softwaresolutions.co.in" className="hover:text-primary transition-colors">accounts@softwaresolutions.co.in</a>
              </div>
            </div>
          </div>

          {/* Location Card */}
          <div className="bg-zinc-900/30 border border-white/5 rounded-2xl p-6 flex flex-col gap-3">
            <h3 className="text-sm font-semibold uppercase text-zinc-400 tracking-wider">Our Office</h3>
            <p className="text-xs text-zinc-300 leading-relaxed">
              <strong>Software Solutions Technologies Pvt Ltd</strong><br />
              Block GP, Sector V, Salt Lake City,<br />
              Kolkata, West Bengal 700091, India
            </p>
            <div className="w-full h-32 bg-zinc-950 rounded-lg border border-white/5 flex items-center justify-center text-zinc-600 text-[10px] uppercase font-mono">
              [ Google Map Placeholder ]
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
