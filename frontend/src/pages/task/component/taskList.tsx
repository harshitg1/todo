import {
  useGetTasksByWeekQuery,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} from "@/store/queries/task";
import { Task } from "@/types/task";
import { useDispatch, useSelector } from "@/store";
import { Card } from "@/components/ui/card";
import { AddTask } from "./addTask";
import ProgressBar from "@/components/progress-bar";
import { List } from "./list";
import { taskSlice } from "@/store/slices/taskSlice";
import { IoCheckboxOutline } from "react-icons/io5";
import { LiaWindowClose } from "react-icons/lia";

export function TaskList({ className }: { className?: string }) {
  const date = useSelector((state) => state.taskSlice.date);
  const selectedDate = useSelector((state) => state.taskSlice.selectedDate);

  const editTitle = useSelector((state) => state.taskSlice.editTitle);
  const { data } = useGetTasksByWeekQuery(date);
  const totalTasks = data?.counts
    ? data?.counts.pendingTasks + data?.counts.openTasks
    : 0;
  const completedTasks = data?.counts ? data?.counts.openTasks : 0;
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const dispatch = useDispatch();

  const handleUpdate = (_id: string) => {
    if (editTitle) {
      console.log("editTitle", _id, editTitle);
      const response = updateTask({
        _id,
        title: editTitle,
        status: "pending",
      }).unwrap();
      if (!response) {
        console.log("Task cannot be updated");
      }
      dispatch(taskSlice.actions.resetEditFields());
    }
  };

  const toggleTaskStatus = (task: Task) => {
    const newStatus = task.status === "completed" ? "pending" : "completed";
    updateTask({ ...task, status: newStatus });
  };

  const handleDelete = (id: string) => {
    const response = deleteTask(id).unwrap();
    if (!response) {
      console.log("Task cannot be deleted");
    }
  };

  return (
    <div className={`p-4 ${className}`}>
      <div className="flex justify-between w-full mb-2 text-sm">
        <Card className="w-1/2 mr-2 p-4 bg-[#EFF2FF] rounded-lg shadow-md">
          <div className="flex flex-col items-center space-y-2">
            <div className="flex items-center space-x-2">
              <IoCheckboxOutline className="text-2xl bg-[#99ADFF] text-[#1C3082]" />{" "}
              {/* Icon larger than text */}
              <h2 className="font-bold text-xs text-gray-700">Task Complete</h2>
            </div>
            <div className="flex items-center space-y-1 gap-1">
              <p className="text-3xl font-bold text-gray-800">
                {data?.counts.openTasks}
              </p>{" "}
              <span className="text-xs text-gray-400">This week</span>
            </div>
          </div>
        </Card>
        <Card className="w-1/2 ml-2 p-4 bg-[#FFE6E7] rounded-lg shadow-md">
          <div className="flex flex-col items-center space-y-2">
            <div className="flex items-center space-x-2">
              <LiaWindowClose className="text-2xl bg-[#FF9999] text-[#821C1C]" />{" "}
              {/* Icon larger than text */}
              <h2 className="font-bold text-xs text-gray-700">Tasks Pending</h2>
            </div>
            <div className="flex items-center space-y-1 gap-1">
              <p className="text-3xl font-bold text-gray-800">
                {data?.counts.pendingTasks}
              </p>
              <span className="text-xs text-gray-400">This week</span>
            </div>
          </div>
        </Card>
      </div>
      <div className="w-full justify-start space-y-2 my-4">
        <h1 className="text-lg font-semibold text-black">Weekly Progress</h1>
        <ProgressBar completed={completedTasks} total={totalTasks} />
      </div>
      <h2 className="text-xl font-bold mb-2">
        {selectedDate ? "Tasks" : "Tasks Today"}
      </h2>

      {selectedDate ? (
        // If a date is selected, render the daily tasks for that date
        data?.dayTasks.length ? (
          <List
            tasks={data.dayTasks}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
            toggleTaskStatus={toggleTaskStatus}
          />
        ) : (
          <div className="flex justify-center items-center text-center h-[220px] text-gray-500"> No tasks for this day</div>
        )
      ) : // If no date is selected, render the weekly tasks
      data?.weekTasks.length ? (
        <List
          tasks={data?.weekTasks}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
          toggleTaskStatus={toggleTaskStatus}
        />
      ) : (
        <div className="flex justify-center items-center text-center h-[220px] text-gray-500">No tasks for this week</div>
      )}

      <div className="w-full h-16 flex justify-center ">
        <AddTask />
      </div>
    </div>
  );
}
