"use client"; 

import { TimetableProvider } from "@/context/timetableContext"; 
export default function TimetableLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TimetableProvider>
      {children}
    </TimetableProvider>
  );
}