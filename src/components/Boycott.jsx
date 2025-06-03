const Boycott = () => {
  return (
    <section className="flex justify-center items-center">
      <div className="bg-[#074c3e] rounded-full p-2 md:p-3 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="flex items-center justify-center gap-2 md:gap-4 text-white text-xl sm:text-2xl md:text-3xl font-bold px-4 py-2">
          <span className="whitespace-nowrap">BOYCOTT</span>
          <img
            src="/logo.png"
            alt="boycott-logo"
            className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full border-2 border-white object-cover transition-transform duration-300 hover:scale-105"
          />
          <span className="text-red-500 whitespace-nowrap">ISRAEL</span>
        </div>
      </div>
    </section>
  );
};

export default Boycott;
