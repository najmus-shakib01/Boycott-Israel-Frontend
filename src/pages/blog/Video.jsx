import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import ErrorMessage from "../../components/Error";
import LoadingSpinner from "../../components/Loader";
import Pagination from "../../components/Pagination";
import Time from "../../utils/formateData";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const fetchBlobVideos = async (page = 1) => {
  const response = await axios.get(`${baseUrl}/blob/blob-video/?page=${page}`);
  return response.data;
};

const Video = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [currentPage, setCurrentPage] = useState(() => {
    const urlPage = searchParams.get("page");
    return urlPage
      ? parseInt(urlPage)
      : parseInt(localStorage.getItem("videoPage") || "1");
  });

  const {
    data: videoData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["blob-videos", currentPage],
    queryFn: () => fetchBlobVideos(currentPage),
    staleTime: 30 * 60 * 1000,
  });

  const handlePageChange = (page) => {
    setCurrentPage(page);
    localStorage.setItem("videoPage", page.toString());

    const params = new URLSearchParams(searchParams);
    params.set("page", page);
    setSearchParams(params);
  };

  useEffect(() => {
    const pageFromUrl = searchParams.get("page");
    if (pageFromUrl) {
      setCurrentPage(parseInt(pageFromUrl));
      localStorage.setItem("videoPage", pageFromUrl);
    }
  }, [searchParams]);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorMessage />;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
        গাজার ভিডিও
      </h2>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
        {videoData?.results?.map((video) => (
          <div
            key={video.id}
            className="rounded-xl overflow-hidden shadow bg-white dark:bg-gray-800 cursor-pointer hover:shadow-lg transition"
            onClick={() => setSelectedVideo(video)}
          >
            <div className="relative pt-[56.25%]">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={video.video}
                title={video.videoTitle}
                allowFullScreen
              />
            </div>

            <div className="p-4">
              <p className="text-gray-700 dark:text-gray-300 text-justify">
                {video.videoTitle}
              </p>

              <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
                যোগের তারিখ: {Time(video.created_at)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Pagination
        totalItems={videoData?.count || 0}
        itemsPerPage={20}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={(e) =>
            e.target === e.currentTarget && setSelectedVideo(null)
          }
        >
          <div className="relative max-w-5xl w-full max-h-[90vh]">
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute -top-10 right-0 text-white text-2xl"
            >
              <FaTimes />
            </button>

            <iframe
              className="w-full h-[80vh] rounded-xl shadow-xl"
              src={selectedVideo.video}
              title={selectedVideo.videoTitle}
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Video;
