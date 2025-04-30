"use client"
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
  middleName:string;
  nationalId: string;
  phoneNumber: string;
  email: string;
  gender:string;
  dateOfBirth:string;
  bloodGroup:string;
  insuranceProvider:string;
  insurancePolicyNumber:string;
}

const PatientList = () => {
  // Explicitly define the state type as an array of Patient
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
    <div>
      <h1 className="text-green-600">Patient List</h1>
      <div>
        <Table>
          <TableCaption>A list of registered patients.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>ID Number</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>ID Number</TableHead>
              <TableHead>Date Of Birth</TableHead>
              <TableHead>Blood Group</TableHead>
              <TableHead>Insurance Provider</TableHead>
              <TableHead>Policy Number</TableHead>
              <TableHead>Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patients.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell className="font-medium capitalize">{patient.firstName}</TableCell>
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
