"use client";
import React, { useState } from "react";
import { Textarea } from "./ui/textarea";
import { useDocNotesStore } from "@/stores/MedicationStore";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/configs/firebase.config";
import { useUserStore } from "@/stores/UseStore";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Sparkles, AlertCircle, CheckCircle } from "lucide-react";
import { useVitalsStore } from "@/stores/VitalsStore";

const DoctorNotes = () => {
  const [symptoms, setSymptoms] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [medication, setMedication] = useState("");
  const [aiRecommendation, setAiRecommendation] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  const { vitals } = useVitalsStore();
  
  const { setDocNotes } = useDocNotesStore();
  const selectedUser = useUserStore((state) => state.selectedUser);
  const router = useRouter();

  const patientId = selectedUser?.id?.toString();

  // Generate AI recommendation using Google Gemini
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
      // Point to Express server
      const response = await fetch("http://localhost:5000/api/ai-recommendation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          symptoms: symptoms.trim(),
          diagnosis: diagnosis.trim(),
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
        if (error.message.includes("quota")) {
          errorMessage = "API quota exceeded. Please try again later.";
        } else if (error.message.includes("API key")) {
          errorMessage = "Invalid Gemini API key. Please check the server configuration.";
        } else if (error.message.includes("Failed to fetch")) {
          errorMessage = "Cannot connect to AI service. Make sure the Express server is running.";
        } else {
          errorMessage = `Error: ${error.message}`;
        }
      }

      toast({
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  // Apply AI recommendations to medication field
  const applyAIRecommendation = () => {
    if (!aiRecommendation) {
      toast({
        description: "No AI recommendations to apply",
        variant: "destructive"
      });
      return;
    }

    try {
      // Extract medication information from AI recommendation
      const medicationSection = extractMedicationFromRecommendation(aiRecommendation);
      
      if (medicationSection) {
        const currentMedication = medication.trim();
        const newMedication = currentMedication 
          ? `${currentMedication}\n\n--- AI Recommendations ---\n${medicationSection}`
          : medicationSection;
        
        setMedication(newMedication);
        
        toast({
          description: "✅ AI recommendations applied to medication field",
          duration: 3000
        });
      } else {
        // If no specific medication section found, append the full recommendation
        const currentMedication = medication.trim();
        const separator = currentMedication ? "\n\n--- AI Analysis ---\n" : "";
        setMedication(currentMedication + separator + aiRecommendation.substring(0, 500) + "...");
        
        toast({
          description: "AI analysis added to medication field",
          duration: 3000
        });
      }
    } catch (error) {
      console.error("Error applying recommendations:", error);
      toast({
        description: "Error applying recommendations",
        variant: "destructive"
      });
    }
  };

  // Helper function to extract medication info from AI response
  const extractMedicationFromRecommendation = (recommendation: string) => {
    const lines = recommendation.split('\n');
    const medicationLines = [];
    let inMedicationSection = false;
    
    for (const line of lines) {
      const lowerLine = line.toLowerCase();
      
      // Check if we're entering a medication/treatment section
      if (lowerLine.includes('treatment') || 
          lowerLine.includes('medication') || 
          lowerLine.includes('prescrib') ||
          lowerLine.includes('dosage')) {
        inMedicationSection = true;
        medicationLines.push(line);
        continue;
      }
      
      // Check if we're leaving the medication section
      if (inMedicationSection && (
          lowerLine.includes('monitoring') ||
          lowerLine.includes('red flag') ||
          lowerLine.includes('follow-up') ||
          lowerLine.includes('disclaimer')
      )) {
        break;
      }
      
      if (inMedicationSection) {
        medicationLines.push(line);
      }
    }
    
    return medicationLines.length > 1 ? medicationLines.join('\n') : null;
  };

  // Clear AI recommendations
  const clearRecommendations = () => {
    setAiRecommendation("");
    toast({
      description: "AI recommendations cleared"
    });
  };

  const handleContinue = async () => {
    if (!patientId) {
      console.error("No patient ID found.");
      toast({
        description: "No patient selected. Please select a patient first.",
        variant: "destructive"
      });
      return;
    }

    const docNotes = { 
      medication, 
      diagnosis, 
      symptoms, 
      aiRecommendation,
      timestamp: new Date().toISOString() 
    };

    try {
      await setDoc(doc(db, "doctor_notes", patientId), docNotes);
      
      toast({
        description: '✅ Prescription details saved successfully. Proceeding to Pharmacy...',
        duration: 3000
      });
      
      console.log("Doctor's notes saved successfully!");
      setDocNotes(docNotes);
      router.push("/pharmacy");
      
    } catch (error) {
      console.error("Error saving doctor's notes:", error);
      toast({
        description: "Failed to save doctor's notes. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row gap-5 w-full">
        <div className="w-full md:w-1/3">
          <label>{"Patient's"} symptoms</label>
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
          <Textarea
            value={medication}
            onChange={(e) => setMedication(e.target.value)}
            className="mt-3 focus-visible:ring-0 focus-visible:ring-offset-0 min-h-44"
            placeholder="Prescribe medications..."
          />
        </div>  
      </div>

      {/* AI Recommendation Section */}
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
                  <CheckCircle className="w-4 h-4" />
                  Apply to Prescription
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
                AI-generated suggestions. Always consult qualified healthcare professionals for final medical decisions.
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-sm flex items-center">
              {symptoms.trim() 
                ? "Click 'Generate Analysis' to get AI-powered medical recommendations based on the symptoms."
                : "Enter patient symptoms above to get comprehensive AI-powered diagnostic and treatment suggestions."
              }
            </p>
          )}
        </div>
      </div>

      <div className="my-10 flex justify-end">
        <Button onClick={handleContinue} className="bg-green-1">
          Proceed to Pharmacy
        </Button>
      </div>
    </>
  );
};

export default DoctorNotes;