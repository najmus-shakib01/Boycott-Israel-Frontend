import { CheckCircle2 } from "lucide-react";

const steps = [
  {
    title: "১. কান্ট্রি অফ অরিজিন / উৎপত্তি দেশ",
    subtitle: "(Country of Origin)",
    body: `পণ্যের প্যাকেট বা লেবেলে "Made in Israel" বা "Product of Israel" লেখা থাকে। এটি সবচেয়ে সহজ এবং সরাসরি চিহ্ন যা বলে দেয় পণ্য ইসরায়েল থেকে এসেছে।`,
  },
  {
    title: "২. বারকোডের প্রথম তিন ডিজিট",
    subtitle: "(Barcode Country Code)",
    body: `বিশ্বের বারকোডের প্রথম ৩ ডিজিট দিয়ে দেশের পরিচয় পাওয়া যায়। ইসরায়েলের বারকোড সাধারণত 729 দিয়ে শুরু হয়। উদাহরণ: 729xxxxxxx হলে তা সাধারণত ইসরায়েলি পণ্য বলে ধরা হয়।`,
  },
  {
    title: "৩. হেব্রু (Hebrew) ভাষায় লেখা",
    subtitle: "",
    body: `ইসরায়েলের অফিসিয়াল ভাষা হেব্রু। অনেক ইসরায়েলি পণ্যের লেবেলে হেব্রু ভাষায় লেখা থাকে। যদি পণ্যে হেব্রু টেক্সট থাকে তবে সেটি ইসরায়েলি পণ্যের ইঙ্গিত হতে পারে।`,
  },
  {
    title: "৪. সরকারি সার্টিফিকেট বা চিহ্ন",
    subtitle: "",
    body: `"Israel Standards Institution" ইত্যাদি লিখা অথবা বিশেষ লোগো/সার্টিফিকেট থাকতে পারে, বিশেষ করে খাদ্য ও ইলেকট্রনিক্স পণ্যে।`,
  },
  {
    title: "৫. QR কোড / স্ক্যান কোড",
    subtitle: "",
    body: `অনেক পণ্যে QR কোড থাকে, যা স্ক্যান করলে উৎপত্তি দেশ সহ বিস্তারিত তথ্য পাওয়া যায়। সেখানে Israel উল্লেখ থাকলে পণ্যটি বয়কটের অন্তর্ভুক্ত হবে।`,
  },
];

const HowIdentifyProducts = () => {
  return (
    <section className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          কীভাবে চিনবেন ইসরায়েলি পণ্য
        </h2>
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          সচেতনতার শুরু বাজার থেকেই। নিচের কয়েকটি ধাপ মনে রাখলেই সহজে ইসরায়েলি
          পণ্য চিহ্নিত করা সম্ভব।
        </p>
      </div>

      <div className="grid gap-4 md:gap-6 md:grid-cols-2">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white/80 dark:bg-gray-900/80 border border-gray-100 dark:border-gray-800 rounded-2xl p-4 md:p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-3">
              <div className="mt-1">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {step.title}{" "}
                  {step.subtitle && (
                    <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                      {step.subtitle}
                    </span>
                  )}
                </h3>
                <p className="text-sm md:text-base leading-relaxed text-gray-700 dark:text-gray-300 text-justify">
                  {step.body}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowIdentifyProducts;
