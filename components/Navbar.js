"use client"
import React from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation'

const Navbar = () => {
  const pathname = usePathname()
  
  if (!["/", "/generate"].includes(pathname)) {
    return;
  }

  return (
    <nav className="bg-white w-[80vw] flex justify-between fixed top-10 right-[10vw] rounded-full z-10 p-4 px-7">
      <div className="logo flex gap-20 items-center">
        <Link href="/">
          <strong className="text-black text-3xl">Linktree</strong>
        </Link>

        <ul className="flex gap-10">
          <li className="text-black cursor-pointer">Templates</li>
          <li className="text-black cursor-pointer">Marketplace</li>
          <li className="text-black cursor-pointer">Discover</li>
          <li className="text-black cursor-pointer">Pricing</li>
          <li className="text-black cursor-pointer">Learn</li>
        </ul>
      </div>

      <div className="flex gap-3">
        <button className="px-3 rounded-lg font-bold text-black cursor-pointer">Log in</button>
        <button className="bg-gray-900 text-white font-bold px-5 py-3 rounded-full cursor-pointer">Sign up free</button>
      </div>
    </nav>
  );
};

export default Navbar;