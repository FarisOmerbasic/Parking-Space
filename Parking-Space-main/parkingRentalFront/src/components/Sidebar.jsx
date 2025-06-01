import React, { useContext } from "react";
import { AuthContext } from "../services/AuthContext";
import { FaHome, FaMapMarkerAlt, FaClock, FaCar, FaUser, FaCog, FaDollarSign, FaUsersCog } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const { user, loading, isAdmin } = useContext(AuthContext); 

  const location = useLocation();

  console.log("Sidebar: user state (full object):", user);
  console.log("Sidebar: loading state:", loading);

  // Directly check user.role and the comparison
  const roleFromUser = user?.role; // Safely access role
  const isRoleAdmin = roleFromUser === "Admin";
  const calculatedIsAdmin = Boolean(user && isRoleAdmin);

  console.log("Sidebar: user?.role:", roleFromUser);
  console.log("Sidebar: user?.role === 'Admin':", isRoleAdmin);
  console.log("Sidebar: calculated isAdmin value:", calculatedIsAdmin); // This should be true/false

  console.log("Sidebar: isAdmin value from context:", isAdmin); // This should still be undefined

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(`${path}/`);

  if (loading) {
    return (
      <div className="w-56 bg-white h-screen fixed left-0 top-0 shadow-md p-4 flex flex-col items-center justify-center">
        <p>Loading sidebar...</p>
      </div>
    );
  }

  return (
    <div className="w-56 bg-white h-screen fixed left-0 top-0 shadow-md p-4 flex flex-col">
      <div className="mb-8 p-4">
        <h1 className="text-2xl font-bold text-blue-600">Parking Rental Space</h1>
      </div>

      {/* User Profile Section */}
      {user && (
        <Link
          to="/profile"
          className="mb-6 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition"
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
      )}

      <nav className="mb-8 flex-grow">
        <ul className="space-y-2">
          <NavItem to="/" icon={<FaHome />} label="Homepage" isActive={isActive("/")} />
          <NavItem to="/dashboard" icon={<FaHome />} label="Dashboard" isActive={isActive("/dashboard")} />
          <NavItem to="/my-bookings" icon={<FaClock />} label="My Bookings" isActive={isActive("/my-bookings")} />
          <NavItem to="/map" icon={<FaMapMarkerAlt />} label="Map View" isActive={isActive("/map")} />
          <NavItem to="/my-spaces" icon={<FaCar />} label="My Spaces" isActive={isActive("/my-spaces")} />
          <NavItem to="/list-space" icon={<FaCar />} label="List Space" isActive={isActive("/list-space")} />
          <NavItem to="/all-spaces" icon={<FaCar />} label="All Spaces" isActive={isActive("/all-spaces")} />

          {/* Admin specific links - Use the calculated isAdmin for now */}
          {calculatedIsAdmin && ( // <--- CHANGE THIS LINE TO USE calculatedIsAdmin
            <>
              <div className="border-t border-gray-200 my-4"></div>
              <p className="text-xs text-gray-400 uppercase font-bold px-3 pt-2">Admin Panel</p>
              <NavItem to="/admin/users" icon={<FaUsersCog />} label="Manage Users" isActive={isActive("/admin/users")} />
              <NavItem to="/admin/payments" icon={<FaDollarSign />} label="Manage Payments" isActive={isActive("/admin/payments")} />
            </>
          )}
        </ul>
      </nav>

      <div className="border-t border-gray-200 pt-4">
        <ul className="space-y-2">
          {user ? (
            <>
              <NavItem to="/profile" icon={<FaUser />} label="Account" isActive={isActive("/profile")} />
              <NavItem to="/settings" icon={<FaCog />} label="Settings" isActive={isActive("/settings")} />
            </>
          ) : (
            <>
              <NavItem to="/login" icon={<FaUser />} label="Login" isActive={isActive("/login")} />
              <NavItem to="/register" icon={<FaUser />} label="Register" isActive={isActive("/register")} />
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

const NavItem = ({ to, icon, label, isActive }) => (
  <li>
    <Link
      to={to}
      className={`${isActive ? "text-blue-600 font-medium bg-blue-50" : "text-gray-700"} flex items-center p-3 rounded-lg hover:bg-blue-50 transition`}
    >
      <span className="mr-3">{icon}</span>
      {label}
    </Link>
  </li>
);

export default Sidebar;