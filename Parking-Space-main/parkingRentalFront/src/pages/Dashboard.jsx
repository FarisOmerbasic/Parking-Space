import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [spaces, setSpaces] = useState([]);
  const [balance, setBalance] = useState(0);
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState({
    spaces: true,
    bookings: true,
    balance: true
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch user info
        const userRes = await axios.get("http://localhost:5164/api/auth/auth-check", {
          withCredentials: true,
        });
        setUser(userRes.data.user);

        // Fetch user's balance
        const balanceRes = await axios.get("http://localhost:5164/api/bookings/balance", {
          withCredentials: true,
        });
        setBalance(balanceRes.data.balance || 0);

        // Fetch user's spaces
        const spacesRes = await axios.get("http://localhost:5164/api/parkingspaces/mine", {
          withCredentials: true,
        });
        setSpaces(spacesRes.data);

        // Fetch upcoming bookings
        const upcomingRes = await axios.get("http://localhost:5164/api/bookings/my/upcoming", {
          withCredentials: true,
        });
        setUpcomingBookings(upcomingRes.data);

        // Fetch recent bookings
        const recentRes = await axios.get("http://localhost:5164/api/bookings/my/recent", {
          withCredentials: true,
        });
        setRecentBookings(recentRes.data);

      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading({
          spaces: false,
          bookings: false,
          balance: false
        });
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="p-8 ml-64">
      <Sidebar />
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <span>Settings</span>
          <span>•</span>
          <span>My Bookings</span>
          <span>•</span>
          <span>List Space</span>
          <span>•</span>
          <span className="text-blue-600 font-medium">Dashboard</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Account Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Account</h2>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span>Balance: {balance} KM</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span>{user?.email || "User"}</span>
            </div>
          </div>
        </div>

        {/* Earnings Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Earnings</h2>
          <p className="text-2xl font-bold text-green-600 mb-2">
            {balance} KM
          </p>
          <p className="text-sm text-gray-500">Current balance</p>
        </div>

        {/* Occupancy Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Active Spaces</h2>
          <p className="text-2xl font-bold text-blue-600 mb-2">
            {spaces.filter(s => s.isAvailable).length}/{spaces.length}
          </p>
          <p className="text-sm text-gray-500">Available spaces</p>
        </div>
      </div>

      {/* Upcoming Bookings */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Upcoming Bookings</h2>
          <span className="text-sm text-gray-500">Next 7 days</span>
        </div>
        
        {loading.bookings ? (
          <p>Loading bookings...</p>
        ) : upcomingBookings.length === 0 ? (
          <p className="text-gray-500">No upcoming bookings</p>
        ) : (
          <div className="space-y-4">
            {upcomingBookings.map(booking => (
              <div key={booking.id} className="border-b pb-4">
                <div className="flex justify-between">
                  <p className="font-medium">
                    {booking.userName || "Guest"} - {booking.spaceName}
                  </p>
                  <span className="text-sm font-medium">
                    {booking.totalPrice} KM
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  {new Date(booking.startTime).toLocaleString()} - 
                  {new Date(booking.endTime).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* My Spaces and Recent Bookings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* My Spaces */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">My Spaces</h2>
          {loading.spaces ? (
            <p>Loading spaces...</p>
          ) : spaces.length === 0 ? (
            <p className="text-gray-600">You have not listed any spaces yet.</p>
          ) : (
            <div className="space-y-4">
              {spaces.map((space) => (
                <div key={space.id} className="border-b pb-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium">{space.spaceName}</h3>
                    <span className={`text-xs px-2 py-1 rounded ${space.isAvailable ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                      {space.isAvailable ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <div className="flex flex-wrap space-x-4 mt-2 text-sm">
                    <span className="text-gray-500">{space.location}</span>
                    <span className="text-gray-500">{space.price} KM/hr</span>
                    <span className="text-gray-500">{space.availableTimes}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Bookings */}
        <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Recent Bookings</h2>
        {loading.bookings ? (
          <p>Loading bookings...</p>
        ) : recentBookings.length === 0 ? (
          <p className="text-gray-500">No recent bookings</p>
        ) : (
          <div className="space-y-4">
            {recentBookings.map(booking => (
              <div key={booking.id} className="border-b pb-4">
                <div className="flex justify-between">
                  <p className="font-medium">
                    {booking.userName || "Guest"} - {booking.spaceName}
                  </p>
                  <span className="text-sm font-medium">
                    {booking.totalPrice} KM
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  {new Date(booking.startTime).toLocaleDateString()} • {booking.status}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>

      {/* Footer */}
      <div className="text-center border-t pt-4">
        <p className="font-medium">
          {user ? user.name || user.email || user.id : "User"}
        </p>
        <p className="text-gray-600">Current balance: {balance} KM</p>
      </div>
    </div>
  );
};

export default Dashboard;