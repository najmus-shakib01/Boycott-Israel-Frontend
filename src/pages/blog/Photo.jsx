import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import axiosClient from "../../configs/axios.config";
import ErrorMessage from "../../components/Error";
import LoadingSpinner from "../../components/Loader";
import Pagination from "../../components/Pagination";
import Time from "../../utils/formateData";

const Photo = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [currentPage, setCurrentPage] = useState(() => {
    const urlPage = searchParams.get("page");
    return urlPage
      ? parseInt(urlPage)
      : parseInt(localStorage.getItem("photoPage") || "1");
  });

  const fetchBlobPhotos = useCallback(async () => {
    const response = await axiosClient.get(`/blob/blob-photo/?page=${currentPage}`);
    return response.data;
  }, [currentPage]);

  const {
    data: photoData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["blob-photos", currentPage],
    queryFn: fetchBlobPhotos,
  });

  const handlePageChange = (page) => {
    setCurrentPage(page);
    localStorage.setItem("photoPage", page.toString());

    const params = new URLSearchParams(searchParams);
    params.set("page", String(page));
    setSearchParams(params);
  };

  useEffect(() => {
    const pageFromUrl = searchParams.get("page");
    if (pageFromUrl) {
      setCurrentPage(parseInt(pageFromUrl));
      localStorage.setItem("photoPage", pageFromUrl);
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

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorMessage />;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
        গাজার ফটো
      </h2>

      {/* PHOTO GRID */}
      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {photoData?.results?.map((photo) => (
          <div
            key={photo.id}
            className="rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow hover:shadow-lg transition cursor-pointer"
            onClick={() => setSelectedPhoto(photo)}
          >
            <img
              src={photo.photo}
              alt={photo.photoTitle}
              className="w-full h-56 object-cover"
              loading="lazy"
            />

            <div className="p-4">
              <p className="text-gray-700 dark:text-gray-300 text-justify">
                {photo.photoTitle}
              </p>

              <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
                যোগের তারিখ: {Time(photo.created_at)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <Pagination
        totalItems={photoData?.count || 0}
        itemsPerPage={20}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      {/* MODAL */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={(e) =>
            e.target === e.currentTarget && setSelectedPhoto(null)
          }
        >
          <div className="relative max-w-4xl w-full">
            <button
              className="absolute -top-10 right-0 text-white text-2xl hover:text-gray-300 transition"
              onClick={() => setSelectedPhoto(null)}
            >
              <FaTimes />
            </button>

            <img
              src={selectedPhoto.photo}
              alt={selectedPhoto.photoTitle}
              className="w-full max-h-[80vh] object-contain rounded-xl shadow-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Photo;
