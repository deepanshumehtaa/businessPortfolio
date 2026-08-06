"use client";

import Link from "next/link";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-zinc-950 border-t border-white/5 pt-16 pb-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        {/* Col 1: About & Info */}
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-black tracking-wider text-white">
              SOFTWARE<span className="text-primary">SOLUTIONS</span>
            </span>
          </Link>
          <p className="text-sm text-zinc-400 leading-relaxed">
            We deliver state-of-the-art custom enterprise software, advanced generative AI tools, scalable SaaS platforms, and performance-driven digital growth funnels.
          </p>
          <div className="flex gap-4 mt-2">
            {/* Social icons */}
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors">
              LinkedIn
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors">
              Twitter
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors">
              GitHub
            </a>
          </div>
        </div>

        {/* Col 2: Engineering Solutions */}
        <div>
          <h4 className="text-sm font-semibold text-zinc-200 uppercase tracking-wider mb-6">Engineering</h4>
          <ul className="space-y-3 text-sm">
            <li>
              <Link href="/services/custom-software-development" className="text-zinc-400 hover:text-primary transition-colors">
                Custom Software Development
              </Link>
            </li>
            <li>
              <Link href="/services/ai-ml-automation" className="text-zinc-400 hover:text-primary transition-colors">
                AI & ML Automation
              </Link>
            </li>
            <li>
              <Link href="/services/saas-platform-engineering" className="text-zinc-400 hover:text-primary transition-colors">
                SaaS Cloud Engineering
              </Link>
            </li>
            <li>
              <Link href="/services/mobile-app-development" className="text-zinc-400 hover:text-primary transition-colors">
                Mobile App Engineering
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Marketing Growth */}
        <div>
          <h4 className="text-sm font-semibold text-zinc-200 uppercase tracking-wider mb-6">Growth Solutions</h4>
          <ul className="space-y-3 text-sm">
            <li>
              <Link href="/services/performance-marketing-analytics" className="text-zinc-400 hover:text-primary transition-colors">
                Performance Marketing
              </Link>
            </li>
            <li>
              <Link href="/services/whatsapp-business-api-marketing" className="text-zinc-400 hover:text-primary transition-colors">
                WhatsApp API Marketing
              </Link>
            </li>
            <li>
              <Link href="/services/rcs-messaging-automation" className="text-zinc-400 hover:text-primary transition-colors">
                RCS Messaging & SMS
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 4: Contact details */}
        <div>
          <h4 className="text-sm font-semibold text-zinc-200 uppercase tracking-wider mb-6">Reach Us</h4>
          <p className="text-sm text-zinc-400 mb-2">
            <strong>Headquarters:</strong> Tech Hub, Sector V, Kolkata, WB 700091
          </p>
          <p className="text-sm text-zinc-400 mb-2">
            <strong>Call:</strong> <a href="tel:+918961716583" className="hover:text-primary transition-colors">+91 89617 16583</a>
          </p>
          <p className="text-sm text-zinc-400">
            <strong>Email:</strong> <a href="mailto:info@softwaresolutions.co.in" className="hover:text-primary transition-colors">info@softwaresolutions.co.in</a>
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
        <div>
          &copy; {new Date().getFullYear()} Software Solutions Technologies. All rights reserved. 
          <span className="mx-2">|</span>
          <Link href="/admin" className="hover:text-white transition-colors underline">Admin Dashboard</Link>
        </div>
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          <button onClick={scrollToTop} className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer">
            Back to Top &uarr;
          </button>
        </div>
      </div>
    </footer>
  );
}
