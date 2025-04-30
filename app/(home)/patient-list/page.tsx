"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/configs/firebase.config";

// Define the type for a patient
interface Patient {
  id: string;
  firstName: string;
  middleName: string;
  nationalId: string;
  phoneNumber: string;
  email: string;
  gender: string;
  dateOfBirth: string;
  bloodGroup: string;
  insuranceProvider: string;
  insurancePolicyNumber: string;
}

const PatientList = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "patients"));
        const patientData: Patient[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Patient, "id">),
        }));
        setPatients(patientData);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold text-green-600 mb-4">Patient List</h1>
      <div className="overflow-x-auto rounded-md border">
        <Table>
          <TableCaption className="text-sm">A list of registered patients.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[120px]">First Name</TableHead>
              <TableHead className="min-w-[120px]">Middle Name</TableHead>
              <TableHead className="min-w-[150px]">ID Number</TableHead>
              <TableHead className="min-w-[100px]">Gender</TableHead>
              <TableHead className="min-w-[150px]">Phone Number</TableHead>
              <TableHead className="min-w-[150px]">Date Of Birth</TableHead>
              <TableHead className="min-w-[120px]">Blood Group</TableHead>
              <TableHead className="min-w-[180px]">Insurance Provider</TableHead>
              <TableHead className="min-w-[180px]">Policy Number</TableHead>
              <TableHead className="min-w-[200px]">Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patients.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell className="capitalize">{patient.firstName}</TableCell>
                <TableCell className="capitalize">{patient.middleName}</TableCell>
                <TableCell>{patient.nationalId}</TableCell>
                <TableCell className="capitalize">{patient.gender}</TableCell>
                <TableCell>{patient.phoneNumber}</TableCell>
                <TableCell>{patient.dateOfBirth}</TableCell>
                <TableCell>{patient.bloodGroup}</TableCell>
                <TableCell>{patient.insuranceProvider}</TableCell>
                <TableCell>{patient.insurancePolicyNumber}</TableCell>
                <TableCell>{patient.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={10}>Total Patients: {patients.length}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
};

export default PatientList;
