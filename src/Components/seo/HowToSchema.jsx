import Script from "next/script";

export default function HowToSchema({ title, process = [] }) {
  if (!Array.isArray(process) || process.length === 0) {
    return null;
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: title,
    totalTime: "PT15M",
    step: process.map((item, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: `Step ${index + 1}`,
      text: item
    }))
  };

  return (
    <Script
      id="howto-schema"
      type="application/ld+json"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema)
      }}
    />
  );
}
