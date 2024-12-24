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

    const totalTasks = tasks.length
    const completedTasks = tasks.filter((task: { completed: boolean; }) => task.completed === true).length;
    const taskCompletionPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
    
    function normalizeDate(date: Date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }
    
    const today = normalizeDate(new Date());
    
    const upcomingTasks = tasks
        .filter((task: { duedate: string | number | Date; completed: any; }) => {
            const taskDueDate = normalizeDate(new Date(task.duedate));
            return !task.completed && taskDueDate >= today; // Compare only the dates
        })
        .sort((a: { duedate: string | number | Date; }, b: { duedate: string | number | Date; }) => 
            new Date(a.duedate).getTime() - new Date(b.duedate).getTime()
        );
    
    const firstUpcomingTask1 = upcomingTasks[0];
    const firstUpcomingTask2 = upcomingTasks[1];
    const firstUpcomingTask3 = upcomingTasks[2];

    const chatbotMessage = getStudyInstructorMessages(upcomingTasks);

    const timerHistory = timers.slice(-3);

    const [isNotificationOpen, setIsNotificationOpen] = useState(false); // State for the notification menu

    const toggleNotificationMenu = () => {
        setIsNotificationOpen((prev) => !prev); // Toggle the state
    };

    return (
        <div className="dashboard-container">
            <header className="header">
                <h1>Hello {user.name}</h1>
                <button className="reminder-button" onClick={toggleNotificationMenu}>
                    <img src="/Dashboeard-imgs/bell.png" alt="Bell Icon" className="bell-icon" />
                </button>

                {isNotificationOpen && <div className="background-blur" onClick={toggleNotificationMenu}></div>}

                {/* Notification Menu */}
                {isNotificationOpen && (
                    <div className="notification-menu">
                        <h3>Notifications</h3>
                        {tasks.length ? (
                            <ul>
                                {tasks.slice(0, 5).map((task: any, index: any) => (
                                    <li key={index}>
                                        <strong>{task.title}</strong> - Due: {new Date(task.duedate).toLocaleDateString()}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No notifications</p>
                        )}
                    </div>
                )}
            </header>

            <div className="dashboard-content">
                {/* Chatbot Section */}
                <div className="grid-item chatbot">
                    <img
                        src="favicon.jpg"
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

                
            </div>

            <div className='calendar-container'>
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
                                    ) : 
                                    (
                                        <div className="task-highlight opacity-0">
                                            -
                                        </div>
                                    );
                                }
                            }}
                        />
                    </div>

                    <div className="tasks-for-date">
                        <h3>📌Tasks for {date.toDateString()}</h3>
                        <table className="tasks-table">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>priority</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {tasks
                                    .filter((task: { duedate: string | number | Date; }) =>
                                        new Date(task.duedate).toDateString() === date.toDateString()
                                    )
                                    .map((task: { title: string, priority: string; }) => (
                                        <tr key={task.title}>
                                            <td>{task.title}</td>
                                            <td>{task.priority}</td>
                                            
                                        </tr>
                                        
                                    ))}
                            </tbody>
                        </table>
                    </div>



                </div>
            
        </div>
    );
};

export default Dashboard;
