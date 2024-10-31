import { SideBar } from "../Components/Sidebar.tsx/Sidebar";

// app/settings/page.tsx
export default function Settings() {
    return (
        <div className="flex">
            <SideBar />
            <div className="flex-1 p-4">
                <h1>Settings</h1>
                <p>This is the settings page content.</p>
            </div>
        </div>
    );
}