import React, { useEffect } from 'react';

function AdSense() {
  useEffect(() => {

    const scriptElement = document.querySelector(
      'script[src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5765353401158683"]'
    );

    const handleScriptLoad = () => {
      try {
        if(window.adsbygoogle){
          console.log("Pusingin Ads by Naved Ali google ads");
          adsbygoogle.push({});
        }else {
          scriptElement!.addEventListener("load", handleScriptLoad);
          console.log("waiting until adsense lib is loaded by Naved Ali")
        }
      } catch (err) {
        console.log("error in adsense by Naved ali:-", err)
      }
    }

    handleScriptLoad()
    
  }, []);

  return (
    <div className="ads-container">
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', height: '60px' }}
        data-ad-client="ca-pub-5765353401158683"
        data-ad-slot="2394571922"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}

export default AdSense;
