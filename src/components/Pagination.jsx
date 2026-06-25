import PropTypes from "prop-types";

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
    const delta = 2; // pages to show around current

    // Always show page 1
    pages.push(1);

    // Calculate range around current page
    const rangeStart = Math.max(2, currentPage - delta);
    const rangeEnd = Math.min(totalPages - 1, currentPage + delta);

    // Add dots before range if needed
    if (rangeStart > 2) {
      pages.push("dots-start");
    }

    // Add range pages
    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i);
    }

    // Add dots after range if needed
    if (rangeEnd < totalPages - 1) {
      pages.push("dots-end");
    }

    // Always show last page (if more than 1 page)
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex justify-center items-center mt-10 gap-1.5 text-sm">
      <button
        onClick={() => handleChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-2 rounded-lg border text-xs transition
          ${
            currentPage === 1
              ? "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
              : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 hover:border-emerald-400 hover:text-emerald-500 dark:hover:text-emerald-400"
          }`}
      >
        ←
      </button>

      <div className="flex items-center gap-1">
        {visiblePages.map((item, index) => {
          if (typeof item === "string" && item.startsWith("dots")) {
            return (
              <span
                key={`${item}-${index}`}
                className="w-9 h-9 flex items-center justify-center text-xs text-gray-400"
              >
                ...
              </span>
            );
          }

          const page = item;
          return (
            <button
              key={page}
              onClick={() => handleChange(page)}
              className={`w-9 h-9 rounded-lg text-xs border transition
                ${
                  currentPage === page
                    ? "bg-emerald-500 border-emerald-500 text-white shadow-sm"
                    : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-700 hover:border-emerald-400 hover:text-emerald-500 dark:hover:text-emerald-400"
                }`}
            >
              {page}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => handleChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-2 rounded-lg border text-xs transition
          ${
            currentPage === totalPages
              ? "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
              : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 hover:border-emerald-400 hover:text-emerald-500 dark:hover:text-emerald-400"
          }`}
      >
        →
      </button>
    </div>
  );
};

Pagination.propTypes = {
  totalItems: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
