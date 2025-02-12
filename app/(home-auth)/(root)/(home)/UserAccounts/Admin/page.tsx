import AppointmentTable from '@/components/AppointmentTable'
// import BigCalender from '@/components/BigCalender'
import DoctorAvailability from '@/components/DoctorAvailability'
import ItemCards from '@/components/ItemCards'
import NoticeBoard from '@/components/NoticeBoard'
import React from 'react'

const HomePage = () => {
  return (
    <div className='flex flex-col gap-10'>
      <div className='w-full'>
      {/* item cards */}
      <ItemCards/>
      </div>
      <div className='flex flex-row gap-5 min-h-full xl:flex-col'>
         {/* calender */}
         {/* <div className='flex-1 xl:min-h-screen'>
         <BigCalender/>
         </div> */}
      {/* noticeboard */}
      <div>
      <NoticeBoard/>
      </div>
      </div>
      <div className='flex flex-row gap-5 min-h-full items-start'>
        <div className='flex-1'>
        <AppointmentTable/>
        </div>
        <DoctorAvailability/>

      </div>
     
    </div>
  )
}

export default HomePage