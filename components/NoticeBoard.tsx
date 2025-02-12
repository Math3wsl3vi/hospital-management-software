import Image from 'next/image'
import React from 'react'

const NoticeBoard = () => {
  return (
    <div className='border h-fit font-poppins'>
      <h1 className='text-center bg-slate-50 w-full h-11 flex items-center justify-center'>Notice Board</h1>
      <div className='px-5 flex gap-2 flex-col'>
        <div className='flex flex-row gap-3 items-center mt-3 py-2'>
          <div className='p-3'>
            <Image src='/images/tag.png' alt='tag' width={40} height={40}/>
          </div>
          <div>
            <h1>Ward Rounds</h1>
            <p className='text-sm text-gray-400'>Ward rounds to be done in the morning from 7am</p>
          </div>
        </div>
        <div className='flex flex-row gap-3 items-center py-2'>
          <div className='p-3'>
            <Image src='/images/tag.png' alt='tag' width={40} height={40}/>
          </div>
          <div>
            <h1>Lab Rounds</h1>
            <p className='text-sm text-gray-400'>Lab rounds to be done in the morning from 7am</p>
          </div>
        </div>
        <div className='flex flex-row gap-3 items-center py-2'>
          <div className='p-3'>
            <Image src='/images/tag.png' alt='tag' width={40} height={40}/>
          </div>
          <div>
            <h1>Lab Rounds</h1>
            <p className='text-sm text-gray-400'>Lab rounds to be done in the morning from 7am</p>
          </div>
        </div>
        <div className='flex flex-row gap-3 items-center py-2'>
          <div className='p-3'>
            <Image src='/images/tag.png' alt='tag' width={40} height={40}/>
          </div>
          <div>
            <h1>Lab Rounds</h1>
            <p className='text-sm text-gray-400'>Lab rounds to be done in the morning from 7am</p>
          </div>
        </div>
        <div className='flex flex-row gap-3 items-center py-2'>
          <div className='p-3'>
            <Image src='/images/tag.png' alt='tag' width={40} height={40}/>
          </div>
          <div>
            <h1>Lab Rounds</h1>
            <p className='text-sm text-gray-400'>Lab rounds to be done in the morning from 7am</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoticeBoard