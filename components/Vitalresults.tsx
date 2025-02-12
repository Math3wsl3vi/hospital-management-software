"use client";
import { useVitalsStore } from "@/stores/VitalsStore";
import React from "react";

const Vitalresults = () => {
  const { vitals } = useVitalsStore();
  return (
    <div>
      <div className="flex flex-row gap-5 justify-between lg:flex-wrap lg:justify-start">
        <div className="w-[200px]">
          <label className="">Weight (Kg)</label>
          <h1 className="border rounded-md p-1 mt-2">{vitals.weight}</h1>
        </div>
        <div className="w-[200px]">
          <label className="">height (cm)</label>
          <h1 className="border rounded-md p-1 mt-2">{vitals.height}</h1>
        </div>
        <div className="w-[200px]">
          <label>Temperature (C)</label>
          <h1 className="border rounded-md p-1 mt-2">{vitals.temp}</h1>
        </div>
        <div className="w-[200px]">
          <label>Blood Pressure</label>
          <h1 className="border rounded-md p-1 mt-2">{vitals.bpm}</h1>
        </div>
        <div className="w-[200px]">
          <label>Heart rate (BPM)</label>
          <h1 className="border rounded-md p-1 mt-2">{vitals.heart}</h1>
        </div>
        <div className="w-[200px]">
          <label>Respiratory Rate</label>
          <h1 className="border rounded-md p-1 mt-2">{vitals.rate}</h1>
        </div>
      </div>
     
    </div>
  );
};

export default Vitalresults;
