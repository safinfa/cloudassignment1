"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = dark ? "light" : "dark";
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", newTheme);
    setDark(!dark);
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 border px-2 py-1 rounded"
    >
      <span>{dark ? "🌙" : "☀️"}</span>
      <span>{dark ? "Dark" : "Light"} Mode</span>
    </button>
  );
}
