"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/configs/firebase.config";

interface DoctorData {
  firstName: string;
  middleName?: string;
  lastName: string;
  gender?: string;
  phoneNumber?: string;
  specialization?: string;
  status?: string;
}

const Doctor = () => {
  const router = useRouter();
  const itemsPerPage = 12;

  const [doctors, setDoctors] = useState<DoctorData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [user, setUser] = useState<{ role: string } | null>(null);

  // Fetch doctor data from Firestore
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "doctors"));
        const fetchedDoctors: DoctorData[] = [];
        querySnapshot.forEach((doc) => {
          fetchedDoctors.push(doc.data() as DoctorData);
        });
        setDoctors(fetchedDoctors);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const totalPages = Math.ceil(doctors.length / itemsPerPage);
  const paginatedData = doctors.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div>
      <h1 className="text-xl font-semibold mb-3">Doctors</h1>

      <div className="grid grid-cols-3 mb-5">
        <div className="border p-2 text-center active:bg-green-1 active:text-white cursor-pointer hover:text-white hover:bg-green-1">
          <h1>Doctor List</h1>
        </div>
        {user?.role === "admin" && (
          <div
            onClick={() => router.push("doctor-registration")}
            className="border p-2 text-center active:bg-green-1 active:text-white cursor-pointer hover:text-white hover:bg-green-1"
          >
            <h1>Register a Doctor</h1>
          </div>
        )}
        <div className="border p-2 text-center active:bg-green-1 active:text-white cursor-pointer hover:text-white hover:bg-green-1">
          <h1>Appointments</h1>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Specialization</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((doc, index) => (
            <TableRow key={index} className="capitalize">
              <TableCell>{`${doc.firstName} ${doc.middleName ?? ""} ${doc.lastName}`}</TableCell>
              <TableCell>{doc.specialization || "N/A"}</TableCell>
              <TableCell>{doc.phoneNumber || "N/A"}</TableCell>
              <TableCell>{doc.gender || "N/A"}</TableCell>
              <TableCell>{doc.status || "Active"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-between mt-5">
        <Button className="bg-green-1" onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </Button>
        <p>
          Page {currentPage} of {totalPages}
        </p>
        <Button className="bg-green-1" onClick={nextPage} disabled={currentPage === totalPages}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default Doctor;
