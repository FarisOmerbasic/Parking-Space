import React, { useEffect, useState } from "react";
import axios from "axios";

const AllSpaces = () => {
  const [spaces, setSpaces] = useState([]);
  const [user, setUser] = useState(null);
  const [booking, setBooking] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch all spaces
    axios.get("http://localhost:5164/api/parkingspaces")
      .then(res => setSpaces(res.data));
    // Fetch current user
    axios.get("http://localhost:5164/api/auth/auth-check", { withCredentials: true })
      .then(res => setUser(res.data.user));
  }, []);

  const handleBook = async (spaceId) => {
    setMessage("");
    const { hours = 1, date } = booking[spaceId] || {};
    if (!date) return setMessage("Select a date.");
    try {
      await axios.post(
        "http://localhost:5164/api/bookings",
        {
          parkingSpaceId: spaceId,
          startTime: date,
          hours: parseInt(hours),
        },
        { withCredentials: true }
      );
      setMessage("Booking successful!");
    } catch {
      setMessage("Booking failed.");
    }
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
              ) : (
                <>
                  <input
                    type="date"
                    onChange={(e) =>
                      setBooking((prev) => ({
                        ...prev,
                        [space.id]: { ...prev[space.id], date: e.target.value },
                      }))
                    }
                    className="border p-1 mr-2"
                  />
                  <input
                    type="number"
                    min={1}
                    placeholder="Hours"
                    onChange={(e) =>
                      setBooking((prev) => ({
                        ...prev,
                        [space.id]: { ...prev[space.id], hours: e.target.value },
                      }))
                    }
                    className="border p-1 w-16 mr-2"
                  />
                  <button
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                    onClick={() => handleBook(space.id)}
                  >
                    Book
                  </button>
                </>
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