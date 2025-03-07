"use client";
import axios from "axios";
import React, { createContext, useEffect, useState, useContext } from "react";
import { useUserContext } from "../context/userContext.js";
import toast from "react-hot-toast";

const TaskContext = createContext();

const serverUrl = "https://study-hive-server-f6.vercel.app";

export const TasksProvider = ({ children }) => {
  const userID = useUserContext().user._id;

  const [tasks, setTasks] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [task, setTask] = React.useState({});
  const [topUsers, setTopUsers] = React.useState([]);

  const [isEditing, setIsEditing] = React.useState(false);
  const [priority, setPriority] = React.useState("all");
  const [activeTask, setActiveTask] = React.useState(null);
  const [modalMode, setModalMode] = React.useState("");
  const [profileModal, setProfileModal] = React.useState(false);

  const openModalForAdd = () => {
    setModalMode("add");
    setIsEditing(true);
    setTask({});
  };

  const openModalForEdit = (task) => {
    setModalMode("edit");
    setIsEditing(true);
    setActiveTask(task);
  };

  const openProfileModal = () => {
    setProfileModal(true);
  };

  const closeModal = () => {
    setIsEditing(false);
    setProfileModal(false);
    setModalMode("");
    setActiveTask(null);
    setTask({});
  };

  // get tasks
  const getTasks = async () => {
    setLoading(true);

    try {
      const res = await axios.get(`${serverUrl}/api/tasks`);

      setTasks(res.data.tasks);

      return res.json(tasks);
    } catch (error) {
      return console.log("Error getting tasks", error);
    }

    setLoading(false);
  };

  // get a task by ID
  const getTask = async (taskID) => {
    try {
      const response = await axios.get(`${serverUrl}/api/tasks/task/${taskID}`);

      const task = response.data;

      console.log("Task fetched successfully:", task);

      return task;
    } catch (error) {
      console.error("Error fetching task", error);
      return null;
    }
  };

  // create a task
  const createTask = async (task) => {
    try {
      const res = await axios.post(`${serverUrl}/api/tasks/create`, task);

      console.log("Task created", res.data);

      if (res.data.error) {
        toast.error(res.data.error);
        return;
      } else {
        setTasks([...tasks, res.data]);
        toast.success("Task created succcessfully");
      }
    } catch (error) {
      console.log("Error in creating a task", error);
      const errorMessage = "Failed to create the task";

      toast.error(errorMessage);
    }
  };

  // update a task
  const updateTask = async (task) => {
    setLoading(true);

    try {
      const res = await axios.patch(
        `${serverUrl}/api/tasks/update/${task._id}`,
        task
      );

      const newTasks = tasks.map((task) =>
        task._id === res.data._id ? res.data : task
      );

      toast.success("Task updated successfully");
      setTasks(newTasks);
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Failed to update task");
    } finally {
      setLoading(false);
    }
  };

  // delete a task
  const deleteTask = async (taskID) => {
    try {
      await axios.delete(`${serverUrl}/api/tasks/delete/${taskID}`);

      // remove the task from the task array
      const newTasks = tasks.filter((t) => t._id !== taskID);

      setTasks(newTasks);

      toast.success("Task is deleted successfully");
    } catch (error) {
      console.log("Error deleting task", error);
      toast.error("Error in deleting the task");
    }
  };

  // to delete all tasks
  const deleteAllTasks = async (res, req) => {
    try {
      res = await axios.delete(`${serverUrl}/api/tasks/delete/all`);

      if (res.status == 200) {
        setTasks([]);
        toast.success("Every tasks deleted Successfully");
      }

      if (res.data.error) {
        return toast.error(res.data.error);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in deleting all");
    }
  };

  const getTopUsersByCompletion = async (req, res) => {
    try {
      const res = await axios.get(`${serverUrl}/api/tasks/topusers`);

      if (res.data.topUsers) {
        setTopUsers(res.data.topUsers);
      } else {
        console.error("No top users found in the response");
      }
    } catch (error) {
      console.error("Error fetching top users:", error);
    }
  };

  const handleInput = (name) => (e) => {
    if (name === "setTask") {
      setTask(e);
    } else {
      setTask({ ...task, [name]: e.target.value });
    }
  };

  const handleInput2 = (name) => (e) => {
    if (name === "setTask") {
      setTask(e);
    } else {
      setTask({ ...task, [name]: e.target.value });
    }
  };

  const handleInputDate = (name) => (e) => {};

  // to get completed tasks
  const completedTasks = tasks.filter((task) => task.completed == "yes");

  // to get pending tasks
  const pendingTasks = tasks.filter((task) => task.completed == "no");

  // to get active tasks
  const activeTasks = tasks.filter((task) => task.status == "active");

  useEffect(() => {
    getTasks();
    getTopUsersByCompletion();
  }, [userID]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        task,
        tasks,
        getTask,
        getTasks,
        createTask,
        updateTask,
        deleteTask,
        priority,
        setPriority,
        handleInput,
        isEditing,
        setIsEditing,
        openModalForAdd,
        openModalForEdit,
        activeTask,
        closeModal,
        modalMode,
        openProfileModal,
        pendingTasks,
        completedTasks,
        profileModal,
        handleInput2,
        activeTasks,
        deleteAllTasks,
        getTopUsersByCompletion,
        topUsers,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasksContext = () => {
  return useContext(TaskContext);
};
