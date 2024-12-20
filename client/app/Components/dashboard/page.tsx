"use client"; 

import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar'; 
import 'react-calendar/dist/Calendar.css'; 
import './dashboard.css';
import { useUserContext } from '../../../context/userContext';
import { useTasksContext } from '@/context/taskContext.js';
import Task from '@/app/tasks/components/Task';

const Dashboard = () => {

    const { user, getUser } = useUserContext();
    const { tasks, getTasks } = useTasksContext();
    const [date, setDate] = useState(new Date());
    const chatbotMessage = "Hi, I am your Study instructor. You have assignments due in 3 days. Check the Time Table.";
    const onDateChange = (newDate: Date) => {setDate(newDate);};
    const [progress, setProgress] = useState(0); // Task completion progress
    

    const totalTasks = tasks.length

    
    const completedTasks = tasks.filter((task: { status: string; }) => task.status === 'Completed').length;
    const taskCompletionPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
    

    return (
        <div className="dashboard-container">
            <header className="header">
                <h1>Hello {user.name}</h1>
                <button className="reminder-button">
                    <img src="/Dashboeard-imgs/bell.png" alt="Bell Icon" className="bell-icon" />
                </button>
            </header>

            <div className="dashboard-content">
                {/* Chatbot Section */}
                <div className="grid-item chatbot">
                    <img
                        src="/Dashboeard-imgs/bot-img.PNG"
                        alt="Chatbot"
                        className="chatbot-icon"
                    />
                    <p>{chatbotMessage}</p>
                </div>

                {/* Tasks Complete Section */}
                <div className="grid-item tasks-complete">
                    <p>Tasks Complete: {totalTasks}%</p> {/* Use state */}
                    <div className="progress-bar">
                        <div className="progress" style={{ width: `${taskCompletionPercentage}%` }}></div>
                    </div>
                </div>

                {/* Today's Time Table Section */}
                <div className="grid-item today-timetable">
                    <h2>📌Today Time Table</h2>
                    <table className="styled-table">
                        <thead className="styled-table-head">
                            <tr>
                                <th>Time</th>
                                <th>Read books</th> 
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>9:00</td>
                                <td>Read books</td> 
                            </tr>
                            {/* Add additional rows as needed */}
                        </tbody>
                    </table>
                </div>

                {/* Calendar Section */}
                <div className="grid-item calendar">
                    <Calendar />
                </div>

                {/* Upcoming Tasks Section */}
                <div className="grid-item upcoming-tasks">
                    <h2>📌Upcoming Tasks</h2>
                    <table className="styled-tasks-table">
                        <thead>
                            <tr>
                                <th>Task</th>
                                <th>Due Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Assignment 1</td>
                                <td>Due in 3 days</td>
                            </tr>
                            {/* Add additional rows as needed */}
                        </tbody>
                    </table>
                </div>

                {/* Upcoming Events Section */}
                <div className="grid-item upcoming-events">
                    <h2>📌Upcoming Events</h2>
                    <table className="styled-events-table">
                        <thead>
                            <tr>
                                <th>Event Name</th>
                                <th>Date</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Course Introduction</td>
                                <td>Nov 20, 2024</td>
                                <td>10:00 AM</td>
                            </tr>
                            {/* Add additional rows as needed */}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
