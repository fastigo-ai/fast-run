import { useEffect } from "react";
import { BlogSEO } from "@/data/blogs";

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
}

export const SEOHead = ({
  title,
  description,
  keywords = [],
  ogTitle,
  ogDescription,
  ogImage,
  ogType = "website",
  canonicalUrl,
}: SEOHeadProps) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Helper to update or create meta tag
    const updateMeta = (name: string, content: string, property?: boolean) => {
      const attr = property ? "property" : "name";
      let element = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement;
      
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attr, name);
        document.head.appendChild(element);
      }
      element.content = content;
    };

    // Basic meta tags
    updateMeta("description", description);
    if (keywords.length > 0) {
      updateMeta("keywords", keywords.join(", "));
    }

    // Open Graph tags
    updateMeta("og:title", ogTitle || title, true);
    updateMeta("og:description", ogDescription || description, true);
    updateMeta("og:type", ogType, true);
    if (ogImage) {
      updateMeta("og:image", ogImage, true);
    }
    if (canonicalUrl) {
      updateMeta("og:url", canonicalUrl, true);
    }

    // Twitter Card tags
    updateMeta("twitter:card", "summary_large_image");
    updateMeta("twitter:title", ogTitle || title);
    updateMeta("twitter:description", ogDescription || description);
    if (ogImage) {
      updateMeta("twitter:image", ogImage);
    }

    // Canonical URL
    let canonicalElement = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (canonicalUrl) {
      if (!canonicalElement) {
        canonicalElement = document.createElement("link");
        canonicalElement.rel = "canonical";
        document.head.appendChild(canonicalElement);
      }
      canonicalElement.href = canonicalUrl;
    }

    // Cleanup function
    return () => {
      // Reset title on unmount if needed
    };
  }, [title, description, keywords, ogTitle, ogDescription, ogImage, ogType, canonicalUrl]);

  return null;
};

// Convenience component for blog posts
export const BlogSEOHead = ({ seo, url }: { seo: BlogSEO; url?: string }) => {
  return (
    <SEOHead
      title={seo.metaTitle}
      description={seo.metaDescription}
      keywords={seo.keywords}
      ogTitle={seo.ogTitle}
      ogDescription={seo.ogDescription}
      ogImage={seo.ogImage}
      ogType="article"
      canonicalUrl={url}
    />
  );
};
