"use client";
import React, { useState, useEffect } from "react";
import { useTimetableContext } from "@/context/timetableContext"; // Import context
import useRiderect from "@/hooks/useUserRiderect";

// Define TimetableEntry type
type TimetableEntry = {
  _id: string;
  date: string;
  startTime: string;
  endTime: string;
  title: string;
  subject: string;
  subjectColor: string;
};

type TimetableForm = {
  date: string;
  startTime: string;
  endTime: string;
  title: string;
  subject: string;
  subjectColor: string;
};

export default function TimeTableApp() {
  useRiderect("/login");
  const { timetables, createTimetable, updateTimetable, deleteTimetable, setLoading, loading } = useTimetableContext();

  const [form, setForm] = useState<TimetableForm>({
    date: "",
    startTime: "",
    endTime: "",
    title: "",
    subject: "",
    subjectColor: "#F0A1C2", // Default color
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<TimetableEntry | null>(null); // Updated type
  const [newSubject, setNewSubject] = useState("");
  const [subjects, setSubjects] = useState(["Math", "Science", "History"]);

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const timeSlots = Array.from({ length: 8 }, (_, index) => `${index + 8}:00`);

  const handleAddEntry = () => {
    if (form) {
      const newEntry = { ...form };

      if (isEditMode && selectedEntry) {
        updateTimetable(selectedEntry._id, newEntry); // Update existing entry
      } else {
        createTimetable(newEntry); // Create new entry
      }

      // Reset form after submission
      setForm({
        date: "",
        startTime: "",
        endTime: "",
        title: "",
        subject: "",
        subjectColor: "#F0A1C2", // Reset to default color
      });
      setIsModalOpen(false);
      setIsEditMode(false);
    }
  };

  const handleEntryClick = (entry: TimetableEntry) => {
    setSelectedEntry(entry);
    setForm(entry);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleDeleteEntry = () => {
    if (selectedEntry) {
      deleteTimetable(selectedEntry._id); // Delete selected entry
      setIsModalOpen(false);
      setSelectedEntry(null);
      setIsEditMode(false);
    }
  };

  const addNewSubject = () => {
    if (newSubject.trim() && !subjects.includes(newSubject.trim())) {
      setSubjects((prev: string[]) => [...prev, newSubject.trim()]);
      setNewSubject("");
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value, // Dynamically update form fields based on input name
    }));
  };

  const handleSubmit = () => {
      
  }

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
                  const entry = timetables.find((entry: TimetableEntry) => {
                    const startTime = new Date(`${entry.date}T${entry.startTime}:00`);
                    return startTime.getHours() === index + 8; // Match hour based on the slot
                  });

                  return (
                    <td
                      key={day}
                      className="border border-gray-300 px-4 py-2 text-center cursor-pointer"
                      onClick={() => entry && handleEntryClick(entry)}
                    >
                      {entry ? (
                        <div
                          key={entry._id}
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
      <form>
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">{isEditMode ? "Edit Time Table Entry" : "Add Time Table Entry"}</h2>
            <div className="space-y-4">
              <div className="flex flex-col">
                <label className="text-sm mb-2">Date:</label>
                <input
                  type="date"
                  name="date"
                  className="w-full border border-gray-300 px-4 py-2 rounded"
                  value={form.date || ""}
                  onChange={handleFormChange}
                />
              </div>
              <div className="flex space-x-4">
                <div className="flex flex-col w-1/2">
                  <label className="text-sm mb-2">Start Time:</label>
                  <input
                    type="time"
                    name="startTime"
                    className="w-full border border-gray-300 px-4 py-2 rounded"
                    value={form.startTime || ""}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="flex flex-col w-1/2">
                  <label className="text-sm mb-2">End Time:</label>
                  <input
                    type="time"
                    name="endTime"
                    className="w-full border border-gray-300 px-4 py-2 rounded"
                    value={form.endTime || ""}
                    onChange={handleFormChange}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label className="text-sm mb-2">Title:</label>
                <input
                  type="text"
                  name="title"
                  className="w-full border border-gray-300 px-4 py-2 rounded"
                  value={form.title || ""}
                  onChange={handleFormChange}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm mb-2">Subject:</label>
                <select
                  name="subject"
                  className="w-full border border-gray-300 px-4 py-2 rounded"
                  value={form.subject || ""}
                  onChange={handleFormChange}
                >
                  <option value="">Select a subject</option>
                  {subjects.map((subject, index) => (
                    <option key={index} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col">
                <label className="text-sm mb-2">Color:</label>
                <input
                  type="color"
                  name="subjectColor"
                  className="w-full border border-gray-300 px-4 py-2 rounded"
                  value={form.subjectColor || "#F0A1C2"}
                  onChange={handleFormChange}
                />
              </div>
            </div>
            <div className="flex justify-between mt-4">
              {isEditMode && (
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={handleDeleteEntry}
                >
                  Delete
                </button>
              )}
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleAddEntry}
              >
                {isEditMode ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
        </form>
      )}
    </div>
    
  );
}
