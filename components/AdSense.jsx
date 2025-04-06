"use client"

import Script from 'next/script';
import React from 'react'

const AdSense = ({ pId }) => {
  return (
    <Script
      async={true}
      crossOrigin='anonymous'
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${pId}`}
      strategy='afterInteractive'
    />
  )
}

export default AdSense

