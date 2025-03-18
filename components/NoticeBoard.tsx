import React from 'react';
import { Bell, Stethoscope, AlertCircle } from 'lucide-react'; // Icons for better UI

const notices = [
  {
    title: "Ward Rounds",
    description: "Morning ward rounds start at 7:00 AM. All doctors and nurses must attend.",
    icon: <Stethoscope className="text-blue-500" size={30} />
  },
  {
    title: "Lab Results Update",
    description: "Lab results will be updated on patient records by 10:00 AM daily.",
    icon: <Bell className="text-green-500" size={30} />
  },
  {
    title: "Emergency Drill",
    description: "An emergency preparedness drill will be conducted at 2:00 PM today.",
    icon: <AlertCircle className="text-red-500" size={30} />
  },
  {
    title: "Pharmacy Stock Update",
    description: "New stock will arrive at the pharmacy by 4:00 PM. Restocking in progress.",
    icon: <Stethoscope className="text-orange-500" size={30} />
  },
];

const NoticeBoard = () => {
  return (
    <div className='border'>
    <div className="font-poppins bg-white w-full">
      <h1 className="text-center bg-gray-100 text-lg font-semibold py-3">Hospital Notice Board</h1>
      <div className="px-5 py-3 flex flex-col gap-4 w-full">
        {notices.map((notice, index) => (
          <div key={index} className="flex items-center gap-4 bg-gray-50 p-3 rounded-lg shadow-sm">
            <div className="p-2">{notice.icon}</div>
            <div>
              <h2 className="font-medium">{notice.title}</h2>
              <p className="text-sm text-gray-500">{notice.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default NoticeBoard;
