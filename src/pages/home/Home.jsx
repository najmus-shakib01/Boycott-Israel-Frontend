import Boycott from "../../components/Boycott";
import PageTitle from "../../utils/PageTitle";
import HowIdentifyProducts from "./HowIdentifyProducts";
import PalestineHistory from "./PalestineHistory";
import WhatIsBoycott from "./WhatIsBoycott";

const Home = () => {
  return (
    <div>
      <PageTitle key={"বয়কট-ইসরায়েল"} title={"বয়কট-ইসরায়েল"} />
      <section className="mt-28 md:mt-36 lg:mt-36 xl:mt-36 mb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Boycott />
        </div>
        <WhatIsBoycott />
        <HowIdentifyProducts />
        <PalestineHistory />
      </section>
    </div>
  );
};

export default Home;
