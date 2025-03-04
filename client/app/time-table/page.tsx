"use client";

import { useState, ReactElement } from "react";
import { useTimetableContext } from "@/context/timetableContext";
import useRiderect from "@/hooks/useUserRiderect";

// Interface for a timetable entry
interface TimetableEntry {
  _id: string; // Use _id instead of id
  day: string;
  startTime: string;
  endTime: string;
  title: string;
  color: string;
}

// Array representing the days of the week
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// Function to generate time slots from 4:00 AM to 11:00 PM in 30-minute intervals
const generateTimeSlots = (): string[] => {
  const slots: string[] = [];
  let hour = 4;
  let minute = 0;

  while (hour < 23 || (hour === 23 && minute === 0)) {
    const start = `${hour}:${minute === 0 ? "00" : "30"} ${hour < 12 ? "AM" : "PM"}`;
    slots.push(start);

    if (minute === 0) {
      minute = 30;
    } else {
      minute = 0;
      hour++;
    }
  }
  return slots;
};

// Generate the list of time slots
const timeSlots = generateTimeSlots();

export default function TimetablePage(): ReactElement {
  useRiderect("/login"); // Redirects to login page if the user is not authenticated

  const { entries, addEntry, updateEntry, deleteEntry, deleteAllEntries } = useTimetableContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEntryModalOpen, setIsEntryModalOpen] = useState(false);
  const [isClearModalOpen, setIsClearModalOpen] = useState(false); // State for clear timetable modal
  const [selectedEntry, setSelectedEntry] = useState<TimetableEntry | null>(null);
  const [editingEntry, setEditingEntry] = useState<TimetableEntry | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Default entry for new timetable slots
  const defaultEntry: TimetableEntry = {
    _id: "",
    title: "",
    day: "Monday",
    startTime: "4:00 AM",
    endTime: "4:30 AM",
    color: "#3498db",
  };

  const [entry, setEntry] = useState<TimetableEntry>(defaultEntry);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setEntry({ ...entry, [e.target.name]: e.target.value });
    setError(null); // Clear error message when user types
  };

  const isTimeSlotAvailable = (newEntry: TimetableEntry): boolean => {
    return !entries.some((existingEntry: TimetableEntry) => {
      if (existingEntry.day !== newEntry.day) return false;

      const newStartIndex = timeSlots.indexOf(newEntry.startTime);
      const newEndIndex = timeSlots.indexOf(newEntry.endTime);
      const existingStartIndex = timeSlots.indexOf(existingEntry.startTime);
      const existingEndIndex = timeSlots.indexOf(existingEntry.endTime);

      return (
        (newStartIndex >= existingStartIndex && newStartIndex < existingEndIndex) ||
        (newEndIndex > existingStartIndex && newEndIndex <= existingEndIndex) ||
        (newStartIndex <= existingStartIndex && newEndIndex >= existingEndIndex)
      );
    });
  };

  const saveEntry = async () => {
    setError(null);

    if (!entry.title.trim()) {
      setError("Title cannot be empty.");
      return;
    }

    if (!isTimeSlotAvailable(entry) && !editingEntry) {
      setError("This time slot is already filled. Please choose a different time.");
      return;
    }

    const startIndex = timeSlots.indexOf(entry.startTime);
    const endIndex = timeSlots.indexOf(entry.endTime);

    if (startIndex >= endIndex) {
      setError("Start time must be before end time.");
      return;
    }

    if (editingEntry) {
      // Update the existing entry
      await updateEntry(editingEntry._id, entry); // Use _id instead of id
    } else {
      // Add a new entry
      const { _id, ...newEntry } = entry;
      await addEntry(newEntry);
    }

    setIsModalOpen(false);
    setEntry(defaultEntry);
  };

  const handleEntryClick = (entry: TimetableEntry) => {
    setSelectedEntry(entry);
    setIsEntryModalOpen(true);
  };

  const handleEditEntry = () => {
    if (selectedEntry) {
      setEntry(selectedEntry); // Populate the form with the selected entry
      setEditingEntry(selectedEntry); // Set the editing entry
      setIsEntryModalOpen(false); // Close the details modal
      setIsModalOpen(true); // Open the edit modal
    }
  };

  const handleDeleteEntry = async () => {
    if (selectedEntry) {
      await deleteEntry(selectedEntry._id); // Use _id instead of id
      setIsEntryModalOpen(false); // Close the details modal
    }
  };

  const handleClearTimetable = async () => {
    await deleteAllEntries(); // Call the deleteAllEntries function from context
    setIsClearModalOpen(false); // Close the confirmation modal
  };

  return (
    <div className="p-3 bg-gray-800 min-h-screen">
      <div className="flex justify-between items-center bg-gray-700 p-4 rounded-lg shadow-lg">
        <div className="text-left">
          <h1 className="text-2xl font-bold text-white">Study Timetable</h1>
        </div>
        <div className="text-right flex space-x-4">
          <button
            onClick={() => {
              setEditingEntry(null);
              setEntry(defaultEntry);
              setIsModalOpen(true);
            }}
            className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-600 transition-all"
          >
            Add Entry
          </button>
          <button
            onClick={() => setIsClearModalOpen(true)}
            className="bg-red-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-600 transition-all"
          >
            Clear Timetable
          </button>
        </div>
      </div>

      <div className="overflow-x-auto mt-6">
        <table className="table-fixed w-full border border-gray-600">
          <thead>
            <tr className="bg-gray-700 text-white">
              <th className="border border-gray-500 p-0 text-center">Time</th>
              {days.map((day) => (
                <th key={day} className="border border-gray-500 p-2 text-center">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map((slot, index) => (
              <tr key={index} className="border border-gray-500 hover:bg-gray-750 transition-all">
                <td className="border border-gray-500 p-2 text-center bg-gray-700 text-white">{slot}</td>
                {days.map((day) => {
                  const matchingEntry = entries.find((e: TimetableEntry) => {
                    const startIndex = timeSlots.indexOf(e.startTime);
                    const endIndex = timeSlots.indexOf(e.endTime);
                    return e.day === day && index >= startIndex && index < endIndex;
                  });

                  return (
                    <td
                      key={day}
                      className="border border-gray-600 p-0 h-0 relative bg-gray-800 text-center cursor-pointer hover:bg-gray-750 transition-all"
                      onClick={() => matchingEntry && handleEntryClick(matchingEntry)}
                    >
                      {matchingEntry && (
                        <div
                          className="p-1 text-white text-center h-full flex flex-col justify-between"
                          style={{ backgroundColor: matchingEntry.color, height: "100%" }}
                        >
                          {matchingEntry.startTime === slot && (
                            <>
                              <p className="font-semibold">{matchingEntry.title}</p>
                            </>
                          )}
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for adding/editing an entry */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-gray-700 p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold text-white mb-4">
              {editingEntry ? "Edit Timetable Entry" : "Add Timetable Entry"}
            </h2>

            {error && <p className="text-red-300 text-md mb-2">{error}</p>}

            <div className="space-y-4">
              <div>
                <label className="block text-white font-semibold mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter title"
                  value={entry.title}
                  onChange={handleChange}
                  className="w-full bg-gray-600 border border-gray-500 p-2 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-1">Day</label>
                <select
                  name="day"
                  value={entry.day}
                  onChange={handleChange}
                  className="w-full bg-gray-600 border border-gray-500 p-2 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {days.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-white font-semibold mb-1">Start Time</label>
                <select
                  name="startTime"
                  value={entry.startTime}
                  onChange={handleChange}
                  className="w-full bg-gray-600 border border-gray-500 p-2 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-white font-semibold mb-1">End Time</label>
                <select
                  name="endTime"
                  value={entry.endTime}
                  onChange={handleChange}
                  className="w-full bg-gray-600 border border-gray-500 p-2 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-white font-semibold mb-1">Color</label>
                <input
                  type="color"
                  name="color"
                  value={entry.color}
                  onChange={handleChange}
                  className="w-full bg-gray-600 border border-gray-500 p-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex justify-end mt-6 space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={saveEntry}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-all"
              >
                {editingEntry ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for displaying entry details */}
      {isEntryModalOpen && selectedEntry && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-gray-700 p-6 rounded shadow-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Entry Details</h2>
              <button
                onClick={() => setIsEntryModalOpen(false)}
                className="text-white text-lg hover:text-gray-300 transition-all"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-white font-semibold">Title:</p>
                <p className="text-white">{selectedEntry.title}</p>
              </div>
              <div>
                <p className="text-white font-semibold">Day:</p>
                <p className="text-white">{selectedEntry.day}</p>
              </div>
              <div>
                <p className="text-white font-semibold">Start Time:</p>
                <p className="text-white">{selectedEntry.startTime}</p>
              </div>
              <div>
                <p className="text-white font-semibold">End Time:</p>
                <p className="text-white">{selectedEntry.endTime}</p>
              </div>
              <div>
                <p className="text-white font-semibold">Color:</p>
                <div
                  className="w-8 h-8 rounded-full"
                  style={{ backgroundColor: selectedEntry.color }}
                />
              </div>
            </div>

            <div className="flex justify-end mt-6 space-x-4">
              <button
                onClick={handleEditEntry}
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition-all"
              >
                Edit
              </button>
              <button
                onClick={handleDeleteEntry}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for clearing the timetable */}
      {isClearModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-gray-700 p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold text-white mb-4">Clear Timetable</h2>
            <p className="text-white mb-6">Are you sure you want to clear the entire timetable? This action cannot be undone.</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsClearModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleClearTimetable}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-all"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}