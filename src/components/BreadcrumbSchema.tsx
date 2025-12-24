interface BreadcrumbItem {
  name: string;
  item: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

export default function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const baseUrl = "https://www.groupescapehouses.co.uk";

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => {
      const itemUrl = (item as any).item || (item as any).url || "";
      return {
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": itemUrl.startsWith("http") ? itemUrl : `${baseUrl}${itemUrl.startsWith("/") ? "" : "/"}${itemUrl}`
      };
    })
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
