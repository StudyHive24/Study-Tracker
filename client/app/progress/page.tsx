'use client'
import useRiderect from "@/hooks/useUserRiderect";
import React from "react";

// Reusable Sub-box Component
interface TimeBoxProps {
  label: string;
  time: string;
}
const TimeBox: React.FC<TimeBoxProps> = ({ label, time }) => (
  <div className="flex-1 bg-gray-300 p-4 rounded-lg flex flex-col items-center justify-center">
    <h4 className="text-md font-semibold">{label}</h4>
    <p className="text-xl font-bold mt-2">{time}</p>
  </div>
);

interface ProgressPageProps {
  dailyTime?: string;
  weeklyTime?: string;
  monthlyTime?: string;
  weeklyGoal?: number;
  weeklyTask?: number;
  completionPercentage?: number;
  completionPercentage2?: number;
}

const ProgressPage: React.FC<ProgressPageProps> = ({
  dailyTime = "2h",
  weeklyTime = "12h",
  monthlyTime = "50h",
  weeklyGoal = 25,
  weeklyTask = 21,
  completionPercentage = 85,
  completionPercentage2 = 85,
}) => {

  useRiderect('/login')

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
            <TimeBox label="Daily" time={dailyTime} />
            <TimeBox label="Weekly" time={weeklyTime} />
            <TimeBox label="Monthly" time={monthlyTime} />
          </div>
        </div>

        {/* Weekly Time Goal */}
        <div className="flex-1 bg-gray-200 bg-opacity-80 p-6 rounded-lg flex flex-col items-center justify-center shadow-lg">
          <h3 className="text-lg font-semibold mb-2">
            Weekly Time Goal: {weeklyGoal}h
          </h3>
          <h1 className="text-2xl font-bold">Completion</h1>
          <h2 className="text-3xl font-bold mt-2">{completionPercentage}%</h2>
        </div>

        {/* Weekly Tasks Goal */}
        <div className="flex-1 bg-gray-200 bg-opacity-80 p-6 rounded-lg flex flex-col items-center justify-center shadow-lg">
          <h3 className="text-lg font-semibold mb-2">
            Weekly Tasks Goal: {weeklyTask}
          </h3>
          <h1 className="text-2xl font-bold">Completion</h1>
          <h2 className="text-3xl font-bold mt-2">{completionPercentage2}%</h2>
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
