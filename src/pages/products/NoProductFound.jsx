import PropTypes from "prop-types";
import { RotateCcw } from "lucide-react";
import NoDataFound from "../../components/NoDataFound";

const NoProductFound = ({ onResetFilters }) => {
  return (
    <NoDataFound
      title="কোনো পণ্য পাওয়া যায়নি"
      description="আপনার খোঁজা পণ্যটি আমাদের তালিকায় নেই অথবা ফিল্টারের সাথে মিলছে না।"
    >
      {onResetFilters && (
        <button
          onClick={onResetFilters}
          className="inline-flex items-center gap-2 min-h-[44px] px-6 rounded-full bg-primary hover:bg-primary-dark text-on-primary font-semibold text-sm transition-all shadow-sm cursor-pointer"
        >
          <RotateCcw size={16} aria-hidden="true" />
          ফিল্টার রিসেট করুন
        </button>
      )}
    </NoDataFound>
  );
};

NoProductFound.propTypes = {
  onResetFilters: PropTypes.func.isRequired,
};

export default NoProductFound;
