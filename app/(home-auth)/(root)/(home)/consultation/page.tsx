"use client";
import DoctorNotes from "@/components/DoctorNotes";
import History from "@/components/History";
import TriageInput from "@/components/TriageInput";
import Vitalresults from "@/components/Vitalresults";
import { useUserStore } from "@/stores/UseStore";
import Link from "next/link";
import React from "react";

const Consultation = () => {
  const selectedUser = useUserStore((state) => state.selectedUser);
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-center text-xl mb-7">Consutlation Room</h1>
        <div className="flex flex-row gap-1 items-center">
          <label className="text-xl">Bill:</label>
          <h1 className="border p-1 px-3 rounded-md">ksh: 550</h1>
        </div>
      </div>
      <div className="flex flex-row justify-between mb-5">
        <h1 className="text-xl">{"Patient's"} Details</h1>
        <Link href={"/"} className="border p-1 px-3 rounded-md w-[200px]">
          <h1 className="text-center">Dr. Levi Mathews</h1>
        </Link>
      </div>
      <TriageInput selectedUser={selectedUser} />
      <hr className="my-7" />
      <h1 className="text-xl mb-3">{"Patient's"} Vitals</h1>
      <Vitalresults />
      <hr className="my-7" />
      <History />
      <hr className="my-7" />
      <div className="">
        <h1 className="text-xl mb-3">Consultation</h1>
        <DoctorNotes />
      </div>
    </div>
  );
};

export default Consultation;
