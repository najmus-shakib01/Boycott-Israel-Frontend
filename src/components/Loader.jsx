import PropTypes from "prop-types";

const Loader = ({ variant = "products", count = 8 }) => {
  if (variant === "media") {
    return (
      <div
        role="status"
        aria-busy="true"
        aria-label="মিডিয়া লোড হচ্ছে..."
        className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      >
        <span className="sr-only">লোড হচ্ছে...</span>
        {Array.from({ length: count || 6 }).map((_, i) => (
          <div
            key={i}
            aria-hidden="true"
            className="rounded-[14px] overflow-hidden border border-line bg-surface"
          >
            <div className="aspect-[16/10] w-full sk" />
            <div className="p-4 space-y-2">
              <div className="h-4 w-3/4 rounded sk" />
              <div className="h-3 w-1/3 rounded sk" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === "detail") {
    return (
      <div
        role="status"
        aria-busy="true"
        aria-label="বিস্তারিত লোড হচ্ছে..."
        className="max-w-3xl mx-auto space-y-6"
      >
        <span className="sr-only">লোড হচ্ছে...</span>
        <div aria-hidden="true" className="h-44 w-full rounded-[14px] sk" />
        <div aria-hidden="true" className="h-8 w-2/5 mx-auto rounded sk" />
        <div aria-hidden="true" className="h-6 w-1/4 mx-auto rounded-full sk" />
        <div aria-hidden="true" className="space-y-3 pt-4">
          <div className="h-4 w-full rounded sk" />
          <div className="h-4 w-5/6 rounded sk" />
          <div className="h-4 w-4/6 rounded sk" />
        </div>
      </div>
    );
  }

  if (variant === "text") {
    return (
      <div
        role="status"
        aria-busy="true"
        aria-label="টেক্সট লোড হচ্ছে..."
        className="space-y-3 py-4"
      >
        <span className="sr-only">লোড হচ্ছে...</span>
        {Array.from({ length: count || 4 }).map((_, i) => (
          <div key={i} aria-hidden="true" className="h-4 w-full rounded sk" />
        ))}
      </div>
    );
  }

  // Default: product card grid (matches reference .sk in 2/3/4 cols)
  return (
    <div
      role="status"
      aria-busy="true"
      aria-label="পণ্য লোড হচ্ছে..."
      className="grid gap-4 md:gap-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
    >
      <span className="sr-only">লোড হচ্ছে...</span>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          aria-hidden="true"
          className="rounded-[14px] overflow-hidden border border-line bg-surface flex flex-col"
        >
          <div className="h-28 w-full sk" />
          <div className="p-3 text-center space-y-2">
            <div className="h-4 w-3/4 mx-auto rounded sk" />
            <div className="h-3 w-1/2 mx-auto rounded sk" />
          </div>
        </div>
      ))}
    </div>
  );
};

Loader.propTypes = {
  variant: PropTypes.oneOf(["products", "media", "detail", "text"]),
  count: PropTypes.number,
};

export default Loader;
