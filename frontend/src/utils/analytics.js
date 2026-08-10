export const initGA4 = () => {
  const measurementId = import.meta.env.VITE_GA4_MEASUREMENT_ID;
  if (!measurementId || measurementId.includes('G-XXXXXXXXXX')) {
    return;
  }
  if (!window.gtag) {
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    script.async = true;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', measurementId);
  }
};

export const trackPageView = (url, title) => {
  if (window.gtag && import.meta.env.VITE_GA4_MEASUREMENT_ID) {
    window.gtag('event', 'page_view', {
      page_location: url,
      page_title: title
    });
  }
};
