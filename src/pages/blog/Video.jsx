import { useQuery } from "@tanstack/react-query";
import { Play, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Error from "../../components/Error";
import Loader from "../../components/Loader";
import NoDataFound from "../../components/NoDataFound";
import Pagination from "../../components/Pagination";
import axiosClient from "../../configs/axios.config";
import Time from "../../utils/formateData";

const Video = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedVideo, setSelectedVideo] = useState(null);

  const [currentPage, setCurrentPage] = useState(() => {
    const urlPage = searchParams.get("page");
    return urlPage
      ? parseInt(urlPage, 10)
      : parseInt(localStorage.getItem("videoPage") || "1", 10);
  });

  const fetchBlobVideos = useCallback(async () => {
    const response = await axiosClient.get(`/blob/blob-video/?page=${currentPage}`);
    return response.data;
  }, [currentPage]);

  const {
    data: videoData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["blob-videos", currentPage],
    queryFn: fetchBlobVideos,
  });

  const handlePageChange = (page) => {
    setCurrentPage(page);
    try {
      localStorage.setItem("videoPage", page.toString());
    } catch {
      /* ignore */
    }

    const params = new URLSearchParams(searchParams);
    params.set("page", String(page));
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const pageFromUrl = searchParams.get("page");
    if (pageFromUrl) {
      setCurrentPage(parseInt(pageFromUrl, 10));
    }
  }, [searchParams]);

  // ESC key to close modal
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setSelectedVideo(null);
    };
    if (selectedVideo) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [selectedVideo]);

  if (isLoading) return <Loader variant="media" count={6} />;
  if (isError) return <Error onRetry={refetch} />;
  if (!videoData?.results || videoData.results.length === 0) {
    return <NoDataFound title="কোনো ভিডিও পাওয়া যায়নি" />;
  }

  const isDirectVideo = (url) =>
    url && (url.includes(".mp4") || url.includes("supabase.co"));

  return (
    <div className="space-y-6">
      {/* Video Grid */}
      <div className="grid gap-4 md:gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {videoData.results.map((video) => (
          <article
            key={video.id}
            onClick={() => setSelectedVideo(video)}
            className="rounded-[14px] border border-line bg-surface overflow-hidden shadow-sm hover:shadow-hover hover:-translate-y-1 transition-all cursor-pointer flex flex-col group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            tabIndex={0}
            role="button"
            aria-label={`ভিডিও দেখুন: ${video.videoTitle}`}
          >
            {/* Thumbnail / Video Container */}
            <div className="aspect-[16/10] w-full bg-slate-900 relative overflow-hidden flex items-center justify-center">
              {isDirectVideo(video.video) ? (
                <video
                  className="w-full h-full object-cover pointer-events-none"
                  src={video.video}
                  preload="metadata"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#3b4a44] to-[#1b2622] flex items-center justify-center text-white">
                  <Play size={40} className="opacity-80" />
                </div>
              )}

              {/* Play Icon Overlay */}
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center transition-all group-hover:bg-black/40">
                <div className="w-12 h-12 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                  <Play size={22} className="ml-0.5 fill-current" />
                </div>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-4 flex flex-col justify-between flex-1 gap-2">
              <p className="text-text font-medium text-sm md:text-base leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                {video.videoTitle}
              </p>
              {video.created_at && (
                <small className="text-muted text-xs block">
                  যোগের তারিখ: {Time(video.created_at)}
                </small>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        totalItems={videoData?.count || 0}
        itemsPerPage={20}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      {/* Video Lightbox Modal */}
      {selectedVideo && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedVideo.videoTitle}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedVideo(null);
          }}
        >
          <div className="relative max-w-4xl w-full bg-surface border border-line rounded-[22px] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            {/* Close Button */}
            <button
              onClick={() => setSelectedVideo(null)}
              aria-label="বন্ধ করুন"
              className="absolute top-3 right-3 z-10 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-all cursor-pointer"
            >
              <X size={20} />
            </button>

            <div className="aspect-video w-full bg-black flex items-center justify-center">
              {isDirectVideo(selectedVideo.video) ? (
                <video
                  className="w-full h-full object-contain"
                  src={selectedVideo.video}
                  controls
                  autoPlay
                />
              ) : (
                <iframe
                  className="w-full h-full border-0"
                  src={selectedVideo.video}
                  title={selectedVideo.videoTitle}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>

            <div className="p-4 sm:p-5 bg-surface border-t border-line">
              <h3 className="font-semibold text-text text-base sm:text-lg">
                {selectedVideo.videoTitle}
              </h3>
              {selectedVideo.created_at && (
                <p className="text-xs text-muted mt-1">
                  যোগের তারিখ: {Time(selectedVideo.created_at)}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Video;
