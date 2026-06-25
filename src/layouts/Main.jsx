import { Suspense, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";

const Main = () => {
  const { pathname } = useLocation();

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Navbar />
      <Suspense
        fallback={
          <div className="pt-28 md:pt-32 lg:pt-36 pb-16 max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <Loader />
          </div>
        }
      >
        <Outlet />
      </Suspense>
      <Footer />
    </>
  );
};

export default Main;
