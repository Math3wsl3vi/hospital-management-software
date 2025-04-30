"use client";
import React, { useEffect, useState } from 'react';

const HomeCalendar = () => {
    const [user, setUser] = useState<{ role: string } | null>(null);
    
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []); 

    const now = new Date();
    const time = now.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' });
    const date = new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(now);
    
    return (
        <div className='w-full min-h-[250px] sm:min-h-[300px] rounded-[20px] bg-hero bg-cover bg-center'>
            <div className='flex h-full justify-between flex-col p-4 sm:p-6 md:p-8 lg:p-11 text-white'>
                <h2 className='glassmorphism max-w-[300px] text-sm sm:text-base md:text-lg rounded py-2 text-center font-normal capitalize'>
                    Welcome {user?.role || 'User'}
                </h2>

                <div className='flex flex-col gap-1 sm:gap-2'>
                    <h1 className='text-3xl sm:text-4xl md:text-5xl font-extrabold'>
                        {time}
                    </h1>
                    <p className='text-base sm:text-lg md:text-xl lg:text-2xl font-medium text-sky-1'>
                        {date}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default HomeCalendar;
