import { Button } from "@/components/ui/button";
import { Hand } from "lucide-react";
import React, { useEffect, useState } from "react";
import AddTaskModel from "./AddTaskModel";
import { useTasksContext } from "@/context/taskContext";
import { useUserContext } from "@/context/userContext";
import AddTask from "./AddTask";

interface TaskHeaderProps {
  totalTasks: number;
  Status: string;
  firstPhrase: string;
}

export function TaskHeader({
  totalTasks,
  Status,
  firstPhrase,
}: TaskHeaderProps) {
  const { tasks, pendingTasks, task } = useTasksContext();
  const { user } = useUserContext();

  // Use a state to handle the client-side only rendering
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Ensure the component mounts on the client
  }, []);

  if (!mounted) return null; // Prevent rendering until client-side data is available

  return (
    <div className="flex flex-row justify-between bg-gray-700 rounded-2xl p-5">
      <div className="flex flex-col gap-1">
        <div className="flex flex-row gap-3">
          <Hand color="orange" />
          <span className="text-gray-100">
            Welcome, <span className="font-bold">{user?.name}</span>!
          </span>
        </div>
        <span className="text-gray-200">
          {firstPhrase}
          <span className="text-green-500">{totalTasks}</span> {Status}
        </span>
      </div>
      <AddTaskModel />
    </div>
  );
}
