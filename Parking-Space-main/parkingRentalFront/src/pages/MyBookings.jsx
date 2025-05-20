import React, { useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaCar,
  FaReceipt,
} from "react-icons/fa";
import axios from "axios";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get("http://localhost:5164/api/bookings/my", {
          withCredentials: true,
        });
        setBookings(res.data);
      } catch (err) {
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

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

  if (loading) return <div className="p-8 ml-64">Loading...</div>;

  return (
    <div className="p-8 ml-64">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">My Bookings</h1>
        <p className="text-gray-600">
          View and manage all your parking spot bookings
        </p>
      </div>
      <div className="space-y-6">
        {bookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          bookings.map((booking) => (
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
                <div className="flex items-center">
                  <FaCalendarAlt className="text-gray-500 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Start</p>
                    <p className="font-medium">
                      {new Date(booking.startTime).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaClock className="text-gray-500 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">End</p>
                    <p className="font-medium">
                      {new Date(booking.endTime).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaCar className="text-gray-500 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Spot</p>
                    <p className="font-medium">{booking.spot}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaReceipt className="text-gray-500 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Price</p>
                    <p className="font-medium">{booking.price} KM</p>
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
          ))
        )}
      </div>
    </div>
  );
};

export default MyBookings;