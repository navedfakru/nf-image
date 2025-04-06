import React, { useEffect } from 'react';

function AdSense() {
  useEffect(() => {
    const scriptElement = document.createElement('script');
    scriptElement.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5765353401158683';
    scriptElement.async = true;
    scriptElement.crossOrigin = 'anonymous';

    // Event listener for when the script is loaded
    const handleScriptLoad = () => {
      try {
        if (window.adsbygoogle) {
          console.log("Pushing ads by Naved Ali Google Ads");
          window.adsbygoogle.push({});
        } else {
          console.log("adsbygoogle library not found, retrying...");
        }
      } catch (err) {
        console.log("Error in AdSense by Naved Ali:", err);
      }
    };

    // Append script element to body
    document.body.appendChild(scriptElement);

    // Add load event listener
    scriptElement.addEventListener('load', handleScriptLoad);

    // Cleanup when component unmounts
    return () => {
      document.body.removeChild(scriptElement);
    };
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
