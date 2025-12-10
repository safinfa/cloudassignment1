"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type EscapeResult = {
  id: number;
  result: "WIN" | "FAIL";
  timeTaken: number | null;
  createdAt: string;
};

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

  const [startTime, setStartTime] = useState<number | null>(null);
  const [timeTaken, setTimeTaken] = useState<number | null>(null);

  const [leaderboard, setLeaderboard] = useState<EscapeResult[]>([]);
  const [playerRank, setPlayerRank] = useState<number | null>(null);

  // ✅ FETCH LEADERBOARD
  const fetchLeaderboard = async () => {
    try {
      const res = await fetch("/api/escape", { cache: "no-store" });
      const data: EscapeResult[] = await res.json();

      const winsOnly = data
        .filter((r) => r.result === "WIN" && typeof r.timeTaken === "number")
        .sort((a, b) => a.timeTaken! - b.timeTaken!);

      setLeaderboard(winsOnly);
    } catch (err) {
      console.error("Failed to fetch leaderboard:", err);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  // ===== TIMER =====
  useEffect(() => {
    if (!running || time <= 0) return;

    const timer = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [running, time]);

  useEffect(() => {
    if (time === 0 && running) {
      setRunning(false);
      setFailed(true);
      setShowTask(false);
      saveResult("FAIL", null);
    }
  }, [time, running]);

  const startTimer = () => {
    const mins = minutes === "" ? 5 : Number(minutes);

    setStage(1);
    setInput("");
    setMessage("");
    setEscaped(false);
    setShowTask(false);
    setTimeTaken(null);
    setFailed(false);
    setPlayerRank(null);

    setTime(mins * 60);
    setRunning(true);
    setStartTime(Date.now());
  };

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

  // ✅ SAVE RESULT
  const saveResult = async (result: "WIN" | "FAIL", timeTaken: number | null) => {
    try {
      await fetch("/api/escape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ result, timeTaken }),
      });

      await fetchLeaderboard();
    } catch (error) {
      console.error("Failed to save result:", error);
    }
  };

  // ===== STAGE VALIDATION =====
  const checkAnswer = () => {
    if (stage === 1) {
      if (input.includes("console.log")) {
        setStage(2);
        setInput("");
        setMessage("");
        setShowTask(false);
      } else setMessage("❌ Fix the JavaScript output.");
    }

    if (stage === 2) {
      if (input.includes("for") && input.includes("1000")) {
        setStage(3);
        setInput("");
        setMessage("");
        setShowTask(false);
      } else setMessage("❌ Write a loop that reaches 1000.");
    }

    if (stage === 3) {
      if (input.toLowerCase().includes(",")) {
        const endTime = Date.now();

        if (startTime) {
          const secondsTaken = Math.floor((endTime - startTime) / 1000);
          setTimeTaken(secondsTaken);
          saveResult("WIN", secondsTaken);

          const rank =
            leaderboard.filter((r) => (r.timeTaken ?? 0) < secondsTaken).length +
            1;

          setPlayerRank(rank);
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
      <Header darkMode={true} />

      {/* ✅ TOP RIGHT LEADERBOARD */}
      <div className="fixed top-[120px] right-6 z-[999] bg-black/90 border border-yellow-400 p-4 rounded text-sm w-[280px]">
        <h2 className="text-yellow-300 font-bold text-center mb-2">
          🏆 Leaderboard (Fastest)
        </h2>

        {leaderboard.length === 0 && (
          <div className="text-center text-gray-400">No wins recorded yet</div>
        )}

        {leaderboard.slice(0, 3).map((player, index) => (
          <div
            key={player.id}
            className="flex justify-between text-green-300 font-mono text-sm"
          >
            <span>#{index + 1}</span>
            <span>
              {Math.floor(player.timeTaken! / 60)}m {player.timeTaken! % 60}s
            </span>
          </div>
        ))}
      </div>

      {/* ✅ TOP LEFT TIMER */}
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

      {/* ✅ ESCAPE ROOM IMAGE */}
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

        {stage === 1 && !failed && (
          <div
            className="absolute top-[40%] left-[25%] w-8 h-8 rounded-full bg-red-500 opacity-50 cursor-pointer"
            onClick={autoStartIfNeeded}
          />
        )}

        {stage === 2 && !failed && (
          <div
            className="absolute top-[55%] left-[55%] w-8 h-8 rounded-full bg-red-500 opacity-50 cursor-pointer"
            onClick={autoStartIfNeeded}
          />
        )}

        {stage === 3 && !failed && (
          <div
            className="absolute top-[30%] left-[70%] w-8 h-8 rounded-full bg-red-500 opacity-50 cursor-pointer"
            onClick={autoStartIfNeeded}
          />
        )}

        {/* ✅ TASK POPUP WITH QUESTIONS RESTORED */}
        {showTask && (
          <div className="absolute inset-0 flex items-center justify-center z-30">
            <div className="bg-black/90 border border-red-500 p-8 rounded-xl w-[600px]">
              {timeTaken !== null && (
                <div className="text-center text-green-300 mb-2 font-mono">
                  ✅ Time Taken: {Math.floor(timeTaken / 60)}m {timeTaken % 60}s
                </div>
              )}

              {playerRank !== null && (
                <div className="text-center text-yellow-300 mb-2 font-bold">
                  🏆 You placed #{playerRank}
                </div>
              )}

              <h1 className="text-2xl font-bold text-red-400 mb-4 text-center">
                🔐 Escape Room Challenge
              </h1>

              {/* ✅ QUESTIONS RESTORED */}
              <div className="mb-4 p-4 border border-white rounded text-sm">
                {stage === 1 && (
                  <>
                    <h2 className="font-bold mb-2">Stage 1 – Fix the Code</h2>
                    <pre className="bg-black p-2">
                      consol.log("Hello World")
                    </pre>
                  </>
                )}

                {stage === 2 && (
                  <>
                    <h2 className="font-bold mb-2">Stage 2 – Loops</h2>
                    <p>Write a loop that prints numbers from 0 to 1000.</p>
                  </>
                )}

                {stage === 3 && (
                  <>
                    <h2 className="font-bold mb-2">Stage 3 – Data Conversion</h2>
                    <pre className="bg-black p-2">
                      {`{ "name": "Alex", "age": 21 }`}
                    </pre>
                  </>
                )}
              </div>

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

              {message && (
                <div className="mt-4 p-3 border border-yellow-400 text-yellow-300 text-center rounded">
                  {message}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ✅ FAIL SCREEN */}
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
                Press{" "}
                <span className="text-green-400 font-bold">Start Timer</span> to
                try again.
              </p>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
