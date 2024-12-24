"use client";
import React, { useState } from "react";
import { useTimetableContext } from "@/context/timetableContext";
import useRiderect from "@/hooks/useUserRiderect";

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
  const { timetables, createTimetable, updateTimetable, deleteTimetable } =
    useTimetableContext();

  const [form, setForm] = useState<TimetableForm>({
    date: "",
    startTime: "",
    endTime: "",
    title: "",
    subject: "",
    subjectColor: "#F0A1C2",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<TimetableEntry | null>(
    null
  );
  const [newSubject, setNewSubject] = useState("");
  const [subjects, setSubjects] = useState(["Math", "Science", "History"]);

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const timeSlots = Array.from({ length: 8 }, (_, index) => `${index + 8}:00`);

  const handleAddEntry = () => {
    if (form) {
      const newEntry = { ...form };
      if (isEditMode && selectedEntry) {
        updateTimetable(selectedEntry._id, newEntry);
      } else {
        createTimetable(newEntry);
      }
      setForm({
        date: "",
        startTime: "",
        endTime: "",
        title: "",
        subject: "",
        subjectColor: "#F0A1C2",
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
      deleteTimetable(selectedEntry._id);
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
      [name]: value,
    }));
  };

  return (
    <div className="p-6 bg-gray-800 text-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">📅 Weekly Timetable</h1>

      <button
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 mb-4 rounded-lg"
        onClick={() => setIsModalOpen(true)}
      >
        + Add Timetable Entry
      </button>

      <div className="overflow-auto border border-gray-600 rounded-lg shadow-lg bg-gray-700">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr>
              {daysOfWeek.map((day) => (
                <th
                  key={day}
                  className="border border-gray-600 px-4 py-2 text-center text-gray-100 bg-gray-800"
                >
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
                    return startTime.getHours() === index + 8;
                  });
                  return (
                    <td
                      key={day}
                      className="border border-gray-600 px-4 py-2 text-center cursor-pointer"
                      onClick={() => entry && handleEntryClick(entry)}
                    >
                      {entry ? (
                        <div
                          className="mb-2 p-2 rounded-lg text-gray-900"
                          style={{ backgroundColor: entry.subjectColor }}
                        >
                          <div className="font-semibold">{entry.title}</div>
                          <div className="text-sm">{entry.subject}</div>
                          <div className="text-xs">{`${entry.startTime} - ${entry.endTime}`}</div>
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
          <div className="bg-gray-700 text-gray-100 p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">{isEditMode ? "Edit Entry" : "Add Entry"}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Date:</label>
                <input
                  type="date"
                  name="date"
                  className="w-full bg-gray-600 text-gray-100 p-2 rounded"
                  value={form.date}
                  onChange={handleFormChange}
                />
              </div>
              <div className="flex gap-4">
                <div>
                  <label className="block text-sm mb-1">Start Time:</label>
                  <input
                    type="time"
                    name="startTime"
                    className="w-full bg-gray-600 text-gray-100 p-2 rounded"
                    value={form.startTime}
                    onChange={handleFormChange}
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">End Time:</label>
                  <input
                    type="time"
                    name="endTime"
                    className="w-full bg-gray-600 text-gray-100 p-2 rounded"
                    value={form.endTime}
                    onChange={handleFormChange}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm mb-1">Title:</label>
                <input
                  type="text"
                  name="title"
                  className="w-full bg-gray-600 text-gray-100 p-2 rounded"
                  value={form.title}
                  onChange={handleFormChange}
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Subject:</label>
                <select
                  name="subject"
                  className="w-full bg-gray-600 text-gray-100 p-2 rounded"
                  value={form.subject}
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
              <div>
                <label className="block text-sm mb-1">Color:</label>
                <input
                  type="color"
                  name="subjectColor"
                  className="w-full bg-gray-600 p-2 rounded"
                  value={form.subjectColor}
                  onChange={handleFormChange}
                />
              </div>
            </div>
            <div className="flex justify-between mt-4">
              {isEditMode && (
                <button
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
                  onClick={handleDeleteEntry}
                >
                  Delete
                </button>
              )}
              <button
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
                onClick={handleAddEntry}
              >
                {isEditMode ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
