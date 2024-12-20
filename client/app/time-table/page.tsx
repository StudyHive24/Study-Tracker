"use client";

import React, { useState } from "react";
import { format, parseISO, getDay } from "date-fns";
import { isBefore, isAfter, isEqual } from "date-fns";

interface Entry {
  id: number;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  title: string;
  subject: string;
  dayOfWeek: string;
  subjectColor: string; // Added for color-coding the subjects
}

export default function TimeTableApp() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [subjects, setSubjects] = useState<string[]>(["Math", "Science", "History"]);
  const [subjectColors, setSubjectColors] = useState<string[]>([
    "#F0A1C2", "#A1D8F0", "#F0F0A1", "#A1F0A1", "#F0A1F0",
    "#FF69B4", "#33CC33", "#6666CC", "#CC6666", "#66CCCC",
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState<Entry | null>(null);
  const [newSubject, setNewSubject] = useState("");
  const [selectedColor, setSelectedColor] = useState(subjectColors[0]); // Default color for new subject
  const [isEditMode, setIsEditMode] = useState(false); // Flag to check if in edit mode
  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const timeSlots = Array.from({ length: 8 }, (_, index) => `${index + 8}:00`); // 8 time slots from 8:00 to 15:00

  const handleAddEntry = () => {
    if (form) {
      const dayOfWeek = daysOfWeek[getDay(new Date(form.date)) - 1];

      // Check for overlapping times only if not in edit mode
      const newStartTime = parseISO(`${form.date}T${form.startTime}:00`);
      const newEndTime = parseISO(`${form.date}T${form.endTime}:00`);

      if (!isEditMode) {
        const isOverlapping = entries.some((entry) => {
          const entryStart = parseISO(`${entry.date}T${entry.startTime}:00`);
          const entryEnd = parseISO(`${entry.date}T${entry.endTime}:00`);
          return (
            (isBefore(entryStart, newEndTime) && isAfter(entryEnd, newStartTime)) ||
            isEqual(entryStart, newStartTime) || isEqual(entryEnd, newEndTime)
          );
        });

        if (isOverlapping) {
          alert("The new entry overlaps with an existing entry. Please choose a different time.");
          return;
        }
      }

      if (isEditMode && selectedEntry) {
        // Update entry if in edit mode
        setEntries((prev) =>
          prev.map((entry) =>
            entry.id === selectedEntry.id
              ? { ...form, id: selectedEntry.id, dayOfWeek, subjectColor: selectedColor }
              : entry
          )
        );
      } else {
        setEntries((prev) => [
          ...prev,
          { ...form, id: Date.now(), dayOfWeek, subjectColor: selectedColor } as Entry,
        ]);
      }

      setForm(null);
      setIsModalOpen(false);
      setIsEditMode(false);
    }
  };

  const handleEntryClick = (entry: Entry) => {
    setSelectedEntry(entry);
    setForm(entry);
    setSelectedColor(entry.subjectColor); // Set selected color to the entry's color
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleDeleteEntry = () => {
    if (selectedEntry) {
      setEntries((prev) => prev.filter((entry) => entry.id !== selectedEntry.id));
      setIsModalOpen(false);
      setSelectedEntry(null);
      setIsEditMode(false);
    }
  };

  const addNewSubject = () => {
    if (newSubject.trim() && !subjects.includes(newSubject.trim())) {
      setSubjects((prev) => [...prev, newSubject.trim()]);
      setNewSubject("");
    }
  };

  const getEntriesForDay = (day: string) => entries.filter((entry) => entry.dayOfWeek === day);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">📅 Weekly Time Table</h1>

      <button
        className="bg-blue-500 text-white px-4 py-2 mb-4 rounded-lg"
        onClick={() => setIsModalOpen(true)}
      >
        + Add Time Table
      </button>

      <div className="overflow-auto border border-gray-300 rounded-lg shadow-lg bg-white">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-gray-200">
            <tr>
              {daysOfWeek.map((day) => (
                <th key={day} className="border border-gray-300 px-4 py-2 text-center">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map((slot, index) => (
              <tr key={index}>
                {daysOfWeek.map((day) => {
                  const entriesForDay = getEntriesForDay(day);
                  const entry = entriesForDay.find((entry) => {
                    const startTime = parseISO(`${entry.date}T${entry.startTime}:00`);
                    return startTime.getHours() === index + 8; // Match entry based on the time slot index
                  });

                  return (
                    <td
                      key={day}
                      className="border border-gray-300 px-4 py-2 text-center cursor-pointer"
                      onClick={() => entry && handleEntryClick(entry)}
                    >
                      {entry ? (
                        <div
                          key={entry.id}
                          className="mb-2 p-2 rounded-lg"
                          style={{ backgroundColor: entry.subjectColor }}
                        >
                          <div className="font-semibold">{entry.title}</div>
                          <div className="text-sm">{entry.subject}</div>
                          <div className="text-xs text-gray-600">
                            {entry.startTime} - {entry.endTime}
                          </div>
                        </div>
                      ) : null}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">
              {isEditMode ? "Edit Time Table Entry" : "Add Time Table Entry"}
            </h2>
            <div className="space-y-4">
              <div className="flex flex-col">
                <label className="text-sm mb-2">Date:</label>
                <input
                  type="date"
                  className="w-full border border-gray-300 px-4 py-2 rounded"
                  value={form?.date || ""}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, date: e.target.value } as Entry))
                  }
                />
              </div>
              <div className="flex space-x-4">
                <div className="flex flex-col w-1/2">
                  <label className="text-sm mb-2">Start Time:</label>
                  <input
                    type="time"
                    className="w-full border border-gray-300 px-4 py-2 rounded"
                    value={form?.startTime || ""}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, startTime: e.target.value } as Entry))
                    }
                  />
                </div>
                <div className="flex flex-col w-1/2">
                  <label className="text-sm mb-2">End Time:</label>
                  <input
                    type="time"
                    className="w-full border border-gray-300 px-4 py-2 rounded"
                    value={form?.endTime || ""}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, endTime: e.target.value } as Entry))
                    }
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label className="text-sm mb-2">Title:</label>
                <input
                  type="text"
                  placeholder="Title"
                  className="w-full border border-gray-300 px-4 py-2 rounded"
                  value={form?.title || ""}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, title: e.target.value } as Entry))
                  }
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm mb-2">Subject:</label>
                <select
                  className="w-full border border-gray-300 px-4 py-2 rounded"
                  value={form?.subject || ""}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, subject: e.target.value } as Entry))
                  }
                >
                  {subjects.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col">
                <label className="text-sm mb-2">Add New Subject:</label>
                <input
                  type="text"
                  placeholder="Add new subject"
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  className="w-full border border-gray-300 px-4 py-2 rounded"
                />
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                  onClick={addNewSubject}
                >
                  Add Subject
                </button>
              </div>
              <div className="flex flex-col">
                <label className="text-sm mb-2">Select Color:</label>
                <div className="flex space-x-2">
                  {subjectColors.map((color) => (
                    <button
                      key={color}
                      className={`w-6 h-6 rounded-full ${selectedColor === color ? 'border-2 border-black' : ''}`} // Smaller color balls
                      style={{ backgroundColor: color }}
                      onClick={() => setSelectedColor(color)}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-4 space-x-2">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleAddEntry}
              >
                {isEditMode ? "Update" : "Add"}
              </button>
              {isEditMode && (
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={handleDeleteEntry}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
