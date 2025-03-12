"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Bed = {
  id: string;
  ward: string;
  status: "Occupied" | "Available";
  patient?: string;
};

const initialBeds: Bed[] = [
  { id: "B001", ward: "General Ward", status: "Occupied", patient: "John Doe" },
  { id: "B002", ward: "General Ward", status: "Available" },
  { id: "B003", ward: "ICU", status: "Occupied", patient: "Jane Smith" },
  { id: "B004", ward: "ICU", status: "Available" },
  { id: "B005", ward: "Pediatrics", status: "Occupied", patient: "Baby Alex" },
];

const WardBedManagement = () => {
  const [beds] = useState<Bed[]>(initialBeds);

  return (
    <div className="w-full mx-auto p-6 dark:bg-gray-900 rounded-lg ">
      <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
        Ward Bed Management
      </h1>

      <Table>
        <TableCaption>Current bed availability and patient allocation.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Bed Number</TableHead>
            <TableHead>Ward Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Patient Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {beds.map((bed) => (
            <TableRow key={bed.id}>
              <TableCell className="font-medium">{bed.id}</TableCell>
              <TableCell>{bed.ward}</TableCell>
              <TableCell className={bed.status === "Occupied" ? "text-red-500" : "text-green-500"}>
                {bed.status}
              </TableCell>
              <TableCell>{bed.patient || "N/A"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default WardBedManagement;
