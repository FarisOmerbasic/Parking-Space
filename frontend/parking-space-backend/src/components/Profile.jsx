import React from 'react';

const Profile = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Profile</h1>

      {/* Profile Picture + Name */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
        <img
          src="https://via.placeholder.com/300x300.png?text=Profile+Photo"
          alt="Profile"
          className="rounded-xl w-64 h-64 object-cover"
        />
        <div className="text-center sm:text-left">
          <h2 className="text-xl font-medium">Alex Morgan</h2>
        </div>
      </div>

      {/* Account Details */}
      <div className="space-y-6">
        <div>
          <h3 className="font-medium mb-2">Account details</h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Alex Morgan"
              className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50"
            />
            <input
              type="email"
              placeholder="alex.morgan@email.com"
              className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50"
            />
            <input
              type="tel"
              placeholder="+1 555 123 4567"
              className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50"
            />
          </div>
        </div>

        {/* Change Password */}
        <div>
          <h3 className="font-medium mb-2">Change password</h3>
          <div className="space-y-4">
            <input
              type="password"
              placeholder="Enter current password"
              className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50"
            />
            <input
              type="password"
              placeholder="Enter new password"
              className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50"
            />
            <input
              type="password"
              placeholder="Re-enter new password"
              className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50"
            />
          </div>
        </div>

        <button className="bg-violet-600 hover:bg-violet-700 text-white px-5 py-3 rounded-lg mt-4">
          Save changes
        </button>
      </div>
    </div>
  );
};

export default Profile;
