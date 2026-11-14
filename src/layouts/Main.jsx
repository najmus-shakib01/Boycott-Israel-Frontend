import { Suspense, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";

const Main = () => {
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-bg text-text antialiased selection:bg-primary-tint selection:text-primary transition-colors">
      <Navbar />
      <main id="main" className="flex-1 pb-16 lg:pb-8">
        <Suspense
          fallback={
            <div className="max-w-[1120px] mx-auto px-4 py-8">
              <Loader />
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default Main;
