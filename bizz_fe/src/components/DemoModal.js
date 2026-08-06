"use client";

import { useState } from "react";

export default function DemoModal({ isOpen, onClose, initialType = "demo", services = [] }) {
  const [type, setType] = useState(initialType); // 'demo' or 'call'
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service_required: services[0]?.title || "Custom Software Development",
    booking_date: "",
    booking_time: "",
    scheduled_datetime: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const url =
      type === "demo"
        ? "http://localhost:8000/api/book-demo/"
        : "http://localhost:8000/api/schedule-call/";

    const payload =
      type === "demo"
        ? {
            name: formData.name,
            email: formData.email,
            company: formData.company,
            service_required: formData.service_required,
            booking_date: formData.booking_date,
            booking_time: formData.booking_time,
          }
        : {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            scheduled_datetime: formData.scheduled_datetime,
            notes: formData.notes,
          };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSuccess(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          service_required: services[0]?.title || "Custom Software Development",
          booking_date: "",
          booking_time: "",
          scheduled_datetime: "",
          notes: "",
        });
      } else {
        const errData = await res.json();
        setError(JSON.stringify(errData) || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Failed to connect to the backend server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
      <div className="relative w-full max-w-lg glassmorphism rounded-2xl p-6 md:p-8 shadow-2xl border-primary/30">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors text-xl font-bold cursor-pointer"
        >
          &times;
        </button>

        {/* Tab Selection */}
        <div className="flex border-b border-zinc-800 mb-6">
          <button
            onClick={() => { setType("demo"); setSuccess(false); setError(""); }}
            className={`flex-1 pb-3 text-center font-medium transition-colors cursor-pointer ${
              type === "demo" ? "text-primary border-b-2 border-primary" : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Book a Demo
          </button>
          <button
            onClick={() => { setType("call"); setSuccess(false); setError(""); }}
            className={`flex-1 pb-3 text-center font-medium transition-colors cursor-pointer ${
              type === "call" ? "text-primary border-b-2 border-primary" : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Schedule a Call
          </button>
        </div>

        {success ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              ✓
            </div>
            <h3 className="text-2xl font-semibold mb-2">Thank you!</h3>
            <p className="text-zinc-400">
              Your {type === "demo" ? "demo booking" : "call schedule"} request has been successfully recorded. Our team will reach out to you shortly.
            </p>
            <button
              onClick={() => { setSuccess(false); onClose(); }}
              className="mt-6 px-6 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-full font-medium transition-colors cursor-pointer"
            >
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-950/40 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">Your Name *</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary transition-colors"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">Email Address *</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary transition-colors"
                placeholder="john@company.com"
              />
            </div>

            {type === "demo" ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Company Name</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary transition-colors"
                    placeholder="Acme Corp"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Service Required *</label>
                  <select
                    name="service_required"
                    value={formData.service_required}
                    onChange={handleChange}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary transition-colors"
                  >
                    {services.length > 0 ? (
                      services.map((svc) => (
                        <option key={svc.id} value={svc.title}>
                          {svc.title}
                        </option>
                      ))
                    ) : (
                      <>
                        <option value="Custom Software Development">Custom Software Development</option>
                        <option value="AI & Machine Learning Automation">AI & Machine Learning Automation</option>
                        <option value="SaaS Platform Engineering">SaaS Platform Engineering</option>
                        <option value="Mobile App Development">Mobile App Development</option>
                        <option value="Performance Marketing & Analytics">Performance Marketing & Analytics</option>
                        <option value="WhatsApp Business API Marketing">WhatsApp Business API Marketing</option>
                        <option value="RCS Messaging & Automation">RCS Messaging & Automation</option>
                      </>
                    )}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-1">Date *</label>
                    <input
                      type="date"
                      name="booking_date"
                      required
                      value={formData.booking_date}
                      onChange={handleChange}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-1">Time Slot *</label>
                    <input
                      type="time"
                      name="booking_time"
                      required
                      value={formData.booking_time}
                      onChange={handleChange}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary transition-colors"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Preferred Datetime *</label>
                  <input
                    type="datetime-local"
                    name="scheduled_datetime"
                    required
                    value={formData.scheduled_datetime}
                    onChange={handleChange}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-1">Notes / Special Requests</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows="3"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary transition-colors"
                    placeholder="Briefly tell us what you'd like to discuss..."
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 bg-primary hover:bg-primary-hover text-white rounded-lg font-semibold transition-all duration-200 shadow-lg shadow-primary/20 hover:shadow-primary/40 disabled:opacity-50 cursor-pointer"
            >
              {loading ? "Submitting..." : type === "demo" ? "Book Product Demo" : "Confirm Call Appointment"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
