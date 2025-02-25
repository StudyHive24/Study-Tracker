"use client";

import { useState, ReactElement } from "react";
import { useTimetableContext } from '@/context/timetableContext'; // Import the context
import useRiderect from "@/hooks/useUserRiderect";

interface TimetableEntry {
  id: number;
  day: string;
  startTime: string;
  endTime: string;
  title: string;
  color: string;
}
//new code
export default function TimetablePage(): ReactElement {
   useRiderect("/login");
  

  return (
    <div >
      
    </div>
  );
}

