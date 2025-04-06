import React, { useEffect } from 'react'
import AdSense from '../src/ads/Adsense'

function NfApp() {

  return (
    <div className='w-screen h-screen grid grid-rows-12 bg-amber-500 md:hidden'>
      <div className='bg-blue-500 row-span-1'>
        {/* 🔝 AdSense Ads Container */}
        <AdSense />
      </div>
      <div className='bg-green-500 row-span-8'></div>
      <div className='bg-red-500 row-span-3 text-xl p-2'>
        <div className='bg-white text-black grid grid-rows-3 w-full h-full'>
          <div className='bg-orange-500 row-span-2'>
            <input type="range" name="" min={10} max={100} id="" />
          </div>
          <div className='bg-blue-400 flex flex-row overflow-x-auto overflow-y-hidden gap-1 items-center px-2'>
            {
              Array.from("NAVEDALI").map((item, index) => (
                <div key={index} className='h-15 w-15 bg-black aspect-square flex items-center text-white justify-center text-2xl font-bold rounded-xl'>{item}</div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default NfApp