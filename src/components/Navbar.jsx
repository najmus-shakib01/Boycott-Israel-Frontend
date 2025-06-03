import { Home, ImagePlay, Moon, ShoppingCart, Star, Sun } from "lucide-react";
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

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const navItems = [
    { label: "বয়কট-ইসরায়েল", path: "/", icon: Home },
    { label: "ইসরায়েলের-পন্যগুলো", path: "/ইসরায়েলের-পন্যগুলো", icon: ShoppingCart },
    { label: "ব্লগ-ছবি-ও-ভিডিও", path: "/ব্লগ-ছবি-ও-ভিডিও", icon: ImagePlay },
    { label: "আপনার-মতামত", path: "/আপনার-মতামত", icon: Star },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-white dark:bg-gray-800 shadow-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-5">
        <div className="flex items-center justify-between ">
          <div className="flex items-center gap-1">
            <img
              src={NavLogo}
              alt="Logo"
              className="w-10 h-10 md:w-16 md:h-16 rounded-full shadow border border-gray-300 dark:border-gray-700"
            />
          </div>
          <nav className="flex items-center gap-1 md:gap-6">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `
                  p-2 rounded-full transition-all
                  ${
                    isActive
                      ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }
                  group relative
                `}
              >
                <item.icon className="w-5 h-5 md:w-6 md:h-6" />
                <span
                  className="
                  hidden lg:block
                  absolute top-full left-1/2 -translate-x-1/2 mt-2
                  px-2 py-1 text-xs whitespace-nowrap
                  bg-gray-800 text-white dark:bg-gray-200 dark:text-black
                  rounded opacity-0 group-hover:opacity-100 transition-opacity
                  pointer-events-none
                "
                >
                  {item.label}
                </span>
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-blue-600 dark:bg-blue-400 text-white dark:text-black"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun size={16} className="md:w-5" />
              ) : (
                <Moon size={16} className="md:w-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
