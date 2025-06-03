import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PageTitle from "../../utils/PageTitle";
import Photo from "./Photo";
import Video from "./Video";

const Blog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(() => {
    return searchParams.get("tab") || "photos";
  });

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set("tab", activeTab);
    setSearchParams(params);
  }, [activeTab, searchParams, setSearchParams]);

  return (
    <div>
      <PageTitle key={"গাজার ফটো এবং ভিডিও"} title={"গাজার ফটো এবং ভিডিও"} />

      <section className="mt-28 md:mt-36 lg:mt-36 xl:mt-36 mb-12">
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              onClick={() => setActiveTab("photos")}
              className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                activeTab === "photos"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              ফটো
            </button>
            <button
              onClick={() => setActiveTab("videos")}
              className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                activeTab === "videos"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
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
