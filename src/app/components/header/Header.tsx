import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="bg-slate-600 p-[10px]">
      <Link href={"/"} className=" text-[#ffff]">
        Test task
      </Link>
    </div>
  );
};

export default Header;
