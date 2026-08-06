"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DemoModal from "./DemoModal";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("demo");
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleOpenModal = (type) => {
    setModalType(type);
    setModalOpen(true);
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/#about" },
    { name: "Services", path: "/services" },
    { name: "Industries", path: "/industries" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path) => pathname === path;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 flex flex-col shadow-sm">
        {/* Top Info Bar */}
        <div className="bg-[#070d19] text-slate-200 text-xs py-2 border-b border-[#00b87c]/30 hidden md:block">
          <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="inline-flex items-center gap-2 bg-[#00b87c]/20 text-[#00f5a0] px-3 py-0.5 rounded-full text-xs font-bold border border-[#00b87c]/40">
                <span className="pulse-dot"></span> LIVE STATUS: CERTIFIED SOFTWARE AGENCY
              </div>
              <div className="flex items-center gap-1 text-slate-300 font-medium">
                🎧 24/7 Hours Dedicated Tech Support
              </div>
            </div>

            <div className="flex items-center gap-6 font-medium">
              <a
                href="https://wa.me/918961716583"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#25D366] font-bold hover:underline flex items-center gap-1"
              >
                <span>💬 Quick WhatsApp</span>
              </a>
              <a href="mailto:info@softwaresolutions.co.in" className="hover:text-[#00b87c] text-slate-200 transition-colors">
                ✉ info@softwaresolutions.co.in
              </a>
              <a href="tel:+918961716583" className="hover:text-[#00b87c] text-slate-100 font-bold transition-colors">
                📞 Call: +91-8961716583
              </a>
            </div>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div
          className={`transition-all duration-300 ${
            scrolled
              ? "bg-white/95 backdrop-blur-md py-3 shadow-md border-b border-slate-200"
              : "bg-white py-4 border-b border-slate-200"
          }`}
        >
          <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-2xl font-black tracking-tight text-slate-950">
                SOFTWARE<span className="text-[#00b87c]">SOLUTIONS</span>
              </span>
              <div className="w-2.5 h-2.5 rounded-full bg-[#00b87c] group-hover:scale-125 transition-transform"></div>
            </Link>

            {/* Nav Links */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`text-sm font-extrabold transition-colors hover:text-[#00b87c] ${
                    isActive(link.path) ? "text-[#00b87c]" : "text-slate-900"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Action Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={() => handleOpenModal("call")}
                className="text-xs font-extrabold uppercase tracking-wider text-slate-900 hover:text-[#00b87c] px-4.5 py-2.5 border border-slate-300 hover:border-[#00b87c] rounded-full transition-all cursor-pointer bg-slate-50"
              >
                Schedule a Call
              </button>
              <button
                onClick={() => handleOpenModal("demo")}
                className="text-xs font-extrabold uppercase tracking-wider bg-[#00b87c] hover:bg-[#008f60] text-white px-5 py-2.5 rounded-full transition-all shadow-md shadow-[#00b87c]/30 hover:shadow-[#00b87c]/50 cursor-pointer"
              >
                Book a Demo
              </button>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-slate-900 hover:text-[#00b87c] transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Dropdown */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-white border-b border-slate-200 px-6 py-4 flex flex-col gap-3 shadow-xl animate-fade-in">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm font-extrabold py-1 ${
                    isActive(link.path) ? "text-[#00b87c]" : "text-slate-900"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-px bg-slate-200 my-1"></div>
              <button
                onClick={() => handleOpenModal("call")}
                className="w-full text-center py-2.5 border border-slate-300 rounded-full text-xs font-extrabold uppercase text-slate-900 cursor-pointer bg-slate-50"
              >
                Schedule a Call
              </button>
              <button
                onClick={() => handleOpenModal("demo")}
                className="w-full text-center py-2.5 bg-[#00b87c] text-white rounded-full text-xs font-extrabold uppercase cursor-pointer"
              >
                Book a Demo
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Embedded Demo / Call Modal */}
      <DemoModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialType={modalType}
      />
    </>
  );
}
