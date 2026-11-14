import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Boycott from "../../components/Boycott";
import { BoycottStamp } from "../../components/BoycottLogo";
import Error from "../../components/Error";
import Loader from "../../components/Loader";
import NoDataFound from "../../components/NoDataFound";
import axiosClient from "../../configs/axios.config";
import Time from "../../utils/formateData";
import PageTitle from "../../utils/PageTitle";

const ProductsDetails = () => {
  const { id } = useParams();

  const {
    data: product,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const response = await axiosClient.get(`/products/list/${id}/`);
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <div className="max-w-[760px] mx-auto px-4 py-12">
        <Loader variant="detail" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-[760px] mx-auto px-4 py-12">
        <Error message={error?.message} onRetry={refetch} />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-[760px] mx-auto px-4 py-12">
        <NoDataFound title="পণ্যটি খুঁজে পাওয়া যায়নি" />
      </div>
    );
  }

  const companyName =
    typeof product.company === "string"
      ? product.company
      : product.company?.name ?? "অজানা কোম্পানি";

  const category =
    typeof product.category === "string"
      ? product.category
      : product.category?.name ?? "সাধারণ";

  const companyLogo = product.company?.logo || null;

  return (
    <div className="min-h-screen py-8 md:py-12">
      <PageTitle title={`${companyName} — ইসরায়েলের পণ্যের বিস্তারিত`} />

      <section className="max-w-[760px] mx-auto px-4 space-y-6">
        {/* Back Link */}
        <div>
          <Link
            to="/ইসরায়েলের-পন্যগুলো"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-primary transition-colors min-h-[44px]"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            <span>পণ্য তালিকায় ফিরে যান</span>
          </Link>
        </div>

        {/* Boycott Header Badge */}
        <Boycott />

        {/* Main Details Card (styled matching reference dialog style) */}
        <article className="rounded-[22px] border border-line bg-surface p-6 sm:p-8 md:p-10 shadow-hover space-y-6">
          {/* Logo Showcase */}
          <div className="h-40 sm:h-48 rounded-[14px] bg-primary-tint flex items-center justify-center p-4 relative overflow-hidden">
            <div className="absolute top-3 left-3 z-10" title="বয়কট পণ্য">
              <BoycottStamp className="w-7 h-7" />
            </div>

            {companyLogo ? (
              <img
                src={companyLogo}
                alt={companyName}
                className="max-h-32 sm:max-h-36 max-w-[85%] object-contain"
                loading="lazy"
              />
            ) : (
              <span className="font-bold text-2xl sm:text-3xl text-primary font-sans">
                {companyName}
              </span>
            )}
          </div>

          {/* Title & Category Tag */}
          <div className="text-center space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-text">
              {companyName}
            </h1>
            <div>
              <span className="inline-block bg-primary-tint text-primary font-medium rounded-full px-4 py-1 text-sm">
                Category: {category}
              </span>
            </div>
          </div>

          {/* Description & Details */}
          <div className="border-t border-line pt-6 space-y-4">
            <h2 className="text-lg font-semibold text-text">বিবরণ / Description</h2>

            {product.description ? (
              <p className="text-text/90 leading-relaxed text-justify text-base">
                {product.description}
              </p>
            ) : (
              <p className="text-muted text-sm italic">
                এই পণ্যের বিস্তারিত বিবরণ এখনো যোগ করা হয়নি।
              </p>
            )}

            {product.owned_by && (
              <p className="text-sm font-medium text-muted">
                Owned by: <span className="text-text">{product.owned_by}</span>
              </p>
            )}

            {product.created_at && (
              <p className="text-xs text-muted pt-2 border-t border-line/50">
                যোগ করা হয়েছে: {Time(product.created_at)}
              </p>
            )}
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <Link
              to="/ইসরায়েলের-পন্যগুলো"
              className="inline-flex items-center justify-center w-full min-h-[48px] px-6 rounded-full bg-primary hover:bg-primary-dark text-on-primary font-semibold text-base transition-all shadow-sm cursor-pointer"
            >
              অন্যান্য পণ্য দেখুন
            </Link>
          </div>
        </article>
      </section>
    </div>
  );
};

export default ProductsDetails;
