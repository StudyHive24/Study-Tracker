"use client";

import { useUserContext } from "@/context/userContext";
import React, { use } from "react";

interface PageProps {
  params: Promise<{
    verificationToken: string;
  }>;
}

const Page: React.FC<PageProps> = ({ params }) => {
  const { verificationToken } = use(params);

  const { verifyUser } = useUserContext();

  if (!verifyUser) {
    console.error("verifyUser function is not defined in the user context.");
    return <p>Error: Unable to verify user. Please try again later.</p>;
  }

  return (
    <div className="auth-page flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white flex flex-col justify-center gap-4 px-16 py-8 rounded-md shadow-md">
        <h1 className="text-gray-600 text-2xl font-semibold">Verify Your Account</h1>
        <button
          className="px-4 py-2 self-center bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-all"
          onClick={() => verifyUser(verificationToken)}
        >
          Verify
        </button>
      </div>
    </div>
  );
};

export default Page;
