import PatientForm from '@/components/PatientForm'
import React from 'react'

const PatientRegistration = () => {
  return (
    <div>
      <div className='flex justify-between'>
     <h1 className='text-xl'>Patient Registration</h1>
     <div className='border p-1 px-3 rounded-md'>
      <h1>Nurse Alfredo</h1>
     </div>
      </div>
        {/* top part */}
        {/* personal details */}
      <PatientForm/>
        {/* address */}
        {/* next of kin */}
    </div>
  )
}

export default PatientRegistration