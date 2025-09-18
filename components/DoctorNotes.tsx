"use client";
import React, { useState, useEffect } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { doc, setDoc, getDocs, collection } from "firebase/firestore";
import { db } from "@/configs/firebase.config";
import { useUserStore } from "@/stores/UseStore";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Sparkles, AlertCircle } from "lucide-react";
import { useDocNotesStore } from "@/stores/MedicationStore";
import MedicationInput, { PrescribedMedication } from "./MedicationInput";
import { useVitalsStore } from "@/stores/VitalsStore";

// Define MedicationItem interface to match Firebase structure
interface MedicationItem {
  id: string;
  name?: string;
  quantity?: number;
  price?: number;
  description?: string;
}

const DoctorNotes = () => {
  const [symptoms, setSymptoms] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [prescribedMedications, setPrescribedMedications] = useState<PrescribedMedication[]>([]);
  const [aiRecommendation, setAiRecommendation] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [inventory, setInventory] = useState<MedicationItem[]>([]);
  const { toast } = useToast();
  const { vitals } = useVitalsStore();
  const { setDocNotes } = useDocNotesStore();
  const selectedUser = useUserStore((state) => state.selectedUser);
  const router = useRouter();

  const patientId = selectedUser?.id?.toString();

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "medications"));
        const meds = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as MedicationItem[];
        setInventory(meds);
      } catch (error) {
        console.error("Error fetching medication inventory:", error);
        toast({
          description: "Failed to fetch medication inventory. Please try again.",
          variant: "destructive",
        });
      }
    };

    fetchInventory();
  }, [toast]);

  const formatMedicationsForAI = (medications: PrescribedMedication[]) => {
    return medications
      .map(
        (med) =>
          `${med.name} - ${med.dosage}, ${med.frequency}, ${med.duration}${
            med.instructions ? ` (${med.instructions})` : ""
          }`
      )
      .join(";");
  };

  const generateAIRecommendation = async () => {
    if (!symptoms.trim()) {
      toast({
        description: "Please enter symptoms first to generate AI recommendations",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    try {
      const response = await fetch("http://localhost:5000/api/ai-recommendation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          symptoms: symptoms.trim(),
          diagnosis: diagnosis.trim(),
          currentMedications: formatMedicationsForAI(prescribedMedications),
          patientHistory: selectedUser?.medicalHistory || selectedUser?.allergies || "",
          vitals: {
            weight: vitals.weight || "",
            height: vitals.height || "",
            temperature: vitals.temp || "",
            bloodPressure: vitals.bpm || "",
            heartRate: vitals.heart || "",
            respiratoryRate: vitals.rate || "",
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate recommendation");
      }

      if (data.success && data.recommendation) {
        setAiRecommendation(data.recommendation);
        toast({
          description: "✨ AI recommendations generated successfully!",
          duration: 3000,
        });
      } else {
        throw new Error("Invalid response from AI service");
      }
    } catch (error) {
      console.error("Error generating AI recommendation:", error);
      let errorMessage = "Failed to generate AI recommendation";
      if (error instanceof Error) {
        errorMessage = error.message.includes("quota")
          ? "API quota exceeded. Please try again later."
          : error.message.includes("API key")
          ? "Invalid Gemini API key. Please check the server configuration."
          : error.message.includes("Failed to fetch")
          ? "Cannot connect to AI service. Make sure the Express server is running."
          : `Error: ${error.message}`;
      }
      toast({ description: errorMessage, variant: "destructive" });
    } finally {
      setIsGenerating(false);
    }
  };

  const applyAIRecommendation = () => {
    if (!aiRecommendation) {
      toast({
        description: "No AI recommendations to apply",
        variant: "destructive",
      });
      return;
    }
    toast({
      description: "Review AI recommendations and add medications manually.",
      duration: 3000,
    });
  };

  const clearRecommendations = () => {
    setAiRecommendation("");
    toast({ description: "AI recommendations cleared" });
  };

  const handleContinue = async () => {
    if (!patientId) {
      toast({
        description: "No patient selected. Please select a patient first.",
        variant: "destructive",
      });
      return;
    }

    const invalidMedications = prescribedMedications.filter(
      (med) => med.quantityPrescribed > med.quantityAvailable
    );
    if (invalidMedications.length > 0) {
      toast({
        description: `Insufficient stock for: ${invalidMedications.map((m) => m.name).join(", ")}`,
        variant: "destructive",
      });
      return;
    }

    const docNotes = {
      symptoms,
      diagnosis,
      medication: formatMedicationsForAI(prescribedMedications),
      prescribedMedications,
      aiRecommendation,
      timestamp: new Date().toISOString(),
      buddyData: [], // Initialize empty, to be populated in DoctorNotesResults
    };

    console.log("📋 Doctor Notes Data to Save:", docNotes);

    try {
      await setDoc(doc(db, "doctor_notes", patientId), docNotes);
      toast({
        description: "✅ Prescription details saved successfully. Proceeding to Pharmacy...",
        duration: 3000,
      });
      setDocNotes(docNotes);
      router.push("/pharmacy");
    } catch (error) {
      console.error("❌ Error saving doctor's notes:", error);
      toast({
        description: "Failed to save doctor's notes. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-5 w-full">
        <div className="w-full md:w-1/3">
          <label>{"Patient's"} Symptoms</label>
          <Textarea
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            className="mt-3 focus-visible:ring-0 focus-visible:ring-offset-0 min-h-44"
            placeholder="Describe patient symptoms here..."
          />
        </div>
        <div className="w-full md:w-1/3">
          <label>Diagnosis</label>
          <Textarea
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            className="mt-3 focus-visible:ring-0 focus-visible:ring-offset-0 min-h-44"
            placeholder="Enter diagnosis..."
          />
        </div>
        <div className="w-full md:w-1/3">
          <label>Medication</label>
          <div className="mt-3">
            <MedicationInput
              inventory={inventory}
              onMedicationChange={setPrescribedMedications}
              initialMedications={prescribedMedications}
            />
          </div>
        </div>
      </div>

      <div className="my-6 p-4 border rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            AI Medical Recommendations
          </h3>
          <div className="flex gap-2">
            <Button
              onClick={generateAIRecommendation}
              disabled={isGenerating || !symptoms.trim()}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Generate Analysis
                </>
              )}
            </Button>
            {aiRecommendation && (
              <>
                <Button
                  onClick={applyAIRecommendation}
                  variant="secondary"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  View Recommendations
                </Button>
                <Button
                  onClick={clearRecommendations}
                  variant="outline"
                  size="sm"
                  className="text-gray-600"
                >
                  Clear
                </Button>
              </>
            )}
          </div>
        </div>
        <div className="bg-white p-4 rounded border min-h-32 max-h-96 overflow-y-auto">
          {aiRecommendation ? (
            <div className="space-y-2">
              <div className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                {aiRecommendation}
              </div>
              <div className="mt-4 p-2 bg-yellow-50 border-l-4 border-yellow-400 text-xs text-yellow-800">
                <AlertCircle className="w-4 h-4 inline mr-1" />
                AI-generated suggestions. Always consult qualified healthcare professionals.
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-sm">
              {symptoms.trim()
                ? "Click 'Generate Analysis' to get AI recommendations."
                : "Enter symptoms to get AI diagnostic suggestions."}
            </p>
          )}
        </div>
      </div>

      <div className="my-10 flex justify-end">
        <Button onClick={handleContinue} className="bg-green-1">
          Proceed to Pharmacy
        </Button>
      </div>
    </div>
  );
};

export default DoctorNotes;