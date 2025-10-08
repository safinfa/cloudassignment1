"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const match = document.cookie.match(/theme=(dark|light)/);
    if (match) {
      setDarkMode(match[1] === "dark");
    }
  }, []);

  useEffect(() => {
    document.cookie = `theme=${darkMode ? "dark" : "light"}; path=/; max-age=${
      60 * 60 * 24 * 365
    }`;
  }, [darkMode]);

  const [steps, setSteps] = useState(["Step 1", "Step 2", "Step 3"]);
  const [activeTab, setActiveTab] = useState("Step 2");
  const [contentTitle, setContentTitle] = useState("Tabs Content");
  const [contentMap, setContentMap] = useState({
    "Step 1": "1. Download Windows\n2. Install Windows\n3. Enjoy Windows\n4. etc",
    "Step 2": "1. Reload Windows\n2. Reinstall Windows\n3. Restart Computer",
    "Step 3": "1. Test Windows\n2. Adjust Windows\n3. Enjoy Windows",
  });
  const [output, setOutput] = useState("");
  const [newStep, setNewStep] = useState("");

  const addStep = () => {
    if (newStep.trim() === "") return;
    setSteps([...steps, newStep]);
    setContentMap({ ...contentMap, [newStep]: "" });
    setNewStep("");
  };

  const deleteStep = (stepToDelete: string) => {
    const updatedSteps = steps.filter((s) => s !== stepToDelete);
    const updatedMap = { ...contentMap };
    delete updatedMap[stepToDelete];
    setSteps(updatedSteps);
    setContentMap(updatedMap);
    if (activeTab === stepToDelete && updatedSteps.length > 0) {
      setActiveTab(updatedSteps[0]);
    }
  };

  const handleContentChange = (value: string) => {
    setContentMap({ ...contentMap, [activeTab]: value });
  };

  const generateHTML = () => {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Assignment 1 - Tabs Page</title>
<style>
  body {
    font-family: sans-serif;
    background: ${darkMode ? "#111" : "#fff"};
    color: ${darkMode ? "#fff" : "#000"};
    margin: 20px;
  }
  header, footer {
    border: 1px solid ${darkMode ? "#555" : "#ccc"};
    padding: 8px;
    text-align: center;
  }
  nav {
    margin-top: 10px;
    border-bottom: 1px solid ${darkMode ? "#555" : "#ccc"};
    padding: 4px;
  }
  .tabs {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
  }
  .content {
    border: 1px solid ${darkMode ? "#ccc" : "#333"};
    padding: 10px;
    white-space: pre-line;
  }
</style>
</head>
<body>
  <header>
    <h1>Assignment 1</h1>
    <p>Student No: 22586710</p>
  </header>

  <nav>
    Tabs | Pre-lab Questions | Escape Room | Coding Races | About
  </nav>

  <main class="tabs">
    <div>
      <h3>Tabs Headers</h3>
      <p>${steps
        .map((s) => (s === activeTab ? `<b>${s}</b>` : s))
        .join("<br/>")}</p>
    </div>
    <div class="content">
      <h3>${contentTitle}</h3>
      <p>${contentMap[activeTab]?.replace(/\n/g, "<br/>")}</p>
    </div>
  </main>

  <footer>
    Safin Arfan, 22586710, 1 October 2025
  </footer>
</body>
</html>`;
    setOutput(html);
  };

  const downloadHTML = () => {
    if (!output) {
      alert("Please generate the output first!");
      return;
    }
    const blob = new Blob([output], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "tabs_page.html";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className={`min-h-screen flex flex-col font-sans ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      {}
      <Header darkMode={darkMode} />

      {}
      <main className="flex-1 flex flex-col md:flex-row gap-20 p-8 justify-center items-start">
        {}
        <section className="flex flex-col items-center w-1/4">
          <h2 className="text-lg font-semibold mb-4">Tabs Headers</h2>

          {}
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newStep}
              onChange={(e) => setNewStep(e.target.value)}
              placeholder="New Step"
              className={`border rounded px-2 py-1 w-28 ${
                darkMode
                  ? "bg-gray-800 text-white border-gray-200 focus:border-white"
                  : "bg-white text-black border-gray-400"
              }`}
            />
            <button
              onClick={addStep}
              className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              +
            </button>
          </div>

          {}
          <div className="flex flex-col gap-2">
            {steps.map((step) => (
              <div key={step} className="flex items-center gap-2">
                <button
                  className={`border px-3 py-1 rounded w-24 ${
                    activeTab === step
                      ? darkMode
                        ? "bg-white text-black"
                        : "bg-black text-white"
                      : ""
                  }`}
                  onClick={() => setActiveTab(step)}
                >
                  {step}
                </button>
                <button
                  onClick={() => deleteStep(step)}
                  className="text-red-500 font-bold hover:text-red-700"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </section>

        {}
        <section className="flex flex-col items-center w-1/3">
          <h2 className="text-lg font-semibold mb-4">Table of Content</h2>
          <input
            type="text"
            value={contentTitle}
            onChange={(e) => setContentTitle(e.target.value)}
            className={`border rounded px-2 py-1 mb-4 w-64 text-center ${
              darkMode
                ? "bg-gray-800 text-white border-gray-200 focus:border-white"
                : "bg-white text-black border-gray-400"
            }`}
            placeholder="Enter title"
          />
          <textarea
            value={contentMap[activeTab] || ""}
            onChange={(e) => handleContentChange(e.target.value)}
            className={`border rounded p-4 w-[400px] h-[250px] text-sm resize-none ${
              darkMode
                ? "bg-gray-800 text-white border-gray-200 focus:border-white"
                : "bg-white text-black border-gray-400"
            }`}
          />
        </section>

        {}
        <section className="flex flex-col items-center gap-4 w-1/3">
          <div className="flex gap-2">
            <button
              className={`border px-3 py-1 rounded ${
                darkMode ? "border-gray-600" : "border-gray-400"
              }`}
              onClick={generateHTML}
            >
              Output
            </button>

            <button
              className={`border px-3 py-1 rounded ${
                darkMode ? "border-gray-600" : "border-gray-400"
              }`}
              onClick={downloadHTML}
            >
              Download HTML
            </button>
          </div>

          <div
            className={`border p-3 w-[400px] h-[250px] overflow-auto font-mono text-xs ${
              darkMode ? "bg-gray-900 text-green-400" : "bg-gray-200 text-black"
            }`}
          >
            <pre>{output}</pre>
          </div>

          {}
          <div className="flex items-center gap-3 mt-6">
            <span className="text-sm">{darkMode ? "Dark" : "Light"} Mode</span>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors duration-300 ${
                darkMode ? "bg-blue-600" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-300 ${
                  darkMode ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </section>
      </main>

      {}
      <Footer />
    </div>
  );
}