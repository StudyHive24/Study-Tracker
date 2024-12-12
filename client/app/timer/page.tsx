// app/timer/page.tsx
"use client"; // Enables client-side rendering

import { useState, useEffect } from "react"; // Importing React hooks
import "./timer.css"; // Importing the CSS file for styling

export default function TimerPage() {
  const [studyTime, setStudyTime] = useState(25 * 60); // Default study time (25 mins)
  const [breakTime, setBreakTime] = useState(5 * 60); // Default break time (5 mins)
  const [time, setTime] = useState(studyTime); // Current time in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isStudyPhase, setIsStudyPhase] = useState(true); // Toggle between study and break
  const [message, setMessage] = useState(""); // Display message
  const [showResetConfirm, setShowResetConfirm] = useState(false); // Reset confirmation

  const timeOptions = [
    { label: "25 Minutes", study: 25 * 60, break: 5 * 60 },
    { label: "50 Minutes", study: 50 * 60, break: 10 * 60 },
    { label: "1 Hour", study: 60 * 60, break: 15 * 60 },
    { label: "2 Hours", study: 2 * 60 * 60, break: 20 * 60 },
    { label: "15 Seconds (Test)", study: 15, break: 5 }, // For testing
  ];

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleReset = () => {
    setShowResetConfirm(true); // Show confirmation
  };

  const confirmReset = () => {
    setIsRunning(false);
    setIsStudyPhase(true);
    setTime(studyTime);
    setMessage(""); // Clear any messages
    setShowResetConfirm(false); // Hide confirmation modal
  };

  const cancelReset = () => {
    setShowResetConfirm(false); // Close confirmation modal
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = timeOptions.find(
      (option) => option.label === e.target.value
    );
    if (selectedOption) {
      setStudyTime(selectedOption.study);
      setBreakTime(selectedOption.break);
      setTime(selectedOption.study);
      setIsStudyPhase(true);
      setIsRunning(false);
    }
  };

  //Timer logic
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime === 1) {
            clearInterval(timer!);
            setIsRunning(false);

            // Switch between study and break
            const nextPhase = isStudyPhase ? "Break" : "Study";
            setMessage(`Time's up! Switching to ${nextPhase} Time.`);
            setTimeout(() => setMessage(""), 1000); // Clear message after 1 second

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
    <div className="timer-page">
      <div className="timer-container">
        <h1>{isStudyPhase ? "Study Time" : "Break Time"}</h1>
        <h2 className="timer-display">{formatTime(time)}</h2>
        <p className="timer-message">{message}</p>
        <select
          className="time-selector"
          onChange={handleTimeChange}
          defaultValue="25 Minutes"
        >
          {timeOptions.map((option) => (
            <option key={option.label} value={option.label}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="timer-controls">
          <button
            className="start-button"
            onClick={handleStart}
            disabled={isRunning}
          >
            Start
          </button>
          <button className="reset-button" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>
      {showResetConfirm && (
        <div className="reset-modal">
          <div className="reset-modal-content">
            <p>Are you sure you want to reset?</p>
            <button className="confirm-button" onClick={confirmReset}>
              Yes
            </button>
            <button className="cancel-button" onClick={cancelReset}>
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
