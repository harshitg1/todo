// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import {reducer} from './reducer';
import { TypedUseSelectorHook, useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux';
import { task } from './queries/task';

export const store = configureStore({
  reducer: {
    // Add the RTK Query reducer
    taskSlice: reducer.taskSlice,
    [task.reducerPath]: task.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(task.middleware),
});


export type ReduxStore = typeof store;
export type ReduxState = ReturnType<typeof store.getState>;
export type ReduxDispatch = typeof store.dispatch;

export const useSelector: TypedUseSelectorHook<ReduxState> = useReduxSelector;
export const useDispatch = () => useReduxDispatch<ReduxDispatch>();

