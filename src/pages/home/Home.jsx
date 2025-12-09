import Boycott from "../../components/Boycott";
import PageTitle from "../../utils/PageTitle";
import HowIdentifyProducts from "./HowIdentifyProducts";
import PalestineHistory from "./PalestineHistory";
import WhatIsBoycott from "./WhatIsBoycott";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <PageTitle key={"বয়কট-ইসরায়েল"} title={"বয়কট-ইসরায়েল"} />

      <main className="pt-28 md:pt-32 lg:pt-36 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 md:space-y-16">
          <Boycott />
          <WhatIsBoycott />
          <HowIdentifyProducts />
          <PalestineHistory />
        </div>
      </main>
    </div>
  );
};

export default Home;
