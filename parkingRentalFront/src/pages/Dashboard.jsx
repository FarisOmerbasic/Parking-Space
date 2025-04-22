import React from "react";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  return (
    <div className="p-8 ml-64">
      {" "}
      <Sidebar />
      {/* ml-64 to account for sidebar width */}
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
          <ul className="space-y-3">
            <li className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span>Profile</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span>Settings</span>
            </li>
          </ul>
        </div>

        {/* Earnings Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Earnings</h2>
          <p className="text-2xl font-bold text-green-600 mb-2">$1,250</p>
          <p className="text-sm text-gray-500">Total earned this month</p>
        </div>

        {/* Occupancy Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Occupancy</h2>
          <p className="text-2xl font-bold text-blue-600 mb-2">78%</p>
          <p className="text-sm text-gray-500">Average spot usage</p>
        </div>
      </div>
      {/* Upcoming Bookings */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Upcoming 5 bookings</h2>
          <span className="text-sm text-gray-500">Next 7 days</span>
        </div>
        <div className="space-y-4">
          {/* Placeholder for bookings - would be dynamic in a real app */}
          <div className="border-b pb-4">
            <p className="font-medium">Booking #1</p>
            <p className="text-sm text-gray-500">Date and details</p>
          </div>
          <div className="border-b pb-4">
            <p className="font-medium">Booking #2</p>
            <p className="text-sm text-gray-500">Date and details</p>
          </div>
          <div className="border-b pb-4">
            <p className="font-medium">Booking #3</p>
            <p className="text-sm text-gray-500">Date and details</p>
          </div>
        </div>
      </div>
      {/* My Spaces and Recent Bookings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* My Spaces */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">My Spaces</h2>
          <div className="space-y-4">
            {/* Downtown Plaza */}
            <div className="border-b pb-4">
              <div className="flex justify-between items-start">
                <h3 className="font-medium">Downtown Plaza</h3>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                  Active
                </span>
              </div>
              <div className="flex space-x-4 mt-2 text-sm">
                <span className="text-gray-500">Office</span>
                <span className="text-gray-500">2 spots</span>
                <span className="text-gray-500">$8/hr</span>
              </div>
            </div>

            {/* Maple Residences */}
            <div className="border-b pb-4">
              <div className="flex justify-between items-start">
                <h3 className="font-medium">Maple Residences</h3>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                  Active
                </span>
              </div>
              <div className="flex space-x-4 mt-2 text-sm">
                <span className="text-gray-500">Residential</span>
                <span className="text-gray-500">1 spot</span>
                <span className="text-gray-500">$5/hr</span>
              </div>
            </div>

            {/* Green Garage */}
            <div className="pb-2">
              <div className="flex justify-between items-start">
                <h3 className="font-medium">Green Garage</h3>
                <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                  Inactive
                </span>
              </div>
              <div className="flex space-x-4 mt-2 text-sm">
                <span className="text-gray-500">EV Charging</span>
                <span className="text-gray-500">3 spots</span>
                <span className="text-gray-500">$10/hr</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Recent Bookings</h2>
          <div className="space-y-4">
            {/* John Doe */}
            <div className="border-b pb-4">
              <p className="font-medium">John Doe</p>
              <p className="text-sm text-gray-500">
                Downtown Plaza · 2 hrs · $16
              </p>
            </div>

            {/* Emily Chen */}
            <div className="border-b pb-4">
              <p className="font-medium">Emily Chen</p>
              <p className="text-sm text-gray-500">
                Maple Residences · 1 hr · $5
              </p>
            </div>

            {/* Carlos Rivera */}
            <div className="pb-2">
              <p className="font-medium">Carlos Rivera</p>
              <p className="text-sm text-gray-500">
                Green Garage · 3 hrs · $30
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="text-center border-t pt-4">
        <p className="font-medium">Alex Morgan</p>
        <p className="text-gray-600">Owner</p>
      </div>
    </div>
  );
};

export default Dashboard;
