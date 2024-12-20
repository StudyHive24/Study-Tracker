"use client"; // Enables client-side rendering

import { useState, useEffect, ReactElement, Key, ReactNode } from "react"; // Importing React hooks
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
      <div className="timer-reset-modal-content">
        <p>{message}</p>
        <button className="timer-confirm-button" onClick={onConfirm}>
          Yes
        </button>
        <button className="timer-cancel-button" onClick={onCancel}>
          No
        </button>
      </div>
    </div>
  );
}

export default function TimerPage() {
  useRiderect("/login");

  const [studyTime, setStudyTime] = useState(25 * 60); // Default study time (25 mins)
  const [breakTime, setBreakTime] = useState(5 * 60); // Default break time (5 mins)
  const [time, setTime] = useState(studyTime); // Current time in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isStudyPhase, setIsStudyPhase] = useState(true); // Toggle between study and break
  const [message, setMessage] = useState(""); // Display message
  const [showResetConfirm, setShowResetConfirm] = useState(false); // Reset confirmation
  const [showTitleInput, setShowTitleInput] = useState(false); // Toggle title input visibility
  const [timerTitle, setTimerTitle] = useState("Study"); // Timer title (default)
  const [showSaveConfirm, setShowSaveConfirm] = useState(false); // Save confirmation

  const { createTimer, timers } = useTimerContext();

  // Timer options
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
    setTimerTitle("Study"); // Reset title
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

  const handleSaveTimer = () => {
    const timerRecord = {
      title: timerTitle,
      duration: formatTime(studyTime),
      date: new Date(),
    };
    createTimer(timerRecord); // Call to create timer in the backend
    setShowSaveConfirm(false); // Close save confirmation modal
  };

  const cancelSaveTimer = () => {
    setShowSaveConfirm(false); // Close save confirmation modal
  };

  // Timer logic
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

            if (isStudyPhase) {
              // Show confirmation to save timer info
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
  }, [isRunning, isStudyPhase, studyTime, breakTime, timerTitle]);

  // Render Timer History
  const renderTimerHistory = () => {
    return timers.map(
      (timer: { date: string | number | Date; title: string; duration: string }, index: Key | null | undefined) => (
        <tr key={index}>
          <td>{new Date(timer.date).toLocaleString()}</td>
          <td>{timer.title}</td>
          <td>{timer.duration}</td>
        </tr>
      )
    );
  };

  return (
    <div className="timer-page gap-3">
      <h1 className="timer-page-title">⏰ Timer</h1>
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
            <button className="timer-enter-button" onClick={handleEnterTitle}>
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
            disabled={!isRunning}
          >
            Reset
          </button>
        </div>
      </div>

      {/* Timer History */}
      <div className="timer-history-container">
        <h2 className="timer-history-title">Timer History</h2>
        <table className="timer-history">
          <thead>
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>{renderTimerHistory()}</tbody>
        </table>
      </div>

      {/* Save Confirmation Modal */}
      {showSaveConfirm && (
        <Modal
          message="Do you want to save this timer information?"
          onConfirm={handleSaveTimer}
          onCancel={cancelSaveTimer}
        />
      )}

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <Modal
          message="Are you sure you want to reset?"
          onConfirm={confirmReset}
          onCancel={cancelReset}
        />
      )}
    </div>
  );
}
