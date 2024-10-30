import { SideBar } from "../Components/Sidebar.tsx/Sidebar";


// app/dashboard/page.tsx
export default function Dashboard() {
    return (
        <div className="flex">
            <SideBar />
            <div className="flex-1 p-4"> {/* Main content area */}
                <h1>Welcome to the Dashboard</h1>
                <p>This is the dashboard page content.</p>
            </div>
        </div>
    );
}
  