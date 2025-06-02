import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Dashboard from "./pages/Dashboard";
import UserProfile from "./pages/UserProfile";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";
import ListSpace from "./pages/ListSpace";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AppLayout from "./pages/AppLayout";
import ProfileLayout from "./pages/ProfileLayout";
import MySpaces from "./pages/MySpaces";
import AllSpaces from "./pages/AllSpaces";
import MapView from "./components/MapView"; 

export default function App() {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        { index: true, element: <Homepage /> },
        { path: "/booking", element: <Booking /> },
        { path: "/my-bookings", element: <MyBookings /> },
        { path: "/all-spaces", element: <AllSpaces /> },
        { path: "/map", element: <MapView /> }, // Changed to dedicated MapView page
        {
          element: <ProfileLayout />,
          children: [
            { path: "/profile", element: <UserProfile /> },
            { path: "/dashboard", element: <Dashboard /> },
            { path: "/list-space", element: <ListSpace /> },
            { path: "/my-spaces", element: <MySpaces /> },
          ],
        },
      ],
    },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
  ]);

  return <RouterProvider router={router} />;
}