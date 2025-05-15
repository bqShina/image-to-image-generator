import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="p-6">
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
