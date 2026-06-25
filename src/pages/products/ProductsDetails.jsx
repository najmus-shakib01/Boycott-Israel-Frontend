import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import axiosClient from "../../configs/axios.config";
import Boycott from "../../components/Boycott";
import Error from "../../components/Error";
import Loader from "../../components/Loader";
import NoProductFound from "../../components/NoDataFound";
import Time from "../../utils/formateData";
import PageTitle from "../../utils/PageTitle";

const ProductsDetails = () => {
  const { id } = useParams();

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const response = await axiosClient.get(`/products/list/${id}/`);
      return response.data;
    },
  });

  if (isLoading) return (
    <div className="pt-28 md:pt-32 lg:pt-36 pb-16 max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
      <Loader />
    </div>
  );
  if (isError) return <Error message={error.message} />;
  if (!product) return <NoProductFound />;

  const companyName =
    typeof product.company === "string"
      ? product.company
      : product.company?.name ?? "Unknown";

  const category =
    typeof product.category === "string"
      ? product.category
      : product.category?.name ?? "Unknown";

  const companyLogo = product.company?.logo || null;

  return (
    <div className="pt-28 md:pt-32 lg:pt-36 pb-20 bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <PageTitle title="ইসরায়েলের পণ্যের বিস্তারিত" />

      <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 space-y-10">
        {/* Boycott Badge */}
        <Boycott />

        {/* Main Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="
            bg-white dark:bg-gray-800 shadow-lg 
            rounded-2xl p-6 md:p-10 border border-gray-200 dark:border-gray-700
          "
        >
          {/* Company Logo */}
          {companyLogo && (
            <div className="flex justify-center mb-6">
              <img
                src={companyLogo}
                alt={companyName}
                className="h-40 w-72 object-contain rounded-md shadow-sm"
                loading="lazy"
              />
            </div>
          )}

          {/* Title */}
          <h1 className="text-xl md:text-2xl font-bold text-center text-gray-900 dark:text-gray-100 mb-5">
            {companyName}
          </h1>

          {/* Category */}
          <div className="flex justify-center mb-6">
            <span
              className="
              px-4 py-1.5 rounded-full text-sm 
              bg-emerald-100 dark:bg-gray-700 
              text-emerald-700 dark:text-emerald-300 
              shadow-sm border border-emerald-200 dark:border-gray-600
            "
            >
              Category: {category}
            </span>
          </div>

          {/* Description & Details */}
          <div className="prose dark:prose-invert max-w-none">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Description
            </h3>

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 text-justify">
              {product.description || "No description available"}
            </p>

            <p className="text-gray-700 dark:text-gray-300 text-sm font-medium mb-5">
              Owned by: {product.owned_by || "Unknown"}
            </p>

            <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
              যোগ করা হয়েছে: {Time(product.created_at)}
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default ProductsDetails;
