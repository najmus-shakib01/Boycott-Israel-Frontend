import PropTypes from "prop-types";

const toBengaliNumber = (num) =>
  String(num).replace(/\d/g, (digit) => "০১২৩৪৫৬৭৮৯"[digit]);

const Pagination = ({
  totalItems,
  itemsPerPage = 20,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.max(Math.ceil(totalItems / itemsPerPage), 1);
  if (totalPages <= 1) return null;

  const handleChange = (page) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    onPageChange(page);
  };

  const getVisiblePages = () => {
    const pages = [];
    const delta = 2;

    // Always show page 1
    pages.push(1);

    const rangeStart = Math.max(2, currentPage - delta);
    const rangeEnd = Math.min(totalPages - 1, currentPage + delta);

    if (rangeStart > 2) {
      pages.push("dots-start");
    }

    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i);
    }

    if (rangeEnd < totalPages - 1) {
      pages.push("dots-end");
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <nav
      className="flex justify-center items-center gap-2 mt-8 flex-wrap"
      aria-label="পেজিনেশন নেভিগেশন"
    >
      {/* Previous Button */}
      <button
        onClick={() => handleChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="আগের পেজ"
        className="min-w-[44px] min-h-[44px] px-3 rounded-lg border border-line bg-surface text-text font-medium text-sm transition-all hover:border-primary hover:text-primary disabled:opacity-40 disabled:hover:border-line disabled:hover:text-text disabled:cursor-not-allowed cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        ←
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1.5 flex-wrap">
        {visiblePages.map((item, index) => {
          if (typeof item === "string" && item.startsWith("dots")) {
            return (
              <span
                key={`${item}-${index}`}
                aria-hidden="true"
                className="w-10 h-10 flex items-center justify-center text-muted font-medium select-none"
              >
                ...
              </span>
            );
          }

          const pageNum = Number(item);
          const isCurrent = currentPage === pageNum;

          return (
            <button
              key={pageNum}
              onClick={() => handleChange(pageNum)}
              aria-label={`পেজ ${toBengaliNumber(pageNum)}`}
              aria-current={isCurrent ? "true" : undefined}
              className={`min-w-[44px] min-h-[44px] px-3 rounded-lg border font-medium text-sm transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                isCurrent
                  ? "bg-primary border-primary text-on-primary shadow-sm"
                  : "border-line bg-surface text-text hover:border-primary hover:text-primary"
              }`}
            >
              {toBengaliNumber(pageNum)}
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      <button
        onClick={() => handleChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="পরের পেজ"
        className="min-w-[44px] min-h-[44px] px-3 rounded-lg border border-line bg-surface text-text font-medium text-sm transition-all hover:border-primary hover:text-primary disabled:opacity-40 disabled:hover:border-line disabled:hover:text-text disabled:cursor-not-allowed cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        →
      </button>
    </nav>
  );
};

Pagination.propTypes = {
  totalItems: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
