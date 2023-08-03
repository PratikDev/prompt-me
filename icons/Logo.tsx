import { FC } from "react";

const Logo: FC<{ className?: string }> = ({ className: customClasses }) => {
  return (
    <>
      <svg
        className={customClasses || ``}
        height="88"
        viewBox="0 0 50 88"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5 69L5 19"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <path
          d="M25 79L25 9"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <path
          d="M45 69L45 19"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
        />
      </svg>
    </>
  );
};

export default Logo;
