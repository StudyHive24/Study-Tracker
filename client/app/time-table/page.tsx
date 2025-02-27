"use client";

import { useState, ReactElement } from "react";
import { useTimetableContext } from "@/context/timetableContext";
import useRiderect from "@/hooks/useUserRiderect";

// Interface for a timetable entry
interface TimetableEntry {
  id: number;
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

  const { entries, addEntry, updateEntry, deleteEntry } = useTimetableContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<TimetableEntry | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Default entry for new timetable slots
  const defaultEntry: TimetableEntry = {
    id: Date.now(),
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
    return !entries.some((existingEntry) => {
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
      await updateEntry(editingEntry.id, entry);
    } else {
      await addEntry(entry);
    }

    setIsModalOpen(false);
    setEntry(defaultEntry);
  };

  const editEntry = (entry: TimetableEntry) => {
    setEntry(entry);
    setEditingEntry(entry);
    setIsModalOpen(true);
  };

  const handleDeleteEntry = async (id: number) => {
    await deleteEntry(id);
  };

  return (
    <div className="p-3">
      <div className="flex justify-between items-center bg-gray-800 p-3 rounded-lg shadow-lg">
        <div className="text-left">
          <h1 className="text-2xl font-bold text-white">Study Timetable</h1>
        </div>
        <div className="text-right">
          <button
            onClick={() => {
              setEditingEntry(null);
              setEntry(defaultEntry);
              setIsModalOpen(true);
            }}
            className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-700 transition-all">
            Add Entry
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table-fixed w-full border border-gray-600">
          <thead>
            <tr className="bg-gray-700 text-white">
              <th className="border border-gray-500 p-0 text-center">Time</th>
              {days.map((day) => (
                <th key={day} className="border border-gray-500 p-2 text-center">{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map((slot, index) => (
              <tr key={index} className="border border-gray-500">
                <td className="border border-gray-500 p-2 text-center bg-gray-700 text-white">{slot}</td>
                {days.map((day) => {
                  const matchingEntry = entries.find((e) => {
                    const startIndex = timeSlots.indexOf(e.startTime);
                    const endIndex = timeSlots.indexOf(e.endTime);
                    return e.day === day && index >= startIndex && index < endIndex;
                  });

                  return (
                    <td key={day} className="border border-gray-600 p-0 h-0 relative bg-gray-800 text-center">
                      {matchingEntry && (
                        <div
                          className="p-1 text-white text-center h-full flex flex-col justify-between"
                          style={{ backgroundColor: matchingEntry.color, height: "100%" }}
                        >
                          {matchingEntry.startTime === slot && (
                            <>
                              <p className="font-semibold">{matchingEntry.title}</p>
                              <div className="flex justify-center flex gap-1 mt-2">
                                <button onClick={() => editEntry(matchingEntry)} className="text-white w-2/3 p-1 rounded text-xs bg-gray-100/50 hover:bg-gray-600 transition">✏️</button>
                                <button onClick={() => handleDeleteEntry(matchingEntry.id)} className="text-white w-2/3 p-1 rounded text-xs bg-gray-100/50 hover:bg-gray-600 transition">❌</button>
                              </div>
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
          <div className="bg-gray-500 p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold text-white mb-3">
              {editingEntry ? "Edit Timetable Entry" : "Add Timetable Entry"}
            </h2>

            {error && <p className="text-red-300 text-md mb-2">{error}</p>}

            <input type="text" name="title" placeholder="Title" value={entry.title} onChange={handleChange} className="w-full border p-2 rounded mb-2" />

            <select name="day" value={entry.day} onChange={handleChange} className="w-full border p-2 rounded mb-2">
              {days.map((day) => <option key={day} value={day}>{day}</option>)}
            </select>

            <select name="startTime" value={entry.startTime} onChange={handleChange} className="w-full border p-2 rounded mb-2">
              {timeSlots.map((time) => <option key={time} value={time}>{time}</option>)}
            </select>

            <select name="endTime" value={entry.endTime} onChange={handleChange} className="w-full border p-2 rounded mb-2">
              {timeSlots.map((time) => <option key={time} value={time}>{time}</option>)}
            </select>

            <input type="color" name="color" value={entry.color} onChange={handleChange} className="w-full border p-2 rounded mb-2" />

            <div className="flex justify-end">
              <button onClick={() => setIsModalOpen(false)} className="bg-gray-400 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600">Cancel</button>
              <button onClick={saveEntry} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">{editingEntry ? "Update" : "Add"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}