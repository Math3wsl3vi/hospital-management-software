"use client"
import React, { useEffect, useState } from 'react'

const HomeCalendar = () => {
    const [user, setUser] = useState<{ role: string } | null>(null);
      useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      }, []); 
    const now = new Date();

    const time = now.toLocaleString('en-Us',{hour:'2-digit',minute:'2-digit'});
    const date = (new Intl.DateTimeFormat('en-Us',{dateStyle: 'full'})).format(now)
    
  return (
    <div className='h-[300px] w-full rounded-[20px] bg-hero bg-cover'>
        <div className='flex h-full justify-between flex-col max-md:px-5 max-md:py-8 lg:p-11 text-white'>
          <h2 className='glassmorphism max-w-[270px] rounded py-2 text-center text-base font-normal capitalize'>Welcome {user?.role}</h2>
          <div className='flex flex-col gap-2'>
            <h1 className='lg:text-5xl font-extrabold text-4xl'>{time}</h1>
            <p className='text-lg text-sky-1 lg:text-4xl font-medium'>{date}</p>
          </div>
        </div>
      </div>
  )
}

export default HomeCalendar