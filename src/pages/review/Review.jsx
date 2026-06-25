import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { FiMail, FiMessageSquare, FiUser } from "react-icons/fi";
import axiosClient from "../../configs/axios.config";
import PageTitle from "../../utils/PageTitle";

const Review = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      if (!formData.email)
        throw new Error("ইমেইল ফিল্ডটি পূরণ করুন");

      const response = await axiosClient.post("/contact/", formData);
      return response.data;
    },
    onSuccess: () => {
      toast.success("আপনার বার্তা সফলভাবে পাঠানো হয়েছে!");
      setFormData({ name: "", email: "", message: "" });
    },
    onError: (error) => {
      const message =
        error.response?.status === 429
          ? "আপনি অনেক বেশি বার্তা পাঠিয়েছেন। কিছুক্ষণ পর আবার চেষ্টা করুন।"
          : error.message || "বার্তা পাঠাতে সমস্যা হয়েছে।";
      toast.error(message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate();
  };

  return (
    <div className="pt-28 md:pt-32 pb-16 min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <PageTitle title="আপনার মতামত" />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            আপনার মতামত জানান
          </h1>

          <p className="mt-5 text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
            আমাদের ওয়েবসাইটের উন্নয়নে আপনার মতামত অত্যন্ত মূল্যবান।  
            আপনার প্রস্তাবনা, উন্নয়ন আইডিয়া অথবা নতুন তথ্য/ভিডিও শেয়ার করতে পারেন।
          </p>
        </div>

        {/* FORM CARD */}
        <div
          className="
            mt-10 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl 
            p-8 md:p-10 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 
            transition-all
          "
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            বার্তা পাঠান
          </h3>

          <form className="space-y-7" onSubmit={handleSubmit}>

            {/* NAME FIELD */}
            <div className="relative">
              <FiUser className="absolute left-4 top-4 text-gray-400 dark:text-gray-500" />

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="
                  w-full pl-12 pr-4 py-4 rounded-xl
                  bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200
                  border border-gray-300 dark:border-gray-600
                  focus:ring-2 focus:ring-emerald-500 focus:border-transparent
                  transition-all duration-200
                "
                placeholder="আপনার নাম"
              />
            </div>

            {/* EMAIL FIELD */}
            <div className="relative">
              <FiMail className="absolute left-4 top-4 text-gray-400 dark:text-gray-500" />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="
                  w-full pl-12 pr-4 py-4 rounded-xl
                  bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200
                  border border-gray-300 dark:border-gray-600
                  focus:ring-2 focus:ring-emerald-500 focus:border-transparent
                  transition-all duration-200
                "
                placeholder="আপনার ই-মেইল"
              />
            </div>

            {/* MESSAGE FIELD */}
            <div className="relative">
              <FiMessageSquare className="absolute left-4 top-4 text-gray-400 dark:text-gray-500" />

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                required
                className="
                  w-full pl-12 pr-4 py-4 rounded-xl resize-none
                  bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200
                  border border-gray-300 dark:border-gray-600
                  focus:ring-2 focus:ring-emerald-500 focus:border-transparent
                  transition-all duration-200
                "
                placeholder="আপনার বার্তা লিখুন..."
              ></textarea>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={isPending}
              className={`
                w-full py-4 rounded-xl text-lg font-semibold transition-all
                ${
                  isPending
                    ? "bg-emerald-400 cursor-not-allowed opacity-70"
                    : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-md hover:shadow-lg"
                }
              `}
            >
              {isPending ? "পাঠানো হচ্ছে..." : "বার্তা পাঠান"}
            </button>

          </form>
        </div>
      </section>
    </div>
  );
};

export default Review;
