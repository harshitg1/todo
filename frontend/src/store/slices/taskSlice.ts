import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface TaskState {
  date: string; 
  selectedDate?: string;
  editTaskId: string;
  editTitle: string;
  searchQuery: string;
}

const initialState: TaskState = {
  date: new Date().toISOString().split("T")[0], 
  editTaskId: '',
  editTitle: '',
  searchQuery: '',
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setDate: (state, action: PayloadAction<string>) => {
      state.date = action.payload;
    },
    setSelectedDate: (state, action: PayloadAction<string>) => {
      state.selectedDate = action.payload
    },
    setEditTaskId(state, action: PayloadAction<string>) {
      state.editTaskId = action.payload;
    },
    setEditTitle(state, action: PayloadAction<string>) {
      state.editTitle = action.payload;
    },
    resetEditFields(state) {
      state.editTaskId = '';
      state.editTitle = '';
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
  },
});

