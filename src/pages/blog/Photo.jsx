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

const fetchBlobPhotos = async (page = 1) => {
  const response = await axios.get(`${baseUrl}/blob/blob-photo/?page=${page}`);
  return response.data;
};

const Photo = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [currentPage, setCurrentPage] = useState(() => {
    const urlPage = searchParams.get("page");
    return urlPage
      ? parseInt(urlPage, 20)
      : parseInt(localStorage.getItem("photoPage") || "1", 20);
  });

  const {
    data: photoData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["blob-photos", currentPage],
    queryFn: () => fetchBlobPhotos(currentPage),
    staleTime: 30 * 60 * 1000,
  });

  const handleCloseModal = (e) => {
    if (e.target === e.currentTarget || e.key === "Escape") {
      setSelectedPhoto(null);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    localStorage.setItem("photoPage", page.toString());

    const params = new URLSearchParams(searchParams);
    params.set("page", page);
    setSearchParams(params);
  };

  useEffect(() => {
    const pageFromUrl = searchParams.get("page");
    if (pageFromUrl) {
      setCurrentPage(parseInt(pageFromUrl, 10));
      localStorage.setItem("photoPage", pageFromUrl);
    }
  }, [searchParams]);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorMessage />;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Photos
      </h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {photoData?.results?.map((photo) => (
          <div
            key={photo.id}
            className="rounded-lg overflow-hidden shadow-md bg-white dark:bg-gray-800 cursor-pointer"
            onClick={() => setSelectedPhoto(photo)}
          >
            <img
              src={photo.photo}
              alt={photo.photoTitle}
              className="w-full h-48 object-cover"
              loading="lazy"
            />
            <div className="p-3">
              <p className="whitespace-pre-line break-words text-justify text-gray-700 dark:text-gray-200 leading-relaxed mb-4">
                {photo.photoTitle}
              </p>
              <p className="text-gray-500 mt-5 dark:text-gray-500 text-sm">
                যোগের তারিখ : {Time(photo.created_at)}
              </p>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        totalItems={photoData?.count || 0}
        itemsPerPage={12}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        storageKey="photoPage"
      />

      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={handleCloseModal}
        >
          <div className="relative max-w-4xl w-full">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute -top-10 right-0 text-white text-2xl hover:text-gray-300 p-2"
              aria-label="Close photo"
            >
              <FaTimes />
            </button>
            <img
              src={selectedPhoto.photo}
              alt={selectedPhoto.photoTitle}
              className="w-full max-h-[80vh] object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Photo;
