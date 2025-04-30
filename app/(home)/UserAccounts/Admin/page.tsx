import AppointmentTable from '@/components/AppointmentTable'
// import BigCalender from '@/components/BigCalender'
import DoctorAvailability from '@/components/DoctorAvailability'
import HomeCalendar from '@/components/HomeCalendar'
import ItemCards from '@/components/ItemCards'
import NoticeBoard from '@/components/NoticeBoard'
import React from 'react'

const HomePage = () => {
  return (
    <div className='flex flex-col gap-10'>
      <div>
        <HomeCalendar/>
      </div>
      <div className='w-full'>
      {/* item cards */}
      <ItemCards/>
      </div>
      <div className='flex flex-row gap-5 min-h-full xl:flex-col'>
      <div className=''>
      <NoticeBoard/>
      </div>
      </div>
      <div className='flex flex-col gap-5 min-h-full items-start'>
        <AppointmentTable/>
        <DoctorAvailability/>
      </div>
     
    </div>
  )
}

export default HomePage