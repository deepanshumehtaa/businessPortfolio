"use client";

import { useState } from "react";

export default function ChatIcon() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! I am your Software Solutions AI assistant. What type of business solution are you looking to build today?",
    },
  ]);
  const [step, setStep] = useState(1); // 1: choice selection, 2: email capture, 3: thank you
  const [selectedService, setSelectedService] = useState("");
  const [contactInfo, setContactInfo] = useState({ name: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSelectChoice = (choiceText) => {
    setSelectedService(choiceText);
    setMessages((prev) => [
      ...prev,
      { sender: "user", text: choiceText },
      {
        sender: "bot",
        text: `Excellent choice! Custom ${choiceText} is one of our primary solutions. To send you pricing details and book a brief consultation, could you please share your name and email?`,
      },
    ]);
    setStep(2);
  };

  const handleInputChange = (e) => {
    setContactInfo({ ...contactInfo, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!contactInfo.name || !contactInfo.email) return;

    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/enquiries/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contactInfo.name,
          email: contactInfo.email,
          phone: contactInfo.phone,
          enquiry_type: `AI Chat: ${selectedService}`,
          message: contactInfo.message || `Interested in custom solutions for ${selectedService}`,
        }),
      });

      if (res.ok) {
        setMessages((prev) => [
          ...prev,
          { sender: "user", text: `Name: ${contactInfo.name}, Email: ${contactInfo.email}` },
          {
            sender: "bot",
            text: "Thank you! I have successfully saved your details. Our tech manager will email you within 1 business day with custom proposals. Speak soon!",
          },
        ]);
        setStep(3);
      } else {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "Oops, we couldn't save your enquiry. Please check your email format or try again." },
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Network error. Please try sending a regular message through our Contact page." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const toggleChat = () => setIsOpen(!isOpen);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="w-80 md:w-96 h-[480px] bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden mb-4 animate-fade-in glassmorphism">
          {/* Header */}
          <div className="bg-primary px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse"></span>
              <h3 className="text-white text-sm font-semibold tracking-wide">Solutions AI Assistant</h3>
            </div>
            <button onClick={toggleChat} className="text-white hover:opacity-80 transition-opacity cursor-pointer">
              &times;
            </button>
          </div>

          {/* Chat Logs */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 flex flex-col text-xs md:text-sm">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`max-w-[80%] rounded-2xl px-4 py-2.5 leading-relaxed ${
                  msg.sender === "bot"
                    ? "bg-zinc-800 text-zinc-200 self-start rounded-tl-none border border-zinc-700/50"
                    : "bg-primary text-white self-end rounded-tr-none"
                }`}
              >
                {msg.text}
              </div>
            ))}

            {/* Step 1 choices */}
            {step === 1 && (
              <div className="flex flex-col gap-2 mt-2 self-start w-full">
                {[
                  "Custom ERP/CRM Software",
                  "AI Automation Tools",
                  "SaaS Platform Development",
                  "Mobile App Development",
                  "WhatsApp API Setup",
                ].map((choice) => (
                  <button
                    key={choice}
                    onClick={() => handleSelectChoice(choice)}
                    className="w-full text-left bg-zinc-800 hover:bg-primary/20 hover:text-white border border-zinc-700/60 rounded-xl px-4 py-2 transition-all cursor-pointer text-xs"
                  >
                    {choice} &rarr;
                  </button>
                ))}
              </div>
            )}

            {/* Step 2 Inputs */}
            {step === 2 && (
              <form onSubmit={handleFormSubmit} className="space-y-2 mt-2 w-full self-start bg-zinc-950/60 p-3 rounded-xl border border-white/5">
                <div>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Your Name *"
                    value={contactInfo.name}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Your Email *"
                    value={contactInfo.email}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone (Optional)"
                    value={contactInfo.phone}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-primary"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2 bg-primary hover:bg-primary-hover text-white rounded-lg text-xs font-semibold transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {loading ? "Saving lead..." : "Get Proposal details"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={toggleChat}
        className="w-14 h-14 rounded-full bg-primary hover:bg-primary-hover text-white shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 pulse-glow cursor-pointer"
        aria-label="Open support agent chat"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        )}
      </button>
    </div>
  );
}
