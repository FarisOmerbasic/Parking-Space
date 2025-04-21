import React from 'react';

const Dashboard = () => {
  const spaces = [
    { name: "Downtown Plaza", type: "Office", spots: "2 spots", rate: "$8/hr", status: "Active" },
    { name: "Maple Residences", type: "Residential", spots: "1 spot", rate: "$5/hr", status: "Active" },
    { name: "Green Garage", type: "EV Charging", spots: "3 spots", rate: "$10/hr", status: "Inactive" },
  ];

  const bookings = [
    { name: "John Doe", desc: "Downtown Plaza · 2 hrs · $16" },
    { name: "Emily Chen", desc: "Maple Residences · 1 hr · $5" },
    { name: "Carlos Rivera", desc: "Green Garage · 3 hrs · $30" },
  ];

  return (
    <div className="p-6 bg-white w-full">
      {/* Header */}
      <h1 className="text-2xl font-semibold mb-6">Dashboard Overview</h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-purple-50 p-4 rounded-lg">
          <p className="text-sm text-purple-600">Earnings</p>
          <p className="text-xl font-bold">$1,250</p>
          <p className="text-sm text-gray-500">Total earned this month</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <p className="text-sm text-purple-600">Occupancy</p>
          <p className="text-xl font-bold">78%</p>
          <p className="text-sm text-gray-500">Average spot usage</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <p className="text-sm text-purple-600">Upcoming</p>
          <p className="text-xl font-bold">5 bookings</p>
          <p className="text-sm text-gray-500">Next 7 days</p>
        </div>
      </div>

      {/* Earnings Trend Placeholder */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2">Earnings Trend</h2>
        <div className="h-64 bg-gray-100 flex items-center justify-center rounded-lg text-gray-400">
          (Chart Placeholder)
        </div>
      </div>

      {/* My Spaces Table */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2">My Spaces</h2>
        <div className="overflow-hidden rounded-lg border border-gray-200">
          <div className="grid grid-cols-6 bg-gray-100 p-3 text-sm font-semibold">
            <div>Name</div>
            <div>Type</div>
            <div>Spots</div>
            <div>Rate</div>
            <div>Status</div>
            <div className="text-center">Actions</div>
          </div>
          {spaces.map((space, i) => (
            <div key={i} className="grid grid-cols-6 p-3 border-t text-sm items-center">
              <div>{space.name}</div>
              <div>{space.type}</div>
              <div>{space.spots}</div>
              <div>{space.rate}</div>
              <div>{space.status}</div>
              <div className="text-center space-x-3">
                <button className="text-blue-600 text-sm underline">Edit</button>
                <button className="text-red-600 text-sm underline">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Bookings */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Recent Bookings</h2>
        <ul className="divide-y">
          {bookings.map((b, i) => (
            <li key={i} className="flex items-center gap-4 py-3">
              <div className="w-10 h-10 rounded-full bg-gray-300"></div>
              <div>
                <p className="font-semibold">{b.name}</p>
                <p className="text-sm text-gray-500">{b.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
