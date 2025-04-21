import React from "react";
import { Link } from "react-router-dom";

/* import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaPlus,
  FaTachometerAlt,
  FaUser,
  FaCog,
} from "react-icons/fa"; */

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-100 border-r flex flex-col justify-between">
      <div>
        <div className="p-6 text-2xl font-bold text-purple-700">ParkEasy</div>
        <nav className="px-4">
          <ul className="space-y-2">
            <Link
              to="/"
              className={`font-medium transition-colors relative `}
            >
              Find Spot
            </Link>
            <Link
              to="/bookings"
              className={`font-medium transition-colors relative `}
            >
              My Bookings 
            </Link>
            <Link
              to="/list-spaces"
              className={`font-medium transition-colors relative `}
            >
              List Spaces
            </Link>
            <Link
              to="/dashboard"
              className={`font-medium transition-colors relative `}
            >
              Dashboard
            </Link>
          </ul>

          <div className="mt-6 text-gray-500 text-sm uppercase px-2">
            Account
          </div>
          <ul className="space-y-2 mt-2">
          <Link
              to="/profile"
              className={`font-medium transition-colors relative `}
            >
              Profile
            </Link>
            <Link
              to="/settings"
              className={`font-medium transition-colors relative `}
            >
              Settings
            </Link>
          </ul>
        </nav>
      </div>
      <div className="p-4 flex items-center gap-2 border-t text-sm text-gray-600">
        <img
          src="https://via.placeholder.com/32"
          className="rounded-full"
          alt="user"
        />
        <div>
          <div>Alex Morgan</div>
          <div className="text-xs text-gray-400">Owner</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
