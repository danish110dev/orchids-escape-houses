import Script from "next/script";

export default function OrganizationSchema() {
  const baseUrl = "https://groupescapehouses.co.uk";
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${baseUrl}/#organization`,
    "name": "Group Escape Houses",
    "url": `${baseUrl}/`,
    "logo": {
      "@type": "ImageObject",
      "url": `${baseUrl}/logo.png`, // Assuming a logo exists at this path
      "width": 600,
      "height": 60
    },
    "description": "Group Escape Houses lists large group houses and cottages across the UK. Guests enquire and book directly with property owners, with no commission.",
    "telephone": "01273 569301",
    "email": "hello@thehenfairy.co.uk",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "11a North Street",
      "addressLocality": "Brighton",
      "postalCode": "BN41 1DH",
      "addressCountry": "GB"
    },
    "sameAs": [
      "https://www.instagram.com/groupescapehouses/",
      // Add other social links if available
    ]
  };

  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
