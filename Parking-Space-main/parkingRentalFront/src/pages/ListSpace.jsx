import React, { useState } from "react";
import {
  FaMapMarkerAlt,
  FaTag,
  FaAlignLeft,
  FaDollarSign,
  FaClock,
} from "react-icons/fa";
import axios from "axios";
import { useAuth } from "../services/AuthContext";

const ListSpace = () => {
  const [formData, setFormData] = useState({
    location: "",
    spaceName: "",
    description: "",
    price: "",
    availableTimes: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const payload = {
        Location: formData.location,
        SpaceName: formData.spaceName,
        Description: formData.description,
        Price: Number(formData.price),
        AvailableTimes: formData.availableTimes,
      };

      await axios.post(
        "http://localhost:5164/api/parkingspaces",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setMessage("Parking space listed successfully!");
      setFormData({
        location: "",
        spaceName: "",
        description: "",
        price: "",
        availableTimes: "",
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to list parking space. Please try again."
      );
    }
  };

  return (
    <div className="p-8 ml-64 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Add Parking Space</h1>
        <p className="text-gray-600">
          Share your unused parking spot and earn extra income. Fill in the
          details below to list your space.
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        {message && <div className="mb-4 text-green-600">{message}</div>}
        {error && <div className="mb-4 text-red-600">{error}</div>}
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

export default ListSpace;