import React, { useEffect, useState } from "react";
import { FaHome, FaMapMarkerAlt, FaClock, FaCar, FaUser, FaCog, FaDollarSign, FaUsersCog, FaWallet } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../services/AuthContext";
import axios from "axios";

const Sidebar = () => {
  const { user, loading, isAdmin } = useAuth();
  const location = useLocation();
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    if (user) {
      axios
        .get("http://localhost:5164/api/bookings/balance", { withCredentials: true })
        .then((res) => setBalance(res.data.balance))
        .catch(() => setBalance(user.wallet ?? user.balance ?? 0));
    }
  }, [user]);

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(`${path}/`);

  if (loading) {
    return (
      <div className="w-56 bg-white h-screen fixed left-0 top-0 shadow-md p-4 flex flex-col items-center justify-center">
        <p>Loading sidebar...</p>
      </div>
    );
  }

  return (
    <aside className="w-56 bg-white h-screen fixed left-0 top-0 shadow-md p-4 flex flex-col">
      {/* User Profile Section or Login/Register */}
      {user ? (
        <>
          <Link
            to="/profile"
            className="mb-4 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition"
          >
            <div className="flex items-center">
              <div className="bg-blue-100 p-2 rounded-full mr-3">
                <FaUser className="text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800 truncate">
                  {user.name || user.email || `User #${user.id}`}
                </p>
                <p className="text-sm text-blue-700">View Profile</p>
              </div>
            </div>
          </Link>
          {/* Wallet Section */}
          <div className="mb-6 flex items-center bg-green-50 rounded-lg p-3">
            <FaWallet className="text-green-600 mr-2" />
            <span className="font-semibold text-green-700">
              Wallet: {balance !== null ? balance : (user.wallet ?? user.balance ?? 0)} KM
            </span>
          </div>
        </>
      ) : (
        <div className="mb-6 flex flex-col gap-2">
          <Link
            to="/login"
            className={`p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition text-center ${
              isActive("/login") ? "text-blue-600 font-medium" : "text-gray-700"
            }`}
          >
            Login
          </Link>
          <Link
            to="/register"
            className={`p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition text-center ${
              isActive("/register") ? "text-blue-600 font-medium" : "text-gray-700"
            }`}
          >
            Register
          </Link>
        </div>
      )}

      <nav className="flex-1">
        <ul className="space-y-2">
          <li>
            <Link
              to="/"
              className={`flex items-center p-3 rounded-lg hover:bg-blue-50 ${
                isActive("/") ? "text-blue-600 font-medium" : "text-gray-700"
              }`}
            >
              <FaHome className="mr-3" />
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/map"
              className={`flex items-center p-3 rounded-lg hover:bg-blue-50 ${
                isActive("/map") ? "text-blue-600 font-medium" : "text-gray-700"
              }`}
            >
              <FaMapMarkerAlt className="mr-3" />
              Map View
            </Link>
          </li>
          <li>
            <Link
              to="/my-bookings"
              className={`flex items-center p-3 rounded-lg hover:bg-blue-50 ${
                isActive("/my-bookings") ? "text-blue-600 font-medium" : "text-gray-700"
              }`}
            >
              <FaClock className="mr-3" />
              My Bookings
            </Link>
          </li>
          <li>
            <Link
              to="/all-spaces"
              className={`flex items-center p-3 rounded-lg hover:bg-blue-50 ${
                isActive("/all-spaces") ? "text-blue-600 font-medium" : "text-gray-700"
              }`}
            >
              <FaCar className="mr-3" />
              All Spaces
            </Link>
          </li>
          <li>
            <Link
              to="/settings"
              className={`flex items-center p-3 rounded-lg hover:bg-blue-50 ${
                isActive("/settings") ? "text-blue-600 font-medium" : "text-gray-700"
              }`}
            >
              <FaCog className="mr-3" />
              Settings
            </Link>
          </li>
          {isAdmin && (
            <>
              <li>
                <Link
                  to="/admin/users"
                  className={`flex items-center p-3 rounded-lg hover:bg-blue-50 ${
                    isActive("/admin/users") ? "text-blue-600 font-medium" : "text-gray-700"
                  }`}
                >
                  <FaUsersCog className="mr-3" />
                  Manage Users
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/payments"
                  className={`flex items-center p-3 rounded-lg hover:bg-blue-50 ${
                    isActive("/admin/payments") ? "text-blue-600 font-medium" : "text-gray-700"
                  }`}
                >
                  <FaDollarSign className="mr-3" />
                  Payments
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/parking-manager"
                  className={`flex items-center p-3 rounded-lg hover:bg-blue-50 ${
                    isActive("/admin/parking-manager") ? "text-blue-600 font-medium" : "text-gray-700"
                  }`}
                >
                  <FaCar className="mr-3" />
                  Parking Manager
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;