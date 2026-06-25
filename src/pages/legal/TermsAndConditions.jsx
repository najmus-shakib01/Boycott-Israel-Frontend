import { Link } from "react-router-dom";
import PageTitle from "../../utils/PageTitle";

const TermsAndConditions = () => {
  return (
    <div className="pt-28 md:pt-32 pb-16 min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <PageTitle title="ব্যবহারের শর্তাবলী - বয়কট ইসরায়েল" description="বয়কট ইসরায়েল প্ল্যাটফর্ম ব্যবহারের নিয়মাবলী ও শর্তাবলী সম্পর্কে জানুন।" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <nav className="mb-6 flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <Link to="/" className="hover:text-emerald-600 transition-colors">হোম</Link>
          <span>/</span>
          <span className="text-gray-800 dark:text-gray-200 font-medium">ব্যবহারের শর্তাবলী</span>
        </nav>

        {/* Heading */}
        <div className="text-center md:text-left space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            📄 লিগ্যাল ডকুমেন্ট
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            ব্যবহারের শর্তাবলী
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            সর্বশেষ আপডেট: জুন ২০২৬
          </p>
        </div>

        {/* Card Body */}
        <article className="bg-white/90 dark:bg-gray-900/80 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 md:p-10 shadow-sm mt-8 space-y-8">
          <section className="space-y-3">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
              স্বাগতম! <strong>"বয়কট ইসরায়েল" (Boycott Israel)</strong> প্ল্যাটফর্মে আপনাকে স্বাগতম। এই প্ল্যাটফর্মটি ব্যবহার করার পূর্বে অনুগ্রহ করে নিম্নোক্ত শর্তাবলী মনোযোগ সহকারে পড়ুন। প্ল্যাটফর্মটি ব্যবহার করার মাধ্যমে আপনি এই শর্তাবলী মেনে নিতে সম্মত হচ্ছেন। আপনি যদি এই শর্তাবলির সাথে দ্বিমত পোষণ করেন, তবে অনুগ্রহ করে সাইটটি ব্যবহার করা থেকে বিরত থাকুন।
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-2">
              <span className="text-emerald-500">১.</span> প্ল্যাটফর্মের উদ্দেশ্য ও ঘোষণা
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
              আমাদের মূল উদ্দেশ্য হলো মানবাধিকার লঙ্ঘন, নিপীড়ন এবং অন্যায়ের বিরুদ্ধে শান্তিপূর্ণভাবে সচেতনতা তৈরি করা। আমরা বিভিন্ন উন্মুক্ত উৎস (Open Source), নির্ভরযোগ্য প্রতিবেদন এবং বয়কট আন্দোলনের অফিসিয়াল গাইডলাইন অনুযায়ী বয়কটযোগ্য পণ্য ও ব্র্যান্ডের তালিকা প্রকাশ করি। এটি সম্পূর্ণ তথ্যমূলক এবং সচেতনতামূলক একটি অলাভজনক প্ল্যাটফর্ম। এখানে কোনো বাণিজ্যিক উদ্দেশ্য নেই।
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-2">
              <span className="text-emerald-500">২.</span> তথ্যের সঠিকতা ও দায়মুক্তি
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
              আমরা সবসময় সঠিক, সময়োপযোগী ও নির্ভরযোগ্য তথ্য প্রদান করার জন্য আমাদের সর্বোচ্চ চেষ্টা করি। তবে যেহেতু গ্লোবাল ব্র্যান্ডগুলোর মালিকানা, মূল বিনিয়োগকারী প্রতিষ্ঠান, এবং ব্যবসায়িক অংশীদারিত্ব নিয়মিত পরিবর্তিত হয়, তাই ব্যবহারকারীদের যেকোনো সিদ্ধান্ত গ্রহণের পূর্বে নিজস্ব উদ্যোগে তথ্যটি পুনরায় যাচাই করে নেওয়ার অনুরোধ করা হচ্ছে।
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
              এই প্ল্যাটফর্মে প্রদর্শিত তথ্যের ভিত্তিতে কোনো ব্যবহারকারী বা প্রতিষ্ঠানের প্রত্যক্ষ বা পরোক্ষ কোনো ক্ষতি বা আইনি জটিলতার জন্য "বয়কট ইসরায়েল" প্ল্যাটফর্মের নির্মাতা বা সংশ্লিষ্ট দল কোনোভাবেই দায়ী থাকবে না।
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-2">
              <span className="text-emerald-500">৩.</span> ব্যবহারকারীর আচরণ ও বিধি-নিষেধ
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
              প্ল্যাটফর্মটি ব্যবহারের সময় আপনাকে অবশ্যই ইতিবাচক এবং দায়িত্বশীল আচরণ করতে হবে। নিম্নোক্ত কাজগুলো কঠোরভাবে নিষিদ্ধ:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
              <li>কোনো প্রকার ঘৃণা ছড়ানো (Hate Speech), সহিংসতা উসকে দেওয়া বা আক্রমণাত্মক ভাষা ব্যবহার করা।</li>
              <li>পদ্ধতিগতভাবে সাইটের ডাটা স্ক্র্যাপ বা কপি করা যা সাইটের স্বাভাবিক কার্যকারিতা ব্যাহত করতে পারে।</li>
              <li>আমাদের মতামত (Review) বা কন্টাক্ট ফরমে স্প্যামিং, ফিশিং লিংক বা ক্ষতিকারক ম্যালওয়্যার ছড়ানো।</li>
              <li>ভুয়া তথ্য দিয়ে রিভিউ দেওয়া বা অসত্য তথ্য দিয়ে বিভ্রান্তি ছড়ানোর চেষ্টা করা।</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-2">
              <span className="text-emerald-500">৪.</span> ভুল সংশোধন ও অবদান
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
              আমরা একটি গতিশীল প্ল্যাটফর্ম হিসেবে ভুল সংশোধনকে স্বাগত জানাই। আমাদের প্রদর্শিত কোনো পণ্যের তথ্য যদি ভুল, অসম্পূর্ণ বা মেয়াদোত্তীর্ণ মনে হয়, তবে উপযুক্ত প্রমাণ বা তথ্যের সোর্সসহ আমাদের ফিডব্যাক ফর্মের মাধ্যমে জানান। আমাদের টিম দ্রুততম সময়ের মধ্যে তা যাচাই করে প্রয়োজনীয় সংশোধন নিয়ে আসবে।
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-2">
              <span className="text-emerald-500">৫.</span> শর্তাবলী পরিবর্তন
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
              আমরা যেকোনো সময় এই ব্যবহারের শর্তাবলী পরিবর্তন, পরিমার্জন বা নতুন ধারা যুক্ত করার অধিকার রাখি। নীতিমালায় পরিবর্তন আনা হলে তা এই পৃষ্ঠায় আপডেট করা হবে এবং তারিখ পরিবর্তিত হবে। যেকোনো পরিবর্তনের পর প্ল্যাটফর্মের ব্যবহার অব্যাহত রাখলে তা নতুন শর্তাবলির সম্মতি হিসেবে গণ্য হবে।
            </p>
          </section>

          {/* Footer inside card */}
          <div className="pt-6 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              ধন্যবাদ আমাদের সাথে থাকার জন্য। 🇵🇸
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

export default TermsAndConditions;
