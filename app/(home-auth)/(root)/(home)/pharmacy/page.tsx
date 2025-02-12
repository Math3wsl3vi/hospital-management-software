'use client'
import DoctorNotesResults from '@/components/DoctorNotesResults'
import TriageInput from '@/components/TriageInput'
import { useUserStore } from '@/stores/UseStore'
import React from 'react'

const Pharmacy = () => {
  const selectedUser = useUserStore((state) => state.selectedUser)
  return (
    <div>
      <div className='flex justify-between'>
        <h1 className='text-xl'>Pharmacy</h1>
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

export default Pharmacy