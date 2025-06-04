import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white shadow-md rounded p-6 dark:bg-gray-800 md:p-10 text-center text-gray-700 dark:text-gray-300">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8 text-left max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        {/* About Section */}
        <section>
          <ul className="space-y-1">
            <div className="flex items-center gap-2 font-bold">
              <div>
                <img
                  src="/logo.png"
                  className="w-16 h-16 rounded-full shadow border border-gray-300 dark:border-gray-700"
                  alt="footer-logo"
                />
              </div>
              <div>
                <h4>🛑 বয়কট ইসরায়েল</h4>
              </div>
            </div>
            <li className="leading-7">
              ✊ আমরা নির্যাতিত মানুষের পাশে আছি — বয়কট হোক প্রতিরোধের
              হাতিয়ার।
              <br />
              🇵🇸 প্যালেস্টাইনের পক্ষে দাঁড়ান, অন্যায়ের বিরুদ্ধে আওয়াজ তুলুন।
            </li>
          </ul>
        </section>

        {/* Contact Section */}
        <section>
          <h3 className="font-bold text-xl mb-2">📞 Contact</h3>
          <ul className="space-y-1">
            <li>
              <p className="flex items-center gap-1">
                <FaPhoneAlt /> +8801401997130
              </p>
            </li>
            <li>
              <p className="flex items-center gap-1">
                <FaEnvelope /> syednazmusshakib94@gmail.com
              </p>
            </li>
            <li>
              <a
                href="https://www.google.com/maps/@24.2693741,91.4762642,51m/data=!3m1!1e3?entry=ttu&g_ep=EgoyMDI1MDIyNC4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="underline flex items-center gap-1"
              >
                <FaMapMarkerAlt /> BD, Sylhet, Habiganj
              </a>
            </li>
          </ul>
        </section>

        {/* Legal Section */}
        <section>
          <h3 className="font-bold text-xl mb-2">⚖️ Legal</h3>
          <ul className="space-y-1">
            <li>
              <p>
                📄 Terms & Conditions
              </p>
            </li>
            <li>
              <p>
                🔐 Privacy Policy
              </p>
            </li>
            <li>
              <p>
                🍪 Cookie Policy
              </p>
            </li>
          </ul>
        </section>

        {/* Quick Links */}
        <section>
          <h3 className="font-bold text-xl mb-2">⚡ Quick Links</h3>
          <ul className="space-y-1">
            <li>
              <p>
                🏠 Home
              </p>
            </li>
            <li>
              <p>
                🛍️ Product
              </p>
            </li>
            <li>
              <p>
                📝 Blog
              </p>
            </li>
            <li>
              <p>
                📬 Contact Us
              </p>
            </li>
          </ul>
        </section>
      </div>

      <div className="border-t pt-4 text-sm text-gray-500 dark:text-gray-400">
        copyright © {new Date().getFullYear()} 🛑 boycott-israel — All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;
