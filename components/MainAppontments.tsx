"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { collection, onSnapshot, Timestamp } from "firebase/firestore";
import { db } from "@/configs/firebase.config";

type Appointment = {
  id?: string;
  patient: string;
  doctor: string;
  checkup: string;
  date: Timestamp;
  time: string;
  status: "scheduled" | "confirmed" | "cancelled";
  createdAt?: Timestamp;
};

const MainAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  // Convert Firebase Timestamp to readable date
  const formatTimestamp = (timestamp?: Timestamp) => {
    if (!timestamp || !(timestamp instanceof Timestamp)) return "N/A";
    const date = timestamp.toDate();
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);
  };

  // Fetch appointments in real-time
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "appointments"),
      (snapshot) => {
        const appts = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            patient: data.patient || "",
            doctor: data.doctor || "",
            checkup: data.checkup || "",
            date:
              data.date instanceof Timestamp
                ? data.date
                : Timestamp.fromDate(new Date(data.date || Date.now())),
            time: data.time || "",
            status: data.status || "scheduled",
            createdAt:
              data.createdAt instanceof Timestamp
                ? data.createdAt
                : undefined,
          } as Appointment;
        });
        setAppointments(appts);
      },
      (error) => {
        console.error("Error fetching appointments:", error);
      }
    );

    return () => unsub();
  }, []);

  return (
    <div className="w-full overflow-x-auto">
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
          {appointments.map((appt) => (
            <TableRow key={appt.id}>
              <TableCell className="capitalize">{appt.patient}</TableCell>
              <TableCell className="capitalize">{appt.doctor}</TableCell>
              <TableCell className="capitalize">{appt.checkup}</TableCell>
              <TableCell>{formatTimestamp(appt.date)}</TableCell>
              <TableCell>{appt.time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MainAppointments;
