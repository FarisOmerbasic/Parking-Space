import React, { useEffect, useState } from "react";
import { fetchParkingSpaces } from "../services/fetchParkingSpaces";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import FeatureCard from "../components/FeatureCard";
import Testimonial from "../components/Testimonial";
import { FaParking, FaCar, FaKey } from "react-icons/fa";
import { useAuth } from "../services/AuthContext";

const Homepage = () => {
  const [parkingSpaces, setParkingSpaces] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchParkingSpaces();
      setParkingSpaces(data);
    };
    getProducts();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <main className="pt-28 max-w-6xl mx-auto px-4">
        {/* Hero Section */}
        <section className="bg-green-100 py-16 text-center rounded-xl mb-12">
          <h1 className="text-5xl font-bold mb-4 text-green-700">Welcome to ParkingRental</h1>
          <p className="text-xl mb-8 text-green-900">The easiest way to rent, manage, and find parking spaces.</p>
          <a href="/register" className="bg-green-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-600 transition">Create a free account</a>
        </section>

        {/* Features */}
        <section className="py-12">
          <h2 className="text-3xl font-bold text-center mb-10 text-green-700">Get started with ParkingRental</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <FeatureCard
              icon={<FaParking />}
              title="Manage parking spaces"
              description="Streamline and improve the management of parking spaces for property owners, companies, and municipalities."
            />
            <FeatureCard
              icon={<FaKey />}
              title="Rent out parking"
              description="Have an unused parking space? Rent it out to others and earn extra money with ease."
            />
            <FeatureCard
              icon={<FaCar />}
              title="Park with AirPark"
              description="Find and book parking spaces easily. Enjoy a greener, more convenient parking experience."
            />
          </div>
        </section>

        {/* Available Spaces Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Available Spaces</h2>
          {user && (
            <div className="mb-4">
              <span className="font-semibold text-blue-700">
                Welcome, {user.name || user.email || user.id}!
              </span>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {parkingSpaces.slice(0, 3).map((space) => (
              <div
                key={space.id}
                className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-between items-start"
              >
                <div>
                  <h3 className="text-lg font-semibold">{space.address || space.location || space.spaceName}</h3>
                  <p className="text-sm text-gray-600">{space.description}</p>
                  <p className="text-sm text-gray-600">
                    {space.pricePerHour || space.price} KM / hr
                  </p>
                  <p className="text-sm text-gray-600">{space.isAvailable ? "Available" : "Unavailable"}</p>
                </div>
                <button
                  className="mt-4 bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700 transition"
                  onClick={() => navigate("/all-spaces")}
                >
                  {space.isAvailable ? "Book Now" : "Details"}
                </button>
              </div>
            ))}
          </div>
        </section>

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

        {/* Testimonial */}
        <section className="py-16 bg-gray-100 rounded-xl mb-12">
          <Testimonial />
        </section>
      </main>
    </div>
  );
};

export default Homepage;