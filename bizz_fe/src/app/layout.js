import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatIcon from "@/components/ChatIcon";
import CookieConsent from "@/components/CookieConsent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Enterprise Custom Software & AI Automation Solutions",
  description: "We design and deploy scalable custom software engineering, private generative AI tools, SaaS cloud systems, and performance marketing channels for global brands.",
  keywords: ["custom software development", "AI automation", "SaaS development", "mobile app developer", "WhatsApp API marketing", "Kolkata software agency", "RCS messaging"],
  openGraph: {
    title: "Enterprise Custom Software & AI Automation Solutions",
    description: "Tailor-made software engineering, multi-tenant cloud platforms, and neural automation built for scale.",
    url: "https://softwaresolutions.co.in",
    siteName: "Software Solutions",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Enterprise Custom Software & AI Automation Solutions",
    description: "Tailor-made software engineering and generative AI platforms built to scale your business.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans bg-grid-pattern">
        <Navbar />
        <main className="flex-1 pt-24 pb-12 flex flex-col">
          {children}
        </main>
        <Footer />
        <ChatIcon />
        <CookieConsent />
      </body>
    </html>
  );
}
