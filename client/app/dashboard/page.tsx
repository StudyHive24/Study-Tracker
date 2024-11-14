"use client"; 

import React, { useState } from 'react';
import Calendar from 'react-calendar'; 
import 'react-calendar/dist/Calendar.css'; 
import './dashboard.css'; 


const Dashboard = () => {
    let Username = "Yahan";
    const [date, setDate] = useState(new Date());
    const [progress, setProgress] = useState(85); // Task completion progress
    const chatbotMessage = "Hi, I am your Study instructor. You have assignments due in 3 days. Check the Time Table.";

    const onDateChange = (newDate: Date) => {
        setDate(newDate);
    };

    return (
        <div className="dashboard-container">
            <header className="header">
                <h1>Hello {Username}</h1>
                <button className="reminder-button">
                <img src="/Dashboeard-imgs/bell.png" alt="Bell Icon" className="bell-icon" /></button>
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
                    <p>Tasks Complete: {progress}%</p>
                    <div className="progress-bar">
                        <div className="progress" style={{ width: `${progress}%` }}></div>
                    </div>
                </div>

                {/* Today's Time Table Section */}
                <div className="grid-item today-timetable">
                    <h2>Today Time Table</h2>
                    <table className="styled-table">
                    <thead>
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
                        <tr>
                            <td>9:00</td>
                            <td>Read books</td>  
                        </tr>
                        <tr>
                            <td>9:00</td>
                            <td>Read books</td>
                        </tr>
                        <tr>
                            <td>9:00</td>
                            <td>Read books</td> 
                        </tr>
                        <tr>
                            <td>9:00</td>
                            <td>Read books</td>  
                        </tr>
                        <tr>
                            <td>9:00</td>
                            <td>Read books</td>
                        </tr>
                        <tr>
                            <td>9:00</td>
                            <td>Read books</td> 
                        </tr>
                        <tr>
                            <td>9:00</td>
                            <td>Read books</td>  
                        </tr>
                        
                    </tbody>
                    </table>
                </div>

                {/* Calendar Section */}
                <div className="grid-item calendar">
                    <Calendar
                        onChange={onDateChange}
                        value={date}
                    />
                    
                </div>

                {/* Upcoming Events Section */}
                <div className="grid-item upcoming-events">
                    Upcoming Event details of Course Schedule Time Table
                </div>

                

                

                {/* Upcoming Tasks Section */}
                <div className="grid-item upcoming-tasks">
                    <h2>Upcoming Tasks</h2>
                    <ul>
                        <li>Assignment 1 - Due in 3 days</li>
                        <li>Project - Due in 5 days</li>
                        <li>Quiz - Due in 7 days</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
