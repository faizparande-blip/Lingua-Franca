import { useEffect } from 'react';

const BASE_URL = 'https://linguafranca.linkal.in';
const DEFAULT_TITLE = 'Lingua Franca Classes';
const DEFAULT_DESCRIPTION =
  'Lingua Franca Classes – Premium English language education and communication training by Ms. Ayeshabi Saheb. Cambridge Checkpoints, IGCSE, A Levels, and ICSE coaching in Mumbai and online.';

function setMetaTag(selector, attribute, value) {
  let element = document.querySelector(selector);
  if (!element) {
    element = document.createElement('meta');
    const [attrName, attrVal] = selector.replace(/[\[\]"]/g, '').split('=');
    element.setAttribute(attrName, attrVal);
    document.head.appendChild(element);
  }
  element.setAttribute(attribute, value);
}

function setCanonical(href) {
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

/**
 * Custom hook to update document title and SEO metadata dynamically per route
 * @param {Object} options
 * @param {string} options.title - Page-specific document title
 * @param {string} [options.description] - Page-specific meta description
 * @param {string} [options.canonicalPath] - Route path (e.g. '/about')
 */
export function useSEO({ title, description = DEFAULT_DESCRIPTION, canonicalPath = '/' }) {
  useEffect(() => {
    // 1. Update Document Title
    const finalTitle = title ? title : DEFAULT_TITLE;
    document.title = finalTitle;

    // 2. Standard Meta Description
    setMetaTag('meta[name="description"]', 'content', description);

    // 3. Open Graph Tags
    setMetaTag('meta[property="og:title"]', 'content', finalTitle);
    setMetaTag('meta[property="og:description"]', 'content', description);
    const fullCanonicalUrl = `${BASE_URL}${canonicalPath === '/' ? '/' : canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`}`;
    setMetaTag('meta[property="og:url"]', 'content', fullCanonicalUrl);
    setMetaTag('meta[property="og:site_name"]', 'content', 'Lingua Franca Classes');

    // 4. Twitter Card Tags
    setMetaTag('meta[name="twitter:title"]', 'content', finalTitle);
    setMetaTag('meta[name="twitter:description"]', 'content', description);

    // 5. Canonical Link
    setCanonical(fullCanonicalUrl);
  }, [title, description, canonicalPath]);
}

export default useSEO;
