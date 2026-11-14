/* global process */
const DEFAULT_SITE_TITLE = "বয়কট ইসরায়েল — Boycott Israel";
const DEFAULT_SITE_DESCRIPTION =
  "ইসরায়েলি ও বয়কটযোগ্য পণ্য সহজেই চিহ্নিত করুন। ফিলিস্তিনের নিরীহ মানুষের সমর্থনে সচেতন হোন এবং শান্তিপূর্ণ বয়কট আন্দোলনে অংশ নিন।";

const escapeHtml = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const sanitizeDescription = (value, fallback) => {
  const text = String(value || fallback || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return text.slice(0, 200);
};

const resolveAbsoluteUrl = (pathOrUrl, origin) => {
  if (!pathOrUrl) return `${origin}/logo.png`;
  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) {
    return pathOrUrl;
  }
  try {
    return new URL(pathOrUrl, origin).href;
  } catch {
    return `${origin}/logo.png`;
  }
};

const buildOgHtml = ({ title, description, image, canonicalUrl }) => {
  const safeTitle = `${escapeHtml(title)} | ${escapeHtml(DEFAULT_SITE_TITLE)}`;
  const safeDesc = escapeHtml(description);
  const safeCanonical = escapeHtml(canonicalUrl);
  const safeImage = escapeHtml(image);

  return `<!doctype html>
<html lang="bn">
  <head>
    <meta charset="UTF-8" />
    <title>${safeTitle}</title>
    <meta name="description" content="${safeDesc}" />
    <link rel="canonical" href="${safeCanonical}" />
    <meta name="robots" content="index, follow" />

    <!-- Open Graph Metadata -->
    <meta property="og:type" content="article" />
    <meta property="og:site_name" content="${escapeHtml(DEFAULT_SITE_TITLE)}" />
    <meta property="og:locale" content="bn_BD" />
    <meta property="og:title" content="${safeTitle}" />
    <meta property="og:description" content="${safeDesc}" />
    <meta property="og:url" content="${safeCanonical}" />
    <meta property="og:image" content="${safeImage}" />
    <meta property="og:image:secure_url" content="${safeImage}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${escapeHtml(title)}" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${safeTitle}" />
    <meta name="twitter:description" content="${safeDesc}" />
    <meta name="twitter:image" content="${safeImage}" />

    <!-- Human Client Fallback Redirect -->
    <meta http-equiv="refresh" content="0;url=${safeCanonical}" />
  </head>
  <body>
    <p>পুনঃনির্দেশ করা হচ্ছে: <a href="${safeCanonical}">${escapeHtml(title)}</a></p>
  </body>
</html>`;
};

export default async function handler(request, response) {
  const host =
    request.headers["x-forwarded-host"] ||
    request.headers.host ||
    "boycott-israel.vercel.app";
  const protocol = request.headers["x-forwarded-proto"] || "https";
  const origin = `${protocol}://${host}`;

  const requestUrl = new URL(request.url, origin);
  const rawId = request.query?.id || requestUrl.searchParams.get("id") || "";
  const id = String(rawId).trim();

  // Validate ID format (avoid malformed paths or injection)
  const isValidId = /^[\w-]+$/i.test(id);
  const fallbackCanonical = `${origin}${encodeURI("/ইসরায়েলের-পন্যগুলো")}`;

  if (!isValidId || !id) {
    response.setHeader("Content-Type", "text/html; charset=utf-8");
    response.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=86400");
    return response.status(200).send(
      buildOgHtml({
        title: "ইসরায়েলের পণ্যসমূহ",
        description: DEFAULT_SITE_DESCRIPTION,
        image: `${origin}/logo.png`,
        canonicalUrl: fallbackCanonical,
      })
    );
  }

  const canonicalPath = `/ইসরায়েলের-পন্যগুলোর-বিস্তারিত/${id}`;
  const canonicalUrl = `${origin}${encodeURI(canonicalPath)}`;

  const env = typeof process !== "undefined" ? process.env : globalThis.process?.env || {};
  const apiBase =
    env.API_BASE_URL ||
    env.VITE_API_BASE_URL ||
    "https://boycott-israel-backends.vercel.app/api/v1";

  const endpoint = `${apiBase.replace(/\/+$/, "")}/products/list/${encodeURIComponent(id)}/`;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);

    const apiRes = await fetch(endpoint, {
      headers: { Accept: "application/json" },
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!apiRes.ok) {
      // Graceful fallback when product not found
      response.setHeader("Content-Type", "text/html; charset=utf-8");
      response.setHeader("Cache-Control", "public, s-maxage=60, stale-while-revalidate=300");
      return response.status(200).send(
        buildOgHtml({
          title: "বয়কট তালিকাভুক্ত পণ্য",
          description: DEFAULT_SITE_DESCRIPTION,
          image: `${origin}/logo.png`,
          canonicalUrl,
        })
      );
    }

    const data = await apiRes.json();

    const companyName =
      typeof data.company === "string"
        ? data.company
        : data.company?.name || "বয়কট তালিকাভুক্ত পণ্য";

    const description = sanitizeDescription(
      data.description,
      `${companyName} বয়কট তালিকাভুক্ত পণ্য। ফিলিস্তিনের সমর্থনে বয়কট আন্দোলনে অংশ নিন।`
    );

    const rawImage =
      (typeof data.company === "object" && data.company?.logo) ||
      data.image ||
      null;

    const image = resolveAbsoluteUrl(rawImage, origin);

    response.setHeader("Content-Type", "text/html; charset=utf-8");
    response.setHeader(
      "Cache-Control",
      "public, s-maxage=300, stale-while-revalidate=86400"
    );
    response.setHeader("X-Robots-Tag", "index, follow");

    return response.status(200).send(
      buildOgHtml({
        title: `${companyName} — বয়কট পণ্য`,
        description,
        image,
        canonicalUrl,
      })
    );
  } catch {
    // Return safe default preview on timeout or network error without failing
    response.setHeader("Content-Type", "text/html; charset=utf-8");
    response.setHeader("Cache-Control", "public, s-maxage=60, stale-while-revalidate=300");
    return response.status(200).send(
      buildOgHtml({
        title: "বয়কট তালিকাভুক্ত পণ্য",
        description: DEFAULT_SITE_DESCRIPTION,
        image: `${origin}/logo.png`,
        canonicalUrl,
      })
    );
  }
}
