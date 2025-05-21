import { React, useContext } from "react";
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


const Sidebar = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="w-56 bg-white h-screen fixed left-0 top-0 shadow-md p-4">
      {/* Logo/Brand */}
      <div className="mb-8 p-4">
        <h1 className="text-2xl font-bold text-blue-600">
          Parking Rental Space
        </h1>
      </div>

      {/* Main Navigation */}
      <nav className="mb-8">
        <ul className="space-y-2">
         <li>
  <Link
    to="/myBookings"
    className={`
      ${
        isActive("/myBookings")
          ? "flex items-center p-3 rounded-lg hover:bg-blue-50 text-blue-600 font-medium"
          : "flex items-center p-3 rounded-lg hover:bg-gray-100 text-gray-700"
      }`}
  >
    <FaClock className="mr-3" />
    My Bookings
  </Link>
</li>
          <li>
            <a
              href="#"
              className={`
              ${
                isActive("/map")
                  ? "flex items-center p-3 rounded-lg hover:bg-blue-50 text-blue-600 font-medium"
                  : "flex items-center p-3 rounded-lg hover:bg-gray-100 text-gray-700"
              }`}
            >
              <FaMapMarkerAlt className="mr-3" />
              Map View
            </a>
          </li>
          <li>
            <Link
              to="/booking"
              className={`
              ${
                isActive("/booking")
                  ? "flex items-center p-3 rounded-lg hover:bg-blue-50 text-blue-600 font-medium"
                  : "flex items-center p-3 rounded-lg hover:bg-gray-100 text-gray-700"
              }`}
            >
              <FaClock className="mr-3" />
              Recent Bookings
            </Link>
          </li>
          <li>
            <Link
              to="/listSpace"
              className={`
              ${
                isActive("/mySpaces")
                  ? "flex items-center p-3 rounded-lg hover:bg-blue-50 text-blue-600 font-medium"
                  : "flex items-center p-3 rounded-lg hover:bg-gray-100 text-gray-700"
              }`}
            >
              <FaCar className="mr-3" />
              My Spaces
            </Link>
          </li>
          
 <li>
  <Link
    to="/all-spaces"
    className={`
      ${
        isActive("/all-spaces")
          ? "flex items-center p-3 rounded-lg hover:bg-blue-50 text-blue-600 font-medium"
          : "flex items-center p-3 rounded-lg hover:bg-gray-100 text-gray-700"
      }`}
  >
    <FaCar className="mr-3" />
    All Spaces
  </Link>
</li>
        </ul>
      </nav>

      {/* Quick Access - Space Categories */}
      {/* <div className="mb-8">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 px-3">
          Quick Access
        </h3>
        <ul className="space-y-1">
          <li>
            <a
              href="#"
              className="flex items-center p-3 rounded-lg hover:bg-gray-100 text-gray-700"
            >
              <span className="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
              Office Spaces
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center p-3 rounded-lg hover:bg-gray-100 text-gray-700"
            >
              <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
              Residential
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center p-3 rounded-lg hover:bg-gray-100 text-gray-700"
            >
              <span className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></span>
              Covered
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center p-3 rounded-lg hover:bg-gray-100 text-gray-700"
            >
              <span className="w-3 h-3 bg-purple-500 rounded-full mr-3"></span>
              EV Charging
            </a>
          </li>
        </ul>
      </div> */}

      {/* Bottom Navigation */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
        <ul className="space-y-2">
          {user ? (
            <>
              <li>
                <Link
                  to="/profile"
                  className={`
              ${
                isActive("/profile")
                  ? "flex items-center p-3 rounded-lg hover:bg-blue-50 text-blue-600 font-medium"
                  : "flex items-center p-3 rounded-lg hover:bg-gray-100 text-gray-700"
              }`}
                >
                  <FaUser className="mr-3" />
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/settings"
                  className={`
              ${
                isActive("/settings")
                  ? "flex items-center p-3 rounded-lg hover:bg-blue-50 text-blue-600 font-medium"
                  : "flex items-center p-3 rounded-lg hover:bg-gray-100 text-gray-700"
              }`}
                >
                  <FaCog className="mr-3" />
                  Settings
                </Link>
              </li>
              <li>
                <Link
                  to="/help"
                  className={`
              ${
                isActive("/help")
                  ? "flex items-center p-3 rounded-lg hover:bg-blue-50 text-blue-600 font-medium"
                  : "flex items-center p-3 rounded-lg hover:bg-gray-100 text-gray-700"
              }`}
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
