import { useSelector, useDispatch } from '@/store';
import { taskSlice } from '@/store/slices/taskSlice';
import { FaChevronRight} from "react-icons/fa6";
import { FaChevronLeft } from "react-icons/fa";

export function DatePicker() {
  const dispatch = useDispatch();
  const date = useSelector((state) => state.taskSlice.date);
  const selectedDate = useSelector((state) => state.taskSlice.selectedDate);
  const weekDates = getWeekDates(new Date(date));

  const handleNextWeek = () => {
    const nextWeek = new Date(date);
    nextWeek.setDate(nextWeek.getDate() + 7);
    dispatch(taskSlice.actions.setDate(nextWeek.toISOString())); // Dispatch the new date
  };

  const handlePreviousWeek = () => {
    const prevWeek = new Date(date);
    prevWeek.setDate(prevWeek.getDate() - 7);
    dispatch(taskSlice.actions.setDate(prevWeek.toISOString())); // Dispatch the new date
  };

  const handleDateClick = (selectedDate: Date) => {
    dispatch(taskSlice.actions.setDate(selectedDate.toISOString())); 
    dispatch(taskSlice.actions.setSelectedDate(selectedDate.toISOString())); // Dispatch the new date
  };

  return (
    <div className="flex text-xs text-gray-400">
      <button onClick={handlePreviousWeek} >
      <FaChevronLeft />
      </button>
      <div className="flex space-x-3">
        {weekDates.map((date, index) => (
          <div
            key={index}
            className={`p-2 cursor-pointer ${
              date.toISOString() === selectedDate ? 'text-white bg-blue-500' : ''
            }`}
            onClick={() => handleDateClick(date)}
          >
            <div className="relative text-center py-3">
              <div>{date.toLocaleDateString('en-US', { weekday: 'short' })}</div>
              <div>{date.getDate()}</div>
              {date.toDateString() === new Date().toDateString() && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full mt-2"></div>
              )}
            </div>
          </div>
        ))}
      </div>
      <button onClick={handleNextWeek}>
      <FaChevronRight />
      </button>
    </div>
  );
}

function getWeekDates(currentDate: Date): Date[] {
  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    return date;
  });
}
