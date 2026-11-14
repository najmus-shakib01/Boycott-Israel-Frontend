import { Home, Image as ImageIcon, MessageSquare, Moon, ShoppingCart, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { BoycottLockup } from "./BoycottLogo";

const navItems = [
  { label: "বয়কট-ইসরায়েল", shortLabel: "হোম", path: "/", icon: Home, end: true },
  { label: "ইসরায়েলের-পণ্যগুলো", shortLabel: "পণ্য", path: "/ইসরায়েলের-পন্যগুলো", icon: ShoppingCart },
  { label: "ব্লগ-ছবি-ও-ভিডিও", shortLabel: "ছবি-ভিডিও", path: "/ব্লগ-ছবি-ও-ভিডিও", icon: ImageIcon },
  { label: "আপনার-মতামত", shortLabel: "মতামত", path: "/আপনার-মতামত", icon: MessageSquare },
];

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved) return saved === "dark";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      root.setAttribute("data-theme", "dark");
      try {
        localStorage.setItem("theme", "dark");
      } catch {
        /* ignore */
      }
    } else {
      root.classList.remove("dark");
      root.setAttribute("data-theme", "light");
      try {
        localStorage.setItem("theme", "light");
      } catch {
        /* ignore */
      }
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <>
      {/* Sticky Top Header */}
      <header className="sticky top-0 z-30 bg-surface/90 backdrop-blur-md border-b border-line pt-[env(safe-area-inset-top,0px)] transition-colors">
        <div className="max-w-[1120px] mx-auto px-4 h-[68px] flex items-center justify-between gap-4">
          {/* Brand Logo Lockup */}
          <div className="flex-none">
            <BoycottLockup to="/" />
          </div>

          {/* Desktop Navigation (>=1024px) */}
          <nav className="hidden lg:flex items-center gap-1 mx-auto" aria-label="প্রধান মেনু">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={({ isActive }) =>
                  `inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-full font-medium text-[0.95rem] transition-all ${
                    isActive
                      ? "bg-primary text-on-primary shadow-sm"
                      : "text-muted hover:bg-primary-tint hover:text-primary"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon size={18} strokeWidth={isActive ? 2.4 : 2} aria-hidden="true" />
                    <span>{item.label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Dark / Light Mode Toggle */}
          <div className="flex items-center">
            <button
              onClick={toggleDarkMode}
              className="w-11 h-11 rounded-full border border-line bg-surface text-text hover:bg-primary-tint hover:text-primary grid place-items-center cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label={darkMode ? "লাইট মোড চালু করুন" : "ডার্ক মোড চালু করুন"}
              title={darkMode ? "লাইট মোড" : "ডার্ক মোড"}
            >
              {darkMode ? (
                <Sun size={20} className="text-yellow-400" />
              ) : (
                <Moon size={20} />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile & Tablet Bottom Navigation (<1024px) */}
      <nav
        className="fixed inset-x-0 bottom-0 z-30 lg:hidden grid grid-cols-4 bg-surface/95 backdrop-blur-md border-t border-line px-2 pt-1 pb-[calc(4px+env(safe-area-inset-bottom,0px))] shadow-lg transition-colors"
        aria-label="মোবাইল মেনু"
      >
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 min-h-[48px] py-1 text-center rounded-lg transition-colors ${
                isActive
                  ? "text-primary font-semibold"
                  : "text-muted hover:text-primary"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon
                  size={20}
                  strokeWidth={isActive ? 2.5 : 1.8}
                  aria-hidden="true"
                />
                <span className="text-[0.75rem] leading-none">{item.shortLabel}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </>
  );
};

export default Navbar;
