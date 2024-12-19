"use client";

import { useState } from "react";
import { format, parseISO } from "date-fns";
import useRiderect from "@/hooks/useUserRiderect";

interface Schedule {
  id: number;
  date: string; // Format: YYYY-MM-DD
  startTime: string; // Format: HH:mm
  endTime: string; // Format: HH:mm
  title: string;
  priority: string;
}

export default function TimeTable() {

  useRiderect('/login')

  const [activeTable, setActiveTable] = useState<"daily" | "schedule">("daily");
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null);

  const handleAddOrEditSchedule = (schedule: Schedule) => {
    if (editingSchedule) {
      // Edit existing schedule
      setSchedules((prev) =>
        prev.map((s) => (s.id === editingSchedule.id ? schedule : s))
      );
    } else {
      // Add new schedule
      setSchedules((prev) => [...prev, { ...schedule, id: Date.now() }]);
    }
    setEditingSchedule(null);
    setIsModalOpen(false);
  };

  const handleDeleteSchedule = (id: number) => {
    setSchedules((prev) => prev.filter((s) => s.id !== id));
    setSelectedSchedule(null);
  };

  return (
    <div className="flex flex-col items-center p-4">
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

      <div className="w-full max-w-4xl">
        {activeTable === "daily" && (
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg bg-opacity-80">
            <h2 className="text-lg font-semibold mb-4">📌 Daily Time Table</h2>
            {/* Daily Time Table (Static for now) */}
          </div>
        )}

        {activeTable === "schedule" && (
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg bg-opacity-80">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">📌 Schedule Time Table</h2>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                onClick={() => setIsModalOpen(true)}
              >
                + Add Schedule
              </button>
            </div>
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200 shadow-md">
                  <th className="border border-gray-400 px-4 py-2">Date</th>
                  <th className="border border-gray-400 px-4 py-2">Day</th>
                  <th className="border border-gray-400 px-4 py-2">Start Time</th>
                  <th className="border border-gray-400 px-4 py-2">End Time</th>
                  <th className="border border-gray-400 px-20 py-2">Title</th>
                  <th className="border border-gray-400 px-2 py-2">Priority</th>
                </tr>
              </thead>
              <tbody>
                {schedules.map((schedule) => (
                  <tr
                    key={schedule.id}
                    onClick={() => setSelectedSchedule(schedule)}
                    className="cursor-pointer hover:bg-gray-300"
                  >
                    <td className="border border-gray-300 px-4 py-2">
                      {schedule.date}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {format(parseISO(schedule.date), "EEEE")}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {schedule.startTime}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {schedule.endTime}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {schedule.title}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {schedule.priority}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {isModalOpen && (
        <ScheduleModal
          onClose={() => {
            setIsModalOpen(false);
            setEditingSchedule(null);
          }}
          onSave={handleAddOrEditSchedule}
          schedule={editingSchedule}
        />
      )}

      {selectedSchedule && (
        <DetailsModal
          schedule={selectedSchedule}
          onClose={() => setSelectedSchedule(null)}
          onEdit={() => {
            setEditingSchedule(selectedSchedule);
            setIsModalOpen(true);
          }}
          onDelete={() => handleDeleteSchedule(selectedSchedule.id)}
        />
      )}
    </div>
  );
}

function ScheduleModal({
  onClose,
  onSave,
  schedule,
}: {
  onClose: () => void;
  onSave: (schedule: Schedule) => void;
  schedule: Schedule | null;
}) {
  const [form, setForm] = useState<Schedule>(
    schedule || { id: 0, date: "", startTime: "", endTime: "", title: "", priority: "" }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (form.date && form.startTime && form.endTime && form.title && form.priority) {
      onSave(form);
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">
          {schedule ? "Edit Schedule" : "Add Schedule"}
        </h2>
        <div className="space-y-4">
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded"
          />
          <input
            type="time"
            name="startTime"
            value={form.startTime}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded"
          />
          <input
            type="time"
            name="endTime"
            value={form.endTime}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded"
          />
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full border border-gray-300 px-4 py-2 rounded"
          />
          <input
            type="text"
            name="priority"
            value={form.priority}
            onChange={handleChange}
            placeholder="Priority"
            className="w-full border border-gray-300 px-4 py-2 rounded"
          />
        </div>
        <div className="flex justify-end mt-4 space-x-2">
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

function DetailsModal({
  schedule,
  onClose,
  onEdit,
  onDelete,
}: {
  schedule: Schedule;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Schedule Details</h2>
        <p><strong>Date:</strong> {schedule.date}</p>
        <p><strong>Day:</strong> {format(parseISO(schedule.date), "EEEE")}</p>
        <p><strong>Start Time:</strong> {schedule.startTime}</p>
        <p><strong>End Time:</strong> {schedule.endTime}</p>
        <p><strong>Title:</strong> {schedule.title}</p>
        <p><strong>Priority:</strong> {schedule.priority}</p>
        <div className="flex justify-end mt-4 space-x-2">
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
            onClick={onClose}
          >
            Close
          </button>
          <button
            className="bg-yellow-500 text-white px-4 py-2 rounded"
            onClick={onEdit}
          >
            Edit
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
