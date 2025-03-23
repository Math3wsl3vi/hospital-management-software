import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import usePatientsWithMedications from "@/stores/PatientMedication";

interface Medication {
  id: string;
  name: string;
  dosage: string;
  amount: number;
  frequency: string;
  duration: string;
  quantity: string;
}

interface MedicationsByVisit {
  visitId: string;
  medications: Medication[];
}

const PatientMedicationsTable = ({ email }: { email: string }) => {
  const { patientsWithMedications, loading, error } = usePatientsWithMedications();

  if (loading) return <p>Loading medications...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const patient = patientsWithMedications.find((p) => p.email === email);
  const medicationsExist = patient && patient.medicationsByVisit.length > 0;

  return (
    <div>
      <h2 className="text-xl font-bold">Patient Medications</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>Visit ID</TableHead>
            <TableHead>Medication</TableHead>
            <TableHead>Dosage</TableHead>
            <TableHead>Frequency</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Quantity</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {medicationsExist ? (
            patient.medicationsByVisit.map(({ visitId, medications }: MedicationsByVisit) =>
              medications.map((med: Medication) => (
                <TableRow key={med.id}>
                  <TableCell>{email}</TableCell>
                  <TableCell>{visitId}</TableCell>
                  <TableCell>{med.name}</TableCell>
                  <TableCell>{med.dosage}</TableCell>
                  <TableCell>{med.frequency}</TableCell>
                  <TableCell>{med.duration}</TableCell>
                  <TableCell>{med.quantity}</TableCell>
                </TableRow>
              ))
            )
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                No medication data found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default PatientMedicationsTable;
