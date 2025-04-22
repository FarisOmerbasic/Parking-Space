import React from "react";
import Sidebar from "../components/Sidebar";

const Homepage = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Available Spaces Section */}
      <Sidebar />
      <section className="mb-12">
        <h1 className="text-3xl font-bold mb-6">Available Spaces</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* All Categories */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">All</h2>
            <ul className="space-y-2">
              <li className="hover:text-blue-600 cursor-pointer">Office</li>
              <li className="hover:text-blue-600 cursor-pointer">
                Residential
              </li>
              <li className="hover:text-blue-600 cursor-pointer">Covered</li>
              <li className="hover:text-blue-600 cursor-pointer">
                EV Charging
              </li>
            </ul>
          </div>

          {/* Office */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Office</h2>
            <div className="mb-4">
              <h3 className="font-medium">Downtown Plaza</h3>
              <p className="text-sm text-gray-600">
                2 spots - $6/hr - 24/7 access
              </p>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
              Book Now
            </button>
          </div>

          {/* Residential */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Residential</h2>
            <div className="mb-4">
              <h3 className="font-medium">Maple Residences</h3>
              <p className="text-sm text-gray-600">
                1 spot - $6/hr - dated entry
              </p>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
              Details
            </button>
          </div>

          {/* EV Charging */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">EV Charging</h2>
            <div className="mb-4">
              <h3 className="font-medium">Green Garage</h3>
              <p className="text-sm text-gray-600">
                3 spots - $10/hr - EV charging
              </p>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
              Book Now
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
            <span>Details</span>
            <button className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700 transition">
              Book Now
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
            <span>Details</span>
            <button className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700 transition">
              Book Now
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
            <span>Details</span>
            <button className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700 transition">
              Details
            </button>
          </div>
        </div>
      </section>

      <hr className="my-8 border-gray-200" />

      {/* Map Search Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Map Search</h2>
        <h3 className="text-xl font-semibold mb-4">EUROPE</h3>
        <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Map will be displayed here</p>
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
        <p className="font-medium">Alex Morgan</p>
        <p className="text-gray-600">Owner</p>
      </section>
    </div>
  );
};

export default Homepage;
