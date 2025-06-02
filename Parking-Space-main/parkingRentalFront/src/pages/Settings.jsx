// src/pages/Settings.jsx
import React from 'react';

const Settings = () => {
  return (
    <div className="p-8 ml-64"> {/* Adjust margin-left if Sidebar width changes */}
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">User Preferences</h2>
        <p className="text-gray-700">
          This is where you can manage your account settings, notifications, and other preferences.
        </p>
        <ul className="mt-4 space-y-2 text-gray-600">
          <li>• Update profile information</li>
          <li>• Change password</li>
          <li>• Manage notification settings</li>
          <li>• Privacy controls</li>
        </ul>
        <p className="mt-4 text-sm text-gray-500">
          (Content for settings will be implemented here)
        </p>
      </div>
    </div>
  );
};

export default Settings;