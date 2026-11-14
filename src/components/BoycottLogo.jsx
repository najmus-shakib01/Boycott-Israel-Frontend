import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export const BoycottEmblem = ({ className = "w-8 h-8" }) => (
  <svg
    viewBox="0 0 48 48"
    className={`flex-none ${className}`}
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="24" cy="24" r="22" fill="#FFFFFF" stroke="#D6303D" strokeWidth="3" />
    <path
      d="M24 11l10 17H14zM24 37L14 20h20z"
      fill="none"
      stroke="#2438A8"
      strokeWidth="2.4"
      strokeLinejoin="round"
    />
    <path
      d="M9 38L39 10"
      stroke="#D6303D"
      strokeWidth="3.4"
      strokeLinecap="round"
    />
  </svg>
);

BoycottEmblem.propTypes = {
  className: PropTypes.string,
};

export const BoycottStamp = ({ className = "w-6 h-6" }) => (
  <BoycottEmblem className={className} />
);

BoycottStamp.propTypes = {
  className: PropTypes.string,
};

export const BoycottLockup = ({ className = "", onClick, to = "/" }) => {
  const content = (
    <span
      className={`inline-flex items-center gap-2 h-10 pl-1 pr-4 rounded-full bg-[#0A3F31] hover:bg-[#0E6B4D] text-white font-bold text-sm tracking-wide transition-all shadow-sm ${className}`}
    >
      <BoycottEmblem className="w-8 h-8" />
      <span className="font-sans font-bold tracking-wider">BOYCOTT</span>
      <span className="font-sans font-bold tracking-wider text-[#FF8A93]">ISRAEL</span>
    </span>
  );

  if (to) {
    return (
      <Link to={to} onClick={onClick} aria-label="বয়কট ইসরায়েল — হোম">
        {content}
      </Link>
    );
  }

  return content;
};

BoycottLockup.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  to: PropTypes.string,
};

export default BoycottLockup;
