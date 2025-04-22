import { Routes, Route, Link } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Dashboard from "./pages/Dashboard";
import UserProfile from "./pages/UserProfile";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";
import ListSpace from "./pages/ListSpace";
import Settings from "./pages/Settigs";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/user" element={<UserProfile />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/myBookings" element={<MyBookings />} />
        <Route path="/listSpace" element={<ListSpace />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  );
}
