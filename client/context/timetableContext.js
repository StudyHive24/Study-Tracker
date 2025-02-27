"use client";
import { createContext, useContext, useState, useEffect } from 'react';

// Create a context for the timetable
const TimetableContext = createContext();

// Custom hook to use the TimetableContext
export const useTimetableContext = () => useContext(TimetableContext);

// TimetableProvider component to wrap around your application
export const TimetableProvider = ({ children }) => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch timetable entries from the backend
  const fetchEntries = async () => {
    try {
      const response = await fetch('/api/timetable', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Include the token for protected routes
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch timetable entries');
      }
      const data = await response.json();
      setEntries(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Add a new timetable entry
  const addEntry = async (entry) => {
    try {
      const response = await fetch('/api/timetable/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Include the token for protected routes
        },
        body: JSON.stringify(entry),
      });
      if (!response.ok) {
        throw new Error('Failed to add timetable entry');
      }
      const newEntry = await response.json();
      setEntries((prevEntries) => [...prevEntries, newEntry]);
    } catch (err) {
      setError(err.message);
    }
  };

  // Update an existing timetable entry
  const updateEntry = async (id, updatedEntry) => {
    try {
      const response = await fetch(`/api/timetable/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Include the token for protected routes
        },
        body: JSON.stringify(updatedEntry),
      });
      if (!response.ok) {
        throw new Error('Failed to update timetable entry');
      }
      const updatedData = await response.json();
      setEntries((prevEntries) =>
        prevEntries.map((entry) => (entry.id === id ? updatedData : entry))
      );
    } catch (err) {
      setError(err.message);
    }
  };

  // Delete a timetable entry
  const deleteEntry = async (id) => {
    try {
      const response = await fetch(`/api/timetable/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Include the token for protected routes
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete timetable entry');
      }
      setEntries((prevEntries) => prevEntries.filter((entry) => entry.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  // Fetch entries when the component mounts
  useEffect(() => {
    fetchEntries();
  }, []);

  return (
    <TimetableContext.Provider
      value={{
        entries,
        loading,
        error,
        addEntry,
        updateEntry,
        deleteEntry,
      }}
    >
      {children}
    </TimetableContext.Provider>
  );
};