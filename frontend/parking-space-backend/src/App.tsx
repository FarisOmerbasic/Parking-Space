import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Home from "./components/Home";
import ListSpaces from "./components/ListSpace";
import MyBookings from "./components/MyBookings";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import Settings from "./components/Settings";

function App() {
  const router = createBrowserRouter(
    [
      {
        element: <AppLayout />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          { path: "/bookings", element: <MyBookings /> },
          { path: "/list-spaces", element: <ListSpaces /> },
          { path: "/dashboard", element: <Dashboard /> },
          { path: "/profile", element: <Profile /> },
          { path: "/settings", element: <Settings /> },
        ],
      },
      /* { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> }, */
    ],
    {
      /* future: {
        v7_startTransition: true, // ✅ Enable React.startTransition for React Router v7
      }, */
    }
  );
  return <RouterProvider router={router} />;
}

export default App;
