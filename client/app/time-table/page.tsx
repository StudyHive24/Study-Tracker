import { SideBar } from "../Components/Sidebar.tsx/Sidebar";

// app/time-table/page.tsx
export default function TimeTable() {
    return (
        <div className="flex">
            <SideBar />
            <div className="flex-1 p-4">
                <h1>Time Table</h1>
                <p>This is the time table page content.</p>
            </div>
        </div>
    );
}
