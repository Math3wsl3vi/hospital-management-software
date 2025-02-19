"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");

    if (!user) {
      router.push("/sign-in"); 
    } else {
      switch (user.role) {
        case 'doctor':
          router.push('/UserAccounts/Doctor')
          break;
        case 'nurse':
          router.push('/UserAccounts/Nurse')
          break;
        case 'pharmacy':
            router.push('/UserAccounts/Pharmacy')
            break;
        case 'lab':
              router.push('/UserAccounts/Lab')    
              break;
        default:
          router.push('/UserAccounts/Admin')      
          break;
      }
    }
  }, [router]);

  return <h1>You are not authorized to view this page kindly go back. Please wait while being redirected to the auth page.<Loader/></h1>; // Placeholder while redirecting
}
