import React, { useEffect } from 'react';

const SEO = ({
  title,
  description,
  keywords,
  canonical,
  ogImage = '/logo.jpg',
  ogType = 'website',
  schemaJson = null
}) => {
  useEffect(() => {
    // 1. Update Document Title
    const fullTitle = title 
      ? `${title} | Medico Overseas` 
      : 'Medico Overseas | NMC Approved MBBS Abroad Consultancy for Indian Students';
    document.title = fullTitle;

    // Helper function to set or create meta tags
    const setMetaTag = (selector, attrName, attrValue, content) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Helper function to set link tags
    const setLinkTag = (rel, href) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // 2. Meta Description
    const metaDescription = description || 
      'Official Medico Overseas Consultancy: Direct MBBS admission in NMC & WHO approved medical universities in Russia, Georgia, Kazakhstan, Uzbekistan, and Kyrgyzstan. Transparent fees & FMGE coaching.';
    setMetaTag('meta[name="description"]', 'name', 'description', metaDescription);

    // 3. Meta Keywords
    const metaKeywords = keywords || 
      'MBBS abroad, study MBBS in Russia, MBBS in Georgia, MBBS in Uzbekistan, NMC approved medical colleges, FMGE coaching, NMAT exam, MBBS fees abroad for Indian students, Medico Overseas';
    setMetaTag('meta[name="keywords"]', 'name', 'keywords', metaKeywords);

    // 4. Canonical URL
    const currentUrl = canonical || window.location.href;
    setLinkTag('canonical', currentUrl);

    // 5. OpenGraph Tags
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', fullTitle);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', metaDescription);
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', currentUrl);
    setMetaTag('meta[property="og:image"]', 'property', 'og:image', window.location.origin + ogImage);
    setMetaTag('meta[property="og:type"]', 'property', 'og:type', ogType);

    // 6. Twitter Card Tags
    setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', fullTitle);
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', metaDescription);
    setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', window.location.origin + ogImage);

    // 7. Google Search Console Verification Meta Tag
    setMetaTag('meta[name="google-site-verification"]', 'name', 'google-site-verification', 'medico_gsc_verification_code_2026');

    // 8. Schema.org JSON-LD Structured Data
    let schemaScript = document.getElementById('json-ld-schema');
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.id = 'json-ld-schema';
      schemaScript.type = 'application/ld+json';
      document.head.appendChild(schemaScript);
    }

    const defaultOrganizationSchema = {
      '@context': 'https://schema.org',
      '@type': 'EducationalOrganization',
      'name': 'Medico Overseas',
      'alternateName': 'Medico Overseas MBBS Abroad Consultancy',
      'url': window.location.origin,
      'logo': window.location.origin + '/logo.png',
      'telephone': '+91-9876543210',
      'priceRange': '₹3.5 Lakhs - ₹7 Lakhs / year',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'Central Office, Medical Hub',
        'addressLocality': 'New Delhi',
        'addressCountry': 'IN'
      },
      'sameAs': [
        'https://facebook.com',
        'https://instagram.com',
        'https://youtube.com'
      ]
    };

    const finalSchema = schemaJson ? schemaJson : defaultOrganizationSchema;
    schemaScript.text = JSON.stringify(finalSchema);

    // Window scroll to top on route change & GA4 track
    window.scrollTo(0, 0);
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', { page_title: fullTitle, page_location: currentUrl });
    }

  }, [title, description, keywords, canonical, ogImage, ogType, schemaJson]);

  return null;
};

export default SEO;
