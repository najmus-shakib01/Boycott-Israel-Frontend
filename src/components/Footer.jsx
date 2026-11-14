import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BoycottLockup } from "./BoycottLogo";

const quickLinks = [
  { label: "হোম", path: "/" },
  { label: "পণ্যসমূহ", path: "/ইসরায়েলের-পন্যগুলো" },
  { label: "ব্লগ", path: "/ব্লগ-ছবি-ও-ভিডিও" },
  { label: "মতামত", path: "/আপনার-মতামত" },
];

const legalLinks = [
  { label: "Terms & Conditions", path: "/terms-and-conditions" },
  { label: "Privacy Policy", path: "/privacy-policy" },
  { label: "Cookie Policy", path: "/cookie-policy" },
];

const Footer = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <footer className="bg-surface border-t border-line pt-12 pb-24 lg:pb-8 mt-12 transition-colors">
        <div className="max-w-[1120px] mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Col 1: Brand & Mission */}
            <div className="md:col-span-2 space-y-4">
              <div>
                <BoycottLockup to="/" />
              </div>
              <p className="text-muted text-[0.95rem] leading-relaxed max-w-[38ch]">
                আমরা নির্যাতিত মানুষের পাশে আছি — বয়কট হোক প্রতিরোধের হাতিয়ার। প্যালেস্টাইনের পক্ষে দাঁড়ান, অন্যায়ের বিরুদ্ধে আওয়াজ তুলুন।
              </p>
            </div>

            {/* Col 2: Legal */}
            <div>
              <h3 className="font-semibold text-text text-base mb-3">লিগ্যাল</h3>
              <ul className="space-y-2">
                {legalLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="inline-flex items-center min-h-[36px] text-muted hover:text-primary transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Quick Links */}
            <div>
              <h3 className="font-semibold text-text text-base mb-3">কুইক লিংকস</h3>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="inline-flex items-center min-h-[36px] text-muted hover:text-primary transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-line mt-10 pt-6 text-center text-muted text-sm">
            copyright © {new Date().getFullYear()} boycott-israel — All rights reserved.
          </div>
        </div>
      </footer>

      {/* Floating Back to Top Button */}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          aria-label="উপরে যান"
          className="fixed right-4 bottom-[calc(80px+env(safe-area-inset-bottom,0px))] lg:bottom-6 w-11 h-11 rounded-full bg-primary text-on-primary shadow-hover grid place-items-center cursor-pointer z-20 hover:scale-105 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <ArrowUp size={20} strokeWidth={2.4} aria-hidden="true" />
        </button>
      )}
    </>
  );
};

export default Footer;
