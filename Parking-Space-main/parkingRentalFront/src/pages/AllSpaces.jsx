import React, { useEffect, useState } from "react";
import axios from "axios";

const AllSpaces = () => {
  const [spaces, setSpaces] = useState([]);
  const [user, setUser] = useState(null);
  const [booking, setBooking] = useState({});
  const [message, setMessage] = useState("");
  const [showPayment, setShowPayment] = useState({});
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  useEffect(() => {
    // Fetch all spaces
    axios.get("http://localhost:5164/api/parkingspaces")
      .then(res => setSpaces(res.data));
    // Fetch current user
    axios.get("http://localhost:5164/api/auth/auth-check", { withCredentials: true })
      .then(res => setUser(res.data.user));
  }, []);

  // Calculate hours between two times (as decimal)
  const calculateHours = (from, to) => {
    if (!from || !to) return 0;
    const fromDate = new Date(`1970-01-01T${from}`);
    const toDate = new Date(`1970-01-01T${to}`);
    let diff = (toDate - fromDate) / (1000 * 60 * 60);
    if (diff < 0) diff += 24; // handle overnight
    return diff;
  };

  const handleBookClick = (spaceId) => {
    setShowPayment((prev) => ({ ...prev, [spaceId]: true }));
    setMessage("");
  };

  const handlePayAndBook = async (space) => {
    setPaymentProcessing(true);
    setMessage("");
    const { date, fromTime, toTime } = booking[space.id] || {};
    if (!date || !fromTime || !toTime) {
      setMessage("Please select date and time range.");
      setPaymentProcessing(false);
      return;
    }
    const hours = calculateHours(fromTime, toTime);
    if (hours <= 0) {
      setMessage("Invalid time range.");
      setPaymentProcessing(false);
      return;
    }
    const totalPrice = (space.price * hours).toFixed(2);

    // Simulate payment (replace with real payment integration if needed)
    try {
      // 1. Simulate payment success
      await new Promise((resolve) => setTimeout(resolve, 1000)); // fake delay

      // 2. Book the space
      await axios.post(
        "http://localhost:5164/api/bookings",
        {
          parkingSpaceId: space.id,
          startTime: `${date}T${fromTime}`,
          hours: hours,
        },
        { withCredentials: true }
      );

      setMessage(`Payment successful! Booked for ${hours} hour(s), paid ${totalPrice} KM.`);
      setShowPayment((prev) => ({ ...prev, [space.id]: false }));
      setBooking((prev) => ({ ...prev, [space.id]: {} }));
    } catch {
      setMessage("Booking or payment failed.");
    }
    setPaymentProcessing(false);
  };

  return (
    <div className="p-8 ml-64 max-w-3xl">
      <h1 className="text-2xl font-bold mb-4">All Parking Spaces</h1>
      {spaces.map((space) => (
        <div key={space.id} className="bg-white p-4 mb-4 rounded shadow">
          <div className="flex justify-between">
            <div>
              <h2 className="font-semibold">{space.spaceName}</h2>
              <p>{space.location}</p>
              <p>{space.price} KM/hr</p>
              <p>{space.availableTimes}</p>
            </div>
            <div>
              {user && String(space.ownerId) === String(user.id) ? (
                <span className="text-blue-600 font-semibold">Your Parking</span>
              ) : showPayment[space.id] ? (
                <div className="flex flex-col items-end">
                  <input
                    type="date"
                    value={booking[space.id]?.date || ""}
                    onChange={(e) =>
                      setBooking((prev) => ({
                        ...prev,
                        [space.id]: { ...prev[space.id], date: e.target.value },
                      }))
                    }
                    className="border p-1 mb-2"
                  />
                  <div className="flex mb-2">
                    <input
                      type="time"
                      value={booking[space.id]?.fromTime || ""}
                      onChange={(e) =>
                        setBooking((prev) => ({
                          ...prev,
                          [space.id]: { ...prev[space.id], fromTime: e.target.value },
                        }))
                      }
                      className="border p-1 mr-2"
                    />
                    <span className="self-center mx-1">to</span>
                    <input
                      type="time"
                      value={booking[space.id]?.toTime || ""}
                      onChange={(e) =>
                        setBooking((prev) => ({
                          ...prev,
                          [space.id]: { ...prev[space.id], toTime: e.target.value },
                        }))
                      }
                      className="border p-1"
                    />
                  </div>
                  {/* Show calculated price if possible */}
                  {booking[space.id]?.fromTime && booking[space.id]?.toTime && (
                    <div className="mb-2 text-sm text-gray-700">
                      Total:{" "}
                      <span className="font-semibold">
                        {(
                          space.price *
                          calculateHours(
                            booking[space.id]?.fromTime,
                            booking[space.id]?.toTime
                          )
                        ).toFixed(2)}{" "}
                        KM
                      </span>
                    </div>
                  )}
                  <button
                    className="bg-green-600 text-white px-3 py-1 rounded mb-1"
                    onClick={() => handlePayAndBook(space)}
                    disabled={paymentProcessing}
                  >
                    {paymentProcessing ? "Processing..." : "Pay & Book"}
                  </button>
                  <button
                    className="text-xs text-gray-500 underline"
                    onClick={() =>
                      setShowPayment((prev) => ({ ...prev, [space.id]: false }))
                    }
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                  onClick={() => handleBookClick(space.id)}
                >
                  Book
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
      {message && <div className="mt-4 text-green-600">{message}</div>}
    </div>
  );
};

export default AllSpaces;