import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../services/AuthContext";
import {
  FaHome,
  FaMapMarkerAlt,
  FaClock,
  FaCar,
  FaUser,
  FaCog,
  FaQuestionCircle,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const Sidebar = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    if (user) {
      axios
        .get("http://localhost:5164/api/bookings/balance", {
          withCredentials: true,
        })
        .then((res) => setBalance(res.data.balance))
        .catch(() => setBalance(null));
    }
  }, [user]);

  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-56 bg-white h-screen fixed left-0 top-0 shadow-md p-4">
      <div className="mb-8 p-4">
        <h1 className="text-2xl font-bold text-blue-600">
          Parking Rental Space
        </h1>
      </div>

      <nav className="mb-8">
        <ul className="space-y-2">
          <li>
            <Link
              to="/"
              className={`${
                isActive("/") ? "text-blue-600 font-medium" : "text-gray-700"
              } flex items-center p-3 rounded-lg hover:bg-blue-50`}
            >
              <FaHome className="mr-3" />
              Homepage
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard"
              className={`${
                isActive("/dashboard")
                  ? "text-blue-600 font-medium"
                  : "text-gray-700"
              } flex items-center p-3 rounded-lg hover:bg-blue-50`}
            >
              <FaHome className="mr-3" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/myBookings"
              className={`${
                isActive("/myBookings")
                  ? "text-blue-600 font-medium"
                  : "text-gray-700"
              } flex items-center p-3 rounded-lg hover:bg-blue-50`}
            >
              <FaClock className="mr-3" />
              My Bookings
            </Link>
          </li>
          <li>
            {/* Replace "/map" with actual route if implemented */}
            <Link
              to="/map"
              className={`${
                isActive("/map") ? "text-blue-600 font-medium" : "text-gray-700"
              } flex items-center p-3 rounded-lg hover:bg-blue-50`}
            >
              <FaMapMarkerAlt className="mr-3" />
              Map View
            </Link>
          </li>
          <li>
            <Link
              to="/mySpaces"
              className={`${
                isActive("/mySpaces")
                  ? "text-blue-600 font-medium"
                  : "text-gray-700"
              } flex items-center p-3 rounded-lg hover:bg-blue-50`}
            >
              <FaCar className="mr-3" />
              My Spaces
            </Link>
          </li>
          <li>
            <Link
              to="/listSpace"
              className={`${
                isActive("/listSpace")
                  ? "text-blue-600 font-medium"
                  : "text-gray-700"
              } flex items-center p-3 rounded-lg hover:bg-blue-50`}
            >
              <FaCar className="mr-3" />
              List Space
            </Link>
          </li>
          <li>
            <Link
              to="/all-spaces"
              className={`${
                isActive("/all-spaces")
                  ? "text-blue-600 font-medium"
                  : "text-gray-700"
              } flex items-center p-3 rounded-lg hover:bg-blue-50`}
            >
              <FaCar className="mr-3" />
              All Spaces
            </Link>
          </li>
        </ul>
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
        <ul className="space-y-2">
          {user && balance !== null && (
            <li>
              <div className="mb-2 text-blue-700 font-semibold text-sm">
                Balance: {balance} KM
              </div>
            </li>
          )}
          {user ? (
            <>
              <li>
                <Link
                  to="/profile"
                  className={`${
                    isActive("/profile")
                      ? "text-blue-600 font-medium"
                      : "text-gray-700"
                  } flex items-center p-3 rounded-lg hover:bg-blue-50`}
                >
                  <FaUser className="mr-3" />
                  {user.name}
                </Link>
              </li>
              <li>
                <Link
                  to="/settings"
                  className={`${
                    isActive("/settings")
                      ? "text-blue-600 font-medium"
                      : "text-gray-700"
                  } flex items-center p-3 rounded-lg hover:bg-blue-50`}
                >
                  <FaCog className="mr-3" />
                  Settings
                </Link>
              </li>
              <li>
                <Link
                  to="/help"
                  className={`${
                    isActive("/help")
                      ? "text-blue-600 font-medium"
                      : "text-gray-700"
                  } flex items-center p-3 rounded-lg hover:bg-blue-50`}
                >
                  <FaQuestionCircle className="mr-3" />
                  Help
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  className="flex items-center p-3 rounded-lg hover:bg-blue-50 text-blue-600 font-medium"
                >
                  <FaUser className="mr-3" />
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="flex items-center p-3 rounded-lg hover:bg-blue-50 text-blue-600 font-medium"
                >
                  <FaUser className="mr-3" />
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
