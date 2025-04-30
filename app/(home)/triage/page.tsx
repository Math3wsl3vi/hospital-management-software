'use client'
import History from "@/components/History";
import TriageInput from "@/components/TriageInput";
import Vitals from "@/components/Vitals";
import { useUserStore } from "@/stores/UseStore";
import { Suspense } from "react";

const TriagePage = () => {
  const selectedUser = useUserStore((state) => state.selectedUser);

  return (
    <div className="font-poppins">
      <div className="flex justify-between mb-5">
      <h1 className="text-center text-xl mb-5">Welcome to Triage</h1>
      <div className="flex flex-row gap-1 items-center">
        <label className="text-xl">Bill:</label>
        <h1 className="border p-1 px-3 rounded-md">ksh: 350</h1>
      </div>
      </div>
      <TriageInput selectedUser={selectedUser} />
      <hr  className="my-7"/>
      <History/>
      <Suspense fallback={<div>Loading...</div>}>
      <Vitals/>
    </Suspense>
     
      
    </div>
  );
};

export default TriagePage;
