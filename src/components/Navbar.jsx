import { Home, ImagePlay, Menu, Moon, ShoppingCart, Star, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import NavLogo from "/logo.png";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return (
      savedTheme === "dark" ||
      (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });

  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // ESC key to close mobile menu
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    if (mobileOpen) {
      document.addEventListener("keydown", handleEsc);
    }
    return () => document.removeEventListener("keydown", handleEsc);
  }, [mobileOpen]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const navItems = [
    { label: "বয়কট-ইসরায়েল", path: "/", icon: Home },
    { label: "ইসরায়েলের-পন্যগুলো", path: "/ইসরায়েলের-পন্যগুলো", icon: ShoppingCart },
    { label: "ব্লগ-ছবি-ও-ভিডিও", path: "/ব্লগ-ছবি-ও-ভিডিও", icon: ImagePlay },
    { label: "আপনার-মতামত", path: "/আপনার-মতামত", icon: Star },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-white dark:bg-gray-800 shadow-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-5">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2">
            <img
              src={NavLogo}
              alt="Logo"
              className="w-10 h-10 md:w-16 md:h-16 rounded-full shadow border border-gray-300 dark:border-gray-700"
            />
          </NavLink>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition
                  ${
                    isActive
                      ? "bg-emerald-600 text-white shadow"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`
                }
              >
                <item.icon size={18} />
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Dark Mode + Hamburger */}
          <div className="flex items-center gap-3">

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-emerald-600 dark:bg-emerald-400 text-white dark:text-black transition-transform hover:scale-105"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 rounded-lg bg-gray-200 dark:bg-gray-700"
              aria-label="Open menu"
            >
              <Menu size={22} className="text-gray-800 dark:text-gray-200" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Right Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50" onClick={() => setMobileOpen(false)}>
          <div
            className="absolute right-0 top-0 h-full w-72 bg-white dark:bg-gray-900 shadow-xl p-5 flex flex-col gap-6 transform transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <div className="flex justify-end">
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700"
                aria-label="Close menu"
              >
                <X size={22} className="text-gray-800 dark:text-gray-200" />
              </button>
            </div>

            {/* Drawer Menu Items */}
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/"}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg text-base transition
                    ${
                      isActive
                        ? "bg-emerald-600 text-white shadow"
                        : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`
                  }
                >
                  <item.icon size={20} />
                  {item.label}
                </NavLink>
              ))}
            </nav>

            {/* Dark Mode Switch Inside Drawer */}
            <div className="mt-auto pt-4 border-t border-gray-300 dark:border-gray-700">
              <button
                onClick={toggleDarkMode}
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 dark:bg-emerald-400 text-white dark:text-black py-3 rounded-lg transition-transform hover:scale-[1.02]"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                {darkMode ? "লাইট মোড" : "ডার্ক মোড"}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
