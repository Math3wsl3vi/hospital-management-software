'use client';

import { Suspense } from "react";
import History from "@/components/History";
import TriageInput from "@/components/TriageInput";
import Vitals from "@/components/Vitals";
import { useUserStore } from "@/stores/UseStore";

// Create a separate component for the content that might use useSearchParams
function NurseContent() {
  const selectedUser = useUserStore((state) => state.selectedUser);

  return (
    <div className="font-poppins">
      <div className="flex justify-between">
        <h1 className="text-center text-xl mb-5">Welcome to Triage</h1>
        <div className="flex flex-row gap-1 items-center">
          <label className="text-xl">Bill:</label>
          <h1 className="border p-1 px-3 rounded-md">ksh: 350</h1>
        </div>
      </div>
      <TriageInput selectedUser={selectedUser} />
      <hr className="my-7" />
      <History />
      <Vitals />
    </div>
  );
}

// Main component with Suspense boundary
const NurseUser = () => {
  return (
    <Suspense fallback={<div className="p-4">Loading triage page...</div>}>
      <NurseContent />
    </Suspense>
  );
};

export default NurseUser;