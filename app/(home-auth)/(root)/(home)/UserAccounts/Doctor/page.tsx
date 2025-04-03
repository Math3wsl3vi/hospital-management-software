"use client";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { useToast } from "@/hooks/use-toast";
import DoctorNotes from "@/components/DoctorNotes";
import TriageInput from "@/components/TriageInput";
import Vitalresults from "@/components/Vitalresults";
import History from "@/components/History";
import Link from "next/link";
import { useUserStore } from "@/stores/UseStore";

export default function DoctorPage() {
    const selectedUser = useUserStore((state) => state.selectedUser);
  // const router = useRouter();
  // const [user, setUser] = useState(null);
  // const { toast } = useToast()

  // useEffect(() => {
  //   const storedUser = JSON.parse(localStorage.getItem("user") || "null");
  //   if (!storedUser || storedUser.role !== "doctor" || storedUser.role !== 'admin') {
  //     toast({description:'You are not authorized to visit this page'})
  //     router.push("/sign-in"); 
  //   } else {
  //     setUser(storedUser);
  //   }
  // }, [router, toast]);

  // if (!user) return <p>Loading...</p>;

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

