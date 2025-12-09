"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function EscapeRoomPage() {
  const [minutes, setMinutes] = useState<string>("");
  const [time, setTime] = useState(300);
  const [running, setRunning] = useState(false);
  const [stage, setStage] = useState(1);
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");
  const [escaped, setEscaped] = useState(false);
  const [showTask, setShowTask] = useState(false);
  const [failed, setFailed] = useState(false);

  // ✅ Time tracking
  const [startTime, setStartTime] = useState<number | null>(null);
  const [timeTaken, setTimeTaken] = useState<number | null>(null);

  // ===== TIMER COUNTDOWN =====
  useEffect(() => {
    if (!running || time <= 0) return;

    const timer = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [running, time]);

  // ===== FAIL STATE WHEN TIME HITS 0 =====
  useEffect(() => {
    if (time === 0 && running) {
      setRunning(false);
      setFailed(true);
      setShowTask(false);
    }
  }, [time, running]);

  // ===== START / RESET TIMER =====
  const startTimer = () => {
    const mins = minutes === "" ? 5 : Number(minutes);

    // ✅ FULL GAME RESET
    setStage(1);
    setInput("");
    setMessage("");
    setEscaped(false);
    setShowTask(false);
    setTimeTaken(null);
    setFailed(false);

    // ✅ TIMER RESET + START
    setTime(mins * 60);
    setRunning(true);
    setStartTime(Date.now());
  };

  // ✅ AUTO START TIMER IF DOT IS CLICKED FIRST
  const autoStartIfNeeded = () => {
    if (!running && !escaped && !failed) {
      const mins = minutes === "" ? 5 : Number(minutes);
      setTime(mins * 60);
      setRunning(true);
      setStartTime(Date.now());
    }

    setShowTask(true);
  };

  const formatTime = () => {
    const min = Math.floor(time / 60);
    const sec = time % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  // ===== STAGE VALIDATION =====
  const checkAnswer = () => {
    if (stage === 1) {
      if (input.includes("console.log")) {
        setStage(2);
        setInput("");
        setMessage("");
        setShowTask(false);
      } else {
        setMessage("❌ Fix the JavaScript output.");
      }
    }

    if (stage === 2) {
      if (input.includes("for") && input.includes("1000")) {
        setStage(3);
        setInput("");
        setMessage("");
        setShowTask(false);
      } else {
        setMessage("❌ Write a loop that reaches 1000.");
      }
    }

    if (stage === 3) {
      if (input.toLowerCase().includes(",")) {
        const endTime = Date.now();

        if (startTime) {
          const secondsTaken = Math.floor((endTime - startTime) / 1000);
          setTimeTaken(secondsTaken);
        }

        setEscaped(true);
        setRunning(false);
        setTime(0);
        setMessage("🎉 YOU ESCAPED THE ROOM!");
      } else {
        setMessage("❌ Convert JSON values into CSV format.");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col text-white">

      {/* ===== HEADER ===== */}
      <Header darkMode={true} />

      {/* ===== TOP LEFT TIMER PANEL ===== */}
      <div className="fixed top-[120px] left-6 z-50 bg-black/80 border border-red-400 p-3 rounded text-sm space-y-2">
        <div className="font-mono text-lg text-white">⏱ {formatTime()}</div>

        <input
          type="number"
          min="1"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
          className="w-full px-2 py-1 rounded bg-black text-white border border-white"
          placeholder="Minutes (default 5)"
        />

        <button
          onClick={startTimer}
          className="bg-green-600 px-3 py-1 rounded hover:bg-green-700 w-full"
        >
          Start Timer
        </button>
      </div>

      {/* ===== ESCAPE ROOM IMAGE ===== */}
      <div
        className="relative w-full h-[calc(100vh-120px)] overflow-hidden"
        style={{
          backgroundImage: "url('/escaperoom02.jpg')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>

        {/* ===== ONE DOT AT A TIME (LOCKED IF FAILED) ===== */}
        {stage === 1 && !failed && (
          <div
            className="absolute top-[40%] left-[25%] w-8 h-8 rounded-full bg-red-500 opacity-50 cursor-pointer hover:opacity-90 z-20"
            onClick={autoStartIfNeeded}
          ></div>
        )}

        {stage === 2 && !failed && (
          <div
            className="absolute top-[55%] left-[55%] w-8 h-8 rounded-full bg-red-500 opacity-50 cursor-pointer hover:opacity-90 z-20"
            onClick={autoStartIfNeeded}
          ></div>
        )}

        {stage === 3 && !failed && (
          <div
            className="absolute top-[30%] left-[70%] w-8 h-8 rounded-full bg-red-500 opacity-50 cursor-pointer hover:opacity-90 z-20"
            onClick={autoStartIfNeeded}
          ></div>
        )}

        {/* ===== TASK PANEL ===== */}
        {showTask && (
          <div className="absolute inset-0 flex items-center justify-center z-30">
            <div className="bg-black/90 border border-red-500 p-8 rounded-xl w-[600px]">

              {timeTaken !== null && (
                <div className="text-center text-green-300 mb-2 font-mono">
                  ✅ Time Taken: {Math.floor(timeTaken / 60)}m {timeTaken % 60}s
                </div>
              )}

              <h1 className="text-2xl font-bold text-red-400 mb-4 text-center">
                🔐 Escape Room Challenge
              </h1>

              <div className="mb-4 p-4 border border-white rounded text-sm">
                {stage === 1 && (
                  <>
                    <h2 className="font-bold mb-2">Stage 1 – Fix the Code</h2>
                    <p>Fix this broken code:</p>
                    <pre className="bg-black p-2 mt-2">
                      consol.log("Hello World")
                    </pre>
                  </>
                )}

                {stage === 2 && (
                  <>
                    <h2 className="font-bold mb-2">Stage 2 – Generate Numbers</h2>
                    <p>Write a loop that prints numbers from 0 to 1000.</p>
                  </>
                )}

                {stage === 3 && (
                  <>
                    <h2 className="font-bold mb-2">Stage 3 – Data Conversion</h2>
                    <p>Convert this JSON into CSV:</p>
                    <pre className="bg-black p-2 mt-2">
                      {`{ "name": "Alex", "age": 21 }`}
                    </pre>
                  </>
                )}
              </div>

              {!escaped && (
                <>
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="w-full h-[120px] p-3 bg-black border border-white rounded text-sm mb-4"
                    placeholder="Write your solution here..."
                  />

                  <button
                    onClick={checkAnswer}
                    className="bg-blue-600 w-full py-2 rounded hover:bg-blue-700"
                  >
                    Submit Answer
                  </button>
                </>
              )}

              {message && (
                <div className="mt-4 p-3 border border-yellow-400 text-yellow-300 text-center rounded">
                  {message}
                </div>
              )}

              {escaped && (
                <div className="mt-6 text-center text-green-400 text-xl font-bold">
                  🗝 YOU ESCAPED SUCCESSFULLY!
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===== FAIL SCREEN ===== */}
        {failed && (
          <div className="absolute inset-0 flex items-center justify-center z-40">
            <div className="bg-black/95 border border-red-600 p-10 rounded-xl w-[600px] text-center">
              <h1 className="text-3xl font-bold text-red-500 mb-4">
                ❌ YOU FAILED THE CHALLENGE
              </h1>

              <p className="text-gray-200 mb-6">
                Time has run out. The room remains locked.
              </p>

              <p className="text-sm text-gray-400">
                Press <span className="text-green-400 font-bold">Start Timer</span> to try again.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ===== FOOTER ===== */}
      <Footer />
    </div>
  );
}
