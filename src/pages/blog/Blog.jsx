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

  const setActiveTab = useCallback((tab) => {
    queryClient.setQueryData(["activeTab"], tab);

    const params = new URLSearchParams();
    params.set("tab", tab);
    setSearchParams(params, { replace: true });
  }, [queryClient, setSearchParams]);

  // Only sync on initial mount, not on every searchParams change
  if (isInitialMount.current) {
    isInitialMount.current = false;
  }

  return (
    <div className="pt-28 md:pt-32 lg:pt-36 pb-16 min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <PageTitle title="গাজার ফটো এবং ভিডিও" />

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* TABS */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700 overflow-hidden">
            <button
              onClick={() => setActiveTab("photos")}
              className={`
                px-6 py-2 text-sm font-medium transition
                ${
                  activeTab === "photos"
                    ? "bg-emerald-600 text-white"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }
              `}
            >
              ফটো
            </button>

            <button
              onClick={() => setActiveTab("videos")}
              className={`
                px-6 py-2 text-sm font-medium transition
                ${
                  activeTab === "videos"
                    ? "bg-emerald-600 text-white"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }
              `}
            >
              ভিডিও
            </button>
          </div>
        </div>

        {activeTab === "photos" && <Photo />}
        {activeTab === "videos" && <Video />}
      </section>
    </div>
  );
};

export default Blog;
