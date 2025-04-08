import Link from 'next/link'
import React from 'react'

const Records = () => {
  return (
    <div>
        {/* item cards */}
        <div className='grid grid-cols-4 gap-10'>
            <Link href='/doctor' className='border min-h-44 rounded-md p-2 border-gray-300'>Doctors</Link>
            <Link href='/nurses' className='border min-h-44 rounded-md p-2 border-gray-300'>Nurses</Link>
            <Link href='/pharmacy' className='border min-h-44 rounded-md p-2 border-gray-300'>Pharmacist</Link>
            <Link href='/lab' className='border min-h-44 rounded-md p-2 border-gray-300'>Lab Technicians</Link>
        </div>
    </div>
  )
}

export default Records