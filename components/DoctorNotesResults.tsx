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
import { Alert, AlertDescription } from "./ui/alert";
import { Badge } from "@/components/ui/badge";

// Define interfaces for data structures
interface SafetyFlag {
  type: "LASA" | "HighAlert";
  description: string;
  medications: string[];
}

interface PharmacistData {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
}

interface BuddyData {
  name: string;
  buddy: string;
  remarks: string;
}

const DoctorNotesResults = () => {
  const router = useRouter();
  const { docNotes, setDocNotes } = useDocNotesStore();
  const { toast } = useToast();
  const selectedUser = useUserStore((state) => state.selectedUser);
  const patientId = selectedUser?.id?.toString();

  const [pharmacistData, setPharmacistData] = useState<PharmacistData[]>(
    docNotes.medication
      ? docNotes.medication.split(",").map((med) => ({
          name: med.trim(),
          dosage: "",
          frequency: "",
          duration: "",
        }))
      : []
  );

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [safetyFlags, setSafetyFlags] = useState<SafetyFlag[]>([]);

  const [buddyData, setBuddyData] = useState<BuddyData[]>([
    { name: "", buddy: "", remarks: "" },
  ]);

  const HandleInputChange = (
    index: number,
    field: keyof PharmacistData,
    value: string
  ) => {
    const updatedData = [...pharmacistData];
    updatedData[index][field] = value;
    setPharmacistData(updatedData);
    // Optional: Auto-trigger analysis after debounce (uncomment and add useEffect for real-time)
    analyzeMedicationsForSafety();
  };

  const HandleBuddyChange = (
    index: number,
    field: keyof BuddyData,
    value: string
  ) => {
    const updatedData = [...buddyData];
    updatedData[index][field] = value;
    setBuddyData(updatedData);
  };

  const addBuddyRow = () => {
    setBuddyData([...buddyData, { name: "", buddy: "", remarks: "" }]);
  };

  // AI Analysis Function
  const analyzeMedicationsForSafety = async () => {
    if (pharmacistData.length === 0 || pharmacistData.every((med) => !med.name)) {
      toast({ description: "No medications to analyze.", variant: "default" });
      return;
    }

    const medNames = pharmacistData.map((med) => med.name).filter(Boolean);
    setIsAnalyzing(true);
    setSafetyFlags([]);

    try {
      const response = await fetch("http://localhost:5000/api/analyze-medications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ medications: medNames }),
      });

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();
      setSafetyFlags(data.flags || []);

      if (data.flags && data.flags.length > 0) {
        toast({
          description: `${data.flags.length} potential safety issue(s) detected. Review below.`,
          variant: "destructive",
        });
      } else {
        toast({ description: "No safety issues detected.", variant: "default" });
      }
    } catch (error) {
      console.error("Error analyzing medications:", error);
      toast({
        description: "Failed to analyze medications. Please check your connection.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const savePharmacistData = async () => {
    if (!patientId) {
      toast({ description: "No patient selected.", variant: "destructive" });
      return;
    }

    // Optional: Require analysis before saving
    if (safetyFlags.length > 0 && !confirm("Safety issues detected. Proceed anyway?")) {
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
          {pharmacistData.map((med: PharmacistData, index: number) => (
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

        {/* AI Safety Analysis Button */}
        <div className="mt-3 flex justify-between items-center">
          <span className="text-sm text-gray-600">AI Safety Check (LASA & High-Alert)</span>
          <Button
            onClick={analyzeMedicationsForSafety}
            disabled={isAnalyzing || pharmacistData.length === 0}
            variant="outline"
            size="sm"
          >
            {isAnalyzing ? "Analyzing..." : "Analyze Safety"}
          </Button>
        </div>

        {/* Safety Alerts */}
        {safetyFlags.length > 0 && (
          <div className="mt-3">
            <Alert variant="destructive">
              <AlertDescription className="flex flex-col gap-2">
                <strong>AI Safety Flags Detected:</strong>
                {safetyFlags.map((flag, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Badge
                      variant={flag.type === "HighAlert" ? "destructive" : "secondary"}
                      className={flag.type === "HighAlert" ? "bg-red-500" : "bg-orange-500"}
                    >
                      {flag.type}
                    </Badge>
                    <span>{flag.description}</span>
                    {flag.medications.length > 0 && (
                      <span className="text-sm font-mono">({flag.medications.join(", ")})</span>
                    )}
                  </div>
                ))}
              </AlertDescription>
            </Alert>
          </div>
        )}

        {/* Buddy System Table */}
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
                {buddyData.map((buddy: BuddyData, index: number) => (
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
            <Button onClick={addBuddyRow} variant="outline" size="sm" className="mt-2">
              Add Row
            </Button>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="w-full flex flex-col sm:flex-row justify-end gap-4 pt-5">
        <Button className="bg-green-1 w-full sm:w-1/3 md:w-1/4">
          Print Medication
        </Button>
        <Button
          onClick={savePharmacistData}
          disabled={isAnalyzing}
          className="w-full sm:w-1/3 md:w-1/4 bg-green-1"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default DoctorNotesResults;