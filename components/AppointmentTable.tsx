import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";

const appointments = [
  { patient: "Rajesh", doctor: "Manoj Kumar", checkup: "Dental", date: "12-10-2025", time: "12:10PM" },
  { patient: "Riya", doctor: "Daniel", checkup: "Ortho", date: "12-10-2025", time: "1:10PM" },
  { patient: "Siri", doctor: "Daniel", checkup: "Ortho", date: "12-10-2025", time: "1:30PM" },
  { patient: "Rajesh", doctor: "Manoj Kumar", checkup: "Dental", date: "12-10-2025", time: "12:10PM" },
  { patient: "Riya", doctor: "Daniel", checkup: "Ortho", date: "12-10-2025", time: "1:10PM" },
  { patient: "Siri", doctor: "Daniel", checkup: "Ortho", date: "12-10-2025", time: "1:30PM" },
];

const AppointmentTable = () => {
  const now = new Date();
  const formattedDate = new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(now);

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Appointments</h2>
        <h3 className="text-sm text-gray-600">{formattedDate}</h3>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Patient Name</TableHead>
            <TableHead>Doctor</TableHead>
            <TableHead>Check-Up</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appointments.map((appt, index) => (
            <TableRow key={index}>
              <TableCell>{appt.patient}</TableCell>
              <TableCell>{appt.doctor}</TableCell>
              <TableCell>{appt.checkup}</TableCell>
              <TableCell>{appt.date}</TableCell>
              <TableCell>{appt.time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppointmentTable;
