'use client'
import axios from 'axios';
import React, { createContext, useContext, useState, useEffect } from 'react';



const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
    const [tasksCount, setTasksCount] = useState(0);

    useEffect(() => {
        const fetchTasksCount = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/tasks');
                setTasksCount(response.data.length);
            } catch (error) {
                console.error('Error fetching tasks count:', error);
                setTasksCount(0);
            }
        };

        fetchTasksCount();
    }, []);

    return (
        <DashboardContext.Provider value={{ tasksCount }}>
            {children}
        </DashboardContext.Provider>
    );
};

export const useDashboardContext = () => useContext(DashboardContext);
