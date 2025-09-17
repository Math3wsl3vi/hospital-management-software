"use client";
import React, { useState } from "react";
import { Send, Mic, Video, Bell } from "lucide-react";

const Multidisciplinary = () => {
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [comment, setComment] = useState("");

  const roles = [
    "Physician",
    "Surgeon",
    "Pharmacist",
    "Nutritionist",
    "Psychologist",
  ];

  const handleRoleToggle = (role: string) => {
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  };

  return (
    <div className="p-8 space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Multidisciplinary Input</h1>
        <button className="relative">
          <Bell className="w-6 h-6 text-gray-700" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
            3
          </span>
        </button>
      </div>

      {/* Role Tagging */}
      <div className="bg-white shadow-md rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Invite Specialists</h2>
        <div className="flex flex-wrap gap-3">
          {roles.map((role) => (
            <button
              key={role}
              onClick={() => handleRoleToggle(role)}
              className={`px-4 py-2 rounded-full border ${
                selectedRoles.includes(role)
                  ? "bg-green-100 text-green-700 border-green-500"
                  : "bg-gray-100 text-gray-700 border-gray-300"
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      {/* Case Discussion Threads */}
      <div className="bg-white shadow-md rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Case Discussion</h2>

        {/* Example Thread */}
        <div className="space-y-4">
          <div className="border rounded-lg p-4">
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                Surgeon
              </span>
              <p className="font-semibold">Dr. Kimani</p>
              <span className="text-xs text-gray-500">2h ago</span>
            </div>
            <p className="mt-2 text-gray-800">
              I recommend a CT scan before surgery.
            </p>
          </div>

          <div className="border rounded-lg p-4">
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                Pharmacist
              </span>
              <p className="font-semibold">Dr. Patel</p>
              <span className="text-xs text-gray-500">1h ago</span>
            </div>
            <p className="mt-2 text-gray-800">
              Be careful with drug interactions, recommend switching meds.
            </p>
          </div>
        </div>

        {/* Add Reply */}
        <div className="mt-6 flex items-center gap-3">
          <textarea
            className="flex-1 border rounded-lg p-3"
            placeholder="Write your reply..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button className="p-3 bg-green-600 text-white rounded-lg">
            <Send className="w-5 h-5" />
          </button>
          <button className="p-3 border rounded-lg">
            <Mic className="w-5 h-5" />
          </button>
          <button className="p-3 border rounded-lg">
            <Video className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Multidisciplinary;
