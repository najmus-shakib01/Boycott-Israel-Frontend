const HowIdentifyProducts = () => {
    return (
        <section className="mb-10 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center">কীভাবে চিনবেন ইসরায়েলি পণ্য</h2>

            <div className="text-lg leading-relaxed text-justify space-y-4 px-4">
                <div>
                    <h3 className="text-xl font-semibold mb-2">১. কান্ট্রি অফ অরিজিন / উৎপত্তি দেশ (Country of Origin)</h3>
                    <p>
                        পণ্যের প্যাকেট বা লেবেলে &quot;Made in Israel&quot; বা &quot;Product of Israel&quot; লেখা থাকে। এটি সবচেয়ে সহজ এবং সরাসরি চিন্হ যা বলে দেয় পণ্য ইসরায়েল থেকে এসেছে।
                    </p>
                </div>

                <div>
                    <h3 className="text-xl font-semibold mb-2">২. বারকোডের প্রথম তিন ডিজিট (Barcode Country Code)</h3>
                    <p>
                        বিশ্বের বারকোডের প্রথম ৩ ডিজিট দিয়ে দেশের পরিচয় পাওয়া যায়। ইসরায়েলের বারকোড সাধারণত 729 দিয়ে শুরু হয়। উদাহরণস্বরূপ, যদি বারকোড নম্বর হয় 729xxxxxxx তাহলে সেই পণ্য ইসরায়েলি বলে ধরে নেওয়া হয়।
                    </p>
                </div>

                <div>
                    <h3 className="text-xl font-semibold mb-2">৩. হেব্রু (Hebrew) ভাষায় লেখা</h3>
                    <p>
                        ইসরায়েলের অফিসিয়াল ভাষা হেব্রু। অনেক ইসরায়েলি পণ্যের লেবেলে হেব্রু ভাষায় লেখা থাকে। যদি পণ্যে হেব্রু ভাষার টেক্সট থাকে তবে সেটি ইসরায়েলি পণ্যের ইঙ্গিত হতে পারে।
                    </p>
                </div>

                <div>
                    <h3 className="text-xl font-semibold mb-2">৪. সরকারি সার্টিফিকেট বা চিহ্ন</h3>
                    <p>
                        কিছু ইসরায়েলি পণ্যতে &quot;Israel Standards Institution&quot; বা ISO সার্টিফিকেট বা লোগো থাকতে পারে। বিশেষত খাদ্য বা ইলেকট্রনিক্স পণ্যে এই ধরনের চিহ্ন থাকতে পারে।
                    </p>
                </div>

                <div>
                    <h3 className="text-xl font-semibold mb-2">৫. QR কোড / স্ক্যান কোড</h3>
                    <p>
                        অনেক পণ্যে QR কোড বা স্ক্যান কোড থাকে, যা স্ক্যান করলে পণ্যের বিস্তারিত, উৎপত্তি, এবং ট্র্যাকিং তথ্য পাওয়া যায়। যদি QR কোড স্ক্যান করে উৎপত্তি দেশ হিসেবে Israel দেখায়, তাহলে নিশ্চিত হওয়া যায়।
                    </p>
                </div>
            </div>
        </section>
    );
};

export default HowIdentifyProducts;