"use client";
import { useUserStore } from "@/stores/UseStore";
import React, { useRef, useState, useEffect } from "react";
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
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { calculateReminderTimes } from "@/services/reminderTimes";



const PatientInvoice = () => {
  const selectedUser = useUserStore((state) => state.selectedUser);
  const { docNotes } = useDocNotesStore();
  const { toast } = useToast();
  const invoiceRef = useRef(null);

  // Parse medication data with validation
  const medications = docNotes?.prescribedMedications?.map((med) => ({
    name: med.name || "Unknown Medication",
    dosage: med.dosage || "N/A",
    frequency: med.frequency || "Once daily",
    days: parseInt(med.duration) || 0,
    amount: parseFloat(med.quantityPrescribed.toString()) || 0,
    quantity: parseInt(med.quantityPrescribed.toString()) || 0,
    type: { name: "Unknown", icon: "" },
  })) || [];

  // State for amount and quantity inputs
  const [medicationAmounts, setMedicationAmounts] = useState(
    medications.map((med) => ({ amount: med.amount.toString() || "0" }))
  );
  const [medicationQuantities, setMedicationQuantities] = useState(
    medications.map((med) => ({ quantity: med.quantity.toString() || "0" }))
  );

  // Debug medications
  useEffect(() => {
    console.log("docNotes:", docNotes);
    console.log("Medications:", medications);
    console.log("medicationAmounts:", medicationAmounts);
    console.log("medicationQuantities:", medicationQuantities);
  }, [docNotes, medications, medicationAmounts, medicationQuantities]);

  const consultationFee = 250;

  const total =
    medicationAmounts.reduce((sum, med) => sum + (parseFloat(med.amount) || 0), 0) +
    consultationFee;

  // Handle amount and quantity changes
  const handleAmountChange = (index: number, value: string) => {
    const amount = parseFloat(value) || 0;
    if (amount < 0) {
      toast({ description: "Amount cannot be negative", variant: "destructive" });
      return;
    }
    const updatedAmounts = [...medicationAmounts];
    updatedAmounts[index].amount = amount.toString();
    setMedicationAmounts(updatedAmounts);
  };

  const handleQuantityChange = (index: number, value: string) => {
    const quantity = parseInt(value) || 0;
    if (quantity < 0) {
      toast({ description: "Quantity cannot be negative", variant: "destructive" });
      return;
    }
    const updatedQuantities = [...medicationQuantities];
    updatedQuantities[index].quantity = quantity.toString();
    setMedicationQuantities(updatedQuantities);
  };

  // Save invoice to Firebase
  const saveInvoice = async () => {
    try {
      if (!selectedUser?.email) {
        toast({ description: "No patient email found!", variant: "destructive" });
        return;
      }

      const visitId = `visit_${Date.now()}`;
      const emailKey = selectedUser.email.replace(/[@.]/g, "_");
      const patientRef = doc(db, "patient-medication", emailKey);
      const visitRef = doc(collection(patientRef, "visits"), visitId);

      // Store Visit Metadata
      await setDoc(visitRef, {
        patientId: selectedUser?.id || "",
        patientName: selectedUser?.name || "",
        patientEmail: selectedUser?.email || "",
        consultationFee,
        totalAmount: total,
        visitId,
        visitDate: new Date().toISOString(),
        status: "active",
      });

      // Store medications with proper structure
      const medicationsCollection = collection(visitRef, "medications");
      await Promise.all(
        medications.map(async (med, index) => {
          const quantity = parseInt(medicationQuantities[index]?.quantity) || 0;
          if (quantity < 0 || isNaN(quantity)) {
            throw new Error(`Invalid quantity for ${med.name}`);
          }

          const reminderTimes = calculateReminderTimes(med.frequency, "07:00");
          if (!reminderTimes || reminderTimes.length === 0) {
            throw new Error(`Invalid reminderTimes for ${med.name}`);
          }

          await addDoc(medicationsCollection, {
            name: med.name,
            dosage: med.dosage,
            frequency: med.frequency,
            days: med.days,
            duration: med.days,
            amount: parseFloat(medicationAmounts[index]?.amount) || 0,
            quantity,
            type: {
              name: med.type.name || "Unknown",
              icon: med.type.icon || "",
            },
            userEmail: selectedUser.email,
            visitId,
            reminderTimes,
            takenToday: new Array(reminderTimes.length).fill(false),
            createdAt: new Date().toISOString(),
            status: "active",
          });
        })
      );

      toast({ description: "Medication sent to the app. Login to view!" });
    } catch (error: unknown) {
      console.error("Error saving invoice:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      toast({ description: `Failed to save invoice: ${errorMessage}`, variant: "destructive" });
    }
  };

  return (
    <div ref={invoiceRef} className="flex flex-col gap-10 invoice-container p-4 md:p-10">
      {/* Invoice Header */}
      <div className="flex flex-row justify-between items-center">
        <div>
          <h1 className="text-xl">R I V I A M E D</h1>
          <p>Health Systems</p>
        </div>
        <div>
          <h1 className="text-4xl font-semibold">INVOICE</h1>
        </div>
      </div>
      {/* Address */}
      <div className="flex flex-col md:flex-row justify-between gap-6 text-sm md:text-base">
        <div>
          <p>P.O BOX 550 Lanet</p>
          <p>Nakuru, Kenya</p>
          <p><span className="font-semibold">Phone:</span> 0722 123 555</p>
          <p><span className="font-semibold">Fax:</span> 432 5563 4902</p>
        </div>
        <div>
          <p>Invoice No: 001</p>
          <p><span className="font-semibold">Date:</span> {new Date().toLocaleDateString()}</p>
        </div>
      </div>
      {/* Patient Details */}
      <div>
        <h1 className="text-green-1 text-lg mb-4">PATIENT DETAILS</h1>
        <div className="flex flex-col md:flex-row justify-between gap-6 text-sm md:text-base">
          <div>
            <p className="capitalize"><span className="font-semibold uppercase">Name:</span> {selectedUser?.name || "N/A"}</p>
            <p className="capitalize"><span className="font-semibold uppercase">Age:</span> {selectedUser?.dob ?? "N/A"}</p>
            <p className="capitalize"><span className="font-semibold uppercase">Email:</span> {selectedUser?.email || "N/A"}</p>
          </div>
          <div>
            <p className="capitalize"><span className="font-semibold uppercase">National Id:</span> {selectedUser?.id || "N/A"}</p>
            <p className="capitalize"><span className="font-semibold uppercase">Insurance Provider:</span> {selectedUser?.insuranceProvider || "N/A"}</p>
            <p className="capitalize"><span className="font-semibold uppercase">Insurance Number:</span> {selectedUser?.insurancePolicyNumber || "N/A"}</p>
          </div>
        </div>
      </div>
      {/* Consultation Fee Table */}
      <Card>
        <CardHeader>
          <CardTitle>Consultation Fee</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>Consultation fee details</TableCaption>
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
        </CardContent>
      </Card>
      {/* Medication Table */}
      <Card>
        <CardHeader>
          <CardTitle>Medications</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>Prescribed medications and costs</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Medication</TableHead>
                <TableHead>Dosage</TableHead>
                <TableHead>Frequency</TableHead>
                <TableHead>Days</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Unit Price (Ksh)</TableHead>
                <TableHead className="text-right">Subtotal (Ksh)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {medications.map((med, index) => (
                <TableRow key={med.name + index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{med.name}</TableCell>
                  <TableCell>{med.dosage}</TableCell>
                  <TableCell>{med.frequency}</TableCell>
                  <TableCell>{med.days}</TableCell>
                  <TableCell className="w-[150px]">
                    <div className="space-y-2">
                      <Label htmlFor={`quantity-${index}`} className="text-sm font-medium">
                        Quantity
                      </Label>
                      <Input
                        id={`quantity-${index}`}
                        type="number"
                        min="0"
                        placeholder="Enter quantity"
                        value={medicationQuantities[index]?.quantity || ""}
                        onChange={(e) => handleQuantityChange(index, e.target.value)}
                      />
                    </div>
                  </TableCell>
                  <TableCell className="w-[150px]">
                    <div className="space-y-2">
                      <Label htmlFor={`amount-${index}`} className="text-sm font-medium">
                        Unit Price
                      </Label>
                      <Input
                        id={`amount-${index}`}
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="Enter amount"
                        value={medicationAmounts[index]?.amount || ""}
                        onChange={(e) => handleAmountChange(index, e.target.value)}
                      />
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    {(parseFloat(medicationAmounts[index]?.amount) || 0).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
              {medications.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                    No medications prescribed
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      {/* Totals */}
      <div className="flex items-end justify-end">
        <div className="w-full md:w-1/2">
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="text-right font-medium">Consultation Fee (Ksh)</TableCell>
                    <TableCell className="text-right">{consultationFee.toFixed(2)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-right font-medium">Medications Total (Ksh)</TableCell>
                    <TableCell className="text-right">
                      {(total - consultationFee).toFixed(2)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-right font-semibold">Total (Ksh)</TableCell>
                    <TableCell className="text-right font-semibold">{total.toFixed(2)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <div className="flex justify-between items-center w-full gap-5 mt-6 print:hidden">
            <Button onClick={() => window.print()} className="bg-green-1 text-white w-1/2">
              Print Invoice
            </Button>
            <div className="w-full border bg-green-1 rounded-md">
              <Dialog>
                <DialogTrigger
                  onClick={saveInvoice}
                  className="w-full h-9 px-4 py-2 text-white text-sm hover:bg-primary/90 hover:rounded-md"
                >
                  Proceed to Payment
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Payment Confirmation</DialogTitle>
                    <DialogDescription>
                      <div className="flex justify-center items-center">
                        <Image src="/images/success.gif" alt="success" width={200} height={200} />
                      </div>
                      Your payment has been successfully sent to your insurance provider for approval. Your bill will be sent to you. Thank you for entrusting our services.
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