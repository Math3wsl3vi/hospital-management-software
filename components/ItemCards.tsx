import { ItemCard } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ItemCards = () => {
  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5 w-full'>
        {ItemCard.map((item)=>{
            return (
                <Link 
                    href={item.route} 
                    key={item.id} 
                    className='border rounded-md h-[120px] sm:h-[135px] md:h-[149px] p-3 sm:p-4 flex items-center justify-center flex-col bg-slate-50 cursor-pointer font-pop hover:shadow-md transition-all duration-200'
                >
                    <div className='flex-1 flex items-center'>
                        <Image
                            src={item.icon}
                            alt={item.name}
                            width={30}
                            height={30}
                            className='w-8 h-8 sm:w-10 sm:h-10'
                        />
                    </div>
                    <div className='py-2 sm:py-3 w-full'>
                        <h1 className='text-center text-xs sm:text-sm md:text-base line-clamp-2'>
                            {item.name}
                        </h1>
                    </div>
                </Link>
            )
        })}
    </div>
  )
}

export default ItemCards