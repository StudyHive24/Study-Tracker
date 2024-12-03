import React from "react";

function ProgressPage() {
  return (
    <div className="p-6 font-sans space-y-6">
      {/* Top Section */}
      <div className="flex space-x-6">
        {/* Daily/Weekly/Monthly Study Time */}
        <div className="flex-1 bg-gray-200 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Daily/weekly/monthly Study Time</h3>
          <div className="h-32 bg-gray-400 rounded-lg"></div>
        </div>

        {/* Weekly Time Goal */}
        <div className="flex-1 bg-gray-200 p-6 rounded-lg flex flex-col items-center justify-center">
          <h3 className="text-lg font-semibold mb-2">Weekly Time Goal: 25h</h3>
          <h1 className="text-2xl font-bold">Completion</h1>
          <h2 className="text-3xl font-bold mt-2">85%</h2>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex space-x-6">
        {/* Time Spent on Each Task */}
        <div className="flex-1 bg-gray-200 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Time spent on Each Task</h3>
          <div className="h-32 bg-gray-400 rounded-lg"></div>
        </div>

        {/* Study Guide */}
        <div className="flex-1 bg-gray-200 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Study Guide</h3>
          <div className="h-32 bg-gray-400 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}

export default ProgressPage;
