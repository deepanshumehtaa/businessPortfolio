"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DemoModal from "./DemoModal";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("demo"); // 'demo' or 'call'
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
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
    { name: "Services", path: "/services" },
    { name: "Industries", path: "/industries" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path) => pathname === path;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-black/85 backdrop-blur-md py-4 border-b border-white/5 shadow-lg"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-xl font-black tracking-wider text-white">
              SOFTWARE<span className="text-primary">SOLUTIONS</span>
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-primary group-hover:scale-150 transition-transform"></div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`text-sm font-medium transition-colors hover:text-white ${
                  isActive(link.path) ? "text-primary font-bold" : "text-zinc-400"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={() => handleOpenModal("call")}
              className="text-xs font-semibold uppercase tracking-wider text-zinc-300 hover:text-white px-4 py-2 border border-zinc-800 rounded-full hover:border-zinc-500 transition-all cursor-pointer"
            >
              Schedule a Call
            </button>
            <button
              onClick={() => handleOpenModal("demo")}
              className="text-xs font-semibold uppercase tracking-wider bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-full transition-all shadow-md shadow-primary/20 hover:shadow-primary/45 cursor-pointer"
            >
              Book a Demo
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-zinc-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden glassmorphism mt-4 mx-6 rounded-2xl p-6 flex flex-col gap-4 animate-fade-in">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base font-medium transition-colors hover:text-white py-1 ${
                  isActive(link.path) ? "text-primary" : "text-zinc-400"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="h-px bg-zinc-800 my-2"></div>
            <button
              onClick={() => handleOpenModal("call")}
              className="w-full text-center py-2.5 border border-zinc-800 rounded-full text-sm font-semibold hover:border-zinc-500 transition-colors cursor-pointer"
            >
              Schedule a Call
            </button>
            <button
              onClick={() => handleOpenModal("demo")}
              className="w-full text-center py-2.5 bg-primary hover:bg-primary-hover text-white rounded-full text-sm font-semibold transition-colors cursor-pointer"
            >
              Book a Demo
            </button>
          </div>
        )}
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
