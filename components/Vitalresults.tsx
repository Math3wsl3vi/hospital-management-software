"use client";
import { useVitalsStore } from "@/stores/VitalsStore";
import React from "react";

const Vitalresults = () => {
  const { vitals } = useVitalsStore();

  return (
    <div className="p-4">
      <div className="flex flex-wrap gap-4 justify-start">
        {[
          { label: "Weight (Kg)", value: vitals.weight },
          { label: "Height (cm)", value: vitals.height },
          { label: "Temperature (°C)", value: vitals.temp },
          { label: "Blood Pressure", value: vitals.bpm },
          { label: "Heart Rate (BPM)", value: vitals.heart },
          { label: "Respiratory Rate", value: vitals.rate },
        ].map((item, index) => (
          <div
            key={index}
            className="w-full sm:w-[48%] md:w-[30%] lg:w-[200px] min-w-[150px]"
          >
            <label className="block text-sm font-medium text-gray-700">{item.label}</label>
            <h1 className="border rounded-md p-2 mt-1 text-gray-800 bg-white shadow-sm">
              {item.value}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vitalresults;
