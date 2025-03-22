"use client"
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import AdherenceChart from "@/components/AdherenceChart";
import useAdherenceData from "@/stores/PrescriptionAherence";
import PatientMedicationsTable from "@/components/PatientMedicationTable";


const reminders = [
  { id: 1, patient: "John Doe", time: "8:00 AM", message: "Take Paracetamol" },
  { id: 2, patient: "Jane Smith", time: "12:00 PM", message: "Take Ibuprofen" },
];

const PrescriptionAdherence = () => {
  const { patients } = useAdherenceData();
  const patientEmail = patients.length > 0 ? patients[0].email : ""; 

  return (
    <div className="p-6 space-y-6">
      {/* Medication Tracker */}
      <div>
        <AdherenceChart/>
      </div>
      <div>
        <PatientMedicationsTable email={patientEmail}/>
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
              <TableHead>Schedule</TableHead>
              <TableHead>Adherence</TableHead>
              <TableHead>Action</TableHead>

            </TableRow>
          </TableHeader>
          <TableBody>
            {patients.map((patient) =>
              patient.adherenceList.map((med) => (
                <TableRow key={med.id}>
                  <TableCell>{patient.name}</TableCell>
                  <TableCell>{med.name}</TableCell>
                  <TableCell>{med.schedule?.join(", ") || "N/A"}</TableCell>
                  <TableCell>
                    {med.canCheck ? (
                      <span className="text-green-500">✅ Taken</span>
                    ) : (
                      <span className="text-red-500">❌ Missed</span>
                    )}
                  </TableCell>
                  <TableCell>
                      {med.canCheck ? (
                        <button className="px-3 py-1 bg-blue-500 text-white rounded">
                          Mark as Reviewed
                        </button>
                      ) : (
                        <button className="px-3 py-1 bg-red-500 text-white rounded">
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
    </div>
  );
};

export default PrescriptionAdherence;
