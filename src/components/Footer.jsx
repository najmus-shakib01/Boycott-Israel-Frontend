import { useEffect } from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

const Footer = () => {

  // Back To Top button visibility
  useEffect(() => {
    const btn = document.querySelector(".back-to-top-btn");

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

  return (
    <>
      <footer className="bg-white dark:bg-gray-800 rounded-lg shadow-md pt-10 pb-6 text-gray-700 dark:text-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* GRID SECTIONS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-10">

            {/* ABOUT */}
            <section>
              <div className="flex items-center gap-3">
                <img
                  src="/logo.png"
                  className="w-16 h-16 rounded-full shadow border border-gray-300 dark:border-gray-700"
                  alt="footer-logo"
                />
                <h4 className="text-lg font-bold">🛑 বয়কট ইসরায়েল</h4>
              </div>

              <p className="leading-7 mt-3">
                ✊ আমরা নির্যাতিত মানুষের পাশে আছি —  
                বয়কট হোক প্রতিরোধের হাতিয়ার।  
                <br />
                🇵🇸 প্যালেস্টাইনের পক্ষে দাঁড়ান, অন্যায়ের বিরুদ্ধে আওয়াজ তুলুন।
              </p>
            </section>

            {/* CONTACT */}
            <section>
              <h3 className="font-bold text-xl mb-3">📞 যোগাযোগ</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <FaPhoneAlt /> +8801401997130
                </li>

                <li className="flex items-center gap-2">
                  <FaEnvelope /> syednazmusshakib94@gmail.com
                </li>

                <li>
                  <a
                    href="https://www.google.com/maps/@24.2693741,91.4762642,51m/data=!3m1!1e3"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline flex items-center gap-2"
                  >
                    <FaMapMarkerAlt /> BD, Sylhet, Habiganj
                  </a>
                </li>
              </ul>
            </section>

            {/* LEGAL */}
            <section>
              <h3 className="font-bold text-xl mb-3">⚖️ লিগ্যাল</h3>
              <ul className="space-y-2">
                <li>📄 Terms & Conditions</li>
                <li>🔐 Privacy Policy</li>
                <li>🍪 Cookie Policy</li>
              </ul>
            </section>

            {/* QUICK LINKS */}
            <section>
              <h3 className="font-bold text-xl mb-3">⚡ কুইক লিংকস</h3>
              <ul className="space-y-2">
                <li>🏠 Home</li>
                <li>🛍️ Product</li>
                <li>📝 Blog</li>
                <li>📬 Contact Us</li>
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
        className="
          fixed bottom-8 right-6 w-12 h-12 rounded-full
          flex items-center justify-center
          bg-emerald-600 dark:bg-emerald-500 
          text-white shadow-lg 
          hover:bg-emerald-700 dark:hover:bg-emerald-400
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
