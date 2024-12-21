"use client"; 

import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar'; 
import 'react-calendar/dist/Calendar.css'; 
import './dashboard.css';
import { useUserContext } from '../../../context/userContext';
import { useTasksContext } from '@/context/taskContext.js';
import { useTimerContext } from "@/context/timerContext";

// Utility function to generate chatbot messages
const getStudyInstructorMessages = (upcomingTasks: any[]) => {
    const messages = [];

    if (!upcomingTasks.length) {
        messages.push("No tasks found. Use this time to plan ahead or add new tasks!");
        return messages;
    }

    const today = new Date();

    // Condition 1: Task due today
    if (upcomingTasks[0] && new Date(upcomingTasks[0].duedate).toDateString() === today.toDateString()) {
        messages.push(`Your task "${upcomingTasks[0].title}" is due today! Make sure to complete it.`);
    }

    // Condition 2: More than 3 tasks due within 3 days
    const tasksDueInThreeDays = upcomingTasks.filter((task: { duedate: string | number | Date; }) => {
        const dueDate = new Date(task.duedate);
        return dueDate > today && dueDate <= new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000);
    });
    if (tasksDueInThreeDays.length > 3) {
        messages.push(`You have ${tasksDueInThreeDays.length} tasks due within the next 3 days. Prioritize your work!`);
    }

    // Condition 3: Reminder to use Timer
    messages.push("Don't forget to use the Timer to stay focused while studying!");

    // Condition 4: High-priority task due within 3 days
    const highPriorityTasks = tasksDueInThreeDays.filter((task: { priority: string; }) => task.priority === "high");
    if (highPriorityTasks.length > 0) {
        messages.push(`Your high-priority task "${highPriorityTasks[0].title}" is due within 3 days! Focus on it first.`);
    }

    return messages;
};


const Dashboard = () => {

    const { user, getUser } = useUserContext();
    const { tasks, getTasks } = useTasksContext();
    const { timers } = useTimerContext();
    const [date, setDate] = useState(new Date());
    const [chatbotMessages, setChatbotMessages] = useState(["Welcome to your dashboard!"]);
    
    const [messageIndex, setMessageIndex] = useState(0);
    //const onDateChange = (newDate: Date) => {setDate(newDate);};
    //const [progress, setProgress] = useState(0); // Task completion progress
    

    const totalTasks = tasks.length
    const completedTasks = tasks.filter((task: { completed: boolean; }) => task.completed === true).length;
    const taskCompletionPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
    

    
    // Find the first upcoming task
    const upcomingTasks = tasks
    .filter((task: { completed: any; duedate: string | number | Date; }) => !task.completed && new Date(task.duedate) > new Date()) // Filter for incomplete and future tasks
    .sort((a: { duedate: string | number | Date; }, b: { duedate: string | number | Date; }) => 
        new Date(a.duedate).getTime() - new Date(b.duedate).getTime()
    );
    
    const firstUpcomingTask1= upcomingTasks[0];
    const firstUpcomingTask2= upcomingTasks[1];
    const firstUpcomingTask3= upcomingTasks[2];

    // // Utility function to generate a chatbot message
    // const getStudyInstructorMessage = (upcomingTasks: { duedate: string | number | Date; }) => {
    //     return `The due date is: ${new Date(upcomingTasks.duedate).toLocaleDateString()}`;
    
    // };
    const chatbotMessage = getStudyInstructorMessages(upcomingTasks);

    const timerHistory = timers.slice(-3);

    

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
                    <p>Tasks Complete: {Math.round(taskCompletionPercentage)}%</p> 
                    <div className="progress-bar">
                        <div className="progress" style={{ width: `${taskCompletionPercentage}%` }}></div>
                    </div>
                </div>

                {/* Upcoming Tasks Section */}
                <div className="grid-item upcoming-tasks">
                    <h2 >📌Upcoming Tasks</h2>
                    <table className="styled-tasks-table">
                        <thead>
                            <tr>
                                <th>Task</th>
                                <th>Due Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {firstUpcomingTask1 ? (
                            <tr>
                                <td>{firstUpcomingTask1.title}</td>
                                <td>{new Date(firstUpcomingTask1.duedate).toLocaleDateString()}</td>
                            </tr>
                            ) : (
                                <tr></tr>
                            )}
                            {firstUpcomingTask2 ? (
                            <tr>
                                <td>{firstUpcomingTask2.title}</td>
                                <td>{new Date(firstUpcomingTask2.duedate).toLocaleDateString()}</td>
                            </tr>
                            ) : (
                                <tr></tr>
                            )}
                            {firstUpcomingTask3 ? (
                            <tr>
                                <td>{firstUpcomingTask3.title}</td>
                                <td>{new Date(firstUpcomingTask3.duedate).toLocaleDateString()}</td>
                            </tr>
                            ) : (
                                <tr></tr>
                            )}
                            {/* Add additional rows as needed */}
                        </tbody>
                    </table>
                </div>

                {/* Timer History Section */}
                <div className="grid-item timer-history"> {/* Added Timer History Section */}
                    <h2>📌Timer History</h2>
                    <table className="styled-tasks-table">
                        <thead>
                            <tr>
                                <th>Task</th>
                                <th>Duration</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {timerHistory.length > 0 ? (
                                timerHistory.map((timer: { title: string; duration: number; date: string; }, index: number) => (
                                    <tr key={index}>
                                        <td>{timer.title}</td>
                                        <td>{timer.duration} mins</td>
                                        <td>{new Date(timer.date).toLocaleDateString()}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={3}>No timer history available.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Calendar Section */}
                {/* <div className="grid-item calendar">
                    <Calendar />
                </div> */}

                <div className="grid-item calendar">
                    <Calendar
                        onChange={(value) => {
                            if (value instanceof Date) {
                                setDate(value); // Ensure the value is a Date
                            }
                        }}
                        value={date}
                        tileContent={({ date, view }) => {
                            // Highlight tasks due on the calendar
                            if (view === 'month') {
                                const taskOnDate = tasks.find(
                                    (task: { duedate: string | number | Date; }) =>
                                        new Date(task.duedate).toDateString() === date.toDateString()
                                );
                                return taskOnDate ? (
                                    <div className="task-highlight">
                                        📌
                                    </div>
                                ) : null;
                            }
                        }}
                    />
                    
                </div>
                <div className="tasks-for-date">
                    <h3>Tasks for {date.toDateString()}</h3>
                    <ul>
                        {tasks
                            .filter((task: { duedate: string | number | Date; }) =>
                                new Date(task.duedate).toDateString() === date.toDateString()
                            )
                            .map((task: { title: string; }) => (
                                <li key={task.title}>{task.title}</li>
                            ))}
                    </ul>
                </div>
                

                {/* Today's Time Table Section */}
                {/* <div className="grid-item today-timetable">
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
                            
                        </tbody>
                    </table>
                </div> */}

                

                

                {/* Upcoming Events Section */}
                {/* <div className="grid-item upcoming-events">
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
                            
                        </tbody>
                    </table>
                </div> */}
            </div>
        </div>
    );
};

export default Dashboard;
