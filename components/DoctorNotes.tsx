"use client";
import React, { useState } from "react";
import { Textarea } from "./ui/textarea";
import PrescriptionForm from "./PrescriptionForm";
import { useDocNotesStore } from "@/stores/MedicationStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const DoctorNotes = () => {
  const [symptoms, setSymptoms] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [medication, setMedication] = useState("");
  const { setDocNotes } = useDocNotesStore();
  const router = useRouter()

  const handleContinue = () => {
    setDocNotes({medication,diagnosis,symptoms})
    router.push('/pharmacy')
  
  } 

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
        <div className="w-1/3 flex flex-col gap-3">
          <div>
            <label>Medictaion</label>
            <Textarea
              value={medication}
              onChange={(e) => setMedication(e.target.value)}
              className="mt-3 focus-visible:ring-0 focus-visible:ring-offset-0 min-h-24"
            />
          </div>
          <PrescriptionForm />
        </div>
      </div>
      <div className="my-10 flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button className="bg-green-1 w-[200px]">Advice</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[200px]">
            <DropdownMenuItem onClick={handleContinue}>Pharmacy</DropdownMenuItem>
            <DropdownMenuItem onClick={()=> router.push('lab')}>Lab</DropdownMenuItem>
            <DropdownMenuItem>Consultant</DropdownMenuItem>
            <DropdownMenuItem>Radiology</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};

export default DoctorNotes;
