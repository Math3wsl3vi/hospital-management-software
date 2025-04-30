"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import AdherenceChart from "@/components/AdherenceChart";
import useAdherenceData from "@/stores/PrescriptionAherence";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/stores/UseStore";
import { format } from "date-fns";

const reminders = [
  { id: 1, patient: "John Doe", time: "8:00 AM", message: "Take Paracetamol" },
  { id: 2, patient: "Jane Smith", time: "12:00 PM", message: "Take Ibuprofen" },
];

interface Patient {
  name: string;
  email: string;
  adherenceList: {
    id: string;
    name: string;
    isTaken: boolean;
    scheduledTime?: string[];
  }[];
}

const PrescriptionAdherence = () => {
  const { patients } = useAdherenceData();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const { selectedUser, setSelectedUser } = useUserStore();
  console.log(setSelectedUser)

  const handleCallPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setModalOpen(true);
  
    if (selectedUser?.phone) {
      window.location.href = `tel:${selectedUser.phone}`;
    } else {
      alert("Phone number not available.");
    }
  };

  const adherenceSummary = patients.reduce(
    (acc, patient) => {
      patient.adherenceList.forEach((med) => {
        if (med.isTaken) {
          acc.taken += 1;
        } else {
          acc.missed += 1;
        }
      });
      return acc;
    },
    { taken: 0, missed: 0 }
  );

  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6">
      {/* Medication Tracker */}
      <div className="overflow-x-auto">
        <AdherenceChart adherenceSummary={adherenceSummary} />
      </div>

      {/* Missed Medications */}
      <div className="p-2 md:p-4">
        <h1 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Patient Medication Adherence</h1>

        {patients.length === 0 ? (
          <p>Loading adherence data...</p>
        ) : (
          <div className="overflow-x-auto">
            <Table className="min-w-full">
              <TableHeader>
                <TableRow>
                  <TableHead className="whitespace-nowrap">Patient Name</TableHead>
                  <TableHead className="whitespace-nowrap">Medication</TableHead>
                  <TableHead className="whitespace-nowrap">Adherence</TableHead>
                  <TableHead className="whitespace-nowrap">Schedule</TableHead>
                  <TableHead className="whitespace-nowrap">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {patients.map((patient) =>
                  patient.adherenceList.map((med) => (
                    <TableRow key={med.id}>
                      <TableCell className="capitalize whitespace-nowrap">{selectedUser?.name}</TableCell>
                      <TableCell className="whitespace-nowrap">{med.name}</TableCell>
                      <TableCell className="whitespace-nowrap">
                        {med.isTaken ? (
                          <span className="text-green-500">✅ Taken</span>
                        ) : (
                          <span className="text-red-500">❌ Missed</span>
                        )}
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        {Array.isArray(med.scheduledTime)
                          ? med.scheduledTime
                              .map((time) => format(new Date(time), "h:mm a"))
                              .join(", ")
                          : med.scheduledTime
                            ? format(new Date(med.scheduledTime), "h:mm a")
                            : "N/A"}
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        {med.isTaken ? (
                          <button className="px-2 py-1 text-xs md:px-3 md:py-1 md:text-sm bg-green-1 text-white rounded">
                            Taken
                          </button>
                        ) : (
                          <button
                            className="px-2 py-1 text-xs md:px-3 md:py-1 md:text-sm bg-red-500 text-white rounded"
                            onClick={() => handleCallPatient(patient)}
                          >
                            Call
                          </button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* Reminders */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">Reminders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table className="min-w-full">
              <TableHeader>
                <TableRow>
                  <TableHead className="whitespace-nowrap">Patient</TableHead>
                  <TableHead className="whitespace-nowrap">Time</TableHead>
                  <TableHead className="whitespace-nowrap">Message</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reminders.map((reminder) => (
                  <TableRow key={reminder.id}>
                    <TableCell className="whitespace-nowrap">{reminder.patient}</TableCell>
                    <TableCell className="whitespace-nowrap">{reminder.time}</TableCell>
                    <TableCell className="whitespace-nowrap">{reminder.message}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg md:text-xl">Call Patient</DialogTitle>
            <DialogDescription>
              {selectedPatient ? `Calling phone number ${selectedUser?.phone}...` : ""}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setModalOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PrescriptionAdherence;