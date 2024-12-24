"use client";
import axios from 'axios';
import React, { createContext, useEffect, useState, useContext, useMemo } from 'react';
import { useUserContext } from '../context/userContext.js'; // Ensure this file correctly provides the user context
import toast from 'react-hot-toast';

const TimetableContext = createContext();

const serverUrl = 'http://localhost:8000'; // Ensure this points to your backend server

export const TimetableProvider = ({ children }) => {
  const { user } = useUserContext(); // Make sure `useUserContext` provides `user` with a token and _id
  const userID = user ? user._id : null;

  const [timetables, setTimetable] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all timetable entries
  const getTimetable = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${serverUrl}/api/timetable`, {
        headers: {
          Authorization: `Bearer ${user?.token}`, // Pass the token from the user context
        },
      });
      setTimetable(res.data.timetables);
      toast.success('Timetables fetched successfully!');
    } catch (error) {
      console.error('Error fetching timetables:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Failed to fetch timetables.');
    } finally {
      setLoading(false);
    }
  };

  // Create a new timetable entry
  const createTimetable = async (timetable) => {
    setLoading(true);
    try {
      const res = await axios.post(`${serverUrl}/api/timetable/create`, timetable, {
        headers: {
          Authorization: `Bearer ${user?.token}`, // Pass the token here
        },
      });
      setTimetable((prevTimetables) => [...prevTimetables, res.data]);
      toast.success('Timetable entry created successfully!');
    } catch (error) {
      console.error('Error creating timetable:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Failed to create timetable entry.');
    } finally {
      setLoading(false);
    }
  };

  // Update an existing timetable entry
  const updateTimetable = async (id, updatedTimetable) => {
    setLoading(true);
    try {
      const res = await axios.put(`${serverUrl}/api/timetable/${id}`, updatedTimetable, {
        headers: {
          Authorization: `Bearer ${user?.token}`, // Pass the token here
        },
      });
      setTimetable((prevTimetables) =>
        prevTimetables.map((timetable) =>
          timetable._id === id ? res.data : timetable
        )
      );
      toast.success('Timetable entry updated successfully!');
    } catch (error) {
      console.error('Error updating timetable:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Failed to update timetable entry.');
    } finally {
      setLoading(false);
    }
  };

  // Delete a timetable entry
  const deleteTimetable = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${serverUrl}/api/timetable/${id}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`, // Pass the token here
        },
      });
      setTimetable((prevTimetables) =>
        prevTimetables.filter((timetable) => timetable._id !== id)
      );
      toast.success('Timetable entry deleted successfully!');
    } catch (error) {
      console.error('Error deleting timetable:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Failed to delete timetable entry.');
    } finally {
      setLoading(false);
    }
  };

  const deleteAllTimetables = async () => {
    try {
        res = await axios.delete(`${serverUrl}/api/timetable/delete/all`)

        if (res.status == 200) {
          setTimetable([])
          toast.success('Every time tables deleted Successfully')
        }
        

    } catch (error) {
        console.log(error)
        toast.error('Error in deleting all')
    }
}


  useEffect(() => {
    if (userID) {
      getTimetable();
    }
  }, [userID]);

  const value = useMemo(() => ({
    timetables,
    setTimetable,
    createTimetable,
    updateTimetable,
    deleteTimetable,
    setLoading,
    loading,
    deleteAllTimetables
  }), [timetables, loading]);

  return (
    <TimetableContext.Provider value={value}>
      {children}
    </TimetableContext.Provider>
  );
};

export const useTimetableContext = () => {
  return useContext(TimetableContext);
};
