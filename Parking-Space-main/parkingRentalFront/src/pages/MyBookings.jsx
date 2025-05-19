import React from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaCar,
  FaReceipt,
} from "react-icons/fa";

const MyBookings = () => {
  // Sample booking data - in a real app this would come from an API
  const bookings = [
    {
      id: 1,
      location: "Downtown Plaza",
      spot: "Office Spot #12",
      date: "2023-06-15",
      time: "09:00 - 17:00",
      duration: "8 hours",
      price: "$64.00",
      status: "Confirmed",
      type: "Office",
    },
    {
      id: 2,
      location: "Maple Residences",
      spot: "Residential Spot #3",
      date: "2023-06-16",
      time: "10:00 - 14:00",
      duration: "4 hours",
      price: "$20.00",
      status: "Completed",
      type: "Residential",
    },
    {
      id: 3,
      location: "Green Garage",
      spot: "EV Charging Spot #5",
      date: "2023-06-18",
      time: "08:00 - 11:00",
      duration: "3 hours",
      price: "$30.00",
      status: "Upcoming",
      type: "EV Charging",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Confirmed":
        return "bg-blue-100 text-blue-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Upcoming":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-8 ml-64">
      {" "}
      {/* ml-64 to account for sidebar width */}
      {/* Navigation Tabs */}
      <div className="flex space-x-4 border-b border-gray-200 mb-8">
        <Link
          className="px-4 py-2 text-blue-600 font-medium border-b-2 border-blue-600"
          to="booking"
        >
          Find Spot
        </Link>
        <Link
          to="/myBookings"
          className="px-4 py-2 text-gray-600 hover:text-blue-600"
        >
          My Bookings
        </Link>
        <Link
          className="px-4 py-2 text-gray-600 hover:text-blue-600"
          to="/listSpace"
        >
          List Space
        </Link>
        <Link
          to="/dashboard"
          className="px-4 py-2 text-gray-600 hover:text-blue-600"
        >
          Dashboard
        </Link>
      </div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">My Bookings</h1>
        <p className="text-gray-600">
          View and manage all your parking spot bookings
        </p>
      </div>
      {/* Bookings List */}
      <div className="space-y-6">
        {bookings.map((booking) => (
          <div key={booking.id} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-semibold">{booking.location}</h2>
                <p className="text-gray-600">{booking.spot}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                  booking.status
                )}`}
              >
                {booking.status}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Date */}
              <div className="flex items-center">
                <FaCalendarAlt className="text-gray-500 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium">{booking.date}</p>
                </div>
              </div>

              {/* Time */}
              <div className="flex items-center">
                <FaClock className="text-gray-500 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Time</p>
                  <p className="font-medium">{booking.time}</p>
                </div>
              </div>

              {/* Duration */}
              <div className="flex items-center">
                <FaCar className="text-gray-500 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Duration</p>
                  <p className="font-medium">{booking.duration}</p>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center">
                <FaReceipt className="text-gray-500 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Price</p>
                  <p className="font-medium">{booking.price}</p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 flex justify-end space-x-3">
              <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                View Details
              </button>
              {booking.status === "Upcoming" && (
                <button className="px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200">
                  Cancel Booking
                </button>
              )}
              {booking.status === "Completed" && (
                <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200">
                  Leave Review
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
