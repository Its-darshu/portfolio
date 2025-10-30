import { useEffect } from 'react';

export const useMetaTags = ({
  title,
  description,
  image,
  url,
  type = 'website',
  tags = []
}) => {
  useEffect(() => {
    if (!title) return;

    // Update document title
    document.title = `${title} | Darshan`;

    // Helper function to update or create meta tags
    const updateMetaTag = (property, content, isProperty = true) => {
      if (!content) return;
      
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${property}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, property);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', description, false);
    
    // Open Graph tags (Facebook, LinkedIn, Instagram)
    updateMetaTag('og:title', title);
    updateMetaTag('og:description', description);
    updateMetaTag('og:image', image);
    updateMetaTag('og:url', url);
    updateMetaTag('og:type', type);
    updateMetaTag('og:site_name', 'Darshan - Portfolio');
    
    // Twitter Card tags (X)
    updateMetaTag('twitter:card', 'summary_large_image', false);
    updateMetaTag('twitter:title', title, false);
    updateMetaTag('twitter:description', description, false);
    updateMetaTag('twitter:image', image, false);
    updateMetaTag('twitter:url', url, false);
    
    // Additional meta for better SEO
    if (tags && tags.length > 0) {
      updateMetaTag('keywords', tags.join(', '), false);
    }
    
    updateMetaTag('author', 'Darshan', false);

    // Cleanup function to reset to default
    return () => {
      document.title = 'Darshan - Web Designer & Full-Stack Developer';
    };
  }, [title, description, image, url, type, tags]);
};
