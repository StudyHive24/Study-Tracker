import { SideBar } from "../Components/Sidebar.tsx/Sidebar";

// app/timer/page.tsx
export default function Timer() {
    return (
        <div className="flex">
            <SideBar />
            <div className="flex-1 p-4">
                <h1>Timer</h1>
                <p>This is the timer page content.</p>
            </div>
        </div>
    );
}
