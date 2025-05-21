import React, { useEffect, useState } from "react";
import axios from "axios";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5164/api/bookings/my", { withCredentials: true })
      .then((res) => setBookings(res.data));
  }, []);

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
              <div>Status: {b.status}</div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyBookings;