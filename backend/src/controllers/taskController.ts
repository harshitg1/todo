import { Request, Response } from "express";
import { getTaskCollection } from "../config/db";
import { ObjectId } from "mongodb";

// Get tasks for the entire week along with counts
export const getTasksByWeek = async (req: Request, res: Response) :Promise<any>=> {
  const { date } = req.params;
  if (!date) {
    return res.status(400).json({ message: "Date is required" });
  }

  const inputDate = new Date(date);
  const startOfWeek = new Date(inputDate);
  startOfWeek.setDate(inputDate.getDate() - inputDate.getDay() + 1); // Monday

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6); // Sunday

  try {
    const taskCollection = getTaskCollection();
    const tasks = await taskCollection.find({
      dueDate: {
        $gte: startOfWeek,
        $lte: endOfWeek,
      },
    }).toArray();

    // Count open and pending tasks
    const counts = tasks.reduce(
      (acc, task) => {
        if (task.status === "completed") acc.openTasks++;
        if (task.status === "pending") acc.pendingTasks++;
        return acc;
      },
      { openTasks: 0, pendingTasks: 0 }
    );

    // Get tasks for the specific day
    const specificDate = new Date(inputDate);
    const dayTasks = await taskCollection.find({
      dueDate: {
        $gte: new Date(specificDate.setHours(0, 0, 0, 0)),
        $lte: new Date(specificDate.setHours(23, 59, 59, 999)),
      },
    }).toArray();

    res.json({
      weekTasks: tasks,
      dayTasks,
      counts,
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Error fetching tasks" });
  }
};

export const deleteTask = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Task id is required" });
  }

  try {
    const taskCollection = getTaskCollection();
    const result = await taskCollection.deleteOne({ _id: new ObjectId(id) }); // Ensure ObjectId is used
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Error deleting task" });
  }
};

export const createTask = async (req: Request, res: Response): Promise<void> => {
  const { title, description, dueDate, priority, startTime, endTime } = req.body;

  if (!title || !dueDate) {
    res.status(400).json({ error: "Title and due date are required" });
    return
  }

  try {
    const taskCollection = getTaskCollection();
    const task = {
      title,
      description,
      dueDate: new Date(dueDate),
      priority:'low',
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      status: "pending", // Set default status if applicable
    };

    const result = await taskCollection.insertOne(task);
    res.status(201).json({ message: "Task created", task: { _id: result.insertedId, ...task } });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Error creating task" });
  }
};

export const updateTask = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  console.log("Task Id" , id);
  if (!id) {
    res.status(400).json({ message: "Task id is required" });
    return;
  }

  const { _id, title, description, time, status } = req.body;
  console.log("Status", status);
  if (!title && !description && !time && !status) {
    res.status(400).json({ message: "At least one field is required to update" });
    return;
  }

  try {
    const taskCollection = getTaskCollection();
    const updateFields: any = {};
    if (title) updateFields.title = title;
    if (description) updateFields.description = description;
    if (time) updateFields.time = time;
    if (status) updateFields.status = status;

    const result = await taskCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updateFields },
      { returnDocument: 'after' }
    );
    if (!result ) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task updated", task: result.value });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Error updating the task" });
  }
};

export const searchTask = async (req: Request, res: Response): Promise<any> => {

  const { query } = req.query;
  if (!query) {
    res.status(400).json({ message: "Search query is required" });
    return;
  }

  try {
    const taskCollection = getTaskCollection();
    const tasks = await taskCollection.find({
      $or: [
        { title: { $regex: query as string, $options: "i" } },
        { description: { $regex: query as string, $options: "i" } },
      ],
    }).toArray();

    res.json({data: tasks });
  } catch (error) {
    res.status(500).json({ message: "Error searching tasks" });
  }
};