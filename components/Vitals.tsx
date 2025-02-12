"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useVitalsStore } from "@/stores/VitalsStore";
import { useRouter } from "next/navigation";

const Vitals = () => {
    const {setVitals } = useVitalsStore()
  const [temp, setTemp] = useState("");
  const [weight, setWeight] = useState("");
  const [bpm, setBpm] = useState("");
  const [heart, setHeart] = useState("");
  const [rate, setRate] = useState("");
  const [height, setHeight] = useState("");

  const router = useRouter()

  const handleContinue = () => {
    setVitals({ weight,temp, bpm,heart,rate, height});
    router.push('/consultation')
  }

  return (
    <div>
      <h1 className="text-xl mb-7">Vital Signs</h1>
      <div className="flex">
        <div className="flex flex-row gap-10">
          <div>
            <label>Weight (Kg)</label>
            <Input className="mt-3" value={weight} onChange={(e) => setWeight(e.target.value)} />
          </div>
          <div>
            <label>Height (cm)</label>
            <Input className="mt-3" value={height} onChange={(e) => setHeight(e.target.value)} />
          </div>
          <div>
            <label>Temperature(C)</label>
            <Input className="mt-3" value={temp} onChange={(e) => setTemp(e.target.value)} />
          </div>
          <div>
            <label>Blood Pressure</label>
            <Input className="mt-3" value={bpm} onChange={(e) => setBpm(e.target.value)} />
          </div>
          <div>
            <label>Heart rate (BPM)</label>
            <Input className="mt-3" value={heart} onChange={(e) => setHeart(e.target.value)} />
          </div>
          <div>
            <label>Respiratory Rate</label>
            <Input className="mt-3" value={rate} onChange={(e) => setRate(e.target.value)} />
          </div>
        </div>
      </div>
      <div className="my-5 w-full flex justify-end">
        <Button 
        onClick={handleContinue}
        className="bg-green-1">Proceed to consultation</Button>
      </div>
    </div>
  );
};

export default Vitals;
