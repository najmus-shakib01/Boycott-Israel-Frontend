import PropTypes from "prop-types";

const NoProductFound = ({ onResetFilters }) => {
  return (
    <div className="text-center py-10">
      <p className="text-gray-600 dark:text-gray-400 text-lg">
        কোন পণ্য পাওয়া যায়নি
      </p>
      <button
        onClick={onResetFilters}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        ফিল্টার রিসেট করুন
      </button>
    </div>
  );
};

NoProductFound.propTypes = {
  onResetFilters: PropTypes.func.isRequired,
};

export default NoProductFound;
