import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const doctors = [
  { doctor: "Manoj Kumar", checkup: "Dental", status: "Active" },
  { doctor: "Daniel", checkup: "Ortho", status: "Active" },
  { doctor: "Daniel", checkup: "Ortho", status: "Active" },
  { doctor: "Manoj Kumar", checkup: "Dental", status: "Active" },
  { doctor: "Patel", checkup: "Ortho", status: "Active" },
  { doctor: "Pamwai", checkup: "Radiology", status: "Active" },
];

const DoctorAvailability = () => {
  return (
    <div className="w-full overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4 font-poppins text-green-600">
        Doctor Availability
      </h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Doctor</TableHead>
            <TableHead>Specialty</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {doctors.map((doctor, index) => (
            <TableRow key={index}>
              <TableCell>{doctor.doctor}</TableCell>
              <TableCell>{doctor.checkup}</TableCell>
              <TableCell>{doctor.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DoctorAvailability;
