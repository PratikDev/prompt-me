import { cn } from "@/lib/utils";
import { FC } from "react";

const PlusIcon: FC<{ className?: string }> = ({ className }) => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={cn(className, ``)}
      >
        <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
      </svg>
    </>
  );
};

export default PlusIcon;
