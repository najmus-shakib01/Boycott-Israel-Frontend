import { Link } from "react-router-dom";
import PageTitle from "../../utils/PageTitle";

const CookiePolicy = () => {
  return (
    <div className="pt-28 md:pt-32 pb-16 min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <PageTitle title="কুকি নীতি - বয়কট ইসরায়েল" description="বয়কট ইসরায়েল প্ল্যাটফর্মে কুকি ব্যবহারের নীতি সম্পর্কে জানুন।" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <nav className="mb-6 flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <Link to="/" className="hover:text-emerald-600 transition-colors">হোম</Link>
          <span>/</span>
          <span className="text-gray-800 dark:text-gray-200 font-medium">কুকি নীতি</span>
        </nav>

        {/* Heading */}
        <div className="text-center md:text-left space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            🍪 কুকি ট্র্যাকিং পলিসি
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            কুকি নীতি
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            সর্বশেষ আপডেট: জুন ২০২৬
          </p>
        </div>

        {/* Card Body */}
        <article className="bg-white/90 dark:bg-gray-900/80 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 md:p-10 shadow-sm mt-8 space-y-8">
          <section className="space-y-3">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
              <strong>"বয়কট ইসরায়েল" (Boycott Israel)</strong> প্ল্যাটফর্ম আপনার ব্রাউজিং অভিজ্ঞতা সহজ এবং আরও উন্নত করতে কুকি (Cookies) এবং অনুরূপ লোকাল স্টোরেজ প্রযুক্তি ব্যবহার করে। এই নীতিমালার মাধ্যমে আমরা স্পষ্ট করছি যে আমরা কী ধরনের কুকি ব্যবহার করি এবং সেগুলো কীভাবে আপনার ব্রাউজারের সাথে কাজ করে।
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-2">
              <span className="text-emerald-500">১.</span> কুকি (Cookie) আসলে কী?
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
              কুকি হলো একটি ছোট ও নিরাপদ টেক্সট ফাইল, যা আপনি যখন কোনো ওয়েবসাইট পরিদর্শন করেন তখন আপনার ব্রাউজারের মাধ্যমে আপনার ডিভাইস (কম্পিউটার, স্মার্টফোন বা ট্যাবলেট)-এ সংরক্ষিত হয়। এর ফলে পরবর্তী সময়ে আপনি যখন পুনরায় সাইটটিতে ফিরে আসেন, তখন সাইটটি আপনার পূর্বের সেটআপ ও পছন্দগুলো সনাক্ত করতে পারে।
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-2">
              <span className="text-emerald-500">২.</span> আমরা কী ধরনের কুকি ব্যবহার করি?
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
              আমরা আমাদের প্ল্যাটফর্মে মূলত দুই ধরনের কুকি ও লোকাল স্টোরেজ ডাটা ব্যবহার করি:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                <strong>প্রয়োজনীয় কুকি ও লোকাল স্টোরেজ (Essential Preference):</strong> এটি আপনার ব্যবহারকারী সেটিংস ও পছন্দগুলো মনে রাখতে সাহায্য করে। উদাহরণস্বরূপ, আপনি লাইট মোড নাকি ডার্ক মোড সিলেক্ট করেছেন, তা ট্র্যাক করতে লোকাল স্টোরেজ ব্যবহৃত হয়। এটি বন্ধ থাকলে প্রতিবার পেজ পরিবর্তন করলে আপনাকে পুনরায় মোড পরিবর্তন করতে হবে।
              </li>
              <li>
                <strong>বেনামী অ্যানালিটিক্স কুকি (Analytical Cookies):</strong> আমরা আমাদের প্ল্যাটফর্মের পারফরম্যান্স ও ভিজিটর সংখ্যা বুঝতে কিছু বেসিক অ্যানালিটিক্স টুল ব্যবহার করতে পারি। এটি সম্পূর্ণ ট্র্যাক-মুক্ত উপায়ে কেবল কতজন ব্যবহারকারী ভিজিট করছেন তা গণনা করে, এখানে কোনো ব্যবহারকারীর ব্যক্তিগত আইডেন্টিটি বা গোপন তথ্য আমাদের কাছে আসে না।
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-2">
              <span className="text-emerald-500">৩.</span> থার্ড-পার্টি কুকি (Third-Party Cookies)
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
              আমাদের প্ল্যাটফর্মে কোনো ধরণের বাণিজ্যিক বিজ্ঞাপনদাতা (Advertisers) বা ট্র্যাকিং নেটওয়ার্কের কুকি ব্যবহৃত হয় না। আমরা কোনো থার্ড-পার্টি বিজ্ঞাপন স্ক্রিপ্ট লোড করি না, তাই আপনার ডেটা কোনো কর্পোরেট বিজ্ঞাপনের টার্গেটিংয়ের জন্য ট্র্যাক হওয়ার সম্ভাবনা নেই।
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-2">
              <span className="text-emerald-500">৪.</span> আপনি কীভাবে কুকি নিয়ন্ত্রণ করবেন?
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
              আপনি চাইলে খুব সহজেই আপনার ডিভাইসের ব্রাউজার সেটিংস থেকে সব ধরণের কুকি বন্ধ বা ডিলিট করে দিতে পারেন। বিভিন্ন জনপ্রিয় ব্রাউজারে কীভাবে এটি করবেন, তা জানতে ব্রাউজারের Help বা Settings অপশনে চেক করুন।
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
              <em>দ্রষ্টব্য:</em> আপনি যদি কুকি বা লোকাল স্টোরেজ সম্পূর্ণরূপে নিষ্ক্রিয় করে দেন, তবে সাইটের কিছু ইন্টারেক্টিভ ফিচার (যেমন ডার্ক/লাইট মোড অটোমেটিক সংরক্ষণ হওয়া) ব্যাহত হতে পারে।
            </p>
          </section>

          {/* Footer inside card */}
          <div className="pt-6 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              আমরা আপনার ব্রাউজিং অভিজ্ঞতা নিরাপদ রাখি। 🍪
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

export default CookiePolicy;
