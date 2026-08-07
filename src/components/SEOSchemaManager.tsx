import React, { useEffect } from "react";

export const SEOSchemaManager: React.FC = () => {
  useEffect(() => {
    // LocalBusiness JSON-LD Schema
    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Kabadiwala Bhopal",
      "image": "https://kabadiwalabhopal.com/assets/kabadiwala-bhopal-logo.webp",
      "@id": "https://kabadiwalabhopal.com/#organization",
      "url": "https://kabadiwalabhopal.com",
      "telephone": "+918871600497",
      "priceRange": "₹₹",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Sharda Nagar, Rajeev Nagar, Nariyalkheda",
        "addressLocality": "Bhopal",
        "addressRegion": "Madhya Pradesh",
        "postalCode": "462100",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 23.2599333,
        "longitude": 77.412615
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "08:00",
        "closes": "20:00"
      },
      "sameAs": [
        "https://www.facebook.com/kabadiwalabhopal",
        "https://www.instagram.com/kabadiwala_bhopal",
        "https://www.linkedin.com/company/kabadiwalabhopal/",
        "https://g.page/r/CU8DHpC824HGEAE"
      ],
      "areaServed": [
        { "@type": "City", "name": "Bhopal" },
        { "@type": "AdministrativeArea", "name": "MP Nagar Bhopal" },
        { "@type": "AdministrativeArea", "name": "Arera Colony Bhopal" },
        { "@type": "AdministrativeArea", "name": "Kolar Road Bhopal" },
        { "@type": "AdministrativeArea", "name": "Habibganj Bhopal" },
        { "@type": "AdministrativeArea", "name": "Shahpura Bhopal" },
        { "@type": "AdministrativeArea", "name": "Bairagarh Bhopal" },
        { "@type": "AdministrativeArea", "name": "Ayodhya Bypass Bhopal" }
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "1280"
      }
    };

    // FAQPage JSON-LD Schema
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How can I book a doorstep scrap pickup in Bhopal?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can book a doorstep scrap pickup in Bhopal by calling 88716 00497, sending a WhatsApp message, or filling out the online booking form on Kabadiwala Bhopal. Our executive will arrive at your address with an ISO certified digital weighing scale."
          }
        },
        {
          "@type": "Question",
          "name": "Is doorstep scrap pickup free in Bhopal?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, doorstep scrap pickup is completely free across all major sectors of Bhopal including MP Nagar, Arera Colony, Kolar Road, and Habibganj for minimum scrap quantities."
          }
        },
        {
          "@type": "Question",
          "name": "What is today's newspaper (raddi) scrap rate in Bhopal?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Today's newspaper raddi rate in Bhopal is ₹18 to ₹22 per kg, with instant spot payment via Cash or UPI (Google Pay / PhonePe / Paytm)."
          }
        }
      ]
    };

    // Inject script tags into head
    const lbScript = document.createElement("script");
    lbScript.type = "application/ld+json";
    lbScript.text = JSON.stringify(localBusinessSchema);
    document.head.appendChild(lbScript);

    const faqScript = document.createElement("script");
    faqScript.type = "application/ld+json";
    faqScript.text = JSON.stringify(faqSchema);
    document.head.appendChild(faqScript);

    return () => {
      document.head.removeChild(lbScript);
      document.head.removeChild(faqScript);
    };
  }, []);

  return null;
};
