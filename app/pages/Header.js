"use client";
import React, { useState } from "react";
import { MdOutlineMenu } from "react-icons/md";
const Header = () => {
  const [isMenuToggle, setIsMenuToggle] = useState(false);
  // Define the menu items in an array
  const menuItems = [
    { name: "Pricing", href: "#" },
    { name: "Features", href: "#" },
    { name: "Free SEO Audit", href: "#" },
    { name: "Free SEO Tools", href: "#" },
    { name: "AI SEO Assistant", href: "#" },
  ];
  return (
    <div>
      <div className="p-5 flex justify-between bg-slate-100">
        <div className="">SEO</div>
        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-[4vw]">
          {menuItems.map((item, index) => (
            <a key={index} href={item.href} className="hover:text-blue-500">
              {item.name}
            </a>
          ))}
        </div>
        {/* Get Started */}
        <div className="flex gap-2">
          <button className="bg-blue-500 text-white font-semibold py-2 px-4 md:rounded-lg rounded-sm">
            Get Started
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div
          className="lg:hidden"
          onClick={() => setIsMenuToggle(!isMenuToggle)}
        >
          <MdOutlineMenu
            size="25"
            className={`${isMenuToggle ? "bg-indigo-500" : "bg-white"}`}
          />
        </div>
      </div>
      {/* Mobile Menu */}
      {isMenuToggle && (
        <ul className="px-4 flex flex-col lg:hidden">
          {menuItems.map((item, index) => (
            <li key={index}>
              <a href={item.href} className="hover:text-blue-500">
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Header;
