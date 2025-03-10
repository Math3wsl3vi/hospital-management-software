"use client";
import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useVitalsStore } from "@/stores/VitalsStore";
import { useRouter, useSearchParams } from "next/navigation";

import { doc, setDoc } from "firebase/firestore";
import { db } from "@/configs/firebase.config";

// 🏥 Vitals Component
const Vitals = () => {
  const { setVitals } = useVitalsStore();
  const [temp, setTemp] = useState("");
  const [weight, setWeight] = useState("");
  const [bpm, setBpm] = useState("");
  const [heart, setHeart] = useState("");
  const [rate, setRate] = useState("");
  const [height, setHeight] = useState("");
  
  const router = useRouter();
const searchParams = useSearchParams();
const [patientId, setPatientId] = useState<string | null>(null);

useEffect(() => {
  // Get and decode user query parameter
  const userParam = searchParams.get("user");
  if (userParam) {
    try {
      const decodedUser = JSON.parse(decodeURIComponent(userParam));
      setPatientId(decodedUser.id.toString());
      console.log("Extracted Patient ID:", decodedUser.id);
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  }
}, [searchParams]);
  
  // 🔹 Function to save vitals to Firestore
  const saveVitalsToFirestore = async () => {
    if (!patientId) {
      console.error("Patient ID not found!");
      return;
    }
  
    const vitalsData = {
      weight: parseFloat(weight) || 0,
      height: parseFloat(height) || 0,
      temperature: parseFloat(temp) || 0,
      bloodPressure: bpm,
      heartRate: parseInt(heart) || 0,
      respiratoryRate: parseInt(rate) || 0,
      timestamp: new Date().toISOString(),
    };
  
    try {
      await setDoc(doc(db, "vitals", patientId), vitalsData);
      console.log("Vitals saved successfully!");
    } catch (error) {
      console.error("Error saving vitals:", error);
    }
  };
  

  // 🔥 Handle Continue
  const handleContinue = async () => {
    setVitals({ weight, temp, bpm, heart, rate, height });
    
    // Save to Firestore before proceeding
    await saveVitalsToFirestore();

    router.push("/consultation");
  };

  return (
    <div>
      <h1 className="text-xl mb-7">Vital Signs</h1>
      <div className="flex">
        <div className="flex flex-row gap-10">
          <div>
            <label>Weight (Kg)</label>
            <Input className="mt-3" type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
          </div>
          <div>
            <label>Height (cm)</label>
            <Input className="mt-3" type="number" value={height} onChange={(e) => setHeight(e.target.value)} />
          </div>
          <div>
            <label>Temperature (°C)</label>
            <Input className="mt-3" type="number" value={temp} onChange={(e) => setTemp(e.target.value)} />
          </div>
          <div>
            <label>Blood Pressure</label>
            <Input className="mt-3" value={bpm} onChange={(e) => setBpm(e.target.value)} />
          </div>
          <div>
            <label>Heart Rate (BPM)</label>
            <Input className="mt-3" type="number" value={heart} onChange={(e) => setHeart(e.target.value)} />
          </div>
          <div>
            <label>Respiratory Rate</label>
            <Input className="mt-3" type="number" value={rate} onChange={(e) => setRate(e.target.value)} />
          </div>
        </div>
      </div>
      <div className="my-5 w-full flex justify-end">
        <Button onClick={handleContinue} className="bg-green-500">Proceed to Consultation</Button>
      </div>
    </div>
  );
};

export default Vitals;
