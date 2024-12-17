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

  const [showTitleInput, setShowTitleInput] = useState(false); // Toggle title input visibility
  const [timerTitle, setTimerTitle] = useState("Study"); // Timer title (default)

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
    setTimerTitle("study"); // Reset title
    setShowTitleInput(false); // Hide title input
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

  const handleTitleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimerTitle(e.target.value); // Update title
  };

  const handleEnterTitle = () => {
    setShowTitleInput(false); // Hide title input
  };

  const handleToggleTitleInput = () => {
    setShowTitleInput(!showTitleInput); // Toggle input visibility
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
            const nextPhase = isStudyPhase ? "Break" : "Focus";
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
        <h1 className="timer-title">
          {isStudyPhase ? `Focus Time - ${timerTitle}` : "Break Time"}
        </h1>
        <h2 className="timer-display">{formatTime(time)}</h2>
        <p className="timer-message">{message}</p>
        <select
          className="timer-selector"
          onChange={handleTimeChange}
          disabled={isRunning}
          defaultValue="25 Minutes"
        >
          {timeOptions.map((option) => (
            <option key={option.label} value={option.label}>
              {option.label}
            </option>
          ))}
        </select>

        {showTitleInput ? (
          <div className="timer-title-input-container">
            <input
              type="text"
              className="timer-title-input"
              placeholder="Enter title"
              value={timerTitle}
              onChange={handleTitleInputChange}
            />
            <button
              className="timer-enter-button"
              onClick={handleEnterTitle}
            >
              Enter
            </button>
          </div>
        ) : (
          <button
            className="timer-toggle-title-button"
            onClick={handleToggleTitleInput}
            disabled={isRunning}
          >
            {timerTitle === "Study" ? "Add Title" : "Change Title"}
          </button>
        )}

        <div className="timer-controls">
          <button
            className="timer-start-button"
            onClick={handleStart}
            disabled={isRunning}
          >
            Start
          </button>
          <button
            className="timer-reset-button"
            onClick={handleReset}
            disabled={!isRunning} // Disable when timer is not running
          >
            Reset
          </button>
        </div>
      </div>
      {showResetConfirm && (
        <div className="timer-reset-modal">
          <div className="timer-reset-modal-content">
            <p>Are you sure you want to reset?</p>
            <button className="timer-confirm-button" onClick={confirmReset}>
              Yes
            </button>
            <button className="timer-cancel-button" onClick={cancelReset}>
              No
            </button>
          </div>
        </div>
      )}
    </div>

  );
}
