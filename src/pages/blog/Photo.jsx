import { useQuery } from "@tanstack/react-query";
import { ImageOff, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Error from "../../components/Error";
import Loader from "../../components/Loader";
import NoDataFound from "../../components/NoDataFound";
import Pagination from "../../components/Pagination";
import axiosClient from "../../configs/axios.config";
import Time from "../../utils/formateData";

const Photo = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [imgErrors, setImgErrors] = useState({});

  const [currentPage, setCurrentPage] = useState(() => {
    const urlPage = searchParams.get("page");
    return urlPage
      ? parseInt(urlPage, 10)
      : parseInt(localStorage.getItem("photoPage") || "1", 10);
  });

  const fetchBlobPhotos = useCallback(async () => {
    const response = await axiosClient.get(`/blob/blob-photo/?page=${currentPage}`);
    return response.data;
  }, [currentPage]);

  const {
    data: photoData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["blob-photos", currentPage],
    queryFn: fetchBlobPhotos,
  });

  const handlePageChange = (page) => {
    setCurrentPage(page);
    try {
      localStorage.setItem("photoPage", page.toString());
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
      if (e.key === "Escape") setSelectedPhoto(null);
    };
    if (selectedPhoto) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [selectedPhoto]);

  if (isLoading) return <Loader variant="media" count={6} />;
  if (isError) return <Error onRetry={refetch} />;
  if (!photoData?.results || photoData.results.length === 0) {
    return <NoDataFound title="কোনো ফটো পাওয়া যায়নি" />;
  }

  return (
    <div className="space-y-6">
      {/* Photo Grid */}
      <div className="grid gap-4 md:gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {photoData.results.map((photo) => (
          <article
            key={photo.id}
            onClick={() => setSelectedPhoto(photo)}
            className="rounded-[14px] border border-line bg-surface overflow-hidden shadow-sm hover:shadow-hover hover:-translate-y-1 transition-all cursor-pointer flex flex-col group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            tabIndex={0}
            role="button"
            aria-label={`ছবি দেখুন: ${photo.photoTitle}`}
          >
            {/* Thumbnail */}
            <div className="aspect-[16/10] w-full bg-slate-800 relative overflow-hidden flex items-center justify-center">
              {imgErrors[photo.id] || !photo.photo ? (
                <div className="flex flex-col items-center justify-center text-slate-400 gap-2 p-4 text-center">
                  <ImageOff size={28} />
                  <span className="text-xs">ছবি লোড করা যায়নি</span>
                </div>
              ) : (
                <img
                  src={photo.photo}
                  alt={photo.photoTitle}
                  loading="lazy"
                  onError={() =>
                    setImgErrors((prev) => ({ ...prev, [photo.id]: true }))
                  }
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              )}
            </div>

            {/* Card Content */}
            <div className="p-4 flex flex-col justify-between flex-1 gap-2">
              <p className="text-text font-medium text-sm md:text-base leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                {photo.photoTitle}
              </p>
              {photo.created_at && (
                <small className="text-muted text-xs block">
                  যোগের তারিখ: {Time(photo.created_at)}
                </small>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        totalItems={photoData?.count || 0}
        itemsPerPage={20}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedPhoto.photoTitle}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedPhoto(null);
          }}
        >
          <div className="relative max-w-4xl w-full bg-surface border border-line rounded-[22px] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            {/* Close Button */}
            <button
              onClick={() => setSelectedPhoto(null)}
              aria-label="বন্ধ করুন"
              className="absolute top-3 right-3 z-10 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-all cursor-pointer"
            >
              <X size={20} />
            </button>

            <div className="flex-1 overflow-auto bg-black flex items-center justify-center max-h-[70vh]">
              <img
                src={selectedPhoto.photo}
                alt={selectedPhoto.photoTitle}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            <div className="p-4 sm:p-5 bg-surface border-t border-line">
              <h3 className="font-semibold text-text text-base sm:text-lg">
                {selectedPhoto.photoTitle}
              </h3>
              {selectedPhoto.created_at && (
                <p className="text-xs text-muted mt-1">
                  যোগের তারিখ: {Time(selectedPhoto.created_at)}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Photo;
