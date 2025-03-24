"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import AdherenceChart from "@/components/AdherenceChart";
import useAdherenceData from "@/stores/PrescriptionAherence";
// import PatientMedicationsTable from "@/components/PatientMedicationTable";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/stores/UseStore";

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
  }[];
}

const PrescriptionAdherence = () => {
  const { patients } = useAdherenceData();
  // const patientEmail = patients.length > 0 ? patients[0].email : "";
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
    <div className="p-6 space-y-6">
      {/* Medication Tracker */}
      <div>
      <AdherenceChart adherenceSummary={adherenceSummary} />
      </div>
      <div>
        {/* <PatientMedicationsTable email={patientEmail} /> */}
      </div>

      {/* Missed Medications */}
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">Patient Medication Adherence</h1>

        {patients.length === 0 ? (
          <p>Loading adherence data...</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient Name</TableHead>
                <TableHead>Medication</TableHead>
                <TableHead>Adherence</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patients.map((patient) =>
                patient.adherenceList.map((med) => (
                  <TableRow key={med.id}>
                    <TableCell className="capitalize">{selectedUser?.name}</TableCell>
                    <TableCell>{med.name}</TableCell>
                    <TableCell>
                      {med.isTaken ? (
                        <span className="text-green-500">✅ Taken</span>
                      ) : (
                        <span className="text-red-500">❌ Missed</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {med.isTaken ? (
                        <button className="px-3 py-1 bg-blue-500 text-white rounded">
                          Mark as Reviewed
                        </button>
                      ) : (
                        <button
                          className="px-3 py-1 bg-red-500 text-white rounded"
                          onClick={() => handleCallPatient(patient)}
                        >
                          Call Patient
                        </button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Reminders */}
      <Card>
        <CardHeader>
          <CardTitle>Reminders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Message</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reminders.map((reminder) => (
                <TableRow key={reminder.id}>
                  <TableCell>{reminder.patient}</TableCell>
                  <TableCell>{reminder.time}</TableCell>
                  <TableCell>{reminder.message}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Call Patient</DialogTitle>
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