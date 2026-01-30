export const runtime = "nodejs";

export async function GET() {
  const BASE_URL = "https://www.governmentexam.online";
  const TODAY = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

  try {
    // 🔹 All Gist sources (add/remove anytime)
    const GISTS = [
      {
        url: "https://gist.githubusercontent.com/shahidafridi-collab/9fb5f95e93ed95eba1959d1a18ac6bf7/raw/combine_result",
        type: "results"
      },
      {
        url: "https://gist.githubusercontent.com/shahidafridi-collab/3d4fa23aadd9be02be79a58e46009126/raw/gistfile1.txt",
        type: "jobs"
      },
      {
        url: "https://gist.githubusercontent.com/shahidafridi-collab/d6610e1b9fb8e2617c2999d1edc0851c/raw/gistfile1.txt",
        type: "admit-cards"
      },
      {
        url: "https://gist.githubusercontent.com/shahidafridi-collab/2203569eeb7046f824f7eddb7613d065/raw/gistfile1.txt",
        type: "admissions"
      },
      {
        url: "https://gist.githubusercontent.com/shahidafridi-collab/c687d6e00dcc0a79bd689a520de733c6/raw/syllabus",
        type: "syllabus"
      },
      {
        url: "https://gist.githubusercontent.com/shahidafridi-collab/d5e219d111e2acb930b89d68beb44d92/raw/answerKey",
        type: "answer-keys"
      }
    ];

    // 🔹 Fetch all gists in parallel with better error handling
    const responses = await Promise.allSettled(
      GISTS.map((g) =>
        fetch(g.url, { 
          cache: "no-store",
          next: { revalidate: 3600 }
        }).then((res) => {
          if (!res.ok) throw new Error(`Failed to fetch ${g.type}`);
          return res.json();
        })
      )
    );

    // 🔹 Collect URLs with their data
    const urlEntries = [];

    responses.forEach((result, index) => {
      if (result.status === 'rejected') {
        console.error(`Failed to fetch ${GISTS[index].type}:`, result.reason);
        return;
      }

      const data = result.value;
      const gistType = GISTS[index].type;

      // Case 1: homepage-style categories
      if (data && data.categories) {
        data.categories.forEach((cat) => {
          if (cat.link) {
            urlEntries.push({
              url: cat.link,
              type: gistType,
              lastmod: cat.lastUpdated || TODAY
            });
          }
          cat.items?.forEach((item) => {
            if (item.link) {
              urlEntries.push({
                url: item.link,
                type: gistType,
                lastmod: item.date || item.lastUpdated || TODAY
              });
            }
          });
        });
      }

      // Case 2: flat array (results, syllabus, etc.)
      if (Array.isArray(data)) {
        data.forEach((item) => {
          if (item && item.id) {
            urlEntries.push({
              url: `/${gistType}/${item.id}`,
              type: gistType,
              lastmod: item.updatedDate || item.date || item.lastUpdated || TODAY
            });
          } else if (item && item.link) {
            urlEntries.push({
              url: item.link,
              type: gistType,
              lastmod: item.date || item.lastUpdated || TODAY
            });
          }
        });
      }
    });

    // 🔹 Remove duplicates and filter invalid URLs
    const uniqueUrlEntries = [];
    const seenUrls = new Set();

    urlEntries.forEach(entry => {
      if (entry.url && typeof entry.url === 'string' && entry.url.trim() !== '' && !seenUrls.has(entry.url)) {
        seenUrls.add(entry.url);
        uniqueUrlEntries.push(entry);
      }
    });

    // 🔹 Static URLs with their own lastmod dates
    const staticUrls = [
      { url: "", lastmod: TODAY, type: "home" },
      { url: "/jobs", lastmod: TODAY, type: "jobs" },
      { url: "/results", lastmod: TODAY, type: "results" },
      { url: "/admit-cards", lastmod: TODAY, type: "admit-cards" },
      { url: "/answer-keys", lastmod: TODAY, type: "answer-keys" },
      { url: "/admissions", lastmod: TODAY, type: "admissions" },
      { url: "/syllabus", lastmod: TODAY, type: "syllabus" },
      { url: "/about", lastmod: "2024-01-01", type: "static" },
      { url: "/contact", lastmod: "2024-01-01", type: "static" },
      { url: "/privacy-policy", lastmod: "2024-01-01", type: "static" },
      { url: "/terms-of-service", lastmod: "2024-01-01", type: "static" },
      { url: "/disclaimer", lastmod: "2024-01-01", type: "static" }
    ];

    // 🔹 Build XML with better formatting
    const urlsXml = [...staticUrls, ...uniqueUrlEntries]
      .filter(entry => entry.url !== undefined && entry.url !== null)
      .map((entry) => {
        const cleanPath = entry.url.startsWith('/') ? entry.url : `/${entry.url}`;
        const cleanUrl = cleanPath === '//' ? '' : cleanPath.replace('//', '/');
        
        // Set priority based on URL importance
        const priority = cleanUrl === "" ? "1.0" : 
                        (cleanUrl === "/jobs" || cleanUrl === "/results") ? "0.9" : 
                        "0.8";
        
        // Set change frequency based on content type
        let changefreq = "daily"; // Default to daily for most content
        
        // Only set to weekly for static pages that rarely change
        if (entry.type === "static") {
          changefreq = "weekly";
        }
        
        // Format lastmod properly
        const lastmod = entry.lastmod || TODAY;
        
        return `
  <url>
    <loc>${BASE_URL}${cleanUrl}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
      })
      .join("");

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
</urlset>`;

    return new Response(sitemap, {
      headers: { 
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=7200",
        "X-Sitemap-Generated": new Date().toISOString(),
        "X-Sitemap-URL-Count": String(staticUrls.length + uniqueUrlEntries.length)
      }
    });

  } catch (error) {
    console.error('Sitemap generation error:', error);
    return new Response("Failed to generate sitemap", { 
      status: 500,
      headers: { "Content-Type": "text/plain; charset=utf-8" }
    });
  }
}