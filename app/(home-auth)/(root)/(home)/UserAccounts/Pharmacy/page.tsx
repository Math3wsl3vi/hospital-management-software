"use client"
import DoctorNotesResults from '@/components/DoctorNotesResults'
import TriageInput from '@/components/TriageInput'
import { useUserStore } from '@/stores/UseStore'
import React, { useEffect, useState } from 'react'

const PharmacyUser = () => {

      const [ user, setUser ] = useState<{ role: string} | null >(null)
      console.log(user)
  
      useEffect(()=> {
        const storedUser = localStorage.getItem("user");
        if(storedUser){
          setUser(JSON.parse(storedUser))
        }
      },[])
  const selectedUser = useUserStore((state) => state.selectedUser)
  return (
    <div>
      <div className='flex justify-between'>
        <h1 className='text-xl'>Pharmacy page</h1>
        <div className='border p-1 px-3 rounded-md'>
          <h1>Dr. Mevi Lathews</h1>
        </div>
      </div>
      <TriageInput selectedUser={selectedUser} />
      <hr className='my-7'/>
      <DoctorNotesResults/>
    </div>
  )
}

export default PharmacyUser