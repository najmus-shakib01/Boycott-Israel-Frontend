import { useQuery, useQueryClient } from '@tanstack/react-query';
import PropTypes from 'prop-types';

const Pagination = ({ 
  totalItems, 
  itemsPerPage = 20, 
  currentPage: initialPage, 
  onPageChange 
}) => {
  const queryClient = useQueryClient();

  const { data: currentPage } = useQuery({
    queryKey: ['pagination', 'currentPage'],
    initialData: initialPage,
    staleTime: 30 * 60 * 1000,
  });

  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  const handlePrevious = () => {
    const newPage = Math.max(currentPage - 1, 1);
    queryClient.setQueryData(['pagination', 'currentPage'], newPage);
    onPageChange(newPage);
  };

  const handleNext = () => {
    const newPage = Math.min(currentPage + 1, totalPages);
    queryClient.setQueryData(['pagination', 'currentPage'], newPage);
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