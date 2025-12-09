"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: "Tabs", path: "/" },
    { name: "Pre-lab Questions", path: "/coming_soon" },
    { name: "Escape Room", path: "/escape_room" },
    { name: "Coding Races", path: "/coming_soon" },
    { name: "About", path: "/about" },
  ];

  return (
    <header className="border-b border-gray-400 bg-gray-800 text-white dark:bg-gray-900">
      {}
      <div className="flex justify-between items-center px-6 py-4">
        <div className="text-xl font-bold">Assignment 1</div>

        <div className="flex items-center gap-4">
          <div className="text-sm">Student No: 22586710</div>

          {}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col justify-between w-6 h-5 cursor-pointer sm:hidden"
          >
            <span
              className={`block h-[2px] bg-white rounded transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-[7px]" : ""
              }`}
            ></span>
            <span
              className={`block h-[2px] bg-white rounded transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`block h-[2px] bg-white rounded transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-[7px]" : ""
              }`}
            ></span>
          </button>
        </div>
      </div>

      {}
      <nav
        className={`border-t border-gray-600 px-6 py-3 text-sm transition-all duration-300 
          ${menuOpen ? "block" : "hidden"} sm:block`}
      >
        <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-8">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                router.push(item.path);
                setMenuOpen(false);
              }}
              className="hover:underline focus:underline text-left sm:text-center"
            >
              {item.name}
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
}
