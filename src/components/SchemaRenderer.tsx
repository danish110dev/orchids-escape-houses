/**
 * SchemaRenderer Component
 * Renders JSON-LD schemas in the page head
 * Use on individual pages to add page-specific schemas
 */

import Script from "next/script";

interface SchemaRendererProps {
  schemas: Array<Record<string, any>>;
}

export function SchemaRenderer({ schemas }: SchemaRendererProps) {
  return (
    <>
      {schemas.map((schema, index) => (
        <Script
          key={`schema-${index}`}
          id={`schema-${schema["@id"]?.replace(/[^a-z0-9]/gi, "")}-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
