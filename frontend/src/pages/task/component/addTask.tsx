import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useAddTaskMutation } from "@/store/queries/task";
import { IoCloseSharp } from "react-icons/io5";

const taskSchema = z.object({
  title: z.string().min(1, "Task title is required"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  date: z.string().min(1, "Date is required"),
  description: z.string(),
});

type TaskFormData = z.infer<typeof taskSchema>;

export const AddTask: React.FC = () => {
  const [addTask] = useAddTaskMutation();
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
  });

  const onSubmit = (data: TaskFormData) => {
    const { title, date, startTime, endTime, description } = data;
    const dueDate = new Date(date).toISOString();
    const formattedStartTime = new Date(`${date}T${startTime}`).toISOString();
    const formattedEndTime = new Date(`${date}T${endTime}`).toISOString();

    const task = {
      title,
      description,
      dueDate,
      startTime: formattedStartTime,
      endTime: formattedEndTime,
    };
    const response=  addTask(task);
    if(!response){
      console.log("Task added successfully");
    }
    reset();
    setIsOpen(false);
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger
        className="flex bg-[#4566EC] w-16 h-16 text-white justify-center items-center border text-2xl font-thin rounded-full"
        onClick={() => {
          setIsOpen(true);
          console.log("Create task")
        }
        }
      >
        <IoCloseSharp />
      </DrawerTrigger>
      <DrawerContent
        className="flex w-[375px] h-[550px] mx-auto bg-white rounded-none p-3"
        aria-describedby="description"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
          <div className="flex justify-between">
            <DrawerTitle className="font-bold text-xl">
              Add New Task
            </DrawerTitle>
            <DrawerClose onClick={() => reset()}><IoCloseSharp/></DrawerClose>
          </div>
          <div>
            <label className="block text-xs text-[#717171] font-medium">
              Task Title
            </label>
            <input
              type="text"
              className="w-full mt-1 p-2 border rounded-md"
              {...register("title")}
            />
            {errors.title && (
              <p className="text-red-500 text-xs">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="block text-xs text-[#717171] font-medium">
              Set Date
            </label>
            <input
              type="date"
              className="w-full mt-1 p-2 border rounded-md cursor-pointer"
              {...register("date")}
              onFocus={(e) => e.target.showPicker && e.target.showPicker()}
            />
            {errors.date && (
              <p className="text-red-500 text-xs">{errors.date.message}</p>
            )}
          </div>

          <div className="flex space-x-2">
            <div className="flex-1">
              <label className="block text-xs text-[#717171] font-medium">
                Start Time
              </label>
              <input
                type="time"
                className="w-full mt-1 p-2 border rounded-md cursor-pointer"
                {...register("startTime")}
                onFocus={(e) => e.target.showPicker && e.target.showPicker()} 
              />
              {errors.startTime && (
                <p className="text-red-500 text-xs">
                  {errors.startTime.message}
                </p>
              )}
            </div>
            <div className="flex-1">
              <label className="block text-xs text-[#717171] font-medium">
                End Time
              </label>
              <input
                type="time"
                className="w-full mt-1 p-2 border rounded-md"
                {...register("endTime")}
                onFocus={(e) => e.target.showPicker && e.target.showPicker()}
              />
              {errors.endTime && (
                <p className="text-red-500 text-xs">{errors.endTime.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs text-[#717171] font-medium">
              Description
            </label>
            <textarea
              className="w-full mt-1 p-2 border rounded-md"
              rows={3}
              id="description"
              {...register("description")}
            />
          </div>

          <DrawerFooter className="space-x-2">
            <Button className="bg-[#4566EC] hover:bg-[#4566EC] text-white " type="submit">
              Create task
            </Button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
};
