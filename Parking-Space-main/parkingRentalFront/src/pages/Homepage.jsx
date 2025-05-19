import React from "react";
import Sidebar from "../components/Sidebar";
import { fetchParkingSpaces } from "../services/fetchParkingSpaces";
import { useEffect, useState } from "react";
import MapAllSpaces from "../components/MapAllSpaces";

const Homepage = () => {
  const [parkingSpaces, setParkingSpaces] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchParkingSpaces();
      setParkingSpaces(data);
    };
    getProducts();
  }, [setParkingSpaces]);

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

        {/* ------------------------------------------------------------------------------------------------ */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {parkingSpaces.map((space) => (
            <div
              key={space.id}
              className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-semibold">{space.address}</h3>
                <p className="text-sm text-gray-600">{space.description}</p>
                <p className="text-sm text-gray-600">
                  {space.pricePerHour} KM / hr
                </p>
                <p className="text-sm text-gray-600">{space.isAvailable}</p>
              </div>
              <button className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700 transition">
                {space.isAvailable === "Available" ? "Book Now" : "Details"}
              </button>
            </div>
          ))}
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaClock className="inline-block mr-1" />
                    Start Time
                  </label>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={30}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                  {errors.startDate && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.startDate}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaClock className="inline-block mr-1" />
                    End Time
                  </label>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={30}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                  {errors.endDate && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.endDate}
                    </p>
                  )}
                </div>
              </div>
              <h2 className="text-xl font-bold text-smash-black mb-4">
                Confirm Cancellation
              </h2>
              <p className="text-gray-700 mb-6">
                Are you sure you want to cancel this order?
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 transition"
                  onClick={() => setShowModal(false)}
                >
                  No, Go Back
                </button>
                <button
                  className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition"
                  onClick={async () => {
                    await handleCancelOrder(orderToCancel.id);
                  }}
                >
                  Yes, Cancel Order
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      <hr className="my-8 border-gray-200" />

      {/* Map Search Section */}

      <div className="mt-8">
        <MapAllSpaces parkingSpaces={parkingSpaces} />
      </div>

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
