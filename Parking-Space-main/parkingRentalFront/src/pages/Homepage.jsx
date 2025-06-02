import React, { useEffect, useState } from "react";
import { fetchParkingSpaces } from "../services/fetchParkingSpaces";
import { useNavigate } from "react-router-dom";
// import axios from "axios"; // No longer needed directly for auth checks here
import { useAuth } from "../services/AuthContext"; // Import useAuth

const Homepage = () => {
  const [parkingSpaces, setParkingSpaces] = useState([]);
  const navigate = useNavigate();

  // --- IMPORTANT CHANGE: Get user and loading from AuthContext ---
  const { user, loading } = useAuth();

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchParkingSpaces();
      setParkingSpaces(data);
    };
    getProducts();

    // --- REMOVE THIS REDUNDANT AUTH CHECK ---
    // axios
    //   .get("http://localhost:5164/api/auth/auth-check", { withCredentials: true })
    //   .then((res) => setUser(res.data.user))
    //   .catch(() => setUser(null));
  }, []);

  // Show loading indicator if AuthContext is still loading
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading user and parking spaces...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 ml-56">
      {" "}
      {/* Added ml-56 to account for sidebar */}
      {/* Available Spaces Section */}
      <section className="mb-12">
        <h1 className="text-3xl font-bold mb-6">Available Spaces</h1>
        {user && (
          <div className="mb-4">
            <span className="font-semibold text-blue-700">
              Welcome, {user.name || user.email || user.id}!
            </span>
          </div>
        )}

        {/* Display up to 3 available spaces */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {parkingSpaces.slice(0, 3).map((space) => (
            <div
              key={space.id}
              className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-semibold">
                  {space.address || space.location || space.spaceName}
                </h3>
                <p className="text-sm text-gray-600">{space.description}</p>
                <p className="text-sm text-gray-600">
                  {space.pricePerHour || space.price} KM / hr
                </p>
                <p className="text-sm text-gray-600">
                  {space.isAvailable ? "Available" : "Unavailable"}
                </p>
              </div>
              <button
                className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700 transition"
                onClick={() => navigate("/all-spaces")}
              >
                {space.isAvailable ? "Book Now" : "Details"}
              </button>
            </div>
          ))}
        </div>
      </section>

      <hr className="my-8 border-gray-200" />

      {/* How it works Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-8">How it works</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="bg-blue-100 text-blue-800 w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mb-4">
              1
            </div>
            <h3 className="text-lg font-semibold mb-2">List Your Space</h3>
            <p className="text-gray-600">
              Share your unused spot and set your price.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="bg-blue-100 text-blue-800 w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mb-4">
              2
            </div>
            <h3 className="text-lg font-semibold mb-2">Find & Book</h3>
            <p className="text-gray-600">
              Browse, filter, and reserve a spot instantly.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="bg-blue-100 text-blue-800 w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mb-4">
              3
            </div>
            <h3 className="text-lg font-semibold mb-2">Check In</h3>
            <p className="text-gray-600">
              Scan the QR code to confirm your reservation.
            </p>
          </div>
        </div>
      </section>

      <hr className="my-8 border-gray-200" />

      {/* Owner Section */}
      <section className="text-center">
        <p className="font-medium">
          {user ? (user.name || user.email || user.id) : "Guest"}
        </p> {/* Changed "Owner" to "Guest" for clarity */}
        <p className="text-gray-600">
          {user ? user.role : "Please log in"}
        </p> {/* Display user's role if logged in */}
      </section>
    </div>
  );
};

export default Homepage;