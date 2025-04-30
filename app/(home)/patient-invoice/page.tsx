"use client";
import { useUserStore } from "@/stores/UseStore";
import React, { useRef, useState } from "react";
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

import { addDoc, collection, doc, setDoc } from "firebase/firestore"; 
import { db } from "@/configs/firebase.config";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Image from "next/image";


const PatientInvoice = () => {
  const selectedUser = useUserStore((state) => state.selectedUser);
  const { docNotes } = useDocNotesStore();
  const { toast } = useToast()
  const invoiceRef = useRef(null)

  // Parse medication data
  const medications = docNotes.medication?.split(",").map((med) => {
    const [name, dosage, frequency, duration] = med.split("-");
    return { name, dosage, frequency, duration };
  });

  // State for amount per medication
  const [medicationAmounts, setMedicationAmounts] = useState(
    medications?.map(() => ({ amount: 0 })) || []
  );
  const [medicationQuantities, setMedicationQuantities] = useState(
    medications?.map(() => ({ quantity: "" })) || []
  );

  const consultationFee = 250;

  const total =
    medicationAmounts.reduce((sum, med) => sum + (med.amount || 0), 0) +
    consultationFee;

  // Handle amount change
  const handleAmountChange = (index: number, value: string) => {
    const updatedAmounts = [...medicationAmounts];
    updatedAmounts[index].amount = parseFloat(value) || 0;
    setMedicationAmounts(updatedAmounts);
  };

  const handleQuantityChange = (index: number, value: string) => {
    const updatedQuantities = [...medicationQuantities];
    updatedQuantities[index].quantity = value; // Store as string
    setMedicationQuantities(updatedQuantities);
  };

  // Save invoice to Firebase

  const saveInvoice = async () => {
    try {
      if (!selectedUser?.email) {
        alert("No patient email found!");
        console.log("Selected User:", selectedUser);
        return;
      }
  
      // Generate a unique visit ID based on timestamp
      const visitId = `visit_${Date.now()}`;
      
      // Reference to the patient's medication document
      const patientRef = doc(db, "patient-medication", selectedUser.email.replace(/[@.]/g, "_"));
      
      // Reference to the visit subcollection
      const visitRef = doc(collection(patientRef, "visits"), visitId);
      
      // Store Visit Metadata
      await setDoc(visitRef, {
        patientId: selectedUser?.id,
        patientName: selectedUser?.name,
        patientEmail: selectedUser?.email,
        consultationFee,
        totalAmount: total,
        visitId, // Attach visit ID
        visitDate: new Date().toISOString(), // Store visit date
      });
  
      // Reference to medications subcollection under the visit
      const medicationsCollection = collection(visitRef, "medications");
  
      // Store medications under the visit ID
      await Promise.all(
        medications.map(async (med, index) => {
          await addDoc(medicationsCollection, {
            visitId, // Attach visit ID to each medication entry
            name: med.name,
            dosage: med.dosage,
            frequency: med.frequency,
            duration: med.duration,
            amount: medicationAmounts[index]?.amount || 0,
            quantity: medicationQuantities[index]?.quantity || "0",
          });
        })
      );
  
      toast({ description: "Medication sent to the app. Login to view!" });
    } catch (error) {
      console.error("Error saving invoice: ", error);
      alert("Failed to save invoice.");
    }
  };
  
  
  

  return (
    <div ref={invoiceRef} className="flex flex-col gap-10 invoice-container print:block p-4 md:p-10">
      {/* Invoice Header */}
      <div className="flex flex-row justify-between items-center">
        <div>
          <h1 className="text-xl">N O V A M E D</h1>
        </div>
        <div>
          <h1 className="text-4xl font-semibold">INVOICE</h1>
        </div>
      </div>
      {/* address */}
      <div className="flex flex-col md:flex-row justify-between gap-6 text-sm md:text-base">
    <div>
      <p>P.O BOX 550 Lanet</p>
      <p>Nakuru, Kenya</p>
      <p><span className="font-semibold">Phone:</span> 0722 123 555</p>
      <p><span className="font-semibold">Fax:</span> 432 5563 4902</p>
    </div>
    <div>
      <p>Invoice No: 001</p>
      <p><span className="font-semibold">Date:</span> Feb, 1 2025</p>
    </div>
  </div>
      {/* Patient Details */}
      <div>
    <h1 className="text-green-1 text-lg mb-4">PATIENT DETAILS</h1>
    <div className="flex flex-col md:flex-row justify-between gap-6 text-sm md:text-base">
      <div>
        <p className="capitalize"><span className="font-semibold uppercase">Name:</span> {selectedUser?.name}</p>
        <p className="capitalize"><span className="font-semibold uppercase">Age:</span> 23</p>
        <p className="capitalize"><span className="font-semibold uppercase">Email:</span> {selectedUser?.email}</p>
      </div>
      <div>
        <p className="capitalize"><span className="font-semibold uppercase">National Id:</span> {selectedUser?.id}</p>
        <p className="capitalize"><span className="font-semibold uppercase">Insurance Provider:</span> {selectedUser?.insuranceProvider || 'N/A'}</p>
        <p className="capitalize"><span className="font-semibold uppercase">Insurance Number:</span> {selectedUser?.insurancePolicyNumber || 'N/A'}</p>
      </div>
    </div>
  </div>

      {/* Invoice Table */}
        <div className="overflow-x-auto">
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="min-w-[80px]">#</TableHead>
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

      {/* Medication Table */}
      <div>
         {/* Medication Table */}
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
                    value={medicationQuantities[index]?.quantity || ""}
                    onChange={(e) => handleQuantityChange(index, e.target.value)}
                />
              </TableCell>
              <TableCell className="w-[200px]">
                <Input
                  placeholder="Subtotal"
                  type="number"
                  value={medicationAmounts[index]?.amount || ""}
                  onChange={(e) => handleAmountChange(index, e.target.value)}
                />
              </TableCell>
              <TableCell className="w-[200px] text-right">
                {medicationAmounts[index]?.amount.toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      </div>

      {/* Totals */}
      <div className="flex items-end justify-end">
        <div className="w-full md:w-1/2 flex flex-col gap-2">
          <Table>
            <TableRow>
              <TableCell className="text-right">Total (Ksh)</TableCell>
              <TableCell className="text-right">{total.toFixed(2)}</TableCell>
            </TableRow>
          </Table>
          <div className="flex justify-between items-center w-full gap-5 mt-10 print:hidden">
            {/* <Button className="bg-green-1 w-1/3" onClick={saveInvoice}>
              Add medication to our App
            </Button> */}
            <Button onClick={() => window.print()} className="bg-green-1 text-white w-1/2">
            Print Invoice
          </Button>
            {/* dialog */}
            <div className="w-full border bg-green-1 rounded-md">
            <Dialog>
              <DialogTrigger 
              onClick={saveInvoice}
              className="w-full h-9 px-4 py-2 text-white text-sm hover:bg-primary/90 hover:rounded-md" >
                 Proceed to Payment
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Payment Confirmation</DialogTitle>
                  <DialogDescription>
                    <div className="flex justify-center items-center">
                    <Image src='/images/success.gif' alt="success" width={200} height={200}/>
                    </div>
                    Your payment has been successfully sent to your insurance provider for approval. Your Bill will be sent to you. Thank you for entrusting our services.
                  </DialogDescription>
                  <DialogClose>
                  <div className="flex justify-end">
                  <h1 className="py-2 px-4 h-9 bg-red-500 rounded-md text-sm text-white">Close</h1>
                  </div>
                  </DialogClose>
                </DialogHeader>
              </DialogContent>
            </Dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientInvoice;
