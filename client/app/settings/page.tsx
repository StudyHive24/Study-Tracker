'use client'
import useRiderect from "@/hooks/useUserRiderect";

// app/settings/page.tsx
export default function Settings() {

    useRiderect('/login')

    return (
        <div className="flex">
            <div className="flex-1 p-4">
                <h1>Settings</h1>
                <p>This is the settings page content.</p>
            </div>
        </div>
    );
}
