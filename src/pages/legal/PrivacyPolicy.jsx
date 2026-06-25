import { Link } from "react-router-dom";
import PageTitle from "../../utils/PageTitle";

const PrivacyPolicy = () => {
  return (
    <div className="pt-28 md:pt-32 pb-16 min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <PageTitle title="গোপনীয়তা নীতি - বয়কট ইসরায়েল" description="বয়কট ইসরায়েল প্ল্যাটফর্মের গোপনীয়তা নীতি সম্পর্কে বিস্তারিত জানুন।" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <nav className="mb-6 flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <Link to="/" className="hover:text-emerald-600 transition-colors">হোম</Link>
          <span>/</span>
          <span className="text-gray-800 dark:text-gray-200 font-medium">গোপনীয়তা নীতি</span>
        </nav>

        {/* Heading */}
        <div className="text-center md:text-left space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            🔐 নিরাপত্তা ও গোপনীয়তা
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            গোপনীয়তা নীতি
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            সর্বশেষ আপডেট: জুন ২০২৬
          </p>
        </div>

        {/* Card Body */}
        <article className="bg-white/90 dark:bg-gray-900/80 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 md:p-10 shadow-sm mt-8 space-y-8">
          <section className="space-y-3">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
              <strong>"বয়কট ইসরায়েল" (Boycott Israel)</strong> প্ল্যাটফর্মে আপনার গোপনীয়তা রক্ষা করা আমাদের প্রথম অঙ্গীকার। আমাদের এই অলাভজনক ও সচেতনতামূলক প্ল্যাটফর্মে ব্রাউজিং করার সময় আপনার তথ্যের গোপনীয়তা এবং নিরাপত্তা কীভাবে নিশ্চিত করা হয়, তা এই গোপনীয়তা নীতিমালার মাধ্যমে স্পষ্ট করা হলো।
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-2">
              <span className="text-emerald-500">১.</span> আমরা কী তথ্য সংগ্রহ করি এবং কেন?
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
              আমরা ব্যবহারকারীদের থেকে কোনো অপ্রয়োজনীয় বা সংবেদনশীল ব্যক্তিগত ডাটা সংগ্রহ করি না। সংগৃহীত ডাটা নিচে উল্লেখ করা হলো:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                <strong>যোগাযোগের তথ্য:</strong> আপনি যখন আমাদের "মতামত" (Feedback) ফরমে বার্তা পাঠান, তখন আপনার নাম, ইমেইল এড্রেস এবং বার্তাটি সংগ্রহ করা হয়। এটি শুধুমাত্র আপনার সাথে যোগাযোগ করতে এবং স্প্যাম ফিল্টার করতে ব্যবহৃত হয়।
              </li>
              <li>
                <strong>লগ ডাটা (Log Files):</strong> সাধারণ ওয়েবসাইটগুলোর মতো আমাদের সার্ভারেও কিছু বেসিক ডাটা লগ হিসেবে সংরক্ষিত হয়। যেমন—আইপি অ্যাড্রেস, ব্রাউজারের ধরন, প্ল্যাটফর্ম ভিজিটের সময় ও পেজ ভিউ। এগুলো আমরা সম্পূর্ণরূপে বেনামে (Anonymous) ভিজিটর প্যাটার্ন ও নিরাপত্তা বজায় রাখার বিশ্লেষণে ব্যবহার করি।
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-2">
              <span className="text-emerald-500">২.</span> সংগৃহীত তথ্যের ব্যবহার ও উদ্দেশ্য
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
              আমরা আপনার তথ্য নিম্নলিখিত উদ্দেশ্যে ব্যবহার করি:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>আপনার প্রেরিত মতামত ও বার্তার প্রতিক্রিয়া বা উত্তর প্রদান করতে।</li>
              <li>প্ল্যাটফর্মের কার্যক্ষমতা ও গতিশীলতা পর্যবেক্ষণ করতে এবং নিরাপত্তা নিশ্চিত করতে।</li>
              <li>কোনো অসৎ উদ্দেশ্যপ্রণোদিত কার্যকলাপ, বট ট্রাফিক বা সাইবার হুমকি শনাক্ত ও প্রতিরোধ করতে।</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-2">
              <span className="text-emerald-500">৩.</span> তথ্য শেয়ারিং ও থার্ড-পার্টি ডিসক্লোজার
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
              আমরা ব্যবহারকারীর গোপনীয়তাকে সর্বোচ্চ সম্মান জানাই। আমরা আপনার নাম, ইমেইল বা যোগাযোগের তথ্য কোনো বাণিজ্যিক উদ্দেশ্যে বিক্রি, ভাড়া, লিজ বা অন্য কোনো উপায়ে কোনো তৃতীয় পক্ষের (Third Party) কাছে হস্তান্তর করি না। তবে যদি দেশের আইন বা আদালতের নির্দেশ অনুযায়ী কোনো তথ্য প্রকাশের বাধ্যবাধকতা থাকে, কেবলমাত্র তখনই আইনগত কারণে তা করা হতে পারে।
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-2">
              <span className="text-emerald-500">৪.</span> ডাটা সিকিউরিটি বা নিরাপত্তা
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
              আপনার তথ্যের নিরাপত্তা নিশ্চিতে আমরা নিরাপদ প্রটোকল (HTTPS/SSL) এবং অন্যান্য প্রয়োজনীয় নিরাপত্তা ব্যবস্থা ব্যবহার করি। সার্ভার লেভেলে অবাঞ্ছিত অনুপ্রবেশ রুখতে ফায়ারওয়াল ও রেট লিমিটিং প্রোটোকল সচল রয়েছে। তবে মনে রাখবেন যে, ইন্টারনেটের মাধ্যমে ট্রান্সমিশন বা ইলেকট্রনিক স্টোরেজের কোনো পদ্ধতিই ১০০% নিরাপদ ও অভেদ্য নয়।
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-2">
              <span className="text-emerald-500">৫.</span> আপনার ডাটার উপর আপনার অধিকার
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
              আপনি আমাদের কন্টাক্ট ফরমে যে বার্তা পাঠিয়েছেন, তা আমাদের সার্ভার থেকে মুছে ফেলার অধিকার আপনার রয়েছে। আপনি যদি আপনার পাঠানো মতামত বা ইমেইল ডাটা সম্পূর্ণরূপে ডিলিট করতে চান, তবে দয়া করে আমাদের মতামত পেজের মাধ্যমে আমাদের ইমেইল পাঠিয়ে অনুরোধ করুন। আমরা দ্রুততম সময়ের মধ্যে আপনার ডাটা স্থায়ীভাবে মুছে দেব।
            </p>
          </section>

          {/* Footer inside card */}
          <div className="pt-6 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              আমরা আপনার তথ্য সুরক্ষায় প্রতিশ্রুতিবদ্ধ। 🛡️
            </span>
            <Link
              to="/"
              className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
            >
              ← হোম পেজে ফিরে যান
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
