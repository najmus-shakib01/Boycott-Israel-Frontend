import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axiosClient from "../../configs/axios.config";
import Error from "../../components/Error";
import Loader from "../../components/Loader";
import Pagination from "../../components/Pagination";
import PageTitle from "../../utils/PageTitle";
import NoProductFound from "./NoProductFound";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "all"
  );

  const navigate = useNavigate();

  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const itemsPerPage = 20;

  // Debounced URL sync
  useEffect(() => {
    const delay = setTimeout(() => {
      const params = new URLSearchParams();

      if (search) params.set("search", search);
      if (selectedCategory !== "all") params.set("category", selectedCategory);
      params.set("page", String(currentPage));

      setSearchParams(params, { replace: true });
    }, 400);

    return () => clearTimeout(delay);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, selectedCategory, currentPage]);

  const fetchProducts = useCallback(async () => {
    const response = await axiosClient.get("/products/list/", {
      params: {
        category: selectedCategory === "all" ? null : selectedCategory,
        search: search || null,
        page: currentPage,
      },
    });
    return response.data;
  }, [selectedCategory, search, currentPage]);

  const fetchCategories = useCallback(async () => {
    const response = await axiosClient.get("/products/categories/");
    return response.data.results || response.data || [];
  }, []);

  const {
    data: productsData = { results: [], count: 0 },
    isLoading: productsLoading,
    isError: productsError,
  } = useQuery({
    queryKey: ["products", selectedCategory, search, currentPage],
    queryFn: fetchProducts,
  });

  const {
    data: categoriesData = [],
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const isLoading = productsLoading || categoriesLoading;
  const isError = productsError || categoriesError;

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(productsData.count / itemsPerPage)),
    [productsData.count]
  );

  const handleCategoryChange = (categoryName) => {
    const params = new URLSearchParams();

    if (categoryName !== "all") params.set("category", categoryName);
    if (search) params.set("search", search);

    params.set("page", "1");

    setSearchParams(params, { replace: true });
    setSelectedCategory(categoryName);
  };

  const handlePageChange = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(page));

    setSearchParams(params, { replace: true });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleResetFilters = () => {
    setSearch("");
    setSelectedCategory("all");
    setSearchParams({}, { replace: true });
  };

  return (
    <div className="pt-28 md:pt-32 lg:pt-36 pb-16 bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <PageTitle title="ইসরায়েলের পণ্য" />

      <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 space-y-6">

        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
          ইসরায়েলের পণ্যসমূহ
        </h1>

        <div className="relative max-w-md w-full">
          <Search
            size={20}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
          />

          <input
            type="text"
            value={search}
            placeholder="কোন পণ্য বা কোম্পানির নাম সার্চ করুন..."
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full pl-10 pr-10 py-2.5 rounded-xl 
              bg-white dark:bg-gray-800 
              text-gray-800 dark:text-gray-200 
              placeholder-gray-400 dark:placeholder-gray-500
              border border-gray-200 dark:border-gray-700
              shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent 
              transition
            "
          />

          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <X size={18} />
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleCategoryChange("all")}
            className={`px-4 py-2 rounded-full text-sm shadow-sm border transition ${
              selectedCategory === "all"
                ? "bg-emerald-600 text-white shadow-md"
                : "bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-700 hover:border-emerald-400 hover:text-emerald-500"
            }`}
          >
            সব পণ্য ({productsData.count})
          </button>

          {categoriesData.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.name)}
              className={`px-4 py-2 rounded-full text-sm shadow-sm border transition ${
                selectedCategory === category.name
                  ? "bg-emerald-600 text-white shadow-md"
                  : "bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-700 hover:border-emerald-400 hover:text-emerald-500"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="text-sm text-gray-600 dark:text-gray-400">
          মোট পণ্য: {productsData.count} | দেখানো হচ্ছে:{" "}
          {productsData.results.length}
        </div>

        {isLoading ? (
          <Loader />
        ) : isError ? (
          <Error />
        ) : productsData.results.length === 0 ? (
          <NoProductFound onResetFilters={handleResetFilters} />
        ) : (
          <>
            {/* GRID */}
            <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4">
              {productsData.results.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className="bg-white dark:bg-gray-800 shadow-sm rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-md transition overflow-hidden"
                >
                  <div className="p-3 border-b border-gray-100 dark:border-gray-700 flex justify-center h-28">
                    {product?.company?.logo && (
                      <img
                        src={product.company.logo}
                        alt={product.company?.name}
                        className="w-36 h-24 object-contain"
                        loading="lazy"
                      />
                    )}
                  </div>

                  <div className="p-4 text-center">
                    <h2 className="text-sm md:text-base font-bold text-gray-900 dark:text-gray-100 mb-2">
                      {product.company?.name || "Unknown"}
                    </h2>

                    <button
                      onClick={() =>
                        navigate(
                          `/ইসরায়েলের-পন্যগুলোর-বিস্তারিত/${product.id}/`
                        )
                      }
                      className="text-emerald-600 dark:text-emerald-400 font-medium hover:underline"
                    >
                      বিস্তারিত দেখুন »
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {totalPages > 1 && (
              <Pagination
                totalItems={productsData.count}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default Products;
