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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const DoctorNotesResults = () => {
  const router = useRouter();
  const { docNotes, setDocNotes } = useDocNotesStore();
  const { toast } = useToast();
  const selectedUser = useUserStore((state) => state.selectedUser);
  const patientId = selectedUser?.id?.toString();

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

  const HandleInputChange = (
    index: number,
    field: keyof (typeof pharmacistData)[number],
    value: string
  ) => {
    const updatedData = [...pharmacistData];
    updatedData[index][field] = value;
    setPharmacistData(updatedData);
  };

    const [buddyData, setBuddyData] = useState([
    { name: "", buddy: "", remarks: "" },
  ]);

  const HandleBuddyChange = (
    index: number,
    field: keyof (typeof buddyData)[number],
    value: string
  ) => {
    const updatedData = [...buddyData];
    updatedData[index][field] = value;
    setBuddyData(updatedData);
  };

  const addBuddyRow = () => {
    setBuddyData([...buddyData, { name: "", buddy: "", remarks: "" }]);
  };


  const savePharmacistData = async () => {
    if (!patientId) {
      toast({ description: "No patient selected.", variant: "destructive" });
      return;
    }

    try {
      const formattedMedication = pharmacistData
        .map(
          ({ name, dosage, frequency, duration }) =>
            `${name} - ${dosage} - ${frequency} - ${duration}`
        )
        .join(",");

      const updatedDocNotes = {
        ...docNotes,
        medication: formattedMedication,
      };

      await setDoc(doc(db, "doctor_notes", patientId), updatedDocNotes, {
        merge: true,
      });

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
          {pharmacistData.map((med: any, index: number) => (
            <div
              key={index}
              className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b p-2"
            >
              <span className="capitalize font-semibold w-full md:w-1/4">
                {med.name}
              </span>
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-3/4">
                <Input
                  placeholder="Dosage (e.g. 500mg/10ml)"
                  value={med.dosage}
                  onChange={(e) =>
                    HandleInputChange(index, "dosage", e.target.value)
                  }
                />
                <Input
                  placeholder="Frequency (e.g. 3 times a day)"
                  value={med.frequency}
                  onChange={(e) =>
                    HandleInputChange(index, "frequency", e.target.value)
                  }
                />
                <Input
                  placeholder="Duration (e.g. 5 days)"
                  value={med.duration}
                  onChange={(e) =>
                    HandleInputChange(index, "duration", e.target.value)
                  }
                />
              </div>
            </div>
          ))}
        </div>

        {/* ✅ Buddy System Table */}
        <div className="mt-6">
          <label className="text-xl">Buddy System</label>
          <div className="mt-3 border rounded-md p-2 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Buddy</TableHead>
                  <TableHead>Remarks</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {buddyData.map((buddy: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Input
                        placeholder="Name"
                        value={buddy.name}
                        onChange={(e) =>
                          HandleBuddyChange(index, "name", e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        placeholder="Buddy"
                        value={buddy.buddy}
                        onChange={(e) =>
                          HandleBuddyChange(index, "buddy", e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        placeholder="Remarks"
                        value={buddy.remarks}
                        onChange={(e) =>
                          HandleBuddyChange(index, "remarks", e.target.value)
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* ✅ Action buttons */}
      <div className="w-full flex flex-col sm:flex-row justify-end gap-4 pt-5">
        <Button className="bg-green-1 w-full sm:w-1/3 md:w-1/4">
          Print Medication
        </Button>
        <Button
          onClick={savePharmacistData}
          className="w-full sm:w-1/3 md:w-1/4 bg-green-1"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default DoctorNotesResults;
