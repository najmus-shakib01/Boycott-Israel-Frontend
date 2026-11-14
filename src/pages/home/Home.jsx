import { Search } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BoycottEmblem } from "../../components/BoycottLogo";
import PageTitle from "../../utils/PageTitle";
import HowIdentifyProducts from "./HowIdentifyProducts";
import PalestineHistory from "./PalestineHistory";
import WhatIsBoycott from "./WhatIsBoycott";

const Home = () => {
  const [heroQuery, setHeroQuery] = useState("");
  const navigate = useNavigate();

  const handleHeroSearch = (e) => {
    e.preventDefault();
    const q = heroQuery.trim();
    if (q) {
      navigate(`/ইসরায়েলের-পন্যগুলো?search=${encodeURIComponent(q)}`);
    } else {
      navigate("/ইসরায়েলের-পন্যগুলো");
    }
  };

  return (
    <div className="min-h-screen">
      <PageTitle
        title="বয়কট কী? কেন করব?"
        description="ইসরায়েলি ও বয়কটযোগ্য পণ্য চিহ্নিত করার নির্ভরযোগ্য উন্মুক্ত ডিরেক্টরি। ফিলিস্তিনের নিরীহ মানুষের সমর্থনে সচেতন হোন এবং বয়কট আন্দোলনে অংশ নিন।"
        canonicalPath="/"
      />

      {/* Hero Section */}
      <section className="bg-primary-dark text-white pt-10 sm:pt-14 pb-14 sm:pb-20 relative overflow-hidden transition-colors">
        {/* Large 7% Opacity Emblem Watermark */}
        <div
          aria-hidden="true"
          className="absolute -right-20 -bottom-24 w-[380px] sm:w-[460px] h-[380px] sm:h-[460px] opacity-[0.07] pointer-events-none select-none"
        >
          <BoycottEmblem className="w-full h-full text-white" />
        </div>

        <div className="max-w-[1120px] mx-auto px-4 relative z-10 space-y-5">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold tracking-tight">
            বয়কট কী? কেন <span className="text-[#FF8A93]">করব?</span>
          </h1>

          <p className="max-w-[60ch] text-[#CFE6DC] text-base sm:text-lg md:text-xl leading-relaxed">
            বয়কট হলো শান্তিপূর্ণ কিন্তু শক্তিশালী একটি প্রতিবাদী অস্ত্র — যা
            ক্রয়ের মাধ্যমে সরাসরি নির্যাতনকারীদের অর্থনৈতিক শক্তি কমিয়ে দেয়।
          </p>

          {/* Hero Search Box */}
          <form
            onSubmit={handleHeroSearch}
            role="search"
            className="flex items-center gap-2 bg-surface text-text rounded-full p-1.5 pl-4 max-w-[520px] shadow-lg focus-within:ring-2 focus-within:ring-white/50 transition-all"
          >
            <Search size={20} className="text-muted flex-none" aria-hidden="true" />
            <input
              type="search"
              value={heroQuery}
              onChange={(e) => setHeroQuery(e.target.value)}
              placeholder="কোন পণ্য বা কোম্পানির নাম সার্চ করুন…"
              aria-label="পণ্য সার্চ"
              className="flex-1 bg-transparent border-0 text-text placeholder:text-muted min-h-[44px] focus:outline-none text-sm sm:text-base font-sans"
            />
            <button
              type="submit"
              className="min-h-[44px] px-5 sm:px-6 rounded-full bg-primary hover:bg-[#0A3F31] text-on-primary font-semibold text-sm sm:text-base transition-all cursor-pointer flex-none"
            >
              সার্চ করুন
            </button>
          </form>

          {/* Hero CTA Actions */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            <Link
              to="/ইসরায়েলের-পন্যগুলো"
              className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-full bg-white text-[#0A3F31] font-semibold text-sm sm:text-base hover:bg-gray-100 hover:-translate-y-0.5 transition-all shadow-md"
            >
              ইসরায়েলের পণ্যগুলো দেখুন
            </Link>
            <a
              href="#how"
              className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-full border border-white/50 text-white font-semibold text-sm sm:text-base hover:bg-white/10 transition-all"
            >
              কীভাবে চিনবেন
            </a>
          </div>
        </div>
      </section>

      {/* Main Home Content */}
      <div className="max-w-[1120px] mx-auto px-4 space-y-12 md:space-y-16 pt-8 pb-12">
        <WhatIsBoycott />
        <HowIdentifyProducts />
        <PalestineHistory />
      </div>
    </div>
  );
};

export default Home;
