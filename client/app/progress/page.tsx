'use client';
import useRiderect from "@/hooks/useUserRiderect";
import React, { useEffect, useState } from "react";
import { useTasksContext } from '@/context/taskContext.js';
import { useTimerContext } from "@/context/timerContext";
import axios from "axios";

// Reusable Sub-box Component
interface TimeBoxProps {
  label: string;
  time: string;
  className?: string;
}
const TimeBox: React.FC<TimeBoxProps> = ({ label, time, className }) => (
  <div className={`flex-1 bg-gray-300 p-4 rounded-lg flex flex-col items-center justify-center ${className}`}>
    <h4 className="text-md font-semibold">{label}</h4>
    <p className="text-xl font-bold mt-2">{time}</p>
  </div>
);

interface ProgressPageProps {
  dailyTime?: string;
  weeklyTime?: string;
  monthlyTime?: string;
}

const ProgressPage: React.FC<ProgressPageProps> = (props) => {
  const { dailyTime = "0h", weeklyTime = "0h", monthlyTime = "0h" } = props;
  useRiderect('/login');

  const { tasks } = useTasksContext();
  const [weeklyTaskGoal, setWeeklyTaskGoal] = useState(0);
  const [weeklyCompletionPercentage, setWeeklyCompletionPercentage] = useState(0);
  const [timers, setTimers] = useState<any[]>([]);

  // Fetch timers from the backend
  useEffect(() => {
    axios.get('http://localhost:8000/api/timer/') 
      .then(response => {
        setTimers(response.data.timers);
      })
      .catch(error => {
        console.error("Error fetching timers:", error);
      });
  }, []);

  // Convert duration to total minutes
// Convert duration to total minutes
const calculateTotalTime = (period: 'daily' | 'weekly' | 'monthly') => {
  const now = new Date();
  let totalSeconds = 0; // Change to track total seconds instead of minutes

  timers.forEach((timer) => {
    const timerDate = new Date(timer.date);
    const duration = timer.duration.split(":");
    const minutes = parseInt(duration[0], 10);
    const seconds = duration[1] ? parseInt(duration[1], 10) : 0;

    // Convert to total seconds
    const totalDurationInSeconds = minutes * 60 + seconds;

    if (period === 'daily' && timerDate.toDateString() === now.toDateString()) {
      totalSeconds += totalDurationInSeconds;
    } else if (period === 'weekly') {
      const { monday, sunday } = getCurrentWeekRange();
      if (timerDate >= monday && timerDate <= sunday) {
        totalSeconds += totalDurationInSeconds;
      }
    } else if (period === 'monthly') {
      if (timerDate.getMonth() === now.getMonth() && timerDate.getFullYear() === now.getFullYear()) {
        totalSeconds += totalDurationInSeconds;
      }
    }
  });

  return formatTimeFromSeconds(totalSeconds); // Format using seconds
};

// Format time from seconds to "Xh Ym"
const formatTimeFromSeconds = (totalSeconds: number) => {
  const totalMinutes = Math.floor(totalSeconds / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${hours}h ${minutes}m`;
};

  // Calculate current week's Monday and Sunday
  const getCurrentWeekRange = () => {
    const now = new Date();
    const day = now.getDay();
    const diffToMonday = day === 0 ? -6 : 1 - day;
    const monday = new Date(now);
    monday.setDate(now.getDate() + diffToMonday);
    monday.setHours(0, 0, 0, 0);

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    sunday.setHours(23, 59, 59, 999);

    return { monday, sunday };
  };

  useEffect(() => {
    const { monday, sunday } = getCurrentWeekRange();

    const weeklyTasks = tasks.filter((task: { duedate: string | Date; completed: boolean }) => {
      const taskDate = new Date(task.duedate);
      return taskDate >= monday && taskDate <= sunday;
    });

    const totalTasks = weeklyTasks.length;
    const completedTasks = weeklyTasks.filter((task: { completed: boolean }) => task.completed).length;

    setWeeklyTaskGoal(totalTasks);
    setWeeklyCompletionPercentage(
      totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0
    );
  }, [tasks]);

  return (
    <div className="p-6 font-sans space-y-6">
      {/* Top Section */}
      <div className="flex space-x-6">
        {/* Daily/Weekly/Monthly Study Time */}
        <div className="flex-1 bg-gray-200 bg-opacity-80 p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4">
            Daily/Weekly/Monthly Study Time
          </h3>
          <div className="flex space-x-4">
            <TimeBox label="Daily" time={calculateTotalTime('daily')} className="w-[200px]" />
            <TimeBox label="Weekly" time={calculateTotalTime('weekly')} />
            <TimeBox label="Monthly" time={calculateTotalTime('monthly')} />
          </div>
        </div>
        {/* Weekly Time Goal */}
        <div className="flex-1 bg-gray-200 bg-opacity-80 p-6 rounded-lg flex flex-col items-center justify-center shadow-lg">
          <h3 className="text-lg font-semibold mb-2">
            Weekly Time Goal: 2h
          </h3>
          <h1 className="text-2xl font-bold">Completion</h1>
          <h2 className="text-3xl font-bold mt-2">2%</h2>
        </div>
        {/* Weekly Tasks Goal */}
        <div className="flex-1 bg-gray-200 bg-opacity-80 p-6 rounded-lg flex flex-col items-center justify-center shadow-lg">
          <h3 className="text-lg font-semibold mb-2">
            Weekly Tasks Goal: {weeklyTaskGoal}
          </h3>
          <h1 className="text-2xl font-bold">Completion</h1>
          <h2 className="text-3xl font-bold mt-2">
            {weeklyCompletionPercentage}%
          </h2>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex space-x-6">
        {/* Study Guide (Table) */}
        <div className="flex-1 bg-gray-200 bg-opacity-80 p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Study Guide</h3>
          <table className="w-full table-auto border-separate border-spacing-2">
            <thead>
              <tr className="bg-gray-300 bg-opacity-80">
                <th className="p-3 text-left text-sm font-medium text-gray-700">Priority Level</th>
                <th className="p-3 text-left text-sm font-medium text-gray-700">Event</th>
                <th className="p-3 text-left text-sm font-medium text-gray-700">Date</th>
                <th className="p-3 text-left text-sm font-medium text-gray-700">Time</th>
              </tr>
            </thead>
            <tbody>
              {/* Example Rows */}
              <tr className="hover:bg-gray-100 transition duration-300">
                <td className="p-3 text-sm text-gray-600">High</td>
                <td className="p-3 text-sm text-gray-600">Study React</td>
                <td className="p-3 text-sm text-gray-600">2024-12-05</td>
                <td className="p-3 text-sm text-gray-600">10:00 AM</td>
              </tr>
              <tr className="hover:bg-gray-100 transition duration-300">
                <td className="p-3 text-sm text-gray-600">Medium</td>
                <td className="p-3 text-sm text-gray-600">Practice SQL</td>
                <td className="p-3 text-sm text-gray-600">2024-12-06</td>
                <td className="p-3 text-sm text-gray-600">2:00 PM</td>
              </tr>
              <tr className="hover:bg-gray-100 transition duration-300">
                <td className="p-3 text-sm text-gray-600">Low</td>
                <td className="p-3 text-sm text-gray-600">Read Data Science Book</td>
                <td className="p-3 text-sm text-gray-600">2024-12-07</td>
                <td className="p-3 text-sm text-gray-600">4:00 PM</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;
