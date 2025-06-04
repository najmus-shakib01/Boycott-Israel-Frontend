import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import Error from "../../components/Error";
import Loader from "../../components/Loader";
import PageTitle from "../../utils/PageTitle";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const fetchVisitorCount = async () => {
  const response = await axios.get(`${baseUrl}/visitor/`);
  return response.data;
};

const incrementVisitorCount = async () => {
  const response = await axios.post(`${baseUrl}/visitor/`);
  return response.data;
};

const Visitor = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["visitor-count"],
    queryFn: fetchVisitorCount,
    refetchInterval: 30000,
    staleTime: 10000,
  });

  const mutation = useMutation({
    mutationFn: incrementVisitorCount,
    onSuccess: () => {
      queryClient.invalidateQueries(["visitor-count"]);
    },
    onError: (error) => {
      console.error("Visitor count error:", error);
      toast.error("Failed to update visitor count");
    },
  });

  useEffect(() => {
    const trackVisit = () => {
      const sessionId =
        sessionStorage.getItem("visitSession") || Date.now().toString();
      sessionStorage.setItem("visitSession", sessionId);

      const lastVisitKey = `lastVisit-${sessionId}`;
      const lastVisit = localStorage.getItem(lastVisitKey);
      const now = Date.now();
      const thirtyMinutes = 30 * 60 * 1000;

      if (!lastVisit || now - parseInt(lastVisit) > thirtyMinutes) {
        mutation.mutate();
      }

      localStorage.setItem(lastVisitKey, now.toString());
    };

    trackVisit();
  }, [mutation]);

  const calculatePercentage = () => {
    if (!data?.count) return 1;
    return Math.min(Math.floor(Math.log10(data.count) * 10), 100);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Error message="Failed to load visitor count" />;
  }

  return (
    <div>
      <PageTitle title={"ওয়েবসাইট-মোট-কতজন-ভিজিট-করেছে-তার-কাউন্ট-দেখা"} />
      <section className="mt-28 md:mt-36 lg:mt-36 xl:mt-36 mb-12">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex flex-col items-center text-center bg-gray-200 dark:bg-gray-800 p-20 rounded-lg shadow-lg">
            <div className="relative mb-4">
              <div className="text-5xl font-bold text-gray-900 dark:text-white">
                {data?.count?.toLocaleString() || "0"}
              </div>
              <div className="absolute -bottom-2 right-0 text-green-600 dark:text-green-400 text-sm flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                    clipRule="evenodd"
                  />
                </svg>
                +{calculatePercentage()}%
              </div>
            </div>
            <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400">
              Total Website Visitors
            </h3>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Visitor;
