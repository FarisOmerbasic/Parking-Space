import {
  Routes,
  Route,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
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
import MapAllSpaces from "./components/MapAllSpaces";

export default function App() {
  const router = createBrowserRouter(
    [
      {
        element: <AppLayout />,
        children: [
          { path: "/", element: <Homepage /> }, // This ensures Homepage loads at the root
          { path: "/booking", element: <Booking /> },
          { path: "/myBookings", element: <MyBookings /> },
          { path: "/all-spaces", element: <AllSpaces /> },
          { path: "/map", element: <MapAllSpaces /> },
          {
            element: <ProfileLayout />,
            children: [
              { path: "/profile", element: <UserProfile /> },
              { path: "/listSpace", element: <ListSpace /> },
              { path: "/dashboard", element: <Dashboard /> },
              { path: "/mySpaces", element: <MySpaces /> },
            ],
          },
        ],
      },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
    {
      future: {
        v7_startTransition: true,
      },
    }
  );

  return <RouterProvider router={router} />;
}