import React, { useEffect } from 'react';

function AdSense() {
  useEffect(() => {
    // Load AdSense Script Dynamically
    const script = document.createElement('script');
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5765353401158683';
    script.async = true;
    script.crossOrigin = 'anonymous';
    document.body.appendChild(script);

    // Push ads to window.adsbygoogle
    const timeout = setTimeout(() => {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error('AdSense Error:', e);
      }
    }, 1000);

    return () => {
      document.body.removeChild(script);
      clearTimeout(timeout);
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
