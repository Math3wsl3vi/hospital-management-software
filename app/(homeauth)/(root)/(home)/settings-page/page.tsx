"use client";

import React, { useState } from "react";

const SettingsPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
        Settings
      </h1>

      {/* Profile Settings */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
          Profile Settings
        </h2>
        <input
          type="text"
          placeholder="Your Name"
          className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
        />
      </div>

      {/* Notifications */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
          Notifications
        </h2>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
            className="w-5 h-5"
          />
          <span className="text-gray-600 dark:text-gray-300">Enable Notifications</span>
        </label>
      </div>

      {/* Theme Selection */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
          Appearance
        </h2>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            className="w-5 h-5"
          />
          <span className="text-gray-600 dark:text-gray-300">
            {darkMode ? "Dark Mode" : "Light Mode"}
          </span>
        </label>
      </div>

      {/* Save Button */}
      <button className="w-full bg-green-1 text-white py-2 rounded-lg hover:bg-green-700 transition">
        Save Changes
      </button>
    </div>
  );
};

export default SettingsPage;
