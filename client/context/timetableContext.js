"use client";
import axios from 'axios';
import React, { createContext, useEffect, useState, useContext } from 'react';
import { useUserContext } from '../context/userContext.js'; 
import toast from 'react-hot-toast';

const TimetableContext = createContext();
const serverUrl = 'http://localhost:8000'; 

export const TimetableProvider = ({ children }) => {
    const userID = useUserContext().user._id; // Get user ID from user context

    const [timetable, setTimetable] = useState({});
    const [loading, setLoading] = useState(false);

    // Get timetable entries
    const getTimetableEntries = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${serverUrl}/api/timetable`);
            // Assuming the response is structured as { [date]: [entries] }
            setTimetable(res.data);
        } catch (error) {
            console.error('Error getting timetable entries', error);
            toast.error('Failed to load timetable entries.');
        }
        setLoading(false);
    };

    // Create a timetable entry
    const createTimetableEntry = async (entry) => {
        setLoading(true);
        try {
            const res = await axios.post(`${serverUrl}/api/timetable/create`, entry);
            setTimetable((prevEntries) => ({
                ...prevEntries,
                [entry.date]: [...(prevEntries[entry.date] || []), res.data], // Add the new entry to the correct date
            }));
            toast.success('Timetable entry created successfully!');
        } catch (error) {
            console.error('Error creating timetable entry:', error);
            toast.error('Failed to create timetable entry.');
        } finally {
            setLoading(false);
        }
    };

    // Update a timetable entry
    const updateTimetableEntry = async (id, updatedEntry) => {
        setLoading(true);
        try {
            const res = await axios.put(`${serverUrl}/api/timetable/${id}`, updatedEntry);
            setTimetable((prevEntries) => {
                const day = updatedEntry.date; // Get the day from the updated entry
                return {
                    ...prevEntries,
                    [day]: prevEntries[day].map((entry) => (entry.id === id ? res.data : entry)), // Update the specific entry
                };
            });
            toast.success('Timetable entry updated successfully!');
        } catch (error) {
            console.error('Error updating timetable entry:', error);
            toast.error('Failed to update timetable entry.');
        } finally {
            setLoading(false);
        }
    };

    // Delete a timetable entry
    const deleteTimetableEntry = async (id) => {
        setLoading(true);
        try {
            await axios.delete(`${serverUrl}/api/timetable/${id}`);
            setTimetable((prevEntries) => {
                const updatedEntries = { ...prevEntries };
                // Remove the entry from the correct date
                Object.keys(updatedEntries).forEach((day) => {
                    updatedEntries[day] = updatedEntries[day].filter((entry) => entry.id !== id);
                });
                return updatedEntries;
            });
            toast.success('Timetable entry deleted successfully!');
        } catch (error) {
            console.error('Error deleting timetable entry:', error);
            toast.error('Failed to delete timetable entry.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userID) {
            getTimetableEntries(); // Fetch timetable entries when user ID is available
        }
    }, [userID]);

    return (
        <TimetableContext.Provider
            value={{
                timetable,
                loading,
                createTimetableEntry,
                updateTimetableEntry,
                deleteTimetableEntry,
            }}
        >
            {children}
        </TimetableContext.Provider>
    );
};

// Custom hook to use the TimetableContext
export const useTimetableContext = () => {
    return useContext(TimetableContext);
};