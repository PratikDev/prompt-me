import SessionHandle from "@/components/Navbar/SessionHandle";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import Logo from "@/icons/Logo";
import Link from "next/link";
import { FC } from "react";

const Navbar: FC = () => {
  return (
    <>
      <header className="py-1.5 xs:py-2.5 border-b flex justify-between items-center pr-3 xs:pr-4 px-4 xs:px-6 md:px-16">
        <Link href={`/`} className="flex-center gap-4">
          <Logo className="w-8 h-16 xs:w-10 xs:h-20 md:w-12 md:h-20" />

          <p className="text-4xl md:text-5xl font-sans hidden xs:block pointer-events-none select-none">
            PromptMe
          </p>
        </Link>

        <div className="flex items-center gap-2.5 md:gap-5">
          <ThemeToggle />

          <SessionHandle />
        </div>
      </header>
    </>
  );
};

export default Navbar;
