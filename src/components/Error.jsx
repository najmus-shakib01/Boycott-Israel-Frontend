import PropTypes from "prop-types";
import { AlertTriangle, RefreshCw } from "lucide-react";

const Error = ({
  title = "পণ্য লোড করতে সমস্যা হয়েছে",
  message = "অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন অথবা ইন্টারনেট সংযোগ পরীক্ষা করুন।",
  onRetry,
}) => {
  return (
    <div
      role="alert"
      className="text-center py-12 px-4 rounded-[14px] border border-accent/20 bg-surface shadow-sm my-6 space-y-3"
    >
      <div className="w-12 h-12 mx-auto rounded-full bg-accent/10 text-accent grid place-items-center mb-2">
        <AlertTriangle size={24} aria-hidden="true" />
      </div>
      <h3 className="text-lg md:text-xl font-bold text-accent">{title}</h3>
      <p className="text-muted text-sm md:text-base max-w-md mx-auto leading-relaxed">
        {message}
      </p>
      {onRetry && (
        <div className="pt-3">
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-2 min-h-[44px] px-6 rounded-full bg-primary hover:bg-primary-dark text-on-primary font-semibold text-sm transition-all shadow-sm cursor-pointer"
          >
            <RefreshCw size={16} aria-hidden="true" />
            আবার চেষ্টা করুন
          </button>
        </div>
      )}
    </div>
  );
};

Error.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  onRetry: PropTypes.func,
};

export default Error;
