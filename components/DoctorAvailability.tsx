import React from 'react'

const doctors = [
    {doctor: "Manoj Kumar", checkup: "Dental", unit:'Army' },
    {  doctor: "Daniel", checkup: "Ortho",  unit:'Army' },
    { doctor: "Daniel", checkup: "Ortho",  unit:'Army' },
    {  doctor: "Manoj Kumar", checkup: "Dental",  unit:'Army' },
    {  doctor: "Patel", checkup: "Ortho",  unit:'Army' },
    {  doctor: "Pamwai", checkup: "Radiology",  unit:'Army' },

  ];
  

const DoctorAvailability = () => {
  return (
    <div>
        <h2 className="text-xl font-semibold mb-4">Doctor Availability</h2>
        <table className="w-full border-collapse border border-gray-300 rounded-md">
            <thead>
            <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left">Doctor</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Specialty</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Unit</th>
          </tr>
            </thead>
            <tbody>
            {doctors.map((appointment, index) => (
            <tr key={index} className="border border-gray-300">
              <td className="border border-gray-300 px-4 py-2">{appointment.doctor}</td>
              <td className="border border-gray-300 px-4 py-2">{appointment.checkup}</td>
              <td className="border border-gray-300 px-4 py-2">{appointment.unit}</td>
            </tr>
          ))}
            </tbody>
        </table>
    </div>
  )
}

export default DoctorAvailability