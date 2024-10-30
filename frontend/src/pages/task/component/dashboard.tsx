import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { DatePicker } from "./datePicker";
import { TaskList } from "./taskList";
import { FiSearch } from "react-icons/fi";
import { List } from "./list";
import { useSearchTaskQuery } from "@/store/queries/task";
import { useSelector, useDispatch } from "@/store";
import { taskSlice } from "@/store/slices/taskSlice";
import { IoIosArrowRoundBack } from "react-icons/io";

export function Dashboard() {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.taskSlice.searchQuery);
  const { data } = useSearchTaskQuery(searchQuery);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    dispatch(taskSlice.actions.setSearchQuery(query));
  };

  return (
    <Card className="w-[380px] h-[670px] flex flex-col border items-center ">
      <CardContent className="pt-6">
        {searchQuery.length > 0 && (
          <div
            className="font-bold text-center"
            onClick={() => dispatch(taskSlice.actions.setSearchQuery(""))}
          >
            <IoIosArrowRoundBack />
          </div>
        )}
        <div className="relative w-full">
          <Input
            type="text"
            placeholder="Search for a task"
            className={`w-full pl-3 text-gray-400 border border-gray-200 rounded-lg text-xs ${
              searchQuery.length > 0 ? "mt-4" : "mt-0"
            }`}
            onChange={handleSearchChange}
          />
          <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black" />
        </div>

        {searchQuery.length > 0 ? (
          <div className="w-[340px]">
            {data && data?.length > 0 ? (
              <List
                tasks={data}
                handleUpdate={() => {}}
                handleDelete={() => {}}
                toggleTaskStatus={() => {}}
              />
            ) : (
              <div className="font-bold text-center w-full">No task found</div>
            )}
          </div>
        ) : (
          <>
            <DatePicker />
            <TaskList className="w-full" />{" "}
          </>
        )}
      </CardContent>
    </Card>
  );
}
