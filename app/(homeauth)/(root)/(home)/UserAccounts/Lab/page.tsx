"use client"
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const LabUser = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const { toast } = useToast()

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");
    if (!storedUser || storedUser.role !== "lab" || storedUser.role !== 'admin') {
      toast({description:'You are not authorized to visit this page'})
      router.push("/sign-in"); 
    } else {
      setUser(storedUser);
    }
  }, [router, toast]);

  if (!user) return <p>Loading...</p>;
  return (
    <div>welcome to the lab page</div>
  )
}

export default LabUser