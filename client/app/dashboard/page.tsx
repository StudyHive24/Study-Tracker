import React from 'react';
import './Dashboard.css';
import { SideBar } from "../Components/Sidebar.tsx/Sidebar";

const Dashboard = () => {
    

    return (
        <div className="dashboard-container">
            <div className="dashboard-sidebar">
                <SideBar />
            </div>
            <div className="dashboard-content">
                <div className="grid-item">Item 1</div>
                <div className="grid-item">Item 2</div>
                <div className="grid-item">Item 3</div>
                <div className="grid-item">Item 4</div>
                <div className="grid-item">Item 5</div>
                <div className="grid-item">Item 6</div>
                
            </div>
        </div>
    );
};

export default Dashboard;
