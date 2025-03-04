"use client"; // Enables client-side rendering

import { useState, useEffect, ReactElement, Key, ReactNode, useRef } from "react"; // Importing React hooks
import "./timer.css"; // Importing the CSS file for styling
import useRiderect from "@/hooks/useUserRiderect";
import { useTimerContext } from "@/context/timerContext"; // Import the context for handling timer data

// Modal Component for reset confirmation
function Modal({
  onConfirm,
  onCancel,
  message,
}: {
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
}) {
  return (
    <div className="timer-reset-modal">
      <div className="w-[30vw] p-[20px] bg-gray-700 rounded-lg flex justify-center flex-col">
        <p className="text-lg text-center text-gray-100 mb-2">{message}</p>
        <div className="flex justify-center gap-3 mt-3">
          <button className="bg-blue-600 p-2 w-full rounded-lg" onClick={onConfirm}>
            Yes
          </button>
          <button className="bg-red-600 p-2 w-full rounded-lg" onClick={onCancel}>
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default function TimerPage() {
  useRiderect("/login");

  const [studyTime, setStudyTime] = useState(25 * 60);
  const [breakTime, setBreakTime] = useState(5 * 60);
  const [time, setTime] = useState(studyTime);
  const [isRunning, setIsRunning] = useState(false);
  const [isStudyPhase, setIsStudyPhase] = useState(true);
  const [message, setMessage] = useState("");
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showTitleInput, setShowTitleInput] = useState(false);
  const [timerTitle, setTimerTitle] = useState("Study");
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);

  const { createTimer, timers = [] } = useTimerContext();

  // Store audio reference
  const timerUpAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Load audio only once
    timerUpAudioRef.current = new Audio("/TimerUp.mp3");
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleReset = () => {
    setShowResetConfirm(true);
  };

  const confirmReset = () => {
    setIsRunning(false);
    setIsStudyPhase(true);
    setTime(studyTime);
    setMessage("");
    setShowResetConfirm(false);
    setTimerTitle("Study");
    setShowTitleInput(false);
  };

  const cancelReset = () => {
    setShowResetConfirm(false);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime === 1) {
            clearInterval(timer!);
            setIsRunning(false);

            // Play the timer sound
            if (timerUpAudioRef.current) {
              timerUpAudioRef.current.play().catch((error) => console.error("Audio playback error:", error));
            }

            const nextPhase = isStudyPhase ? "Break" : "Focus";
            setMessage(`Time's up! Switching to ${nextPhase} Time.`);
            setTimeout(() => setMessage(""), 1000);

            if (isStudyPhase) {
              setShowSaveConfirm(true);
            }

            setIsStudyPhase(!isStudyPhase);
            return isStudyPhase ? breakTime : studyTime;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning, isStudyPhase, studyTime, breakTime]);

  return (
    <div className="timer-page gap-5">
      <div className="timer-container bg-gray-700">
        <h1 className="timer-title">{isStudyPhase ? `Focus Time - ${timerTitle}` : "Break Time"}</h1>
        <h2 className="timer-display">{formatTime(time)}</h2>
        <p className="timer-message">{message}</p>

        <button className="p-2 bg-green-600 hover:bg-green-700 text-gray-100 w-full rounded-lg" onClick={handleStart} disabled={isRunning}>
          Start
        </button>
        <button className="p-2 bg-red-600 hover:bg-red-700 w-full rounded-lg text-gray-100" onClick={handleReset} disabled={!isRunning}>
          Reset
        </button>
      </div>

      {showResetConfirm && <Modal message="Are you sure you want to reset?" onConfirm={confirmReset} onCancel={cancelReset} />}
      {showSaveConfirm && <Modal message="Do you want to save this timer information?" onConfirm={() => setShowSaveConfirm(false)} onCancel={() => setShowSaveConfirm(false)} />}
    </div>
  );
}
