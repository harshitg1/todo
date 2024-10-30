import { time } from "console";
import mongoose, { Document, Schema } from "mongoose";

interface ITask extends Document {
  title: string;
  description: string;
  dueDate: Date;
  priority: "high" | "medium" | "low";
  status: "pending" | "completed";
  startTime: Date;
  endTime: Date;
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema: Schema = new Schema({
  title: {
    required: true,
    type: String,
    trim: true,
  },
  description: {
    required: true,
    type: String,
    trim: true,
  },
  dueDate: {
    required: true,
    type: Date,
  },
  startTime: {
    type: Date,
    default: () => {
      const start = new Date();
      start.setHours(0, 0, 0, 0); // Set to the start of the day
      return start;
    },
  },
  endTime: {
    type: Date,
    required: true,
    default: () => {
      const end = new Date();
      end.setHours(23, 59, 59, 999); // Set to the end of the day
      return end;
    },
  },
  priority: {
    type: String,
    enum: ["high", "medium", "low"],
    default: "medium",
  },
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

taskSchema.pre<ITask>("save", function (next) {
  this.updatedAt = new Date();
  next();
});

// Create the Task model
const Task = mongoose.model<ITask>("Task", taskSchema);

export default Task;
