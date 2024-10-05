
import React, { useState } from 'react';
import Calendar from 'react-calendar'; // Import the calendar component
import 'react-calendar/dist/Calendar.css'; // Import the calendar CSS
import './Dashboard.css'; // Import your custom CSS

const Dashboard = () => {
    // Correctly define the date state using useState
    const [date, setDate] = useState(new Date());

    // Handler to update the selected date from the calendar
    const onDateChange = (newDate) => {
        setDate(newDate); // Update the state with the new date
    };

    const [progress, setProgress] = useState(85); // Task completion progress
    const chatbotMessage = "Hi, I am your Study instructor. You have assignments due in 3 days. Check the Time Table.";

    return (
        <div className="dashboard-container">
            <header className="header">
                <h1>Hello user</h1>
                <button className="reminder-button">Reminders</button>
            </header>

            
            <div className="grid-container">
                
                <div className="chatbot">
                    <img
                        src="chatbot.PNG"
                        alt="Chatbot"
                        className="chatbot-icon"
                    />
                    <p>{chatbotMessage}</p>
                </div>

                {/* Calendar Component */}
                <div className="calendar">
                    <Calendar
                        onChange={onDateChange}  // Set the date when user selects a date
                        value={date}  // The current date selected
                    />
                </div>

                {/* Upcoming Events */}
                <div className="upcoming-events">Upcoming Event details of Course Schedule Time Table</div>

                

                {/* Tasks Complete */}
                <div className="tasks-complete">
                    <p>Tasks Complete: {progress}%</p>
                    <div className="progress-bar">
                        <div className="progress" style={{ width: `${progress}%` }}></div>
                    </div>
                </div>

                {/* Today's Time Table */}
                <div className="today-timetable">
                    <h2>Today Time Table</h2>
                    <ul>
                        <li>8:00 AM - Math Class</li>
                        <li>10:00 AM - Physics Lecture</li>
                        <li>2:00 PM - Study Session</li>
                    </ul>
                </div>

                {/* Upcoming Tasks */}
                <div className="upcoming-tasks">
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
