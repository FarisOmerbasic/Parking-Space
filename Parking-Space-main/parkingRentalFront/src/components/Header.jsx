import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../services/AuthContext";
import axios from "axios";

const Header = () => {
  const { user, isAdmin, logout } = useAuth();
  const [balance, setBalance] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      axios
        .get("http://localhost:5164/api/bookings/balance", { withCredentials: true })
        .then((res) => setBalance(res.data.balance))
        .catch(() => setBalance(null));
    } else {
      setBalance(null);
    }
  }, [user]);

  return (
    <header className="w-full bg-white shadow flex items-center justify-between px-8 py-3 fixed top-0 left-0 z-50">
      <Link to="/" className="flex items-center">
        <span className="text-3xl font-bold text-green-500 bg-white px-3 py-1 rounded">ParkingRental</span>
      </Link>
      <nav className="flex items-center gap-8">
        <Link to="/" className="hover:text-green-500 font-medium">Home</Link>
        <Link to="/map" className="hover:text-green-500 font-medium">Map</Link>
        <Link to="/all-spaces" className="hover:text-green-500 font-medium">All Spaces</Link>
        {user && (
          <>
            <Link to="/dashboard" className="hover:text-green-500 font-medium">Dashboard</Link>
            <Link to="/my-bookings" className="hover:text-green-500 font-medium">My Bookings</Link>
            <Link to="/settings" className="hover:text-green-500 font-medium">Settings</Link>
            <Link to="/profile" className="hover:text-green-500 font-medium">Profile</Link>
            {isAdmin && (
              <Link to="/admin" className="hover:text-green-500 font-medium">Admin</Link>
            )}
          </>
        )}
        {!user && (
          <>
            <Link to="/login" className="hover:text-green-500 font-medium">Login</Link>
            <Link to="/register" className="hover:text-green-500 font-medium">Register</Link>
          </>
        )}
      </nav>
      <div className="flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-3">
            <span className="font-semibold text-blue-700">
              {user.name || user.email}
            </span>
            {balance !== null && (
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                Wallet: {balance} KM
              </span>
            )}
            <Link
              to="/profile"
              className="ml-2 bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300 transition text-sm"
            >
              Edit Profile
            </Link>
            <button
              onClick={() => { logout(); navigate("/"); }}
              className="ml-2 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        ) : null}
        <button className="ml-2 w-8 h-8 rounded-full border flex items-center justify-center">
          <span role="img" aria-label="flag">BiH</span>
        </button>
      </div>
    </header>
  );
};

export default Header;