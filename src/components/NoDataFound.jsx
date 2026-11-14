import PropTypes from "prop-types";
import { PackageX } from "lucide-react";

const NoDataFound = ({
  title = "কোনো পণ্য পাওয়া যায়নি",
  description = "অন্য কোনো নামে সার্চ করুন অথবা ক্যাটাগরি ফিল্টার পরিবর্তন করুন।",
  children,
}) => {
  return (
    <div
      role="status"
      className="text-center py-16 px-4 rounded-[14px] border border-line bg-surface my-6 space-y-3"
    >
      <div className="w-12 h-12 mx-auto rounded-full bg-primary-tint text-primary grid place-items-center mb-3">
        <PackageX size={24} aria-hidden="true" />
      </div>
      <h3 className="text-lg md:text-xl font-bold text-text">{title}</h3>
      <p className="text-muted text-sm md:text-base max-w-md mx-auto leading-relaxed">
        {description}
      </p>
      {children && <div className="pt-2">{children}</div>}
    </div>
  );
};

NoDataFound.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node,
};

export default NoDataFound;
