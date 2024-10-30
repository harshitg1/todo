import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Task, TaskCreation, TaskUpdate } from "@/types/task";

// Define types for the response
interface Counts {
  openTasks: number;
  pendingTasks: number;
}

interface TasksByWeekResponse {
  weekTasks: Task[];
  dayTasks: Task[];
  counts: Counts;
}

interface TransformedTasksByWeekResponse {
  weekTasks: Task[];
  dayTasks: Task[];
  counts: Counts;
}

export const task = createApi({
  reducerPath: "task",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_TASK_API_BASE_URL}`,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Task"],
  endpoints: (builder) => ({
    getTasksByWeek: builder.query<TransformedTasksByWeekResponse, string>({
      query: (date) => ({ url: `task/week/${date}` }),
      transformResponse: (response: TasksByWeekResponse) => {
        const transformTask = (task: Task) => ({
          ...task,
          id: task._id,
          dueDate: new Date(task.dueDate).toISOString(),
          startTime: new Date(task.startTime).toISOString(),
          endTime: new Date(task.endTime).toISOString(),
        });
        return {
          weekTasks: response.weekTasks.map(transformTask),
          dayTasks: response.dayTasks.map(transformTask),
          counts: response.counts,
        };
      },
      providesTags: ["Task"],
    }),
    addTask: builder.mutation<void,TaskCreation>({
      query: (newTask) => ({
        url: "task/",
        method: "POST",
        body: newTask,
      }),
      invalidatesTags:['Task'],
    }),
    updateTask: builder.mutation<void, TaskUpdate>({
      query: (task) => ({
        url: `task/${task._id}`,
        method: "PATCH",
        body: task,
      }),
      invalidatesTags:['Task'],
    }),
    deleteTask: builder.mutation<void, string>({
      query: (id) => ({
        url: `task/${id}`,
        method: "DELETE",
      }),
      invalidatesTags:['Task'],
    }),
    getTaskByDay: builder.query<Task, Date>({
      query: (date) => `task/${date}`,
    }),
    searchTask: builder.query<Task[], string>({
      query: (searchTerm) => `task/search?query=${searchTerm}`,
      transformResponse: (response: {data: Task[]}) => response.data
    }),
  }),
});

export const {
  useGetTasksByWeekQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useSearchTaskQuery,
} = task;
