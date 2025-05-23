import React, { useEffect, useState } from "react";
import axios from "axios";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5164/api/bookings/my", { withCredentials: true })
      .then((res) => setBookings(res.data));
  }, []);

  const handleCheckIn = (id) => {
    axios
      .post(`http://localhost:5164/api/bookings/${id}/checkin`, {}, { withCredentials: true })
      .then(() => {
        setBookings((prev) =>
          prev.map((b) =>
            b.id === id ? { ...b, status: "active" } : b
          )
        );
      });
  };

  const handleComplete = (id) => {
    axios
      .post(`http://localhost:5164/api/bookings/${id}/complete`, {}, { withCredentials: true })
      .then(() => {
        setBookings((prev) =>
          prev.map((b) =>
            b.id === id ? { ...b, status: "completed" } : b
          )
        );
      })
      .catch(err => {
        alert(err.response?.data || "Complete failed.");
      });
  };

  return (
    <div className="p-8 ml-64 max-w-3xl">
      <h1 className="text-2xl font-bold mb-4">My Bookings</h1>
      {bookings.length === 0 ? (
        <p>You have not booked any spaces yet.</p>
      ) : (
        bookings.map((b) => (
          <div key={b.id} className="bg-white p-4 mb-4 rounded shadow">
            <div>
              <strong>{b.parkingSpaceName}</strong>
              <div>
                {new Date(b.startTime).toLocaleString()} · {b.hours} hrs · {b.totalPrice} KM
              </div>
              <div>
                Status: <span className="font-semibold">{b.status}</span>
                {b.status && b.status.toLowerCase() === "pending" && (
                  <button
                    onClick={() => handleCheckIn(b.id)}
                    className="ml-4 px-2 py-1 bg-green-600 text-white rounded"
                  >
                    Check In
                  </button>
                )}
                {b.status && b.status.toLowerCase() === "active" && (
                  <button
                    onClick={() => handleComplete(b.id)}
                    className="ml-4 px-2 py-1 bg-blue-600 text-white rounded"
                  >
                    Complete
                  </button>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyBookings;