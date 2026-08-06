import { Plus_Jakarta_Sans, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatIcon from "@/components/ChatIcon";
import CookieConsent from "@/components/CookieConsent";
import CustomCursor from "@/components/CustomCursor";

const fontBody = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const fontHeading = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Best Software Company | Software Solutions",
  description: "Custom software development, SaaS cloud platforms, AI tools, App development, Performance Marketing, WhatsApp API & RCS messaging.",
  keywords: ["custom software development", "AI automation", "SaaS development", "mobile app developer", "WhatsApp API marketing", "Kolkata software agency", "RCS messaging"],
  openGraph: {
    title: "Best Software Company | Software Solutions",
    description: "Tailor-made software engineering, multi-tenant cloud platforms, and neural automation built for scale.",
    url: "https://softwaresolutions.co.in",
    siteName: "Software Solutions",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${fontBody.variable} ${fontHeading.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-800 font-sans selection:bg-[#00b87c] selection:text-white">
        <CustomCursor />
        <Navbar />
        <main className="flex-1 pt-28 pb-12 flex flex-col">
          {children}
        </main>
        <Footer />
        <ChatIcon />
        <CookieConsent />
      </body>
    </html>
  );
}
