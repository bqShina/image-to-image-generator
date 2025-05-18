import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-100 p-6 bg-inherit">
      <div className="flex">
        <Link
          href="/"
          className="text-[#947ffd] dark:text-[#CDC1FF] text-2xl font-bold"
        >
          Product AI
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
