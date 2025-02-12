"use client";
import { useUserStore } from "@/stores/UseStore";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDocNotesStore } from "@/stores/MedicationStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const PatientInvoice = () => {
  const selectedUser = useUserStore((state) => state.selectedUser);
  const { docNotes } = useDocNotesStore();

  // Parse medication data
  const medications = docNotes.medication?.split(",").map((med) => {
    const [name, dosage, frequency, duration] = med.split("-");
    return { name, dosage, frequency, duration };
  });

  // State for amount for each medication
  const [medicationAmounts, setMedicationAmounts] = useState(
    medications?.map(() => ({ amount: 0 })) || []
  );

  // Consultation fee (fixed)
  const consultationFee = 250;

  // Calculate total
  const total =
    medicationAmounts.reduce((sum, med) => sum + (med.amount || 0), 0) +
    consultationFee;

  // Handle input changes for amount
  const handleAmountChange = (index: number, value: string) => {
    const updatedAmounts = [...medicationAmounts];
    updatedAmounts[index].amount = parseFloat(value) || 0;
    setMedicationAmounts(updatedAmounts);
  };

  return (
    <div className="flex flex-col gap-10">
      {/* Header */}
      <div className="flex flex-row justify-between items-center">
        <div>
          <h1 className="text-3xl">HMS</h1>
        </div>
        <div>
          <h1 className="text-4xl font-semibold">INVOICE</h1>
        </div>
      </div>
      <div className="flex flex-row justify-between items-center">
        <div>
          <p>P.O BOX 550 Lanet</p>
          <p>Nakuru, kenya</p>
          <p>
            {" "}
            <span className="font-semibold">Phone:</span> 0722 123 555
          </p>
          <p>
            {" "}
            <span className="font-semibold">Fax:</span> 432 5563 4902
          </p>
        </div>
        <div>
          <p>Invoice No: 001</p>
          <p>
            <span className="font-semibold">Date:</span> Feb, 1 2025
          </p>
        </div>
      </div>
      {/* Patient Details */}
      <div>
        <h1 className="text-green-1 text-lg mb-4">PATIENT DETAILS</h1>
        <div className="flex flex-row justify-between items-center">
          <div className="text-xl">
            <p>
              <span className="font-semibold">Name:</span> {selectedUser?.name}{" "}
            </p>
            <p>
              <span className="font-semibold">Age:</span> 23
            </p>
            <p>
              <span className="font-semibold">Rank:</span> {selectedUser?.rank}
            </p>
            <p>
              <span className="font-semibold">Unit:</span> {selectedUser?.unit}
            </p>
          </div>
          <div className="text-lg">
            <p>
              <span className="font-semibold">Patient Id:</span>{" "}
              {selectedUser?.id}
            </p>
            <p>
              <span className="font-semibold">Insurance Provider:</span>{" "}
              {selectedUser?.rank}
            </p>
            <p>
              <span className="font-semibold">insurance Number:</span>{" "}
              {selectedUser?.id}
            </p>
          </div>
        </div>
      </div>
      {/* Invoice Table */}
      <div>
        <h1 className="text-green-1 text-xl mb-4">PATIENT DETAILS</h1>
        <div>
          <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">#</TableHead>
                <TableHead>Service</TableHead>
                <TableHead className="text-right">Amount (Ksh)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">INV001</TableCell>
                <TableCell>Consultation Fee</TableCell>
                <TableCell className="text-right">{consultationFee.toFixed(2)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
      {/* Medication Table */}
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Medication</TableHead>
              <TableHead>Dosage</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Subtotal</TableHead>
              <TableHead>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {medications?.map((med, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{med.name}</TableCell>
                <TableCell>{med.dosage}</TableCell>
                <TableCell className="w-[200px]">
                  <Input
                    placeholder="Quantity"
                  />
                </TableCell>
                <TableCell className="w-[200px]">
                  <Input
                    placeholder="Subtotal"
                    value={medicationAmounts[index]?.amount || ""}
                    onChange={(e) => handleAmountChange(index, e.target.value)}
                  />
                </TableCell>
                <TableCell className="w-[200px]">
                  {medicationAmounts[index]?.amount.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {/* Totals */}
      <div className="flex items-end justify-end">
        <div className="w-1/3 flex flex-col gap-2">
          <Table>
            <TableRow>
              <TableCell>Total (Ksh)</TableCell>
              <TableCell>{total.toFixed(2)}</TableCell>
            </TableRow>
          </Table>
          <div className="flex justify-between items-center w-full gap-5 mt-10">
            <Button className="bg-green-1 w-1/2">Add medication to our App</Button>
            <Button className="bg-green-1 w-1/2">Proceed to Payment</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientInvoice;