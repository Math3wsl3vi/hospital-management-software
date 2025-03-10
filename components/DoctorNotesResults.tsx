"use client";
import { useDocNotesStore } from "@/stores/MedicationStore";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { Input } from "./ui/input";
import { useToast } from "@/hooks/use-toast";
import { db } from "@/configs/firebase.config";
import { doc, setDoc } from "firebase/firestore";
import { useUserStore } from "@/stores/UseStore";


const DoctorNotesResults = () => {
  const router = useRouter();
  const { docNotes, setDocNotes } = useDocNotesStore();
  const { toast } = useToast();
  const selectedUser = useUserStore((state) => state.selectedUser); // Get the selected user

  // Initialize patientId
  const patientId = selectedUser?.id?.toString();

  // Initialize state at the top level (fixes the React Hook error)
  const [pharmacistData, setPharmacistData] = useState(
    docNotes.medication
      ? docNotes.medication.split(",").map((med) => ({
          name: med.trim(),
          dosage: "",
          frequency: "",
          duration: "",
        }))
      : []
  );

  // Handle input changes
  const HandleInputChange = (index: number, field: keyof (typeof pharmacistData)[number], value: string) => {
    const updatedData = [...pharmacistData];
    updatedData[index][field] = value;
    setPharmacistData(updatedData);
  };

  // Save data to Firestore
  const savePharmacistData = async () => {
    if (!patientId) {
      toast({ description: "No patient selected.", variant: "destructive" });
      return;
    }

    try {
      // Convert to string format before saving (Fixes TS2345 error)
      const formattedMedication = pharmacistData
        .map(({ name, dosage, frequency, duration }) => `${name} - ${dosage} - ${frequency} - ${duration}`)
        .join(",");

      const updatedDocNotes = {
        ...docNotes,
        medication: formattedMedication, // Ensure it's a string
      };

      await setDoc(doc(db, "doctor_notes", patientId), updatedDocNotes, { merge: true });

      setDocNotes(updatedDocNotes); 

      toast({
        description: "Medication data saved successfully.",
      });

      router.push("/patient-invoice");
    } catch (error) {
      console.error("Error saving pharmacist data:", error);
      toast({
        description: "Failed to save patient data. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="w-full">
        <label className="text-xl">Prescribed Medication</label>
        <div className="mt-3 border rounded-md min-h-44 p-2">
          {pharmacistData.map((med, index) => (
            <div key={index} className="flex flex-row gap-5 border-b p-2 justify-between">
              <span>{med.name}</span>
              <div className="ml-20 flex flex-row gap-10">
                <Input
                  placeholder="Dosage (e.g. 500mg/10ml)"
                  value={med.dosage}
                  onChange={(e) => HandleInputChange(index, "dosage", e.target.value)}
                />
                <Input
                  placeholder="Frequency (e.g. 3 times a day)"
                  value={med.frequency}
                  onChange={(e) => HandleInputChange(index, "frequency", e.target.value)}
                />
                <Input
                  placeholder="Duration (e.g. 5 days)"
                  value={med.duration}
                  onChange={(e) => HandleInputChange(index, "duration", e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full flex flex-row gap-10 pt-5">
        <Button className="w-1/2 bg-green-1">Print Medication</Button>
        <Button onClick={savePharmacistData} className="w-1/2 bg-green-1">
          Continue
        </Button>
      </div>
    </div>
  );
};

export default DoctorNotesResults;
