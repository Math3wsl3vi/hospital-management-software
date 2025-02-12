'use client'
import History from "@/components/History";
import TriageInput from "@/components/TriageInput";
import Vitals from "@/components/Vitals";
import { useToast } from "@/hooks/use-toast";
import { useUserStore } from "@/stores/UseStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const NurseUser = () => {
  const selectedUser = useUserStore((state) => state.selectedUser);
  const router = useRouter()
  const [user, setUser] = useState(null);
  const { toast  } = useToast()

   useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user") || "null");
        if (!storedUser || storedUser.role !== "nurse" || storedUser.role !== 'admin') {
          router.push("/sign-in"); 
          toast({description:'You are not authorized to visit this page'})
        } else {
          setUser(storedUser);
        }
      }, [router, toast]);
    
      if (!user) return <p>Loading...</p>;
    

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
      <hr  className="my-7"/>
      <History/>
      <Vitals/>
      
    </div>
  );
};

export default NurseUser;
