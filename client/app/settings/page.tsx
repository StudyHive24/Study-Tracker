'use client'
import useRiderect from "@/hooks/useUserRiderect";
import ProfileSettings from "../Components/Profile/ProfileSettings";
import useVerifyRiderect from "@/hooks/useUserVerifyRiderect";

// app/settings/page.tsx
export default function Settings() {
    useVerifyRiderect('/send-verification-code')

    useRiderect('/login')




    return (
        <div className="flex">
            <div className="flex-1 p-4">
                <ProfileSettings/>
            </div>
        </div>
    );
}
