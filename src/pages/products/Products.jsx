import { useQuery } from "@tanstack/react-query";
import { Search, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { BoycottStamp } from "../../components/BoycottLogo";
import Error from "../../components/Error";
import Loader from "../../components/Loader";
import Pagination from "../../components/Pagination";
import axiosClient from "../../configs/axios.config";
import PageTitle from "../../utils/PageTitle";
import NoProductFound from "./NoProductFound";

const toBengali = (num) =>
  String(num).replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[d]);

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "all"
  );

  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const itemsPerPage = 20;

  // Debounced URL synchronization
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
    refetch: refetchProducts,
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
    () => Math.max(1, Math.ceil((productsData?.count || 0) / itemsPerPage)),
    [productsData?.count]
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

  const hasNoResults =
    !isLoading && (!productsData?.results || productsData.results.length === 0);

  return (
    <div className="min-h-screen py-8 md:py-10">
      <PageTitle
        title={search ? `"${search}" — পণ্য তালিকা` : "ইসরায়েলের পণ্যসমূহ"}
        description="বাংলাদেশে প্রচলিত ও আন্তর্জাতিক বাজারে থাকা ইসরায়েলি পণ্য এবং ব্র্যান্ডের নির্ভরযোগ্য উন্মুক্ত তালিকা।"
        canonicalPath="/ইসরায়েলের-পন্যগুলো"
        noindex={hasNoResults}
      />

      <section className="max-w-[1120px] mx-auto px-4 space-y-6">
        {/* Header Title */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text">
            ইসরায়েলের পণ্যসমূহ
          </h1>
          <p className="text-muted text-sm md:text-base">
            নিচে তালিকাভুক্ত কোম্পানি ও পণ্যগুলো বয়কট আন্দোলনের অন্তর্ভুক্ত।
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-[520px] w-full">
          <div className="flex items-center gap-2 bg-surface border border-line rounded-full px-4 py-1 shadow-sm focus-within:border-primary focus-within:ring-2 focus-within:ring-primary-tint transition-all">
            <Search size={18} className="text-muted flex-none" aria-hidden="true" />
            <input
              type="search"
              value={search}
              placeholder="কোন পণ্য বা কোম্পানির নাম সার্চ করুন…"
              aria-label="পণ্য সার্চ"
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent border-0 text-text placeholder:text-muted min-h-[44px] focus:outline-none text-sm md:text-base font-sans"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                aria-label="সার্চ টেক্সট মুছুন"
                className="p-1 rounded-full text-muted hover:text-text cursor-pointer transition-colors"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>

        {/* Category Chips (Horizontally Scrollable) */}
        <div
          role="group"
          aria-label="ক্যাটাগরি ফিল্টার"
          className="flex items-center gap-2 overflow-x-auto py-2 custom-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          <button
            onClick={() => handleCategoryChange("all")}
            aria-pressed={selectedCategory === "all"}
            className={`flex-none min-h-[44px] px-5 rounded-full border text-sm font-medium transition-all cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
              selectedCategory === "all"
                ? "bg-primary border-primary text-on-primary shadow-sm"
                : "border-line bg-surface text-text hover:border-primary"
            }`}
          >
            সব পণ্য {productsData?.count ? `(${toBengali(productsData.count)})` : ""}
          </button>

          {categoriesData.map((category) => {
            const isSelected = selectedCategory === category.name;
            return (
              <button
                key={category.id || category.name}
                onClick={() => handleCategoryChange(category.name)}
                aria-pressed={isSelected}
                className={`flex-none min-h-[44px] px-5 rounded-full border text-sm font-medium transition-all cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  isSelected
                    ? "bg-primary border-primary text-on-primary shadow-sm"
                    : "border-line bg-surface text-text hover:border-primary"
                }`}
              >
                {category.name}
              </button>
            );
          })}
        </div>

        {/* Count & Boycott Notice */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm text-muted pt-1 border-t border-line/60">
          <p aria-live="polite">
            মোট পণ্য: {toBengali(productsData?.count || 0)} | দেখানো হচ্ছে:{" "}
            {toBengali(productsData?.results?.length || 0)}
          </p>
          <div className="flex items-center gap-2 text-xs md:text-sm">
            <BoycottStamp className="w-5 h-5 flex-none" />
            <span>এই চিহ্ন মানে পণ্যটি বয়কট তালিকাভুক্ত।</span>
          </div>
        </div>

        {/* Content States */}
        {isLoading ? (
          <Loader variant="products" count={itemsPerPage} />
        ) : isError ? (
          <Error onRetry={refetchProducts} />
        ) : !productsData?.results || productsData.results.length === 0 ? (
          <NoProductFound onResetFilters={handleResetFilters} />
        ) : (
          <>
            {/* Responsive Product Cards Grid */}
            <div className="grid gap-4 md:gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {productsData.results.map((product) => {
                const companyName = product.company?.name || "অজানা কোম্পানি";
                const logoUrl = product.company?.logo;

                return (
                  <Link
                    key={product.id}
                    to={`/ইসরায়েলের-পন্যগুলোর-বিস্তারিত/${product.id}/`}
                    className="rounded-[14px] border border-line bg-surface overflow-hidden shadow-sm hover:shadow-hover hover:-translate-y-1 transition-all text-center flex flex-col cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary relative text-inherit no-underline"
                  >
                    {/* Corner Stamp */}
                    <div
                      className="absolute top-2.5 left-2.5 z-10"
                      title="বয়কট পণ্য"
                    >
                      <BoycottStamp className="w-6 h-6 shadow-sm" />
                    </div>

                    {/* Logo Box */}
                    <div className="h-28 sm:h-32 w-full bg-primary-tint flex items-center justify-center p-3 relative overflow-hidden transition-colors">
                      {logoUrl ? (
                        <img
                          src={logoUrl}
                          alt={`${companyName} এর লোগো`}
                          loading="lazy"
                          width="144"
                          height="96"
                          className="max-h-20 sm:max-h-24 max-w-[80%] object-contain transition-transform group-hover:scale-105"
                        />
                      ) : (
                        <span className="font-bold text-xl sm:text-2xl text-primary font-sans">
                          {companyName}
                        </span>
                      )}
                    </div>

                    {/* Card Body */}
                    <div className="p-3 sm:p-4 flex flex-col justify-between flex-1 gap-2">
                      <strong className="font-semibold text-text text-sm sm:text-base line-clamp-1 group-hover:text-primary transition-colors">
                        {companyName}
                      </strong>
                      <span className="text-primary text-xs sm:text-sm font-medium">
                        বিস্তারিত দেখুন »
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Pagination */}
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
