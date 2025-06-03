import React, { useContext } from 'react';
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from "react-router-dom";
import AuthProvider from "./services/AuthProvider";
import AuthContext from "./services/AuthContext";

// Layout Components
import AppLayout from "./pages/AppLayout";
import ProfileLayout from "./pages/ProfileLayout";

// Pages
import Homepage from "./pages/Homepage";
import Dashboard from "./pages/Dashboard";
import UserProfile from "./pages/UserProfile";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";
import ListSpace from "./pages/ListSpace";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MySpaces from "./pages/MySpaces";
import AllSpaces from "./pages/AllSpaces";
import Settings from "./pages/Settings";

// Admin Pages
import AdminPaymentsManagement from "./pages/AdminPaymentsManagement";
import UsersManagement from "./pages/UsersManagement";
import AdminParkingManager from "./pages/AdminParkingManager"; // <-- FIXED: Import the component

// Map Page (use a page wrapper for MapAllSpaces)
import MapAllSpaces from "./components/MapAllSpaces";

const MapAllSpacesPage = () => (
  <div className="p-8 ml-64 max-w-5xl h-[600px]">
    <h1 className="text-2xl font-bold mb-4">Map View</h1>
    <MapAllSpaces />
  </div>
);

// --- ProtectedRoute Component ---
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="flex items-center justify-center h-screen text-lg">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && allowedRoles.length > 0) {
    if (!allowedRoles.includes(user.role)) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return children;
};

export default function App() {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        { index: true, element: <Homepage /> }, // PUBLIC
        { path: "/map", element: <MapAllSpacesPage /> }, // PUBLIC
        { path: "/login", element: <Login /> }, // PUBLIC
        { path: "/register", element: <Register /> }, // PUBLIC

        { path: "/booking", element: <ProtectedRoute><Booking /></ProtectedRoute> },
        { path: "/my-bookings", element: <ProtectedRoute><MyBookings /></ProtectedRoute> },
        { path: "/all-spaces", element: <ProtectedRoute><AllSpaces /></ProtectedRoute> },
        { path: "/settings", element: <ProtectedRoute><Settings /></ProtectedRoute> },

        {
          element: <ProfileLayout />,
          children: [
            { path: "/profile", element: <ProtectedRoute><UserProfile /></ProtectedRoute> },
            { path: "/dashboard", element: <ProtectedRoute><Dashboard /></ProtectedRoute> },
            { path: "/list-space", element: <ProtectedRoute><ListSpace /></ProtectedRoute> },
            { path: "/my-spaces", element: <ProtectedRoute><MySpaces /></ProtectedRoute> },
          ],
        },

        // --- Admin Routes ---
        {
          path: "/admin",
          element: <ProtectedRoute allowedRoles={["Admin"]}><Outlet /></ProtectedRoute>,
          children: [
            { path: "users", element: <UsersManagement /> },
            { path: "payments", element: <AdminPaymentsManagement /> },
            { path: "parking-manager", element: <AdminParkingManager /> }, // <-- FIXED
          ],
        },
      ],
    },
    { path: "/unauthorized", element: (
        <div className="flex flex-col items-center justify-center h-screen bg-red-50 text-red-700">
            <h1 className="text-4xl font-bold mb-4">403 - Unauthorized</h1>
            <p className="text-lg">You do not have permission to access this page.</p>
            <p className="mt-4"><a href="/" className="text-blue-600 hover:underline">Go to Homepage</a></p>
        </div>
    )},
    { path: "*", element: (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-gray-700">
            <h1 className="text-4xl font-bold mb-4">404 - Not Found</h1>
            <p className="text-lg">The page you are looking for does not exist.</p>
            <p className="mt-4"><a href="/" className="text-blue-600 hover:underline">Go to Homepage</a></p>
        </div>
    )}
  ]);

  return <RouterProvider router={router} />;
}