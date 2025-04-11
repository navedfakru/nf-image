"use client"

import React, { useState } from 'react'
import AdBanner from './AdBanner'

function NfApp() {
  const [control, setControl] = useState("")

  return (
    <>
    {/* <AdBanner dataAdFormat="auto" dataFullWidthResponsive={true} dataAdSlot="2394571922" /> */}
    <div className='w-screen h-[85vh] grid grid-rows-12 bg-amber-500 md:hidden'>
      <div className='bg-green-500 row-span-8'></div>
      <div className='bg-red-500 row-span-4 text-xl p-2'>
        <div className='bg-white text-black grid grid-rows-3 w-full h-full'>
          <div className='bg-orange-500 row-span-2'>
            <input type="range" name="" min={10} max={100} id="" />
            <h1 className='text-xl font-mono font-black'>{control}</h1>
          </div>
          <div className='bg-blue-400 flex flex-row overflow-x-auto overflow-y-hidden gap-1 items-center px-2'>
            {
              Array.from("NAVEDALI").map((item, index) => (
                <div onClick={() => setControl(item)} key={index} className='h-15 w-15 bg-black aspect-square flex items-center text-white justify-center text-2xl font-bold rounded-xl'>{item}</div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
    {/* <AdBanner dataAdFormat="autorelaxed" dataFullWidthResponsive={true} dataAdSlot="8376755834" /> */}
    </>
  )
}

export default NfApp