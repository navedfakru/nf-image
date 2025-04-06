import React, {useEffect} from 'react'

function NfApp() {

  useEffect(() => {
    // ✅ Load AdSense Script
    const script = document.createElement('script');
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5765353401158683';
    script.async = true;
    script.crossOrigin = 'anonymous';
    document.body.appendChild(script);

    // ✅ Push Ad
    const timeout = setTimeout(() => {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error('AdSense error:', e);
      }
    }, 1000);

    return () => {
      document.body.removeChild(script);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className='w-screen h-screen grid grid-rows-12 bg-amber-500 md:hidden'>
      <div className='bg-blue-500 row-span-1'>
        {/* 🔝 AdSense Ads Container */}
        <div className="bg-white flex items-center justify-center px-2">
          <ins className="adsbygoogle"
            style={{ display: "block", width: "100%", height: "100%" }}
            data-ad-client="ca-pub-5765353401158683"  // <- 🔁 Replace with your AdSense ID
            data-ad-slot="2394571922"                 // <- 🔁 Replace with your Ad slot ID
            data-ad-format="auto"
            data-full-width-responsive="true"></ins>
        </div>
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