'use client';
import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { useUserContext } from '../context/userContext.js';
import toast from 'react-hot-toast';

const TimetableContext = createContext();
const serverUrl = 'https://study-hive-server-f6.vercel.app';

export const TimetableProvider = ({ children }) => {
    const userID = useUserContext().user._id;

    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch timetable entries
    const fetchEntries = async () => {
        setLoading(true);

        try {
            const res = await axios.get(`${serverUrl}/api/timetable`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setEntries(res.data.timetableEntries);
        } catch (error) {
            console.error('Error fetching timetable entries:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Add a new timetable entry
    const addEntry = async (entry) => {
        setLoading(true);

        try {
            const res = await axios.post(`${serverUrl}/api/timetable/create`, entry, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setEntries((prevEntries) => [...prevEntries, res.data]);
            toast.success('Entry added successfully');
        } catch (error) {
            console.error('Error adding timetable entry:', error);
            toast.error('Failed to add timetable entry.');
        } finally {
            setLoading(false);
        }
    };

    // Update a timetable entry
    const updateEntry = async (id, updatedEntry) => {
        setLoading(true);

        try {
            const res = await axios.put(`${serverUrl}/api/timetable/${id}`, updatedEntry, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            // Update the state with the updated entry
            setEntries((prevEntries) =>
                prevEntries.map((entry) => (entry._id === id ? res.data : entry))
            );

            toast.success('Entry updated successfully');
        } catch (error) {
            console.error('Error updating timetable entry:', error);
            toast.error('Failed to update timetable entry.');
        } finally {
            setLoading(false);
        }
    };

    // Delete a timetable entry
    const deleteEntry = async (id) => {
        setLoading(true);

        try {
            await axios.delete(`${serverUrl}/api/timetable/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            // Remove the deleted entry from the state
            setEntries((prevEntries) => prevEntries.filter((entry) => entry._id !== id));

            toast.success('Entry deleted successfully');
        } catch (error) {
            console.error('Error deleting timetable entry:', error);
            toast.error('Failed to delete timetable entry.');
        } finally {
            setLoading(false);
        }
    };

    // Delete all timetable entries
    const deleteAllEntries = async () => {
        setLoading(true);

        try {
            await axios.delete(`${serverUrl}/api/timetable/delete/all`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setEntries([]);
            toast.success('All entries deleted successfully');
        } catch (error) {
            console.error('Error deleting all entries:', error);
            toast.error('Failed to delete all entries.');
        } finally {
            setLoading(false);
        }
    };

    // Fetch entries when the component mounts or userID changes
    useEffect(() => {
        if (userID) {
            fetchEntries();
        }
    }, [userID]);

    return (
        <TimetableContext.Provider
            value={{
                entries,
                loading,
                error,
                addEntry,
                updateEntry,
                deleteEntry,
                deleteAllEntries,
            }}
        >
            {children}
        </TimetableContext.Provider>
    );
};

export const useTimetableContext = () => {
    return useContext(TimetableContext);
};