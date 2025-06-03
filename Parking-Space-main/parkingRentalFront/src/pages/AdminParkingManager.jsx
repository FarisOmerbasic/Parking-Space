import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminParkingManager = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5164/api/admin/pending-bookings", { withCredentials: true })
      .then((res) => setBookings(res.data));
  }, []);

  const handleApprove = (id) => {
    axios
      .post(`http://localhost:5164/api/admin/approve-booking/${id}`, {}, { withCredentials: true })
      .then(() => setBookings((prev) => prev.filter((b) => b.id !== id)));
  };

  const handleReject = (id) => {
    axios
      .post(`http://localhost:5164/api/admin/reject-booking/${id}`, {}, { withCredentials: true })
      .then(() => setBookings((prev) => prev.filter((b) => b.id !== id)));
  };

  return (
    <div className="p-8 ml-64 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Pending Bookings</h1>
      {bookings.length === 0 ? (
        <p>No pending bookings.</p>
      ) : (
        bookings.map((b) => (
          <div key={b.id} className="bg-white p-4 mb-4 rounded shadow">
            <div>
              <strong>User:</strong> {b.userName} ({b.userEmail})
            </div>
            <div>
              <strong>Parking:</strong> {b.parkingSpace}
            </div>
            <div>
              <strong>Date:</strong> {new Date(b.bookingDate).toLocaleString()}
            </div>
            <div>
              <strong>Total:</strong> {b.totalPrice} KM
            </div>
            <div className="mt-2">
              <button
                onClick={() => handleApprove(b.id)}
                className="mr-2 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Approve
              </button>
              <button
                onClick={() => handleReject(b.id)}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Reject
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminParkingManager;