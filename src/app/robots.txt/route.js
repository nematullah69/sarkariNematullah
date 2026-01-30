export async function GET() {
  const robots = `
User-agent: *
Allow: /

Sitemap: https://www.sarkariresult27.com/sitemap.xml
`;

  return new Response(robots.trim(), {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
