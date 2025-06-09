import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
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
      ? parseInt(urlPage, 20)
      : parseInt(localStorage.getItem("videoPage") || "1", 20);
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

  const handleCloseModal = (e) => {
    if (e.target === e.currentTarget || e.key === "Escape") {
      setSelectedVideo(null);
    }
  };

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
      setCurrentPage(parseInt(pageFromUrl, 10));
      localStorage.setItem("videoPage", pageFromUrl);
    }
  }, [searchParams]);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorMessage message="Failed to load videos" />;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Videos
      </h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {videoData?.results?.map((video) => (
          <div
            key={video.id}
            className="rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800 relative group cursor-pointer"
            onClick={() => setSelectedVideo(video)}
          >
            <div className="relative pt-[56.25%]">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={video.video}
                title={video.videoTitle}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="p-4">
              <p className="whitespace-pre-line break-words text-justify text-gray-700 dark:text-gray-200 leading-relaxed mb-4">
                {video.videoTitle}
              </p>
              <p className="text-gray-500 mt-5 dark:text-gray-500 text-sm">
                যোগের তারিখ : {Time(video.created_at)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Pagination
        totalItems={videoData?.count || 0}
        itemsPerPage={12}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        storageKey="videoPage"
      />

      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={handleCloseModal}
        >
          <div className="relative w-full h-full max-w-6xl max-h-[90vh]">
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute -top-10 right-0 text-white text-2xl hover:text-gray-300 z-10 p-2"
              aria-label="Close video"
            >
              <FaTimes />
            </button>
            <div className="relative w-full h-full">
              <iframe
                className="w-full h-full"
                src={selectedVideo.video}
                title={selectedVideo.videoTitle}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Video;
