import React from "react";

const appointments = [
  { patient: "Rajesh", doctor: "Manoj Kumar", checkup: "Dental", date: "12-10-2025", time: "12:10PM"},
  { patient: "Riya", doctor: "Daniel", checkup: "Ortho", date: "12-10-2025", time: "1:10PM"},
  { patient: "Siri", doctor: "Daniel", checkup: "Ortho", date: "12-10-2025", time: "1:30PM"},
  { patient: "Rajesh", doctor: "Manoj Kumar", checkup: "Dental", date: "12-10-2025", time: "12:10PM"},
  { patient: "Riya", doctor: "Daniel", checkup: "Ortho", date: "12-10-2025", time: "1:10PM"},
  { patient: "Siri", doctor: "Daniel", checkup: "Ortho", date: "12-10-2025", time: "1:30PM"},
];


const AppointmentTable = () => {
  const now = new Date();
  const date = (new Intl.DateTimeFormat('en-Us',{dateStyle: 'medium'})).format(now)
  return (
    <div className="">
      <div className="flex justify-between">
      <h2 className="text-xl font-semibold mb-4">Appointments</h2>
      <h3>{date}</h3>
      </div>
      <table className="w-full border-collapse border border-gray-300 rounded-md">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left">Patient Name</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Doctor</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Check-Up</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Time</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment, index) => (
            <tr key={index} className="border border-gray-300">
              <td className="border border-gray-300 px-4 py-2">{appointment.patient}</td>
              <td className="border border-gray-300 px-4 py-2">{appointment.doctor}</td>
              <td className="border border-gray-300 px-4 py-2">{appointment.checkup}</td>
              <td className="border border-gray-300 px-4 py-2">{appointment.date}</td>
              <td className="border border-gray-300 px-4 py-2">{appointment.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentTable;
