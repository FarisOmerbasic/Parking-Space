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
import Settings from "./pages/Settigs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AppLayout from "./pages/AppLayout";
import ProfileLayout from "./pages/ProfileLayout";

export default function App() {
  const router = createBrowserRouter(
    [
      {
        element: <AppLayout />,
        children: [
          { path: "/", element: <Homepage /> },
          { path: "/booking", element: <Booking /> },
          { path: "/myBookings", element: <MyBookings /> },
          { path: "/settings", element: <Settings /> },
          {
            element: <ProfileLayout />,
            children: [
              { path: "/profile", element: <UserProfile /> },
              { path: "/listSpace", element: <ListSpace /> },
              { path: "/dashboard", element: <Dashboard /> },

            ],
          },
        ],
      },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
    {
      future: {
        v7_startTransition: true, // ✅ Enable React.startTransition for React Router v7
      },
    }
  );
  return <RouterProvider router={router} />;
}
