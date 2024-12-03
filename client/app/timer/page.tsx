// app/timer/page.tsx

"use client"; // Enables client-side rendering

import { useState, useEffect } from "react"; // Importing React hooks
import "./Timer.css"; // Importing the CSS file for styling

// Timer component
export default function Timer() {
    // State hooks for managing timer state, including time left, whether it's running, and the message to display
    const [timeLeft, setTimeLeft] = useState(25 * 60); // Default timer: 25 minutes (in seconds)
    const [isRunning, setIsRunning] = useState(false); // State for running status of the timer
    const [isBreak, setIsBreak] = useState(false); // Whether it's study or break time
    const [selectedDuration, setSelectedDuration] = useState(25 * 60); // Selected study time duration
    const [selectedBreakDuration, setSelectedBreakDuration] = useState(5 * 60); // Default break duration (5 minutes)
    const [showResetModal, setShowResetModal] = useState(false); // Whether to show the reset modal
    const [message, setMessage] = useState(""); // Message to show during transitions (study/break)

    // Helper function to format time (in seconds) as MM:SS
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60); // Get minutes from seconds
        const secs = seconds % 60; // Get remaining seconds
        
        // Return formatted string as MM:SS where both minutes and seconds are padded to 2 digits
        return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    // useEffect hook to handle timer countdown when the timer is running
    useEffect(() => {
        let timer: NodeJS.Timeout | null = null; // Timer reference
        if (isRunning) {
            // Start the timer if it is running
            timer = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 0) {
                        clearInterval(timer!); // Stop the timer when it reaches 0
                        const nextPhase = !isBreak; // Switch between study and break phases
                        setMessage(nextPhase ? "Switching to Break Time!" : "Switching to Study Time!"); // Transition message
                        
                        // Set new time for the next phase
                        const newDuration = nextPhase ? selectedBreakDuration : selectedDuration;
                        setTimeLeft(newDuration); // Reset timer to new duration
                        setIsBreak(nextPhase); // Toggle between study and break phases
                        setTimeout(() => setMessage(""), 2000); // Clear transition message after 2 seconds
                        return newDuration; // Set the new time for the next phase
                    }
                    return prev - 1; // Decrease the time left by 1 second
                });
            }, 1000); // Interval to update every second
        }
        return () => {
            if (timer) clearInterval(timer); // Clean up the timer when the component is unmounted
        };
    }, [isRunning, isBreak, selectedDuration, selectedBreakDuration]); // Add both selectedDuration and selectedBreakDuration to the dependencies

    // Start the timer when the "Start" button is clicked
    const handleStart = () => setIsRunning(true);

    // Reset the timer to the selected duration and stop the countdown
    const handleReset = () => {
        setIsRunning(false); // Stop the timer
        setTimeLeft(selectedDuration); // Reset time to the selected duration
        setMessage(""); // Clear any messages
        setShowResetModal(false); // Close the reset confirmation modal
    };

    // Handle the change in the selected study duration (dropdown change)
    const handleDurationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newDuration = parseInt(event.target.value) * 60; // Convert minutes to seconds
        setSelectedDuration(newDuration); // Set the new study duration
        setTimeLeft(newDuration); // Reset the timer to the new duration
        setIsRunning(false); // Stop the timer
        setMessage(""); // Clear any messages

        // Adjust break duration based on selected study duration
        switch (newDuration) {
            case 1:
                setSelectedBreakDuration(1 * 60); // 1 min study = 1 min break
                break;
            case 25 * 60:
                setSelectedBreakDuration(5 * 60); // 25 min study = 5 min break
                break;
            case 50 * 60:
                setSelectedBreakDuration(10 * 60); // 50 min study = 10 min break
                break;
            case 60 * 60:
                setSelectedBreakDuration(15 * 60); // 60 min study = 15 min break
                break;
            case 120 * 60:
                setSelectedBreakDuration(20 * 60); // 120 min study = 20 min break
                break;
            default:
                setSelectedBreakDuration(5 * 60); // Default to 5 min break
                break;
        }
    };

    // Simulate saving the duration spent on a task (could be used for logging or analytics)
    const saveTimerDuration = async (durationSpent: number) => {
        console.log("Saving duration:", durationSpent); // Log the duration spent on the task
    };

    return (
        <div className="container">
            {/* Main timer box */}
            <div className="timer-box">
                <h1 className="title">{isBreak ? "Break Time" : "Study Time"}</h1> {/* Display title depending on break or study */}
                <div className="time-display">{formatTime(timeLeft)}</div> {/* Display the formatted time */}
                {message && <p className="transition-message">{message}</p>} {/* Show the transition message */}
                
                {/* Dropdown for selecting study duration */}
                <div className="dropdown-container">
                    <select className="duration-dropdown" onChange={handleDurationChange} disabled={isRunning}>
                        <option value="25">25 Minutes</option>
                        <option value="1">1 Minute</option>
                        <option value="50">50 Minutes</option>
                        <option value="60">1 Hour</option>
                        <option value="120">2 Hours</option>
                    </select>
                </div>
                
                {/* Start and Reset buttons */}
                <div>
                    <button className="button start-button" onClick={handleStart} disabled={isRunning}>Start</button>
                    <button className="button reset-button" onClick={() => setShowResetModal(true)}>Reset</button>
                </div>
            </div>

            {/* Reset modal confirmation */}
            {showResetModal && (
                <div className="modal">
                    <div className="modal-content">
                        <p>Are you sure you want to reset the timer? Unsaved progress will be lost.</p>
                        <div className="modal-buttons">
                            <button className="button confirm-button" onClick={handleReset}>Yes</button>
                            <button className="button cancel-button" onClick={() => setShowResetModal(false)}>No</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
