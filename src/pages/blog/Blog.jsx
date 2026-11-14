import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import PageTitle from "../../utils/PageTitle";
import Photo from "./Photo";
import Video from "./Video";

const Blog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const isInitialMount = useRef(true);

  const { data: activeTab } = useQuery({
    queryKey: ["activeTab"],
    initialData: searchParams.get("tab") || "photos",
  });

  const setActiveTab = useCallback(
    (tab) => {
      queryClient.setQueryData(["activeTab"], tab);
      const params = new URLSearchParams();
      params.set("tab", tab);
      setSearchParams(params, { replace: true });
    },
    [queryClient, setSearchParams]
  );

  if (isInitialMount.current) {
    isInitialMount.current = false;
  }

  const isPhotos = activeTab !== "videos";

  return (
    <div className="min-h-screen py-8 md:py-10">
      <PageTitle
        title={isPhotos ? "গাজার ফটো গ্যালারি" : "গাজার ভিডিও সংগ্রহ"}
        description="ফিলিস্তিন ও গাজার বাস্তব পরিস্থিতি, তথ্যবহুল ছবি ও প্রামাণ্য ভিডিও সংগ্রহ।"
        canonicalPath="/ব্লগ-ছবি-ও-ভিডিও"
      />

      <section className="max-w-[1120px] mx-auto px-4 space-y-6">
        {/* Segmented Tab Pill Control */}
        <div className="flex justify-center">
          <div
            role="tablist"
            aria-label="মিডিয়া ক্যাটাগরি"
            className="inline-flex items-center bg-surface border border-line rounded-full p-1 shadow-sm"
          >
            <button
              role="tab"
              id="tab-photos"
              aria-selected={isPhotos}
              aria-controls="panel-photos"
              onClick={() => setActiveTab("photos")}
              className={`min-h-[44px] px-6 sm:px-8 rounded-full font-semibold text-sm sm:text-base transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                isPhotos
                  ? "bg-primary text-on-primary shadow-sm"
                  : "text-muted hover:text-text bg-transparent"
              }`}
            >
              ফটো
            </button>

            <button
              role="tab"
              id="tab-videos"
              aria-selected={!isPhotos}
              aria-controls="panel-videos"
              onClick={() => setActiveTab("videos")}
              className={`min-h-[44px] px-6 sm:px-8 rounded-full font-semibold text-sm sm:text-base transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                !isPhotos
                  ? "bg-primary text-on-primary shadow-sm"
                  : "text-muted hover:text-text bg-transparent"
              }`}
            >
              ভিডিও
            </button>
          </div>
        </div>

        {/* Section Heading */}
        <h1 className="text-2xl sm:text-3xl font-bold text-text text-center sm:text-left">
          {isPhotos ? "গাজার ফটো গ্যালারি" : "গাজার ভিডিও সংগ্রহ"}
        </h1>

        {/* Tab Panels */}
        <div id="panel-media" role="tabpanel">
          {isPhotos ? <Photo /> : <Video />}
        </div>
      </section>
    </div>
  );
};

export default Blog;
