"use client";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  collection,
  addDoc,
  onSnapshot,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/configs/firebase.config";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

const AppointmentTable = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [newAppt, setNewAppt] = useState<Appointment>({
    patient: "",
    doctor: "",
    checkup: "",
    date: Timestamp.fromDate(new Date()), 
    time: "",
    status: "scheduled",
  });

  const formatTimestamp = (timestamp?: Timestamp) => {
    if (!timestamp || !(timestamp instanceof Timestamp)) return "N/A";
    const date = timestamp.toDate();
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);
  };

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

  const handleAddAppointment = async () => {
    if (
      !newAppt.patient ||
      !newAppt.doctor ||
      !newAppt.checkup ||
      !newAppt.date ||
      !newAppt.time ||
      !newAppt.status
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      await addDoc(collection(db, "appointments"), {
        ...newAppt,
        createdAt: Timestamp.now(),
      });
      setNewAppt({
        patient: "",
        doctor: "",
        checkup: "",
        date: Timestamp.fromDate(new Date()),
        time: "",
        status: "scheduled",
      });
    } catch (error) {
      console.error("Error adding appointment:", error);
      alert("Failed to add appointment");
    }
  };

  const now = new Date();
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
  }).format(now);

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
        <h2 className="text-xl font-semibold">Appointments</h2>
        <h3 className="text-sm text-gray-600">{formattedDate}</h3>
      </div>

      {/* Add Appointment Form */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-3">
        <Input
          placeholder="Patient Name"
          value={newAppt.patient}
          onChange={(e) => setNewAppt({ ...newAppt, patient: e.target.value })}
        />
        <Input
          placeholder="Doctor"
          value={newAppt.doctor}
          onChange={(e) => setNewAppt({ ...newAppt, doctor: e.target.value })}
        />
        <Input
          placeholder="Check-Up"
          value={newAppt.checkup}
          onChange={(e) => setNewAppt({ ...newAppt, checkup: e.target.value })}
        />
        <Input
          type="date"
          value={
            newAppt.date instanceof Timestamp
              ? newAppt.date.toDate().toISOString().split("T")[0]
              : ""
          }
          onChange={(e) => {
            const newDate = e.target.value
              ? new Date(e.target.value)
              : new Date();
            setNewAppt({ ...newAppt, date: Timestamp.fromDate(newDate) });
          }}
        />
        <Input
          type="time"
          value={newAppt.time}
          onChange={(e) => setNewAppt({ ...newAppt, time: e.target.value })}
        />
        <Select
          value={newAppt.status}
          onValueChange={(
            value: "scheduled" | "confirmed" | "cancelled"
          ) => setNewAppt({ ...newAppt, status: value })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="scheduled">Scheduled</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
        <Button className="w-full sm:col-span-2 lg:col-span-1" onClick={handleAddAppointment}>
          Add
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient Name</TableHead>
              <TableHead>Doctor</TableHead>
              <TableHead>Check-Up</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created At</TableHead>
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
                <TableCell className="capitalize">{appt.status}</TableCell>
                <TableCell>{formatTimestamp(appt.createdAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AppointmentTable;
