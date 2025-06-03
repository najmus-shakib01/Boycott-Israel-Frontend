import PropTypes from 'prop-types';

const Pagination = ({ 
  totalItems, 
  itemsPerPage = 12, 
  currentPage, 
  onPageChange 
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  const handlePrevious = () => {
    const newPage = Math.max(currentPage - 1, 1);
    onPageChange(newPage);
  };

  const handleNext = () => {
    const newPage = Math.min(currentPage + 1, totalPages);
    onPageChange(newPage);
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center mt-8 space-x-4">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-md ${
          currentPage === 1
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600 text-white"
        }`}
      >
        ←
      </button>
      <span className="text-gray-700 dark:text-gray-300">
        পাতা {currentPage} / {totalPages}
      </span>
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-md ${
          currentPage === totalPages
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600 text-white"
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