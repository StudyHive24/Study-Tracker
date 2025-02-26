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
        messages.push("No tasks found. Use this time to plan ahead or add new tasks!.. ");
        return messages;
    }

    const today = new Date();

    // Condition 1: Task due today
    if (upcomingTasks[0] && new Date(upcomingTasks[0].duedate).toDateString() === today.toDateString()) {
        messages.push(`Your task "${upcomingTasks[0].title}" is due today! Make sure to complete it... `);
    }

    // Condition 2: More than 3 tasks due within 3 days
    const tasksDueInThreeDays = upcomingTasks.filter((task: { duedate: string | number | Date; }) => {
        const dueDate = new Date(task.duedate);
        return dueDate > today && dueDate <= new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000);
    });
    
    if (tasksDueInThreeDays.length > 3) {
        messages.push(`You have ${tasksDueInThreeDays.length} tasks due within the next 3 days. Prioritize your work!.. `);
    }

    // Condition 3: Reminder to use Timer
    messages.push("Don't forget to use the Timer to stay focused while studying!.. ");

    // Condition 4: High-priority task due within 3 days
    const highPriorityTasks = tasksDueInThreeDays.filter((task: { priority: string; }) => task.priority === "High");
    if (highPriorityTasks.length > 0) {
        messages.push(`Your high-priority task "${highPriorityTasks[0].title}" is due within 3 days! Focus on it first... `);
    }

    return messages;
};

const Dashboard = () => {
    //get db 
    const { user, getUser } = useUserContext();
    const { tasks, getTasks } = useTasksContext();
    const { timers } = useTimerContext();
    const [date, setDate] = useState(() => new Date());
    const [chatbotMessages, setChatbotMessages] = useState(["Welcome to your dashboard!"]);

    //progress bar
    const totalTasks = tasks.length
    const completedTasks = tasks.filter((task: { completed: string; }) => task.completed === 'yes').length;
    const taskCompletionPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
 
    // Reusable normalizeDate function
    const normalizeDate = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());
    
    // Upcoming tasks
    const today = normalizeDate(new Date());
    
    const upcomingTasks = tasks
    .filter((task: { duedate: string | number | Date; completed: String; }) => {
        const taskDueDate = normalizeDate(new Date(task.duedate));
        return task.completed == "no" && taskDueDate >= today; // Compare only the dates
    })
    .sort((a: { endTime: string | number | Date; }, b: { endTime: string | number | Date; }) => new Date(a.endTime).getTime() - new Date(b.endTime).getTime());
    
    //chat bot
    const chatbotMessage = getStudyInstructorMessages(upcomingTasks);
    
    //timer 
    const timerHistory = timers.slice(-3);


    //notification
    const [isNotificationOpen, setIsNotificationOpen] = useState(false); // State for the notification menu

    const toggleNotificationMenu = () => {
        setIsNotificationOpen((prev) => !prev); // Toggle the state
    };

    const todayTasks = tasks.filter((task: any) => new Date(task.endTime).toDateString() === today.toDateString()); 
    const notcompletedtodayTasks = tasks.filter((task: any) => task.completed == 'no' && new Date(task.endTime).toDateString() === today.toDateString());
    const nextTask = tasks
    .filter((task: any) => task.completed == 'no' && new Date(task.endTime) > today)
    .sort((a: any, b: any) => new Date(a.endTime).getTime() - new Date(b.endTime).getTime())[0];

    const completedTodayTasks = tasks.filter((task: any) => task.completed == 'yes' && new Date(task.endTime).toDateString() === today.toDateString());
    const totalTodayTasks = todayTasks.length;
    const completedPercentage = totalTodayTasks > 0 ? Math.floor((completedTodayTasks.length / totalTodayTasks) * 100) : 0;
    const remainingTasks = totalTodayTasks - completedTodayTasks.length;
    const timerUsedToday = timerHistory.some((entry: any) => new Date(entry.date).toDateString() === today.toDateString());


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
                        <h3>Reminders🔔</h3>
                        <ul>
                            {(() => {
                                const notifications = [];

                                // 1. Tasks today
                                notifications.push(
                                    `You have ${notcompletedtodayTasks.length} task${totalTodayTasks !== 1 ? 's' : ''} scheduled for today.`
                                );

                                // 2. Next task reminder
                                if (nextTask) {
                                    const nextTaskDate = new Date(nextTask.endTime);
                                    const nextTaskTime = new Date(nextTask.endTime);
                                    const formattedTime = nextTaskDate.toLocaleTimeString("en-US", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        timeZone: "Asia/Colombo", // Specify your local timezone
                                      });
                                      
                                    const daysDifference = Math.ceil(
                                        (nextTaskDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24) 
                                    );
                                    let dateMessage;
                                    if (daysDifference === 1) dateMessage = 'today';
                                    else if (daysDifference === 2) dateMessage = 'tomorrow';
                                    else dateMessage = `in ${daysDifference} days`;
                                    notifications.push(
                                        `Next task: "${nextTask.title}" is due ${dateMessage} at ${nextTaskTime .toLocaleTimeString([], {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            
                                        })}.`
                                    );
    
                                }

                                // 3. Completion percentage
                                if (completedPercentage === 0) {
                                    notifications.push(
                                        
                                    );
                                }else if(completedPercentage < 100){
                                    notifications.push(
                                        `You have completed ${completedPercentage}% of today's tasks. Keep going to reach 100%!`
                                    );
                                } else {
                                    notifications.push("Great job! You've completed 100% of today's tasks.");
                                }

                                // 4. Remaining tasks
                                if (remainingTasks > 0) {
                                    notifications.push(
                                        `You have ${remainingTasks} task${remainingTasks !== 1 ? 's' : ''} left to complete today.`
                                    );
                                }

                                // 5. Timer usage
                                if (!timerUsedToday) {
                                    notifications.push("You haven't used the timer today. Use it to boost your productivity!");
                                } else {
                                    notifications.push("Great! You've used the timer today. Consider using it again to stay on track.");
                                }

                                return notifications.map((message, index) => (
                                    <li key={index} className="flex items-center space-x-1">
                                        <p>📌</p>
                                        <p>{message}</p>
                                    </li>
                                ));
                            })()}
                        </ul>
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
                    <p>{chatbotMessage.join(' ')}</p> 
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
                            {upcomingTasks.slice(0, 3).map((task:any, index: any) => (
                                <tr key={index}>
                                    <td>{task.title}</td>
                                    <td>{new Date(task.duedate).toLocaleDateString()}</td>
                                </tr>
                            ))}
                            {upcomingTasks.length === 0 && (
                                <tr>
                                    <td colSpan={2}>No upcoming tasks.</td>
                                </tr>
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
                                        // (task: { duedate: string | number | Date; }) =>
                                        //     new Date(task.duedate).toDateString() === date.toDateString()
                                        (task: { duedate: string | number | Date; }) => new Date(task.duedate).toDateString() === date.toDateString()
                                    );
                                    return taskOnDate ? (
                                        <div className="task-highlight">
                                            📌
                                        </div>
                                    ) : null; // Return null instead of an empty div
                                    
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
