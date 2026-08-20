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
      const res = await fetch("/api/enquiries/", {
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
          <span className="inline-flex items-center gap-2 self-start text-xs font-extrabold text-[#008f60] uppercase tracking-widest bg-[#e6f9f3] px-4 py-1.5 rounded-full border border-[#00b87c]/30">
            ⚡ Get In Touch
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            We&apos;re here to <span className="text-[#00b87c]">help</span>
          </h1>
          <p className="text-slate-700 text-base md:text-lg font-medium leading-relaxed max-w-3xl">
            Whether you&apos;re exploring custom software for your organization, need to integrate verified WhatsApp marketing templates, or want to build a private AI RAG model, our team is ready to align. Get in touch today for technical scoping or implementation estimates.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Contact Form Section */}
        <div className="lg:col-span-7 bg-white border border-slate-300 rounded-3xl p-6 md:p-10 shadow-xl relative">
          <h2 className="text-2xl font-black text-slate-950 mb-6 tracking-tight">Make an Enquiry</h2>

          {success ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-[#e6f9f3] text-[#008f60] rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold border border-[#00b87c]/30">
                ✓
              </div>
              <h3 className="text-2xl font-extrabold text-slate-950 mb-2">Message Sent!</h3>
              <p className="text-slate-700 text-sm font-medium mb-6">
                Your enquiry has been successfully logged. Our engineering lead will contact you within 1 business day.
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="px-6 py-2.5 bg-[#00b87c] hover:bg-[#008f60] text-white rounded-full text-xs font-extrabold transition-colors cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg text-xs font-mono font-bold">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-extrabold text-slate-900 mb-1">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-xs text-slate-950 font-medium focus:outline-none focus:border-[#00b87c]"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-xs font-extrabold text-slate-900 mb-1">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-xs text-slate-950 font-medium focus:outline-none focus:border-[#00b87c]"
                    placeholder="john@company.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-extrabold text-slate-900 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-xs text-slate-950 font-medium focus:outline-none focus:border-[#00b87c]"
                    placeholder="+91-8961716583"
                  />
                </div>
                <div>
                  <label className="block text-xs font-extrabold text-slate-900 mb-1">Company Name</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-xs text-slate-950 font-medium focus:outline-none focus:border-[#00b87c]"
                    placeholder="Acme Inc"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-900 mb-1">Enquiry Type *</label>
                <select
                  name="enquiry_type"
                  value={formData.enquiry_type}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-xs text-slate-950 font-medium focus:outline-none focus:border-[#00b87c]"
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
                <label className="block text-xs font-extrabold text-slate-900 mb-1">Message *</label>
                <textarea
                  name="message"
                  required
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-xs text-slate-950 font-medium focus:outline-none focus:border-[#00b87c]"
                  placeholder="Tell us about your project features, expected timelines, or technical stack..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-[#00b87c] hover:bg-[#008f60] text-white rounded-full font-extrabold text-xs uppercase tracking-wider transition-colors disabled:opacity-50 cursor-pointer shadow-lg shadow-[#00b87c]/20"
              >
                {loading ? "Submitting..." : "Send Enquiry"}
              </button>
            </form>
          )}
        </div>

        {/* Directory Contacts & Addresses */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Call / Email Card */}
          <div className="bg-white border border-slate-300 rounded-3xl p-6 flex flex-col gap-4 shadow-md">
            <h3 className="text-xs font-extrabold uppercase text-slate-500 tracking-wider">Direct Channels</h3>
            
            <div className="flex flex-col gap-4 text-xs font-mono text-slate-800 font-semibold">
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-500 font-extrabold">SALES ENQUIRIES</span>
                <a href="tel:+918961716583" className="text-slate-950 hover:text-[#00b87c] transition-colors text-sm font-black">+91 89617 16583</a>
                <a href="mailto:sales@softwaresolutions.co.in" className="hover:text-[#00b87c] transition-colors">sales@softwaresolutions.co.in</a>
              </div>

              <div className="flex flex-col border-t border-slate-200 pt-4">
                <span className="text-[10px] text-slate-500 font-extrabold">TECH SUPPORT & SLA</span>
                <a href="mailto:support@softwaresolutions.co.in" className="text-slate-950 hover:text-[#00b87c] transition-colors text-sm font-black">support@softwaresolutions.co.in</a>
              </div>

              <div className="flex flex-col border-t border-slate-200 pt-4">
                <span className="text-[10px] text-slate-500 font-extrabold">BILLING & ACCOUNTS</span>
                <a href="mailto:accounts@softwaresolutions.co.in" className="hover:text-[#00b87c] transition-colors">accounts@softwaresolutions.co.in</a>
              </div>
            </div>
          </div>

          {/* Location Card */}
          <div className="bg-white border border-slate-300 rounded-3xl p-6 flex flex-col gap-3 shadow-md">
            <h3 className="text-xs font-extrabold uppercase text-slate-500 tracking-wider">Our Office</h3>
            <p className="text-xs text-slate-800 leading-relaxed font-medium">
              <strong className="text-slate-950 font-extrabold">Software Solutions Technologies Pvt Ltd</strong><br />
              Block GP, Sector V, Salt Lake City,<br />
              Kolkata, West Bengal 700091, India
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
