

// app/timer/page.tsx
"use client";
import { useState, useEffect } from "react";

export default function Timer() {
    const [timeLeft, setTimeLeft] = useState(25 * 60); // Default 25 minutes
    const [isRunning, setIsRunning] = useState(false);
    const [isBreak, setIsBreak] = useState(false);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    useEffect(() => {
        let timer: NodeJS.Timeout | null = null;
        if (isRunning) {
            timer = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 0) {
                        clearInterval(timer!);
                        setIsBreak(!isBreak);
                        return isBreak ? 25 * 60 : 5 * 60; // Switch between work and break
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => {
            if (timer) {
                clearInterval(timer);
            }
        };
    }, [isRunning, isBreak]);

    const handleStartPause = () => {
        setIsRunning(!isRunning);
    };

    const handleReset = () => {
        setIsRunning(false);
        setTimeLeft(isBreak ? 5 * 60 : 25 * 60);
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <h1 className="text-2xl font-bold mb-4">
                    {isBreak ? "Break Time" : "Work Time"}
                </h1>
                <div className="text-4xl font-mono mb-4">{formatTime(timeLeft)}</div>
                <div className="space-x-4">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        onClick={handleStartPause}
                    >
                        {isRunning ? "Pause" : "Start"}
                    </button>
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        onClick={handleReset}
                    >
                        Reset
                    </button>
                </div>
            </div>
        </div>
    );
}
