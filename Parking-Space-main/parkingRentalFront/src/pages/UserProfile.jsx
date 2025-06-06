import React, { useState, useEffect } from "react";
import { useAuth } from "../services/AuthContext";
import axios from "axios";

const UserProfile = () => {
  const { user, logout } = useAuth(); // 'user' will contain 'role'

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [balance, setBalance] = useState(null);

  // Populate form with user data when available
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: user.name || "",
        email: user.email || "",
      }));
      // Fetch balance
      axios
        .get("http://localhost:5164/api/bookings/balance", { withCredentials: true })
        .then(res => setBalance(res.data.balance))
        .catch(() => setBalance(null));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTopUp = () => {
    axios
      .post("http://localhost:5164/api/bookings/topup", 100, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" }
      })
      .then(res => setBalance(res.data.balance));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    // Only attempt password change if any password field is filled
    if (
      formData.currentPassword ||
      formData.newPassword ||
      formData.confirmPassword
    ) {
      if (
        !formData.currentPassword ||
        !formData.newPassword ||
        !formData.confirmPassword
      ) {
        setError("Please fill in all password fields.");
        return;
      }
      if (formData.newPassword !== formData.confirmPassword) {
        setError("New password and confirmation do not match.");
        return;
      }

      try {
        await axios.post(
          "http://localhost:5164/api/auth/change-password",
          {
            currentPassword: formData.currentPassword,
            newPassword: formData.newPassword,
            confirmPassword: formData.confirmPassword,
          },
          { withCredentials: true }
        );
        setMessage("Password changed successfully!");
        setFormData((prev) => ({
          ...prev,
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        }));
      } catch (err) {
        setError(
          err.response?.data || "Failed to change password. Please try again."
        );
      }
    } else {
      setMessage("Profile updated (no password change).");
    }
  };

  if (!user) {
    return (
      <div className="p-8 ml-64 max-w-4xl">
        Please log in to view your profile.
      </div>
    );
  }

  return (
    <div className="p-8 ml-64 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Profile</h1>

      {/* Wallet/Balance Section */}
      {balance !== null && (
        <div className="mb-6 bg-blue-50 p-4 rounded flex items-center">
          <span className="font-semibold text-blue-700">
            Wallet Balance: {balance} KM
          </span>
          <button
            onClick={handleTopUp}
            className="ml-4 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Top Up 100 KM
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Account details</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled // Remove this if you want to allow editing name
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled
              />
            </div>
          </div>
        </div>

        {/* Change Password Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Change password</h2>
          {message && <div className="mb-2 text-green-600">{message}</div>}
          {error && <div className="mb-2 text-red-600">{error}</div>}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current password
              </label>
              <input
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                placeholder="Enter current password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New password
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
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter new password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Save & Logout Buttons */}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={logout}
            className="px-6 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition"
          >
            Logout
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
          >
            Save changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserProfile;