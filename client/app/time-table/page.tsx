"use client";

import { useState, ReactElement } from "react";
import { useTimetableContext } from '@/context/timetableContext'; // Import the context
import useRiderect from "@/hooks/useUserRiderect";

interface TimetableEntry {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
  title: string;
  subject: string;
  color: string;
}

export default function TimetablePage(): ReactElement {
   useRiderect("/login");
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const { timetable, createTimetableEntry, updateTimetableEntry, deleteTimetableEntry, loading } = useTimetableContext(); // Use context
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [currentEntry, setCurrentEntry] = useState<Partial<TimetableEntry>>({});
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalEntry, setModalEntry] = useState<TimetableEntry | null>(null);
  const [subjects, setSubjects] = useState(["Math", "Science", "History", "English"]);
  const [newSubject, setNewSubject] = useState("");
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [isButtonVisible, setIsButtonVisible] = useState(true); // Manage button visibility

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setCurrentEntry({ ...currentEntry, [e.target.name]: e.target.value });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const handleAddTimetable = () => {
    if (selectedDate && currentEntry.startTime && currentEntry.endTime && currentEntry.title && currentEntry.subject && selectedColor) {
      const entry: TimetableEntry = {
        id: currentEntry.id || Date.now(), // Use Date.now() for new entries
        date: selectedDate,
        startTime: currentEntry.startTime!,
        endTime: currentEntry.endTime!,
        title: currentEntry.title!,
        subject: currentEntry.subject!,
        color: selectedColor,
      };

      if (currentEntry.id) {
        // Update existing entry
        updateTimetableEntry(currentEntry.id, entry);
      } else {
        // Create new entry
        createTimetableEntry(entry);
      }

      // Reset form
      setCurrentEntry({});
      setSelectedDate("");
      setSelectedColor("#000000");
      setIsFormVisible(false);
      setIsButtonVisible(true);
    }
  };

  const handleEditTimetable = (entry: TimetableEntry) => {
    setCurrentEntry(entry);
    setSelectedDate(entry.date);
    setSelectedColor(entry.color);
    setIsFormVisible(true);
    setIsButtonVisible(false);
    setIsModalVisible(false); // Close the modal when editing
  };

  const handleDeleteTimetable = (entryId: number) => {
    deleteTimetableEntry(entryId);
    setIsModalVisible(false);
  };

  const openModal = (entry: TimetableEntry) => {
    setModalEntry(entry);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleAddSubject = () => {
    if (newSubject && !subjects.includes(newSubject)) {
      setSubjects((prevSubjects) => [...prevSubjects, newSubject]);
      setNewSubject("");
    }
  };

  return (
    <div className="p-5 max-w-6xl mx-auto text-gray-100">
      {loading && <div className="text-center">Loading...</div>} {/* Loading indicator */}

      {isButtonVisible && (
        <button
          className="px-4 py-2 rounded bg-blue-600 text-white mb-5 hover:bg-blue-700"
          onClick={() => {
            setIsFormVisible(true);
            setIsButtonVisible(false);
          }}
        >
          Add Timetable
        </button>
      )}

      {isFormVisible && (
        <div className="relative max-w-md mx-auto bg-gray-800 p-5 rounded-lg">
          <span
            className="absolute top -3 right-3 text-xl cursor-pointer text-gray-100"
            onClick={() => {
              setIsFormVisible(false);
              setIsButtonVisible(true);
            }}
          >
            ✖
          </span>
          <h2 className="text-center text-lg font-semibold mb-4">
            {currentEntry.id ? "Edit Timetable Entry" : "Add Timetable Entry"}
          </h2>
          <div className="mb-4">
            <label className="block font-semibold mb-1">Select Date</label>
            <input
              type="date"
              name="date"
              className="w-full p-2 rounded border border-gray-600 bg-gray-700 text-gray-100"
              value={selectedDate}
              onChange={handleDateChange}
            />
          </div>

          <div className="flex gap-3">
            <div className="w-1/2">
              <label className="block font-semibold mb-1">Start Time</label>
              <input
                type="time"
                name="startTime"
                className="w-full p-2 rounded border border-gray-600 bg-gray-700 text-gray-100"
                value={currentEntry.startTime || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-1/2">
              <label className="block font-semibold mb-1">End Time</label>
              <input
                type="time"
                name="endTime"
                className="w-full p-2 rounded border border-gray-600 bg-gray-700 text-gray-100"
                value={currentEntry.endTime || ""}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block font-semibold mb-1">Title</label>
            <input
              type="text"
              name="title"
              className="w-full p-2 rounded border border-gray-600 bg-gray-700 text-gray-100"
              value={currentEntry.title || ""}
              onChange={handleInputChange}
            />
          </div>

          <div className="mt-4">
            <label className="block font-semibold mb-1">Subject</label>
            <div className="flex items-center gap-2">
              <select
                name="subject"
                className="w-full p-2 rounded border border-gray-600 bg-gray-700 text-gray-100"
                value={currentEntry.subject || ""}
                onChange={handleInputChange}
              >
                <option value="" disabled>
                  Select Subject
                </option>
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
              {currentEntry.subject && (
                <div
                  className="h-4 w-4 rounded-full"
                  style={{ backgroundColor: selectedColor }}
                />
              )}
            </div>
            <div className="flex justify-between mt-2">
              <input
                type="text"
                placeholder="New Subject"
                className="p-2 rounded border border-gray-600 bg-gray-700 text-gray-100"
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
              />
              <button
                onClick={handleAddSubject}
                className="px-4 py-2 ml-2 rounded bg-green-600 text-white hover:bg-green-700"
              >
                Add Subject
              </button>
            </div>
          </div>

          <div className="mt-4">
            <label className="block font-semibold mb-1">Select Color</label>
            <div className="flex overflow-x-auto space-x-2">
              {["#FF5733", "#33FF57", "#3357FF", "#F5F5F5", "#FFC300", "#FF33F6", "#33FFF6"].map((color) => (
                <div
                  key={color}
                  className={`w-8 h-8 rounded-full cursor-pointer ${selectedColor === color ? "border-4 border-blue-500" : ""}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                  title="Click to select color"
                />
              ))}
            </div>
          </div>

          <button
            className="mt-4 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            onClick={handleAddTimetable}
          >
            {currentEntry.id ? "Update Entry" : "Add Entry"}
          </button>
        </div>
      )}

      {/* Timetable Display */}
      <div className="mt-8">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {daysOfWeek.map((day) => (
 <th
                  key={day}
                  className="bg-gray-700 text-gray-100 py-3 text-center border border-gray-600"
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {daysOfWeek.map((day) => (
                <td
                  key={day}
                  className="bg-gray-600 text-gray-100 p-4 align-top border border-gray-600"
                >
                  {timetable[day] && timetable[day].length > 0 ? (
                    <ul className="list-none pl-0">
                      {timetable[day].map((entry: TimetableEntry) => (
                        <li
                          key={entry.id}
                          className="cursor-pointer mb-3 bg-gray-700 rounded p-3 hover:bg-gray-600"
                          onClick={() => openModal(entry)} // Open modal on entry click
                        >
                          <div className="text-center text-lg font-semibold text-white mb-2">
                            {entry.title}
                          </div>
                          <div className="flex items-center justify-center gap-2 text-center text-md text-gray-300 mb-2">
                            {entry.subject}
                            <div
                              className="h-4 w-4 rounded-full"
                              style={{ backgroundColor: entry.color }}
                            />
                          </div>
                          <div className="text-center text-sm text-gray-400">
                            {entry.startTime} - {entry.endTime}
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    "No entries"
                  )}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal */}
      {isModalVisible && modalEntry && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-900 p-6 rounded-lg">
            <h3 className="text-white text-lg mb-4">Entry Details</h3>
            <p className="text-gray-400 mb-4">
              <strong>{modalEntry.title}</strong>
              <br />
              {modalEntry.subject} on {modalEntry.date}
              <br />
              {modalEntry.startTime} - {modalEntry.endTime}
            </p>
            <div className="flex justify-between">
              <button
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                onClick={() => handleEditTimetable(modalEntry)} // Edit button
              >
                Edit Entry
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                onClick={() => handleDeleteTimetable(modalEntry.id)} // Delete button
              >
                Delete Entry
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}