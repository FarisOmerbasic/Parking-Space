import { Link, useLocation } from "react-router-dom";

function ProfileHeader() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex space-x-4 ml-16 mr-16 border-b border-gray-200 mb-0">
      <Link
        to="/profile"
        className={`${
          isActive("/profile")
            ? "px-4 py-2 text-blue-600 font-medium border-b-2 border-blue-600"
            : "px-4 py-2 text-gray-600 hover:text-blue-600"
        }`}
      >
        My Profile
      </Link>
      <Link
        to="/list-space"
        className={`${
          isActive("/list-space")
            ? "px-4 py-2 text-blue-600 font-medium border-b-2 border-blue-600"
            : "px-4 py-2 text-gray-600 hover:text-blue-600"
        }`}
      >
        Add Parking Space
      </Link>
      <Link
        to="/my-spaces"
        className={`${
          isActive("/my-spaces")
            ? "px-4 py-2 text-blue-600 font-medium border-b-2 border-blue-600"
            : "px-4 py-2 text-gray-600 hover:text-blue-600"
        }`}
      >
        List My Spaces
      </Link>
      <Link
        to="/dashboard"
        className={`${
          isActive("/dashboard")
            ? "px-4 py-2 text-blue-600 font-medium border-b-2 border-blue-600"
            : "px-4 py-2 text-gray-600 hover:text-blue-600"
        }`}
      >
        Dashboard
      </Link>
    </div>
  );
}

export default ProfileHeader;