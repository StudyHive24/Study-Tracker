import mongoose from "mongoose";

const TaskSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title"],
      unique: true,
    },
    description: {
      type: String,
      default: " ",
    },
    duedate: {
      type: Date,
      required: [true, "duedate"],
    },
    startTime: {
      type: Date,
      default: Date.now(),
    },
    endTime: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    completed: {
      type: String,
      default: "no",
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Low",
    },
    tags: {
      type: [String],
      default: [],
    },
    attachments: [
      {
        type: String,
        default: "",
      },
    ],
    attachments: {
      type: String,
      default: "",
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", TaskSchema);

export default Task;
