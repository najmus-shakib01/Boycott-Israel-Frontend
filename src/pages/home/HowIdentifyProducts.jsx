const steps = [
  {
    title: "কান্ট্রি অফ অরিজিন / উৎপত্তি দেশ",
    subtitle: "(Country of Origin)",
    body: `পণ্যের প্যাকেট বা লেবেলে "Made in Israel" বা "Product of Israel" লেখা থাকে। এটি সবচেয়ে সহজ এবং সরাসরি চিহ্ন যা বলে দেয় পণ্য ইসরায়েল থেকে এসেছে।`,
  },
  {
    title: "বারকোডের প্রথম তিন ডিজিট",
    subtitle: "(Barcode Country Code)",
    body: `বিশ্বের বারকোডের প্রথম ৩ ডিজিট দিয়ে দেশের পরিচয় পাওয়া যায়। ইসরায়েলের বারকোড সাধারণত 729 দিয়ে শুরু হয়। উদাহরণ: 729xxxxxxx হলে তা সাধারণত ইসরায়েলি পণ্য বলে ধরা হয়।`,
  },
  {
    title: "হিব্রু (Hebrew) ভাষায় লেখা",
    subtitle: "",
    body: `ইসরায়েলের অফিসিয়াল ভাষা হিব্রু। অনেক ইসরায়েলি পণ্যের লেবেলে হিব্রু ভাষায় লেখা থাকে। যদি পণ্যে হিব্রু টেক্সট থাকে তবে সেটি ইসরায়েলি পণ্যের ইঙ্গিত হতে পারে।`,
  },
  {
    title: "সরকারি সার্টিফিকেট বা চিহ্ন",
    subtitle: "",
    body: `"Israel Standards Institution" ইত্যাদি লিখা অথবা বিশেষ লোগো/সার্টিফিকেট থাকতে পারে, বিশেষ করে খাদ্য ও ইলেকট্রনিক্স পণ্যে।`,
  },
  {
    title: "QR কোড / স্ক্যান কোড",
    subtitle: "",
    body: `অনেক পণ্যে QR কোড থাকে, যা স্ক্যান করলে উৎপত্তি দেশ সহ বিস্তারিত তথ্য পাওয়া যায়। সেখানে Israel উল্লেখ থাকলে পণ্যটি বয়কটের অন্তর্ভুক্ত হবে।`,
  },
];

const toBengali = (n) => String(n).replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[d]);

const HowIdentifyProducts = () => {
  return (
    <section id="how" className="space-y-4 scroll-mt-24 pt-4">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-text">
          কীভাবে চিনবেন ইসরায়েলি পণ্য
        </h2>
        <p className="text-muted text-sm md:text-base mt-2 max-w-[65ch]">
          সচেতনতার শুরু বাজার থেকেই। নিচের কয়েকটি ধাপ মনে রাখলেই সহজে ইসরায়েলি
          পণ্য চিহ্নিত করা সম্ভব।
        </p>
      </div>

      <div className="grid gap-4 md:gap-5 md:grid-cols-2 pt-2">
        {steps.map((step, index) => (
          <div
            key={index}
            className="rounded-[14px] border border-line bg-surface p-5 md:p-6 shadow-sm hover:shadow-hover transition-all flex gap-4 items-start"
          >
            <div className="w-11 h-11 rounded-[12px] bg-primary-tint text-primary flex items-center justify-center flex-none font-bold text-base select-none">
              {toBengali(index + 1)}
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold text-text text-base md:text-lg">
                {step.title}{" "}
                {step.subtitle && (
                  <span className="text-xs md:text-sm text-muted font-normal">
                    {step.subtitle}
                  </span>
                )}
              </h3>
              <p className="text-muted text-sm md:text-base leading-relaxed">
                {step.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowIdentifyProducts;
