type StructuredDataProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
  id?: string;
};

export function StructuredData({ data, id }: StructuredDataProps) {
  const nodes = Array.isArray(data) ? data : [data];

  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": nodes,
        }).replace(/</g, "\\u003c"),
      }}
    />
  );
}
