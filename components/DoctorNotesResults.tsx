"use client";
import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { Input } from "./ui/input";
import { useToast } from "@/hooks/use-toast";
import { db } from "@/configs/firebase.config";
import { doc, setDoc } from "firebase/firestore";
import { useUserStore } from "@/stores/UseStore";
import { useDocNotesStore } from "@/stores/MedicationStore";
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
import { AlertCircle, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";

interface SafetyFlag {
  type: "LASA" | "HighAlert";
  description: string;
  medications: string[];
}

interface PrescribedMedication {
  id: string;
  medicationId: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions?: string;
  available: boolean;
  quantityAvailable: number;
  quantityPrescribed: number;
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

  const [pharmacistData, setPharmacistData] = useState<PrescribedMedication[]>(() =>
    docNotes && docNotes.prescribedMedications
      ? docNotes.prescribedMedications.map((med) => ({
          id: med.id,
          medicationId: med.medicationId,
          name: med.name || "",
          dosage: med.dosage || "",
          frequency: med.frequency || "",
          duration: med.duration || "",
          instructions: med.instructions || "",
          available: med.available,
          quantityAvailable: med.quantityAvailable,
          quantityPrescribed: med.quantityPrescribed,
        }))
      : []
  );

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [safetyFlags, setSafetyFlags] = useState<SafetyFlag[]>([]);
  const [buddyData, setBuddyData] = useState<BuddyData[]>(() =>
    docNotes?.buddyData || [{ name: "", buddy: "", remarks: "" }]
  );

  useEffect(() => {
    console.log("Received docNotes:", docNotes);
  }, [docNotes]);

  if (!docNotes || !docNotes.prescribedMedications) {
    toast({
      description: "No prescription data available. Please complete the doctor's notes first.",
      variant: "destructive",
    });
    router.push("/doctor-notes");
    return null;
  }

  const HandleInputChange = (
    id: string,
    field: keyof PrescribedMedication,
    value: string | number | boolean
  ) => {
    setPharmacistData((prev) =>
      prev.map((med) =>
        med.id === id ? { ...med, [field]: value } : med
      )
    );
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

  const getAvailabilityStatus = (medication: PrescribedMedication) => {
    if (!medication.available) {
      return { status: "unavailable", color: "bg-red-100 text-red-800", icon: AlertCircle };
    }
    if (medication.quantityPrescribed > medication.quantityAvailable) {
      return { status: "insufficient", color: "bg-yellow-100 text-yellow-800", icon: AlertCircle };
    }
    return { status: "available", color: "bg-green-100 text-green-800", icon: CheckCircle };
  };

  const analyzeMedicationsForSafety = async () => {
    if (pharmacistData.length === 0 || pharmacistData.every((med) => !med.name)) {
      toast({ description: "No medications to analyze.", variant: "default" });
      return;
    }

    const medDetails = pharmacistData.map((med) => ({
      name: med.name,
      dosage: med.dosage,
      frequency: med.frequency,
      duration: med.duration,
      instructions: med.instructions,
    }));

    setIsAnalyzing(true);
    setSafetyFlags([]);

    try {
      const response = await fetch("http://localhost:5000/api/analyze-medications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ medications: medDetails }),
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

    const invalidMedications = pharmacistData.filter(
      (med) => med.quantityPrescribed > med.quantityAvailable
    );
    if (invalidMedications.length > 0) {
      toast({
        description: `Insufficient stock for: ${invalidMedications.map((m) => m.name).join(", ")}`,
        variant: "destructive",
      });
      return;
    }

    try {
      const formattedMedication = pharmacistData
        .map(
          ({ name, dosage, frequency, duration }) =>
            `${name} - ${dosage} - ${frequency} - ${duration}`
        )
        .join(";");

      const updatedDocNotes = {
        ...docNotes,
        medication: formattedMedication,
        prescribedMedications: pharmacistData,
        buddyData,
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
      <div className="w-full mb-6">
        <label className="text-xl">Patient Information</label>
        <div className="mt-3 border rounded-md p-4">
          <div className="mb-2">
            <strong>Symptoms:</strong> {docNotes.symptoms || "Not provided"}
          </div>
          <div className="mb-2">
            <strong>Diagnosis:</strong> {docNotes.diagnosis || "Not provided"}
          </div>
          <div>
            <strong>AI Recommendation:</strong>{" "}
            {docNotes.aiRecommendation || "No AI recommendations available"}
          </div>
        </div>
      </div>

      <div className="w-full">
        <Card>
          <CardHeader>
            <CardTitle>Prescribed Medications</CardTitle>
          </CardHeader>
          <CardContent>
            {pharmacistData.map((med) => {
              const availability = getAvailabilityStatus(med);
              const IconComponent = availability.icon;
              return (
                <Card key={med.id} className="mb-4">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <h5 className="font-medium text-lg">{med.name}</h5>
                      <Badge className={`${availability.color} capitalize`}>
                        <IconComponent className="w-4 h-4 mr-2" />
                        {availability.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`dosage-${med.id}`} className="text-sm font-medium">
                          Dosage
                        </Label>
                        <Input
                          id={`dosage-${med.id}`}
                          placeholder="e.g. 500mg/10ml"
                          value={med.dosage}
                          onChange={(e) =>
                            HandleInputChange(med.id, "dosage", e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`frequency-${med.id}`} className="text-sm font-medium">
                          Frequency
                        </Label>
                        <Input
                          id={`frequency-${med.id}`}
                          placeholder="e.g. 3 times daily"
                          value={med.frequency}
                          onChange={(e) =>
                            HandleInputChange(med.id, "frequency", e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`duration-${med.id}`} className="text-sm font-medium">
                          Duration
                        </Label>
                        <Input
                          id={`duration-${med.id}`}
                          placeholder="e.g. 5 days"
                          value={med.duration}
                          onChange={(e) =>
                            HandleInputChange(med.id, "duration", e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`quantity-${med.id}`} className="text-sm font-medium">
                          Quantity (Available: {med.quantityAvailable})
                        </Label>
                        <div className="flex items-center gap-2">
                          <Input
                            id={`quantity-${med.id}`}
                            type="number"
                            placeholder="Quantity"
                            min="1"
                            max={med.quantityAvailable}
                            value={med.quantityPrescribed}
                            onChange={(e) =>
                              HandleInputChange(
                                med.id,
                                "quantityPrescribed",
                                parseInt(e.target.value) || 1
                              )
                            }
                            className="w-24"
                          />
                          <span className="text-sm text-gray-600">
                            of {med.quantityAvailable}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 space-y-2">
                      <Label htmlFor={`instructions-${med.id}`} className="text-sm font-medium">
                        Special Instructions
                      </Label>
                      <Input
                        id={`instructions-${med.id}`}
                        placeholder="Enter any special instructions"
                        value={med.instructions || ""}
                        onChange={(e) =>
                          HandleInputChange(med.id, "instructions", e.target.value)
                        }
                      />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
            {pharmacistData.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No medications prescribed yet.
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-4 flex justify-between items-center">
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

        {safetyFlags.length > 0 && (
          <div className="mt-4">
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
                      <span className="text-sm font-mono">
                        ({flag.medications.join(", ")})
                      </span>
                    )}
                  </div>
                ))}
              </AlertDescription>
            </Alert>
          </div>
        )}

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
                {buddyData.map((buddy, index) => (
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