import { BoycottEmblem } from "./BoycottLogo";

const Boycott = () => {
  return (
    <section className="flex justify-center items-center py-2">
      <div className="inline-flex items-center gap-3 sm:gap-4 h-14 sm:h-16 pl-2 pr-6 sm:pr-8 rounded-full bg-[#0A3F31] text-white shadow-hover hover:scale-[1.02] transition-all">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden flex items-center justify-center bg-white shadow-sm">
          <BoycottEmblem className="w-9 h-9 sm:w-11 sm:h-11" />
        </div>
        <div className="flex items-center gap-2 font-sans font-bold text-lg sm:text-2xl tracking-wider select-none">
          <span>BOYCOTT</span>
          <span className="text-[#FF8A93]">ISRAEL</span>
        </div>
      </div>
    </section>
  );
};

export default Boycott;
