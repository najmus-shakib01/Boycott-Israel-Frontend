/* global process */
export default async function handler(request, response) {
  const host =
    request.headers["x-forwarded-host"] ||
    request.headers.host ||
    "boycott-israel.vercel.app";
  const protocol = request.headers["x-forwarded-proto"] || "https";
  const origin = `${protocol}://${host}`;

  const today = new Date().toISOString().split("T")[0];

  // Static routes with exact percent-encoding
  const staticUrls = [
    { loc: `${origin}/`, priority: "1.0", changefreq: "daily" },
    {
      loc: `${origin}/${encodeURIComponent("ইসরায়েলের-পন্যগুলো")}`,
      priority: "0.9",
      changefreq: "daily",
    },
    {
      loc: `${origin}/${encodeURIComponent("ব্লগ-ছবি-ও-ভিডিও")}`,
      priority: "0.8",
      changefreq: "weekly",
    },
    {
      loc: `${origin}/${encodeURIComponent("আপনার-মতামত")}`,
      priority: "0.7",
      changefreq: "monthly",
    },
    {
      loc: `${origin}/terms-and-conditions`,
      priority: "0.4",
      changefreq: "yearly",
    },
    {
      loc: `${origin}/privacy-policy`,
      priority: "0.4",
      changefreq: "yearly",
    },
    {
      loc: `${origin}/cookie-policy`,
      priority: "0.4",
      changefreq: "yearly",
    },
  ];

  let productUrls = [];

  const env = typeof process !== "undefined" ? process.env : globalThis.process?.env || {};
  const apiBase =
    env.API_BASE_URL ||
    env.VITE_API_BASE_URL ||
    "https://boycott-israel-backends.vercel.app/api/v1";

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);

    const apiRes = await fetch(
      `${apiBase.replace(/\/+$/, "")}/products/list/?page=1`,
      {
        headers: { Accept: "application/json" },
        signal: controller.signal,
      }
    );
    clearTimeout(timeout);

    if (apiRes.ok) {
      const data = await apiRes.json();
      const results = Array.isArray(data.results) ? data.results : [];

      productUrls = results.map((item) => {
        const lastmod = item.created_at
          ? new Date(item.created_at).toISOString().split("T")[0]
          : today;
        const encodedPrefix = encodeURIComponent("ইসরায়েলের-পন্যগুলোর-বিস্তারিত");
        return {
          loc: `${origin}/${encodedPrefix}/${item.id}`,
          lastmod,
          priority: "0.8",
          changefreq: "weekly",
        };
      });
    }
  } catch {
    // Continue with static URLs on timeout or network error
  }

  const allUrls = [...staticUrls, ...productUrls];

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod || today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  response.setHeader("Content-Type", "application/xml; charset=utf-8");
  response.setHeader(
    "Cache-Control",
    "public, s-maxage=3600, stale-while-revalidate=86400"
  );
  return response.status(200).send(xmlContent);
}
