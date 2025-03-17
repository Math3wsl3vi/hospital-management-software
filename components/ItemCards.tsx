import { ItemCard } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ItemCards = () => {
  return (
    <div className='grid grid-cols-5 gap-5'>
        {ItemCard.map((item)=>{
            return (
                <Link href={item.route} key={item.id} className='border rounded-md h-[150px] p-4 flex items-center justify-center flex-col bg-slate-50 cursor-pointer font-pop'>
                    <div className='flex-1'>
                    <Image
                    src={item.icon}
                    alt={item.name}
                    width={40}
                    height={40}
                    />
                    </div>
                    <div className='py-3 flex items-center justify-start flex-col'>
                    <h1 className='text-center'>{item.name}</h1>
                    </div>
                </Link>
            )
        })}
        
    </div>
  )
}

export default ItemCards