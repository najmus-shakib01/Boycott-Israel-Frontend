import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import Error from "../../components/Error";
import Loader from "../../components/Loader";
import Time from "../../utils/formateData";
import PageTitle from "../../utils/PageTitle";
import NoProductFound from "../../components/NoDataFound";
import Boycott from "../../components/Boycott";
const baseUrl = import.meta.env.VITE_API_BASE_URL;

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
      const response = await axios.get(`${baseUrl}/products/list/${id}/`);
      return response.data;
    },
    staleTime: 1000 * 60 * 30
  });

  const { data: companies } = useQuery({
    queryKey: ["companies"],
    queryFn: async () => {
      const response = await axios.get(`${baseUrl}/products/companies/`);
      return response.data;
    },
    enabled: !!product,
  });

  const getCompanyInfo = () => {
    if (!product?.company) return { name: "Unknown", logo: null };

    if (typeof product.company === "string") {
      const foundCompany = companies?.find((c) => c.name === product.company);
      return {
        name: product.company,
        logo: foundCompany?.logo || null,
      };
    }

    if (product.company?.name) {
      const foundCompany = companies?.find(
        (c) => c.id === product.company.id || c.name === product.company.name
      );
      return {
        name: product.company.name,
        logo: foundCompany?.logo || null,
      };
    }

    return { name: "Unknown", logo: null };
  };

  const { name: companyName, logo: companyLogo } = getCompanyInfo();

  const getCategoryName = () => {
    if (!product?.category) return "Unknown";
    return typeof product.category === "string"
      ? product.category
      : product.category?.name || "Unknown";
  };

  if (isLoading) return <Loader />;
  if (isError) return <Error message={error.message} />;
  if (!product) return <NoProductFound />;

  return (
    <div className="mt-28 md:mt-36 lg:mt-36 xl:mt-36 mb-12 dark:bg-gray-900 transition-colors duration-300">
      <PageTitle title={"ইসরায়েলের পণ্যের বিস্তারিত"} />

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Boycott />
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden mt-11">
          <div className="p-6 md:p-8">
            {companyLogo && (
              <div className="p-4 flex justify-center">
                <img
                  src={companyLogo}
                  alt={companyName}
                  className="h-48 w-96 object-contain"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/384x192?text=No+Logo";
                  }}
                />
              </div>
            )}
            <h1 className="text-xl text-center md:text-xl font-bold mb-2">
              {companyName}
            </h1>

            <div className="flex flex-wrap gap-2 mb-4">
              Category :
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                {getCategoryName()}
              </span>
            </div>

            <div className="prose dark:prose-invert max-w-none">
              <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Description :
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2 text-justify">
                {product.description || "No description available"}
              </p>
              <h4 className="text-md font-bold text-gray-700 dark:text-gray-300 mb-2">
                Owned by : {product.owned_by || "Unknown"}
              </h4>
              <div>
                <h4 className="text-gray-500 mt-5 dark:text-gray-500 text-sm">
                  যোগের তারিখ : {Time(product.created_at)}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductsDetails;
