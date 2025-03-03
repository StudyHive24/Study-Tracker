'use client';
import useRiderect from "@/hooks/useUserRiderect";
import React, { useEffect, useState } from "react";
import { useTasksContext } from '@/context/taskContext.js';
import { useTimerContext } from "@/context/timerContext";
import axios from "axios";
import UserSection from "./components/userSection/UserSection";


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
const calculateTotalTime = (period: 'daily' | 'weekly' | 'monthly' | 'lifetime') => {
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
    } else if (period === 'lifetime') {
      totalSeconds += totalDurationInSeconds;
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

    const weeklyTasks = tasks.filter((task: { duedate: string | Date; completed: string }) => {
      const taskDate = new Date(task.duedate);
      return taskDate >= monday && taskDate <= sunday;
    });

    const totalTasks = weeklyTasks.length;
    const completedTasks = weeklyTasks.filter((task: { completed: string }) => task.completed == 'yes').length;

    setWeeklyTaskGoal(totalTasks);
    setWeeklyCompletionPercentage(
      totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0
    );
  }, [tasks]);

  
  type Task = {
    completed: string;
    priority: 'High' | 'Medium' | 'Low';
    duedate: string;  
    endTime: string;  
    
  };
  

  
  const sortedTasks = tasks
    .slice()  // Clone the array to avoid mutating the original
    .filter((task: Task) => task.completed == 'no')
    .sort((a: Task, b: Task) => {
      // Priority mapping for sorting
      const priorityMap = { High: 1, Medium: 2, Low: 3 };
  
      // Sort by priority first
      if (priorityMap[a.priority] !== priorityMap[b.priority]) {
        return priorityMap[a.priority] - priorityMap[b.priority];
      }
  
      // Parse the dates and times for comparison
      const dateA = new Date(a.duedate);
      const dateB = new Date(b.duedate);
  
      if (dateA.getTime() !== dateB.getTime()) {
        return dateA.getTime() - dateB.getTime();
      }
  
      // If `duedate` is the same, sort by `endTime`
      const endTimeA = new Date(a.endTime);
      const endTimeB = new Date(b.endTime);
      return endTimeA.getTime() - endTimeB.getTime();
    });

    //GET Total Completed Tasks 
    const completdtasks = tasks
    .slice() 
    .filter((task: Task) => task.completed == 'yes')

    const totalTasks2 = completdtasks.length;


  return (
    <div className="p-5 -mt-5 font-sans space-y-6">
      <UserSection />
      {/* Top Section */}
      <div className="flex space-x-6">
        {/* Daily/Weekly/Monthly Study Time */}
        <div className="flex-1 bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col items-center">
          <h3 className="text-2xl  font-semibold mb-6 text-white">
            Daily/Weekly/Monthly Study Time
          </h3>
          <div className="flex space-x-6 text-white  ">
            <TimeBox label="Daily" time={calculateTotalTime('daily')} className="w-[100px] bg-gray-600 rounded-lg p-4 shadow-md text-center bg-white bg-opacity-20" />
            <TimeBox label="Weekly" time={calculateTotalTime('weekly')} className=" bg-gray-300  shadow-md text-center bg-white bg-opacity-20"  />
            <TimeBox label="Monthly" time={calculateTotalTime('monthly')} className=" bg-gray-300  shadow-md text-center bg-white bg-opacity-20" />
          </div>
        </div>

      
        <div className="flex-1 bg-gray-800 p-6 rounded-xl shadow-xl flex flex-col items-center justify-center text-white">
          {/* Header */}
          <h3 className="text-lg font-semibold mb-4 text-center tracking-wide uppercase">
            Total Progress
          </h3>

          {/* Tasks Progress */}
          <div className="bg-white bg-opacity-20 p-2 rounded-lg shadow-md mb-4 w-full">
            <h1 className="text-xl font-extrabold text-center text-white ">
              Tasks:<br /> <span className="text-green-300">{totalTasks2}</span>
            </h1>
          </div>

          {/* Study Time Progress */}
          <div className="bg-white bg-opacity-20 p-2 rounded-lg shadow-md w-full">
            <h1 className="text-xl font-extrabold text-center text-white ">
              Study Time:<br /> <span className="text-green-300">{calculateTotalTime('lifetime')}</span>
            </h1>
          </div>
        </div>


        
        
      {/* Weekly Tasks Goal */}
        <div className="flex-1 bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center ">
          {/* Header Section with Separate Background */}
          <div className="bg-white bg-opacity-20 text-base font-bold text-white p-7 py-2 rounded-md mb-7 shadow-md">
            Weekly Tasks Goal: <span className="font-bold">{weeklyTaskGoal}</span>
          </div>
          {/* Completion Title */}
          <h1 className="text-2xl font-bold text-white">Completion</h1>
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-4 mt-4">
            <div
              className="bg-green-500 h-4 rounded-full"
              style={{ width: `${weeklyCompletionPercentage}%` }}
            ></div>
          </div>
          {/* Completion Percentage */}
          <h2 className="text-xl font-bold text-white mt-2">
            {weeklyCompletionPercentage}%
          </h2>
        </div>


      </div>

      {/* Bottom Section */}
      <div className="flex space-x-6">
        {/* Study Guide (Table) */}
        <div className="flex-1 bg-gray-800 bg-opacity-80 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold text-gray-100 mb-4">📌Tasks Study Guide</h3>
          <table className="w-full bg-white bg-opacity-20 table-auto border-separate border-spacing-2 shadow-lg rounded-lg ">
            <thead>
              <tr className="bg-gray-700 bg-opacity-80">
                <th className="p-3 text-center font-medium-bold text-gray-100 rounded-lg">Priority Level</th>
                <th className="p-3 text-center font-medium-bold text-gray-100 rounded-lg">Event</th>
                <th className="p-3 text-center font-medium-bold text-gray-100 rounded-lg">Date</th>
                <th className="p-3 text-center font-medium-bold text-gray-100 rounded-lg">Time</th>
              </tr>
            </thead>
            <tbody>
              {sortedTasks.slice(0, 5).map((task: any, index: any) => (
                <tr
                  key={index}
                  className="hover:bg-gray-600 transition duration-300 "
                >
                  {/* <td className="p-1 text-center text-gray-100">{task.priority}</td> */}
                  <td
                    className={`p-1 text-center text-sm font-medium ${
                      task.priority === 'High'
                        ? 'text-red-200'
                        : task.priority === 'Medium'
                        ? 'text-yellow-200'
                        : 'text-green-200'
                    }`}>
                    {task.priority}
                  </td>
                  <td className="p-1 text-center text-gray-100">{task.title}</td>
                  <td className="p-1 text-center text-gray-100">{new Date(task.duedate).toLocaleDateString()}</td>
                  <td className="p-1 text-center text-gray-100">
                    {new Date(task.endTime).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true,
                    })}
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

  
    </div>
  );
};

export default ProgressPage;
