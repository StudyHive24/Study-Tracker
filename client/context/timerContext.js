
'use client';
import axios from 'axios';
import React, { createContext, useEffect, useState, useContext } from 'react';
import { useUserContext } from '../context/userContext.js';
import toast from 'react-hot-toast';

const TimerContext = createContext();
const serverUrl = 'https://study-hive-server-f6.vercel.app';

export const TimersProvider = ({ children }) => {
    const userID = useUserContext().user._id;

    const [timers, setTimers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [topUsersTime, setTopUsersTime] = useState([]);

    // Get timers
    const getTimers = async () => {
        setLoading(true);

        try {
            const res = await axios.get(`${serverUrl}/api/timer`);
            setTimers(res.data.timers);
        } catch (error) {
            console.error('Error getting timer info', error);
        }

        setLoading(false);
    };

    // Create a timer
    

    // const createTimer = async (timer) => {
    //     setLoading(true);
    
    //     try {
    //         const res = await axios.post(`${serverUrl}/api/timer/create`, timer);
    //         setTimers((prevTimers) => [...prevTimers, res.data]);
    //         toast.success('Save successfully');
    //     } catch (error) {
    //         console.error('Error creating timer:', error);
    //         toast.error('Failed to create timer.');
    //     } finally {
    //         setLoading(false); // Ensure loading is stopped even if an error occurs
    //     }
    // };
    // my code

    const createTimer = async (timer) => {
        console.log('createTimer called');
        setLoading(true);
        try {
            const res = await axios.post(`${serverUrl}/api/timer/create`, timer);
            console.log('Timer created successfully:', res.data);
            setTimers((prevTimers) => [...prevTimers, res.data]);
            toast.success('Save successfully'); // Toast success message
        } catch (error) {
            console.error('Error creating timer:', error);
            toast.error('Failed to create timer.');
        } finally {
            setLoading(false);
            console.log('createTimer finished');
        }
    };

    const deleteAllTimers = async () => {
        try {
            res = await axios.delete(`${serverUrl}/api/timer/delete/all`)

            if (res.status == 200) {
                setTimers([])
                toast.success('Every timer information deleted Successfully')
            }
            

        } catch (error) {
            console.log(error)
            toast.error('Error in deleting all')
        }
    }
    
    

    // Handle input changes
    const handleInput = (name) => (e) => {
        if (name === 'setTimers') {
            setTimers(e);
        } else {
            setTimers((prevTask) => ({ ...prevTask, [name]: e.target.value }));
        }
    };

    const topUsersByTimeSpent = async () => {
        try {
            const res = await axios.get(`${serverUrl}/api/timer/top-users`);
            setTopUsersTime(res.data.topUsersByTimeSpent);
        } catch (error) {
            console.error('Error fetching top users by time spent:', error);
        }
    }

    useEffect(() => {
        if (userID) {
            getTimers();
            topUsersByTimeSpent()
        }
    }, [userID]);

    return (
        <TimerContext.Provider
            value={{
                timers,
                setTimers,
                createTimer,
                handleInput,
                setLoading,
                loading,
                deleteAllTimers,
                topUsersTime,
                topUsersByTimeSpent
            }}
        >
            {children}
        </TimerContext.Provider>
    );
};

export const useTimerContext = () => {
    return useContext(TimerContext);
};
