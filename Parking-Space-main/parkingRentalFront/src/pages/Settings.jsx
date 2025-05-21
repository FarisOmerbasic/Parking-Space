import React, { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaCreditCard,
  FaBell,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Settings = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Settings updated:", formData);
    // Add your API call or state management here
  };

  return (
    <div className="p-8 ml-64 max-w-3xl">
      {/* Navigation Tabs */}
      <div className="flex space-x-4 border-b border-gray-200 mb-8">
        <Link
          to="/findSpot"
          className="px-4 py-2 text-gray-600 hover:text-blue-600"
        >
          Find Spot
        </Link>
        <Link
          to="/myBookings"
          className="px-4 py-2 text-gray-600 hover:text-blue-600"
        >
          My Bookings
        </Link>
        <Link
          to="/listSpace"
          className="px-4 py-2 text-gray-600 hover:text-blue-600"
        >
          List Space
        </Link>
        <Link
          to="/dashboard"
          className="px-4 py-2 text-gray-600 hover:text-blue-600"
        >
          Dashboard
        </Link>
        <button className="px-4 py-2 text-blue-600 font-medium border-b-2 border-blue-600">
          Settings
        </button>
      </div>

      {/* Settings Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Account Settings</h1>
        <p className="text-gray-600">
          Manage your profile information, payment methods, and notification
          preferences.
        </p>
      </div>

      {/* Settings Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        {/* Personal Information Section */}
        <div className="mb-8">
          <h2 className="text-lg font-medium mb-4 pb-2 border-b border-gray-200">
            Personal Information
          </h2>

          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <FaUser className="mr-2 text-gray-500" />
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter your first name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <FaUser className="mr-2 text-gray-500" />
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter your last name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <FaEnvelope className="mr-2 text-gray-500" />
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <FaPhone className="mr-2 text-gray-500" />
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Security Section */}
        <div className="mb-8">
          <h2 className="text-lg font-medium mb-4 pb-2 border-b border-gray-200">
            Security
          </h2>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <FaLock className="mr-2 text-gray-500" />
              Current Password
            </label>
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              placeholder="Enter your current password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <FaLock className="mr-2 text-gray-500" />
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="Enter new password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <FaLock className="mr-2 text-gray-500" />
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm new password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Payment Information */}
        <div className="mb-8">
          <h2 className="text-lg font-medium mb-4 pb-2 border-b border-gray-200">
            Payment Methods
          </h2>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <FaCreditCard className="mr-2 text-gray-500" />
              Card Number
            </label>
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              placeholder="XXXX XXXX XXXX XXXX"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <FaCreditCard className="mr-2 text-gray-500" />
                Expiry Date
              </label>
              <input
                type="text"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                placeholder="MM/YY"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <FaCreditCard className="mr-2 text-gray-500" />
                CVV
              </label>
              <input
                type="text"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                placeholder="123"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="mb-8">
          <h2 className="text-lg font-medium mb-4 pb-2 border-b border-gray-200">
            Notification Preferences
          </h2>

          <div className="mb-4">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                name="emailNotifications"
                checked={formData.emailNotifications}
                onChange={handleChange}
                className="mr-3 h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <FaEnvelope className="mr-2 text-gray-500" />
              Email Notifications
            </label>
          </div>

          <div className="mb-4">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                name="smsNotifications"
                checked={formData.smsNotifications}
                onChange={handleChange}
                className="mr-3 h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <FaPhone className="mr-2 text-gray-500" />
              SMS Notifications
            </label>
          </div>

          <div className="mb-6">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                name="pushNotifications"
                checked={formData.pushNotifications}
                onChange={handleChange}
                className="mr-3 h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <FaBell className="mr-2 text-gray-500" />
              Push Notifications
            </label>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex flex-col md:flex-row md:justify-between space-y-4 md:space-y-0">
          <button
            type="submit"
            className="py-3 px-6 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
          >
            Save Changes
          </button>

          <button
            type="button"
            className="py-3 px-6 bg-white text-red-600 font-medium rounded-md border border-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition flex items-center justify-center"
          >
            <FaSignOutAlt className="mr-2" />
            Sign Out
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
