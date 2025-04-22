import React, { useState } from "react";
import {
  FaMapMarkerAlt,
  FaTag,
  FaAlignLeft,
  FaDollarSign,
  FaClock,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Booking = () => {
  const [formData, setFormData] = useState({
    location: "",
    spaceName: "",
    description: "",
    price: "",
    availableTimes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Space listed:", formData);
    // Add your API call or state management here
  };

  return (
    <div className="p-8 ml-64 max-w-3xl">
      {" "}
      {/* ml-64 to account for sidebar width */}
      {/* Navigation Tabs */}
      <div className="flex space-x-4 border-b border-gray-200 mb-8">
        <Link className="px-4 py-2 text-blue-600 font-medium border-b-2 border-blue-600" to="booking">
          Find Spot
        </Link>
        <Link
          to="/myBookings"
          className="px-4 py-2 text-gray-600 hover:text-blue-600"
        >
          My Bookings
        </Link>
        <Link className="px-4 py-2 text-gray-600 hover:text-blue-600" to="/listSpace">
          List Space
        </Link>
        <Link
          to="/dashboard"
          className="px-4 py-2 text-gray-600 hover:text-blue-600"
        >
          Dashboard
        </Link>
      </div>
      {/* Form Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Add Parking Space</h1>
        <p className="text-gray-600">
          Share your unused parking spot and earn extra income. Fill in the
          details below to list your space.
        </p>
      </div>
      {/* Listing Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        {/* Location Field */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            <FaMapMarkerAlt className="mr-2 text-gray-500" />
            Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter address or building name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Space Name Field */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            <FaTag className="mr-2 text-gray-500" />
            Space Name
          </label>
          <input
            type="text"
            name="spaceName"
            value={formData.spaceName}
            onChange={handleChange}
            placeholder="e.g. Reserved Spot #12"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Description Field */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            <FaAlignLeft className="mr-2 text-gray-500" />
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your space, access, restrictions, etc."
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          ></textarea>
        </div>

        {/* Price Field */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            <FaDollarSign className="mr-2 text-gray-500" />
            Price per Hour
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-gray-500">$</span>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Set your hourly rate"
              className="w-full pl-8 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="1"
              required
            />
          </div>
        </div>

        {/* Available Times Field */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            <FaClock className="mr-2 text-gray-500" />
            Available Times
          </label>
          <input
            type="text"
            name="availableTimes"
            value={formData.availableTimes}
            onChange={handleChange}
            placeholder="e.g. Mon-Fri, 8am-6pm"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
        >
          List Space
        </button>
      </form>
    </div>
  );
};

export default Booking;
