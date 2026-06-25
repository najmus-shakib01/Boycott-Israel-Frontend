import { useEffect } from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {

  // Back To Top button visibility
  useEffect(() => {
    const btn = document.querySelector(".back-to-top-btn");
    if (!btn) return;

    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        btn.style.opacity = "1";
        btn.style.pointerEvents = "auto";
        btn.style.transform = "translateY(0)";
      } else {
        btn.style.opacity = "0";
        btn.style.pointerEvents = "none";
        btn.style.transform = "translateY(20px)";
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const quickLinks = [
    { label: "🏠 হোম", path: "/" },
    { label: "🛍️ পণ্যসমূহ", path: "/ইসরায়েলের-পন্যগুলো" },
    { label: "📝 ব্লগ", path: "/ব্লগ-ছবি-ও-ভিডিও" },
    { label: "📬 মতামত", path: "/আপনার-মতামত" },
  ];

  const legalLinks = [
    { label: "📄 Terms & Conditions", path: "/terms-and-conditions" },
    { label: "🔐 Privacy Policy", path: "/privacy-policy" },
    { label: "🍪 Cookie Policy", path: "/cookie-policy" },
  ];

  return (
    <>
      <footer className="bg-white dark:bg-gray-800 rounded-lg shadow-md pt-10 pb-6 text-gray-700 dark:text-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* GRID SECTIONS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-28 mb-10">

            {/* ABOUT */}
            <section>
              <div className="flex items-center gap-3">
                <img
                  src="/logo.png"
                  className="w-16 h-16 rounded-full shadow border border-gray-300 dark:border-gray-700"
                  alt="footer-logo"
                  loading="lazy"
                />
                <h4 className="text-lg font-bold">🛑 বয়কট ইসরায়েল</h4>
              </div>

              <p className="leading-7 mt-3">
                ✊ আমরা নির্যাতিত মানুষের পাশে আছি —  
                বয়কট হোক প্রতিরোধের হাতিয়ার।  
                <br />
                🇵🇸 প্যালেস্টাইনের পক্ষে দাঁড়ান, অন্যায়ের বিরুদ্ধে আওয়াজ তুলুন।
              </p>
            </section>
          
            {/* LEGAL */}
            <section>
              <h3 className="font-bold text-xl mb-3">⚖️ লিগ্যাল</h3>
              <ul className="space-y-2">
                {legalLinks.map((link) => (
                  <li key={link.path}>
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        `hover:text-emerald-500 transition ${
                          isActive ? "text-emerald-600 dark:text-emerald-400 font-semibold" : ""
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </section>

            {/* QUICK LINKS */}
            <section>
              <h3 className="font-bold text-xl mb-3">⚡ কুইক লিংকস</h3>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.path}>
                    <NavLink
                      to={link.path}
                      end={link.path === "/"}
                      className={({ isActive }) =>
                        `hover:text-emerald-500 transition ${
                          isActive ? "text-emerald-600 dark:text-emerald-400 font-semibold" : ""
                        }`
                      }
                    >
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* COPYRIGHT */}
          <div className="border-t pt-4 text-sm text-center text-gray-500 dark:text-gray-400">
            copyright © {new Date().getFullYear()} 🛑 boycott-israel — All rights
            reserved.
          </div>
        </div>
      </footer>

      {/* BACK TO TOP BUTTON */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className="
          fixed bottom-8 right-6 w-12 h-12 rounded-full
          flex items-center justify-center
          bg-emerald-600 dark:bg-emerald-500 
          text-white shadow-lg 
          hover:bg-emerald-700 dark:hover:bg-emerald-400
          hover:scale-110
          transition-all duration-300
          opacity-0 pointer-events-none
          back-to-top-btn
          z-50
        "
      >
        ↑
      </button>
    </>
  );
};

export default Footer;
