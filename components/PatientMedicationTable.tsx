import React from "react";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import usePatientMedications from "@/stores/PatientMedication";

const PatientMedicationsTable = ({ email }: { email: string }) => {
  const { medicationsByVisit, loading, error } = usePatientMedications(email);

  if (loading) return <p>Loading medications...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h2 className="text-xl font-bold">Patient Medications</h2>
  
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Visit ID</TableHead>
              <TableHead>Medication</TableHead>
              <TableHead>Dosage</TableHead>
              <TableHead>Frequency</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Quantity</TableHead>
            </TableRow>
          </TableHeader>
          {medicationsByVisit.length === 0 ? (
        <p>No medications found.</p>
      ) : (
          <TableBody>
            {medicationsByVisit.map(({ visitId, medications }) =>
              medications.map((med) => (
                <TableRow key={med.id}>
                  <TableCell>{visitId}</TableCell>
                  <TableCell>{med.name}</TableCell>
                  <TableCell>{med.dosage}</TableCell>
                  <TableCell>{med.frequency}</TableCell>
                  <TableCell>{med.duration}</TableCell>
                  <TableCell>{med.quantity}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
          )}
        </Table>
      
    </div>
  );
};

export default PatientMedicationsTable;
