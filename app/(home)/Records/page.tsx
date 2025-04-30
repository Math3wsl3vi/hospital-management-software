import DoctorAvailability from '@/components/DoctorAvailability'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Records = () => {
  return (
    <div>
      <h1 className='text-xl font-semibold mb-4 font-poppins text-green-1'>Hospital Employees List</h1>
        {/* item cards */}
        <div className='grid grid-cols-2 md:grid-cols-4 gap-10 mb-10'>
            <Link href='/doctor' className='border min-h-44 rounded-md p-2 border-gray-300 flex items-center justify-center gap-5 flex-col'>
            <Image src='/images/doctor.png' alt='doc' width={50} height={50}/>
            Doctors</Link>
            <Link href='/nurses' className='border min-h-44 rounded-md p-2 border-gray-300 flex items-center justify-center gap-5 flex-col'> 
             <Image src='/images/nurse.png' alt='doc' width={50} height={50}/>
            Nurses</Link>
            <Link href='/pharmacy' className='border min-h-44 rounded-md p-2 border-gray-300 flex items-center justify-center gap-5 flex-col'> 
             <Image src='/images/pharmacist.png' alt='doc' width={50} height={50}/>
            Pharmacist</Link>
            <Link href='/lab' className='border min-h-44 rounded-md p-2 border-gray-300 flex items-center justify-center gap-5 flex-col'> 
             <Image src='/images/lab.png' alt='doc' width={50} height={50}/>
            Lab Technicians</Link>
        </div>
       <DoctorAvailability/>
    </div>
  )
}

export default Records