import React from 'react';

function GoogleAnalytics({ trackingId }) {
  const injectGA = () => {
    if (typeof window === 'undefined') {
      return;
    }
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', trackingId);
  };

  return (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`} />
      <script>{injectGA()}</script>
    </>
  );
}

export default GoogleAnalytics;
