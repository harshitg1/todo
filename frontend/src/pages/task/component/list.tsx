import { RiDeleteBinLine } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { Task } from "@/types/task";
import { useDispatch, useSelector } from "@/store";
import { taskSlice } from "@/store/slices/taskSlice";

interface TaskListProps {
  tasks: Task[];
  handleUpdate: (id: string) => void;
  handleDelete: (id: string) => void;
  toggleTaskStatus: (task: Task) => void;
}

export function List({
  tasks,
  handleUpdate,
  handleDelete,
  toggleTaskStatus,
}: TaskListProps) {
  const dispatch = useDispatch();
  const taskId = useSelector((state) => state.taskSlice.editTaskId);
  const title = useSelector((state) => state.taskSlice.editTitle);
  return (
    <ul className="h-56 overflow-y-scroll space-y-3 scrollbar-none">
      {tasks.map((task) => (
        <li
          key={task._id}
          className="flex items-center border-b border-gray-300 py-2 last:border-b-0"
        >
          <input
            type="checkbox"
            checked={task.status === "completed"}
            onChange={() => toggleTaskStatus(task)}
            className="h-4 w-4 mr-2 checked:bg-blue-500 checked:border-transparent focus:ring-0"
          />
          {taskId === task._id ? (
            <>
              <input
                type="text"
                value={title}
                onChange={(e) =>
                  dispatch(taskSlice.actions.setEditTitle(e.target.value))
                }
                className="border rounded p-1 mr-2"
              />
              <button
                onClick={() => handleUpdate(task._id)}
                className="mr-2 bg-blue-500 text-white rounded px-2"
              >
                Save
              </button>
              <button
                onClick={() => dispatch(taskSlice.actions.setEditTaskId(""))}
                className="mr-2 bg-gray-500 text-white rounded px-2"
              >
                Cancel
              </button>
            </>
          ) : (
            <div className="flex w-full justify-between items-center">
              <div
                className={`text-sm font-medium ${
                  task.status === "completed"
                    ? "line-through text-gray-500"
                    : "text-black"
                }`}
              >
                {task.title}
              </div>
              <div className="flex text-lg space-x-4 items-center">
                <button
                  onClick={() => handleDelete(task._id)}
                  className="text-gray-300 ml-2"
                >
                  <RiDeleteBinLine />
                </button>
                <button
                  onClick={() => {
                    dispatch(taskSlice.actions.setEditTaskId(task._id));
                    dispatch(taskSlice.actions.setEditTitle(task.title));
                  }}
                  className="ml-2 text-gray-300"
                >
                  <FaRegEdit />
                </button>
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
