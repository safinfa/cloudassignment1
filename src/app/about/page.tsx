
// app/about/page.tsx
"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
export default function About() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div
      className={`min-h-screen flex flex-col font-sans ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      {/* ===== Header Component ===== */}
      <Header />

      {/* ===== Main Content ===== */}
      <main className="flex-1 flex flex-col justify-center items-center p-12 text-center">
        <h1 className="text-4xl font-bold mb-8">About This Project</h1>

        <div className="space-y-6 text-lg max-w-3xl leading-relaxed">
          <p>
            <span className="font-semibold">Name:</span> Safin Arfan
          </p>
          <p>
            <span className="font-semibold">Student ID:</span> 22586710
          </p>
          <p>
            <span className="font-semibold">Project Title:</span> Assignment 1 – Tabs Generator
          </p>
          <p>
            <span className="font-semibold">Description:</span> This project was built using
            Next.js and Tailwind CSS. It allows users to create, edit, and display
            custom tabs with editable content dynamically. The application demonstrates
            client-side interactivity, navigation between pages, and dark/light mode
            functionality using React state and Tailwind classes.
          </p>
        </div>

        {/* Dark Mode Toggle */}
        <div className="mt-10">
          <label className="flex items-center justify-center gap-2 cursor-pointer text-base">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
            Dark Mode
          </label>
        </div>
      </main>

      {/* ===== Footer Component ===== */}
      <Footer />
    </div>
  );
}
