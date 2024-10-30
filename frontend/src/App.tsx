import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "./store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { AppLayout } from "./pages/layout/app";
import { Task } from "./pages/task";

const queryClient = new QueryClient();

// Define your routes using createBrowserRouter
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/task",
        element: <Task />,
      },
    ],
  },
]);

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </QueryClientProvider>
  );
};

export default App;
