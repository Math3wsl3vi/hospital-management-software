import DoctorForm from '@/components/DoctorForm'
import React from 'react'

const DoctorRegistration = () => {
  return (
    <div>
      <div className='flex justify-between'>
     <h1 className='text-xl'>Doctor Registration</h1>
     <div className='border p-1 px-3 rounded-md'>
      <h1>Nurse Alfredo</h1>
     </div>
      </div>
        {/* top part */}
        {/* personal details */}
        <DoctorForm/>
        {/* address */}
        {/* next of kin */}
    </div>
  )
}

export default DoctorRegistration