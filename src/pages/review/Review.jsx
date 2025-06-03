import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import toast from 'react-hot-toast';
import { FiMail, FiMessageSquare, FiUser } from "react-icons/fi";
import PageTitle from "../../utils/PageTitle";

const Review = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const accessKey = import.meta.env.VITE_EMAIL_VALIDATION_KEY;
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

  const validateEmail = async (email) => {
    try {
      const response = await axios.get(
        `https://apilayer.net/api/check?access_key=${accessKey}&email=${email}`
      );
      return response.data.format_valid && response.data.smtp_check;
    } catch (error) {
      console.error("Email validation failed:", error);
      return false;
    }
  };

  const submitContactForm = async (formData) => {
    const response = await axios.post(`${baseUrl}/contact/`, formData);
    return response.data;
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      if (!formData.email) {
        throw new Error("ইমেইল ফিল্ডটি পূরণ করুন");
      }

      const isEmailValid = await validateEmail(formData.email);
      if (!isEmailValid) {
        throw new Error("দুঃখিত, আপনি একটি বৈধ ইমেইল প্রদান করেননি");
      }

      return await submitContactForm(formData);
    },
    onSuccess: () => {
      toast.success("আপনার বার্তা সফলভাবে পাঠানো হয়েছে!");
      setFormData({ name: "", email: "", message: "" });
    },
    onError: (error) => {
      toast.error(error.message || "বার্তা পাঠাতে সমস্যা হয়েছে। পরে আবার চেষ্টা করুন।");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate();
  };

  return (
    <div>
      <PageTitle key={"আপনার মতামত"} title={"আপনার মতামত"} />
      <section className="mt-28 md:mt-36 lg:mt-36 xl:mt-36 mb-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">
            এই ওয়েবসাইট সম্পর্কে আপনার মতামত জানান
          </h1>
          <p className="mt-5 font-semibold text-center text-gray-700 dark:text-gray-300">
            আপনি যদি মনে করেন এই ওয়েবসাইটে আরও কিছু ফিচার যুক্ত করা উচিত, তাহলে
            দয়া করে আমাদের জানান। নতুন কোনো তথ্য, ছবি বা ভিডিও থাকলে তাও আমাদের
            সাথে শেয়ার করতে পারেন। আপনার মূল্যবান মতামত আমাদের ভবিষ্যৎ উন্নয়নের
            জন্য খুবই গুরুত্বপূর্ণ।
          </p>
        </div>

        <div className="bg-white mt-5 dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            আপনার বার্তা পাঠান
          </h3>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiUser className="text-gray-500 dark:text-gray-400 transition-colors" />
              </div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="আপনার নাম"
                className="w-full pl-12 pr-4 py-3 bg-transparent border-b-2 focus:outline-none text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
                required
              />
            </div>

            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiMail className="text-gray-500 dark:text-gray-400 transition-colors" />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="আপনার ই-মেইল"
                className="w-full pl-12 pr-4 py-3 bg-transparent border-b-2 focus:outline-none text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
                required
              />
            </div>

            <div className="relative group">
              <div className="absolute top-4 left-4">
                <FiMessageSquare className="text-gray-500 dark:text-gray-400 transition-colors" />
              </div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                placeholder="আপনার বার্তা লিখুন..."
                className="w-full pl-12 pr-4 py-3 bg-transparent border-b-2 focus:outline-none text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 resize-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className={`bg-gray-400 text-black p-3 dark:bg-gray-200 rounded-lg dark:text-black hover:bg-gray-500 transition ${
                isPending ? "opacity-50 cursor-not-allowed" : ""
              }`}
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