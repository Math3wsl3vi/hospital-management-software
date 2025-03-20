"use client";
import React, { useState } from "react";
import { Textarea } from "./ui/textarea";
import { useDocNotesStore } from "@/stores/MedicationStore";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/configs/firebase.config";
import { useUserStore } from "@/stores/UseStore";
import { useToast } from "@/hooks/use-toast";

const DoctorNotes = () => {
  const [symptoms, setSymptoms] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [medication, setMedication] = useState("");
  const { toast } = useToast()
  
  const { setDocNotes } = useDocNotesStore();
  const selectedUser = useUserStore((state) => state.selectedUser); // Get selected user
  const router = useRouter();

  // Extract patientId safely
  const patientId = selectedUser?.id?.toString();

  const handleContinue = async () => {
    if (!patientId) {
      console.error("No patient ID found.");
      alert("No patient selected. Please select a patient first.");
      return;
    }

    const docNotes = { medication, diagnosis, symptoms, timestamp: new Date().toISOString() };

    try {
      await setDoc(doc(db, "doctor_notes", patientId), docNotes);
      toast({description:'Prescription Details saved successfully. You may proceed to Pharmacy'})
      console.log("Doctor's notes saved successfully!");

      setDocNotes(docNotes);
      router.push("/pharmacy");
    } catch (error) {
      console.error("Error saving doctor's notes:", error);
      alert("Failed to save doctor's notes. Please try again.");
    }
  };

  return (
    <>
      <div className="flex gap-5 w-full">
        <div className="w-1/3">
          <label>{"Patient's"} symptoms</label>
          <Textarea
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            className="mt-3 focus-visible:ring-0 focus-visible:ring-offset-0 min-h-44"
          />
        </div>
        <div className="w-1/3">
          <label>Diagnosis</label>
          <Textarea
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            className="mt-3 focus-visible:ring-0 focus-visible:ring-offset-0 min-h-44"
          />
        </div>
        <div className="w-1/3">
            <label>Medication</label>
            <Textarea
              value={medication}
              onChange={(e) => setMedication(e.target.value)}
              className="mt-3 focus-visible:ring-0 focus-visible:ring-offset-0 min-h-44"
            />
        </div>  
      </div>
      <div className="my-10 flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger className="bg-green-1 w-[200px] py-2 px-4 rounded-md text-white">
            Advice
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[200px]">
            <DropdownMenuItem onClick={handleContinue}>Pharmacy</DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/lab")}>Lab</DropdownMenuItem>
            <DropdownMenuItem>Consultant</DropdownMenuItem>
            <DropdownMenuItem>Radiology</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};

export default DoctorNotes;
