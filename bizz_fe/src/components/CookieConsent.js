"use client";

import { useState, useEffect } from "react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Delay slightly for natural UI flow
      const timer = setTimeout(() => setVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 md:left-8 md:max-w-md z-45 glassmorphism rounded-2xl p-5 shadow-2xl border-white/5 animate-fade-in flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <h4 className="text-sm font-semibold text-white tracking-wide">Cookie & Privacy Settings</h4>
        <p className="text-xs text-zinc-400 leading-relaxed">
          We use cookies to analyze site traffic, optimize page speed performance, and personalize ad metrics. By clicking &quot;Accept All&quot;, you consent to our use of tracking scripts.
        </p>
      </div>
      <div className="flex gap-3 text-xs font-semibold">
        <button
          onClick={handleAccept}
          className="flex-1 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg transition-colors cursor-pointer text-center"
        >
          Accept All
        </button>
        <button
          onClick={handleDecline}
          className="flex-1 py-2 border border-zinc-800 hover:border-zinc-500 text-zinc-300 rounded-lg transition-colors cursor-pointer text-center"
        >
          Decline
        </button>
      </div>
    </div>
  );
}
