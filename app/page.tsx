"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import Image from "next/image";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");

    if (!user) {
      router.push("/sign-in"); 
    } else {
      switch (user.role) {
        case 'doctor':
          router.push('/UserAccounts/Doctor');
          break;
        case 'nurse':
          router.push('/UserAccounts/Nurse');
          break;
        case 'pharmacy':
          router.push('/UserAccounts/Pharmacy');
          break;
        case 'lab':
          router.push('/UserAccounts/Lab');    
          break;
        default:
          router.push('/UserAccounts/Admin');      
          break;
      }
    }
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <div className="flex justify-center mb-6">
          <h1 className="font-poppins text-xl">N O V A M E D</h1>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Redirecting to Your Dashboard
        </h1>
        
        <p className="text-gray-600 mb-6">
          Please wait while we securely direct you to the appropriate portal...
        </p>
        
        <div className="flex justify-center">
          <Loader />
        </div>
        
        <p className="text-sm text-gray-500 mt-6">
          If {"you're"} not redirected automatically, please contact support
        </p>
      </div>
    </div>
  );
}