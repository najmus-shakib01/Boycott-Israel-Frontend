import { useMutation } from "@tanstack/react-query";
import { Check } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import axiosClient from "../../configs/axios.config";
import PageTitle from "../../utils/PageTitle";

const validators = {
  name: (v) =>
    v.trim().length < 2 ? "আপনার নাম লিখুন (কমপক্ষে ২ অক্ষর)।" : "",
  email: (v) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())
      ? ""
      : "সঠিক ই-মেইল দিন, যেমন: name@example.com",
  message: (v) =>
    v.trim().length < 10 ? "বার্তা কমপক্ষে ১০ অক্ষরের হতে হবে।" : "",
};

const Review = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false,
  });

  const [submitted, setSubmitted] = useState(false);

  const validateField = (field, value) => {
    const errorMsg = validators[field](value);
    setErrors((prev) => ({ ...prev, [field]: errorMsg }));
    return !errorMsg;
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field, formData[field]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      validateField(name, value);
    }
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const response = await axiosClient.post("/contact/", formData);
      return response.data;
    },
    onSuccess: () => {
      toast.success("আপনার বার্তা সফলভাবে পাঠানো হয়েছে!");
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      setTouched({ name: false, email: false, message: false });
      setErrors({ name: "", email: "", message: "" });
    },
    onError: (error) => {
      const message =
        error.response?.status === 429
          ? "আপনি অনেক বেশি বার্তা পাঠিয়েছেন। কিছুক্ষণ পর আবার চেষ্টা করুন।"
          : error.response?.data?.message ||
            error.message ||
            "বার্তা পাঠাতে সমস্যা হয়েছে।";
      toast.error(message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    setTouched({ name: true, email: true, message: true });
    const isNameValid = validateField("name", formData.name);
    const isEmailValid = validateField("email", formData.email);
    const isMessageValid = validateField("message", formData.message);

    if (!isNameValid || !isEmailValid || !isMessageValid) {
      if (!isNameValid) {
        document.getElementById("review-name")?.focus();
      } else if (!isEmailValid) {
        document.getElementById("review-email")?.focus();
      } else {
        document.getElementById("review-message")?.focus();
      }
      return;
    }

    mutate();
  };

  const handleWriteAgain = () => {
    setSubmitted(false);
  };

  return (
    <div className="min-h-screen py-8 md:py-12">
      <PageTitle title="আপনার মতামত জানান — বয়কট ইসরায়েল" />

      <section className="max-w-[760px] mx-auto px-4 space-y-6">
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text">
            আপনার মতামত জানান
          </h1>
          <p className="text-muted text-sm sm:text-base max-w-[62ch] mx-auto leading-relaxed">
            আমাদের ওয়েবসাইটের উন্নয়নে আপনার মতামত অত্যন্ত মূল্যবান। আপনার প্রস্তাবনা,
            উন্নয়ন আইডিয়া অথবা নতুন তথ্য/ভিডিও শেয়ার করতে পারেন।
          </p>
        </div>

        {/* Card Form / Success State */}
        <div className="rounded-[14px] sm:rounded-[22px] border border-line bg-surface p-6 sm:p-8 md:p-10 shadow-sm transition-all">
          {submitted ? (
            <div
              role="status"
              className="text-center py-8 px-4 space-y-4 animate-in fade-in duration-300"
            >
              <div className="w-14 h-14 mx-auto rounded-full bg-primary-tint text-primary flex items-center justify-center shadow-sm">
                <Check size={28} strokeWidth={2.4} aria-hidden="true" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-text">
                বার্তা পাঠানো হয়েছে
              </h3>
              <p className="text-muted text-sm sm:text-base max-w-md mx-auto">
                আপনার মতামতের জন্য আন্তরিক ধন্যবাদ। আমরা দ্রুত আপনার বার্তাটি পর্যালোচনা করব।
              </p>
              <div className="pt-4">
                <button
                  onClick={handleWriteAgain}
                  className="min-h-[48px] px-8 rounded-full bg-primary hover:bg-primary-dark text-on-primary font-semibold text-base transition-all shadow-sm cursor-pointer"
                >
                  আরেকটি বার্তা লিখুন
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* Name Field */}
              <div className="space-y-1.5">
                <label
                  htmlFor="review-name"
                  className="block font-semibold text-text text-sm sm:text-base"
                >
                  আপনার নাম
                </label>
                <input
                  id="review-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={() => handleBlur("name")}
                  aria-invalid={Boolean(touched.name && errors.name)}
                  aria-describedby={
                    touched.name && errors.name ? "name-error" : undefined
                  }
                  placeholder="আপনার পূর্ণ নাম লিখুন"
                  className={`w-full min-h-[48px] px-4 py-3 rounded-lg border bg-surface text-text font-sans text-sm sm:text-base transition-all focus:outline-none ${
                    touched.name && errors.name
                      ? "border-accent focus:ring-2 focus:ring-accent/20"
                      : "border-line hover:border-muted focus:border-primary focus:ring-2 focus:ring-primary-tint"
                  }`}
                />
                {touched.name && errors.name && (
                  <p id="name-error" role="alert" className="text-accent text-xs sm:text-sm font-medium">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-1.5">
                <label
                  htmlFor="review-email"
                  className="block font-semibold text-text text-sm sm:text-base"
                >
                  আপনার ই-মেইল
                </label>
                <input
                  id="review-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={() => handleBlur("email")}
                  aria-invalid={Boolean(touched.email && errors.email)}
                  aria-describedby={
                    touched.email && errors.email ? "email-error" : undefined
                  }
                  placeholder="name@example.com"
                  className={`w-full min-h-[48px] px-4 py-3 rounded-lg border bg-surface text-text font-sans text-sm sm:text-base transition-all focus:outline-none ${
                    touched.email && errors.email
                      ? "border-accent focus:ring-2 focus:ring-accent/20"
                      : "border-line hover:border-muted focus:border-primary focus:ring-2 focus:ring-primary-tint"
                  }`}
                />
                {touched.email && errors.email && (
                  <p id="email-error" role="alert" className="text-accent text-xs sm:text-sm font-medium">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Message Field */}
              <div className="space-y-1.5">
                <label
                  htmlFor="review-message"
                  className="block font-semibold text-text text-sm sm:text-base"
                >
                  আপনার বার্তা
                </label>
                <textarea
                  id="review-message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={() => handleBlur("message")}
                  aria-invalid={Boolean(touched.message && errors.message)}
                  aria-describedby={
                    touched.message && errors.message ? "message-error" : undefined
                  }
                  placeholder="আপনার মতামত বা পরামর্শ বিস্তারিত লিখুন…"
                  className={`w-full min-h-[140px] px-4 py-3 rounded-lg border bg-surface text-text font-sans text-sm sm:text-base resize-y transition-all focus:outline-none ${
                    touched.message && errors.message
                      ? "border-accent focus:ring-2 focus:ring-accent/20"
                      : "border-line hover:border-muted focus:border-primary focus:ring-2 focus:ring-primary-tint"
                  }`}
                />
                {touched.message && errors.message && (
                  <p id="message-error" role="alert" className="text-accent text-xs sm:text-sm font-medium">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full min-h-[48px] px-6 rounded-full bg-primary hover:bg-primary-dark text-on-primary font-semibold text-base transition-all shadow-sm cursor-pointer disabled:opacity-70 disabled:cursor-wait flex items-center justify-center"
                >
                  {isPending ? "পাঠানো হচ্ছে…" : "বার্তা পাঠান"}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};

export default Review;
