import PropTypes from "prop-types";
import { useEffect } from "react";

const DEFAULT_ORIGIN =
  import.meta.env.VITE_SITE_URL || "https://boycott-israel.vercel.app";
const DEFAULT_IMAGE = `${DEFAULT_ORIGIN}/logo.png`;
const DEFAULT_TITLE =
  "বয়কট ইসরায়েল — Boycott Israel | সচেতনতামূলক পণ্য ডিরেক্টরি";

/**
 * Helper to update or create a <meta> tag
 */
const setMetaTag = (attrName, attrValue, content) => {
  if (!content) return;
  let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attrName, attrValue);
    element.setAttribute("data-dynamic-seo", "true");
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
};

/**
 * Helper to remove dynamic meta tags on unmount
 */
const removeMetaTag = (attrName, attrValue) => {
  const element = document.querySelector(
    `meta[${attrName}="${attrValue}"][data-dynamic-seo="true"]`
  );
  if (element && element.parentNode) {
    element.parentNode.removeChild(element);
  }
};

const PageTitle = ({
  title,
  description,
  canonicalPath,
  ogImage,
  ogType = "website",
  noindex = false,
  schema = null,
}) => {
  useEffect(() => {
    const origin =
      typeof window !== "undefined" && window.location.origin
        ? window.location.origin
        : DEFAULT_ORIGIN;

    // 1. Page Title
    const formattedTitle = title
      ? `${title} | বয়কট ইসরায়েল`
      : DEFAULT_TITLE;
    document.title = formattedTitle;

    // 2. Canonical URL (consistently percent-encoded)
    const currentPath =
      canonicalPath ||
      (typeof window !== "undefined" ? window.location.pathname : "/");
    const safeCanonicalUrl = `${origin}${encodeURI(decodeURI(currentPath))}`;

    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      canonicalLink.setAttribute("data-dynamic-seo", "true");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", safeCanonicalUrl);

    // 3. Robots meta (noindex handling)
    setMetaTag(
      "name",
      "robots",
      noindex ? "noindex, nofollow" : "index, follow"
    );

    // 4. Description
    if (description) {
      setMetaTag("name", "description", description);
      setMetaTag("property", "og:description", description);
      setMetaTag("name", "twitter:description", description);
    }

    // 5. Open Graph & Twitter Card tags
    setMetaTag("property", "og:title", formattedTitle);
    setMetaTag("property", "og:url", safeCanonicalUrl);
    setMetaTag("property", "og:type", ogType);
    setMetaTag("name", "twitter:title", formattedTitle);

    const safeOgImage = ogImage
      ? ogImage.startsWith("http")
        ? ogImage
        : `${origin}${ogImage}`
      : DEFAULT_IMAGE;

    setMetaTag("property", "og:image", safeOgImage);
    setMetaTag("property", "og:image:secure_url", safeOgImage);
    setMetaTag("name", "twitter:image", safeOgImage);

    // 6. JSON-LD Dynamic Schema
    let scriptElement = document.getElementById("dynamic-seo-schema");
    if (schema) {
      if (!scriptElement) {
        scriptElement = document.createElement("script");
        scriptElement.id = "dynamic-seo-schema";
        scriptElement.type = "application/ld+json";
        document.head.appendChild(scriptElement);
      }
      scriptElement.textContent = JSON.stringify(schema);
    } else if (scriptElement && scriptElement.parentNode) {
      scriptElement.parentNode.removeChild(scriptElement);
    }

    // Unmount Cleanup: remove dynamically injected tags and reset robots
    return () => {
      setMetaTag("name", "robots", "index, follow");

      const dynamicScript = document.getElementById("dynamic-seo-schema");
      if (dynamicScript && dynamicScript.parentNode) {
        dynamicScript.parentNode.removeChild(dynamicScript);
      }

      removeMetaTag("property", "og:title");
      removeMetaTag("property", "og:description");
      removeMetaTag("property", "og:url");
      removeMetaTag("property", "og:image");
      removeMetaTag("property", "og:image:secure_url");
      removeMetaTag("property", "og:type");
      removeMetaTag("name", "twitter:title");
      removeMetaTag("name", "twitter:description");
      removeMetaTag("name", "twitter:image");
    };
  }, [title, description, canonicalPath, ogImage, ogType, noindex, schema]);

  return null;
};

PageTitle.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  canonicalPath: PropTypes.string,
  ogImage: PropTypes.string,
  ogType: PropTypes.string,
  noindex: PropTypes.bool,
  schema: PropTypes.object,
};

export default PageTitle;
