import { useEffect } from 'react';
import { ToolDefinition } from '../types';

const SITE_URL = 'https://thevectortools.online';

/**
 * Injects JSON-LD structured data for a tool page:
 * SoftwareApplication + FAQPage (when the tool has FAQs).
 * Owns the #tool-jsonld script tag; removes the site-level #site-jsonld
 * tag while active so only one JSON-LD script exists at a time.
 */
export const ToolSchema: React.FC<{ tool: ToolDefinition }> = ({ tool }) => {
  useEffect(() => {
    // Only one JSON-LD script at a time — drop the site-level one.
    document.getElementById('site-jsonld')?.remove();

    const graph: Record<string, unknown>[] = [
      {
        '@type': 'SoftwareApplication',
        name: tool.name,
        url: `${SITE_URL}/tools/${tool.slug}`,
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Web',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description: tool.seo?.metaDescription || tool.shortDescription,
      },
    ];

    if (tool.faq?.length) {
      graph.push({
        '@type': 'FAQPage',
        mainEntity: tool.faq.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.answer,
          },
        })),
      });
    }

    const payload = {
      '@context': 'https://schema.org',
      '@graph': graph,
    };

    let script = document.getElementById('tool-jsonld') as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'tool-jsonld';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(payload);

    return () => {
      document.getElementById('tool-jsonld')?.remove();
    };
  }, [tool]);

  return null;
};
