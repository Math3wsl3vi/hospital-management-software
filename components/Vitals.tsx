"use client";
import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useVitalsStore } from "@/stores/VitalsStore";
import { useRouter, useSearchParams } from "next/navigation";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/configs/firebase.config";

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

  const handleContinue = async () => {
    setVitals({ weight, temp, bpm, heart, rate, height });
    await saveVitalsToFirestore();
    router.push("/consultation");
  };

  return (
    <div className="w-full">
      <h1 className="text-xl mb-7 font-semibold">Vital Signs</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium">Weight (Kg)</label>
          <Input
            className="mt-2"
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Height (cm)</label>
          <Input
            className="mt-2"
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Temperature (°C)</label>
          <Input
            className="mt-2"
            type="number"
            value={temp}
            onChange={(e) => setTemp(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Blood Pressure</label>
          <Input
            className="mt-2"
            value={bpm}
            onChange={(e) => setBpm(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Heart Rate (BPM)</label>
          <Input
            className="mt-2"
            type="number"
            value={heart}
            onChange={(e) => setHeart(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Respiratory Rate</label>
          <Input
            className="mt-2"
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          />
        </div>
      </div>

      <div className="my-6 w-full flex justify-end">
        <Button onClick={handleContinue} className="bg-green-600 text-white hover:bg-green-700">
          Proceed to Consultation
        </Button>
      </div>
    </div>
  );
};

export default Vitals;
