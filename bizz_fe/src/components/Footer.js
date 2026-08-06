"use client";

import Link from "next/link";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#070d19] text-slate-300 border-t border-[#00b87c]/20 pt-16 pb-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        {/* Col 1: Brand Info */}
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-extrabold tracking-tight text-white">
              SOFTWARE<span className="text-[#00b87c]">SOLUTIONS</span>
            </span>
          </Link>
          <p className="text-xs text-slate-400 leading-relaxed">
            We build scalable custom software solutions, SaaS cloud platforms, mobile applications, and AI automation tools for startups, SMEs, and growing enterprises.
          </p>
          <div className="flex gap-4 mt-2 text-xs font-semibold">
            <a href="https://wa.me/918961716583" target="_blank" rel="noopener noreferrer" className="text-[#25D366] hover:underline">
              WhatsApp
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#00b87c] transition-colors">
              LinkedIn
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#00b87c] transition-colors">
              GitHub
            </a>
          </div>
        </div>

        {/* Col 2: Engineering Solutions */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-5">Engineering</h4>
          <ul className="space-y-2.5 text-xs text-slate-400">
            <li>
              <Link href="/services/custom-software-development" className="hover:text-[#00b87c] transition-colors">
                Custom Software Development
              </Link>
            </li>
            <li>
              <Link href="/services/ai-ml-automation" className="hover:text-[#00b87c] transition-colors">
                AI & Neural Automation
              </Link>
            </li>
            <li>
              <Link href="/services/saas-platform-engineering" className="hover:text-[#00b87c] transition-colors">
                SaaS Cloud Platforms
              </Link>
            </li>
            <li>
              <Link href="/services/mobile-app-development" className="hover:text-[#00b87c] transition-colors">
                Mobile App Engineering
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Digital Growth */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-5">Growth Channels</h4>
          <ul className="space-y-2.5 text-xs text-slate-400">
            <li>
              <Link href="/services/performance-marketing-analytics" className="hover:text-[#00b87c] transition-colors">
                Performance PPC Ads
              </Link>
            </li>
            <li>
              <Link href="/services/whatsapp-business-api-marketing" className="hover:text-[#00b87c] transition-colors">
                WhatsApp Business API
              </Link>
            </li>
            <li>
              <Link href="/services/rcs-messaging-automation" className="hover:text-[#00b87c] transition-colors">
                RCS Interactive SMS
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 4: Reach Us */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-5">Contact Details</h4>
          <p className="text-xs text-slate-400 mb-2">
            <strong className="text-white">Headquarters:</strong> Tech Hub, Sector V, Kolkata, WB 700091
          </p>
          <p className="text-xs text-slate-400 mb-2">
            <strong className="text-white">Call:</strong> <a href="tel:+918961716583" className="text-[#00b87c] font-semibold hover:underline">+91 89617 16583</a>
          </p>
          <p className="text-xs text-slate-400">
            <strong className="text-white">Email:</strong> <a href="mailto:info@softwaresolutions.co.in" className="hover:text-[#00b87c] transition-colors">info@softwaresolutions.co.in</a>
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div>
          &copy; {new Date().getFullYear()} Software Solutions. All rights reserved. 
          <span className="mx-2">|</span>
          <Link href="/admin" className="hover:text-white transition-colors underline">Admin Portal</Link>
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
