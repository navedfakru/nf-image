"use client";

import React, { useEffect } from "react";

const AdBanner = ({
  dataAdSlot,
  dataAdFormat,
  dataFullWidthResponsive,
}) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push(
        {}
      );
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-5765353401158683"
      data-ad-slot={dataAdSlot}
      data-ad-format={dataAdFormat}
      data-full-width-responsive={dataFullWidthResponsive.toString()}
    ></ins>
    // <amp-ad width="100vw" height="320"
    //   type="adsense"
    //   data-ad-client="ca-pub-5765353401158683"
    //   data-ad-slot="8376755834"
    //   data-auto-format="mcrspv"
    //   data-full-width="">
    //   <div overflow=""></div>
    // </amp-ad>
//     <amp-ad width="100vw" height="320"
//      type="adsense"
//      data-ad-client="ca-pub-5765353401158683"
//      data-ad-slot="2394571922"
//      data-auto-format="rspv"
//      data-full-width="">
//   <div overflow=""></div>
// </amp-ad>
  );
};

export default AdBanner;