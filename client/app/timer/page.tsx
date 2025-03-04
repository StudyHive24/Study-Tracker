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
  const [showWarning, setShowWarning] = useState(true); // Warning message visibility

  const { createTimer, timers = [] } = useTimerContext(); // Ensure timers is initialized as an empty array

  const playAlarm = () => {
    const audioContext = new (window.AudioContext)();
  
    const playBeep = (timeOffset: number) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
  
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
  
      oscillator.frequency.value = 880; // Higher pitch for alarm sound
      gainNode.gain.setValueAtTime(0.5, audioContext.currentTime + timeOffset); // Start volume
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + timeOffset + 0.2); // Fade out
  
      oscillator.start(audioContext.currentTime + timeOffset);
      oscillator.stop(audioContext.currentTime + timeOffset + 0.3);
    };
  
    // Repeat the beep multiple times to simulate an alarm
    for (let i = 0; i < 4; i++) {
      playBeep(i * 0.4); // Play every 400ms
    }
  };
  

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
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
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

            // Play the timer up sound
            playAlarm()

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
        <tr key={index} className="flex justify-evenly text-gray-200 text-center mb-2">
          <td className="p-2 w-full bg-gray-500 rounded-tl-lg rounded-bl-lg border-r-2 border-gray-300">
            {new Date(timer.date).toLocaleString()}
          </td>
          <td className="p-2 w-full bg-gray-500 border-r-2 border-gray-300">{timer.title}</td>
          <td className="p-2 w-full bg-gray-500 rounded-se-lg rounded-ee-lg">{timer.duration}</td>
        </tr>
      )
    );
  };

  return (
    <div className="timer-page gap-5">
     {/* Warning Message */}
{showWarning && (
  <div className="fixed bottom-50 left-100 w-full flex justify-center p-4 z-50">
    <div className="bg-gray-900  rounded-lg text-white font-semibold text-lg tracking-wide text-center max-w-md p-4">
      <p>Warning: Navigating away from this page while timer is running reset the timer.</p>
      <button
        className="mt-2 px-3 py-1 bg-gray-700 rounded-lg text-gray-100 hover:bg-gray-700 block mx-auto"
        onClick={() => setShowWarning(false)}
      >
        Got it!
      </button>
    </div>
  </div>
)}
      <div className="timer-container bg-gray-700">
        <h1 className="timer-title">
          {isStudyPhase ? `Focus Time - ${timerTitle}` : "Break Time"}
        </h1>
        <h2 className="timer-display">{formatTime(time)}</h2>
        <p className="timer-message">{message}</p>
        <div>
          <select
            className="p-3 w-full rounded-lg"
            onChange={handleTimeChange}
            disabled={isRunning}
            defaultValue="25 Minutes" // Ensure this matches the label in timeOptions
          >
            {timeOptions.map((option) => (
              <option key={option.label} value={option.label}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {showTitleInput ? (
          <div className="timer-title-input-container">
            <input
              type="text"
              className="p-2 rounded-lg w-full"
              placeholder="Enter title"
              value={timerTitle}
              onChange={handleTitleInputChange}
            />
            <button className="bg-blue-600 hover:bg-blue-700 p-2 rounded-lg text-gray-100" onClick={handleEnterTitle}>
              Enter
            </button>
          </div>
        ) : (
          <button
            className="p-2 bg-blue-600 rounded-lg w-full mt-5 text-gray-100 hover:bg-blue-700"
            onClick={handleToggleTitleInput}
            disabled={isRunning}
          >
            {timerTitle === "Study" ? "Add Title" : "Change Title"}
          </button>
        )}

        <div className="timer-controls flex flex-row gap-3">
          <button
            className="p-2 bg-green-600 hover:bg-green-700 text-gray-100 w-full rounded-lg"
            onClick={handleStart}
            disabled={isRunning}
          >
            Start
          </button>
          <button
            className="p-2 bg-red-600 hover:bg-red-700 w-full rounded-lg text-gray-100"
            onClick={handleReset}
            disabled={!isRunning}
          >
            Reset
          </button>
        </div>
      </div>

      {/* Timer History */}
      <div className="timer-history-container">
        <h1 className="text-gray-100 text-xl text-center p-2 mb-2 bg-gray-700 rounded-lg">Timer History</h1>
        <table className="w-full gap-2 flex flex-col justify-evenly">
          <thead>
            <tr className="flex justify-evenly text-gray-100 text-center">
              <th className="p-2 w-full bg-gray-600 rounded-tl-lg rounded-bl-lg border-r-2 border-gray-200">Date</th>
              <th className="p-2 w-full bg-gray-600 border-r-2 border-gray-200">Title</th>
              <th className="p-2 w-full bg-gray-600 rounded-se-lg rounded-ee-lg">Duration</th>
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