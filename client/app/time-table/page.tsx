"use client";

import { useState } from "react";

// app/time-table/page.tsx
export default function TimeTable() {
    const [activeTable, setActiveTable] = useState<"daily" | "schedule">("daily");

    return (
        <div className="flex flex-col items-center p-2">
            <div className="flex space-x-4 mb-4">
                <button
                    className={`px-4 py-2 font-semibold ${
                        activeTable === "daily"
                            ? "bg-gray-500 text-white"
                            : "bg-gray-200 text-gray-700"
                    } rounded-lg`}
                    onClick={() => setActiveTable("daily")}
                >
                    Daily Time Table
                </button>
                <button
                    className={`px-4 py-2 font-semibold ${
                        activeTable === "schedule"
                            ? "bg-gray-500 text-white"
                            : "bg-gray-200 text-gray-700"
                    } rounded-lg`}
                    onClick={() => setActiveTable("schedule")}
                >
                    Schedule Time Table
                </button>
            </div>

            <div className="w-full max-w-4xl ">
                {activeTable === "daily" && (
                    <div className="bg-gray-100 p-6 rounded-lg shadow-lg bg-opacity-80">
                        <h2 className="text-lg font-semibold mb-4 ">📌Daily Time Table</h2>
                        <table className="table-auto w-full border-collapse border border-gray-300 ">
                            <thead >
                                <tr className="bg-gray-200 shadow-md">
                                    <th className="border border-gray-400 px-4 py-2">Time</th>
                                    <th className="border border-gray-400 px-4 py-2">M</th>
                                    <th className="border border-gray-400 px-4 py-2">T</th>
                                    <th className="border border-gray-400 px-4 py-2">W</th>
                                    <th className="border border-gray-400 px-4 py-2">T</th>
                                    <th className="border border-gray-400 px-4 py-2">F</th>
                                    <th className="border border-gray-400 px-4 py-2">S</th>
                                    <th className="border border-gray-400 px-4 py-2">S</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array(5)
                                    .fill(null)
                                    .map((_, rowIndex) => (
                                        <tr key={rowIndex}>
                                            {Array(8)
                                                .fill(null)
                                                .map((_, colIndex) => (
                                                    <td
                                                        key={colIndex}
                                                        className="border border-gray-300 px-4 py-4 shadow-md hover:bg-gray-300"
                                                    ></td>
                                                ))}
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTable === "schedule" && (
                    <div className="bg-gray-100 p-6 rounded-lg shadow-lg bg-opacity-80">
                        <h2 className="text-lg font-semibold mb-4">📌Schedule Time Table</h2>
                        <table className="table-auto w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-200 shadow-md">
                                    <th className="border border-gray-400 px-4 py-2">Start Date</th>
                                    <th className="border border-gray-400 px-4 py-2">End Date</th>
                                    <th className="border border-gray-400 px-20 py-2">Title</th>
                                    <th className="border border-gray-400 px-2 py-2">Priority Level</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array(5)
                                    .fill(null)
                                    .map((_, rowIndex) => (
                                        <tr key={rowIndex}>
                                            {Array(4)
                                                .fill(null)
                                                .map((_, colIndex) => (
                                                    <td
                                                        key={colIndex}
                                                        className="border border-gray-300 px-4 py-4 shadow-md hover:bg-gray-300"
                                                    ></td>
                                                ))}
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
