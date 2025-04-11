"use client"

import Link from 'next/link'
import React from 'react'

function PhoneApp() {
  return (
    <div className='w-full h-full flex items-center justify-center bg-red-400/20'>
      <Link href={'/bg-remover'} className='px-4 py-2 bg-blue-500 text-white'>Go to bg remover</Link>
    </div>
  )
}

export default PhoneApp