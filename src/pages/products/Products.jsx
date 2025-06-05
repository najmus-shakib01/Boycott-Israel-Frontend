import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Error from "../../components/Error";
import Loader from "../../components/Loader";
import Pagination from "../../components/Pagination";
import PageTitle from "../../utils/PageTitle";
import NoProductFound from "./NoProductFound";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "all"
  );
  const navigate = useNavigate();

  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const itemsPerPage = 12;
  const cacheDuration = 1000 * 60 * 30;

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${baseUrl}/products/list/`, {
        params: {
          category: selectedCategory === "all" ? null : selectedCategory,
          search: search || null,
          page: currentPage,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${baseUrl}/products/categories/`);
      return response.data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  };

  const {
    data: productsData = { results: [], count: 0, total_pages: 1 },
    isLoading: productsLoading,
    isError: productsError,
  } = useQuery({
    queryKey: ["products", selectedCategory, search, currentPage],
    queryFn: fetchProducts,
    staleTime: cacheDuration,
  });

  const {
    data: categories = [],
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: cacheDuration,
  });

  const handleCategoryChange = (categoryName) => {
    const newParams = new URLSearchParams();
    if (search) newParams.set("search", search);
    if (categoryName !== "all") newParams.set("category", categoryName);

    setSearchParams(newParams, { replace: true });
    setSelectedCategory(categoryName);
  };

  const handlePageChange = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page);
    setSearchParams(params, { replace: true });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleResetFilters = () => {
    setSearch("");
    setSelectedCategory("all");
    setSearchParams({}, { replace: true });
  };

  const isLoading = productsLoading || categoriesLoading;
  const isError = productsError || categoriesError;

  const totalPages = Math.max(1, Math.ceil(productsData.count / itemsPerPage));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  return (
    <div className="mt-28 md:mt-36 lg:mt-36 xl:mt-36 mb-12 dark:bg-gray-900 transition-colors duration-300">
      <PageTitle title="ইসরায়েলের পন্য" />

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            ইসরায়েলের পণ্যসমূহ
          </h1>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <input
              type="text"
              placeholder="পন্য সার্চ করুন..."
              className="px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-white flex-grow"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => handleCategoryChange("all")}
            className={`px-3 py-1 rounded-full text-sm ${
              selectedCategory === "all"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            }`}
          >
            সব পন্য ({productsData.count})
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.name)}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedCategory === category.name
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="mb-4 text-gray-600 dark:text-gray-400">
          মোট পণ্য: {productsData.count} | দেখানো হচ্ছে:{" "}
          {productsData.results.length} | পৃষ্ঠা {safeCurrentPage} /{" "}
          {totalPages}
        </div>

        {isLoading ? (
          <Loader />
        ) : isError ? (
          <Error />
        ) : (
          <>
            {productsData.results.length === 0 ? (
              <NoProductFound onResetFilters={handleResetFilters} />
            ) : (
              <>
                <div className="grid gap-3 grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {productsData.results.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 border border-gray-200 dark:border-gray-700"
                    >
                      <div className="flex items-center p-1 md:p-4 lg:p-4 xl:p-4 border-b border-gray-200 dark:border-gray-700">
                        {product.company?.logo && (
                          <img
                            src={product.company.logo}
                            alt={product.company.name}
                            className="w-96 h-32 mx-auto block object-contain"
                            onError={(e) => {
                              e.target.src = "https://via.placeholder.com/150";
                            }}
                          />
                        )}
                      </div>

                      <div className="p-4 text-center">
                        <h2 className="text-md font-bold md:text-xl lg:text-2xl dark:text-white mb-2">
                          {product.company?.name || product.company}
                        </h2>
                        <button
                          onClick={() =>
                            navigate(
                              `/ইসরায়েলের-পন্যগুলোর-বিস্তারিত/${product.id}/`
                            )
                          }
                          className="text-lg whitespace-nowrap text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 font-medium"
                        >
                          বিস্তারিত জানুন &gt;&gt;
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {totalPages > 1 && (
                  <Pagination
                    totalItems={productsData.count}
                    itemsPerPage={itemsPerPage}
                    currentPage={safeCurrentPage}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default Products;
