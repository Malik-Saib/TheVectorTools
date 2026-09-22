import { getToolBySlug } from '../data/toolsRegistry';
import type { ToolDefinition } from '../types';

const SITE_URL = 'https://thevectortools.online';

export interface PageSeoData {
  title: string;
  description: string;
  canonical: string;
  keywords: string[];
  ogTitle: string;
  ogDescription: string;
  twitterTitle: string;
  twitterDescription: string;
  schema: Record<string, unknown>[];
}

const withDefault = (value: string | undefined, fallback: string) => value && value.trim().length > 0 ? value : fallback;

const ensureMetaTag = (attribute: 'name' | 'property', attributeValue: string, content: string) => {
  let tag = document.head.querySelector(`meta[${attribute}="${attributeValue}"]`) as HTMLMetaElement | null;

  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attribute, attributeValue);
    document.head.appendChild(tag);
  }

  tag.setAttribute('content', content);
};

const ensureLinkTag = (rel: string, href: string) => {
  let tag = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;

  if (!tag) {
    tag = document.createElement('link');
    tag.setAttribute('rel', rel);
    document.head.appendChild(tag);
  }

  tag.setAttribute('href', href);
};

const createBreadcrumbList = (items: { name: string; url: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

const getCategoryMeta = (category: string) => {
  const config: Record<string, { title: string; description: string; faq: { q: string; a: string }[] }> = {
    calculators: {
      title: 'Financial & Mathematical Calculators | The Vector Tools',
      description: 'Free salary, income tax, VAT, mortgage, break-even, loan, percentage, and compound interest calculators built for fast, accurate results.',
      faq: [
        {
          q: 'What kind of calculators are included?',
          a: 'The calculators section covers salary and take-home pay, income tax, VAT, percentages, mortgages, loans, compound interest, and business profitability tools.',
        },
        {
          q: 'Are these calculators suitable for real-world planning?',
          a: 'They are designed for quick estimates and educational planning. Always verify final figures with a professional for decisions involving tax, lending, or accounting.',
        },
      ],
    },
    converters: {
      title: 'Unit, Currency & Time Zone Converters | The Vector Tools',
      description: 'Convert units, currencies, time zones, and age values with accurate, instant calculations designed for everyday work and travel.',
      faq: [
        {
          q: 'How accurate are the converters?',
          a: 'The converter tools use standard formulas and stable reference data for accurate and fast conversions across common units and currencies.',
        },
      ],
    },
    'text-file': {
      title: 'Text & File Tools | The Vector Tools',
      description: 'Count words and characters, convert PDFs to JPG, combine JPGs into PDF files, and process text with privacy-focused browser-based utilities.',
      faq: [
        {
          q: 'Do these tools upload files to a server?',
          a: 'No. The text and file tools run entirely in the browser, which keeps your files private and avoids server uploads.',
        },
      ],
    },
    business: {
      title: 'Business Tools & Office Automation | The Vector Tools',
      description: 'Turn receipts, invoices, statements, CSV files, and purchase orders into clean spreadsheets and professional business documents.',
      faq: [
        {
          q: 'Can these tools help with invoice and spreadsheet workflows?',
          a: 'Yes. The business tools support invoice conversion, CSV cleanup, quote generation, receipt management, and profitability analysis for office workflows.',
        },
      ],
    },
  };

  return config[category] || config.calculators;
};

const buildToolSchema = (tool: ToolDefinition, canonicalUrl: string): Record<string, unknown>[] => {
  const faqSchema = tool.faq.length > 0
    ? [{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: tool.faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      }]
    : [];

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: tool.name,
      description: withDefault(tool.longDescription || tool.shortDescription, tool.name),
      url: canonicalUrl,
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Any',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      keywords: tool.keywords.join(', '),
      featureList: tool.keywords.slice(0, 8),
    },
    createBreadcrumbList([
      { name: 'Home', url: `${SITE_URL}/` },
      { name: tool.categoryLabel, url: `${SITE_URL}/category/${tool.category}` },
      { name: tool.name, url: canonicalUrl },
    ]),
    ...faqSchema,
  ];
};

const buildCategorySchema = (category: string, title: string, description: string, canonicalUrl: string, faqItems: { q: string; a: string }[]) => {
  const faqSchema = faqItems.length > 0
    ? [{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqItems.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.a,
          },
        })),
      }]
    : [];

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: title,
      description,
      url: canonicalUrl,
    },
    createBreadcrumbList([
      { name: 'Home', url: `${SITE_URL}/` },
      { name: title, url: canonicalUrl },
    ]),
    ...faqSchema,
  ];
};

export const resolvePageSeo = (route: string): PageSeoData => {
  const cleanedRoute = route.replace(/^#\/?/, '').replace(/^\/+/, '').trim();
  const routeKey = cleanedRoute || 'home';

  if (routeKey === 'home' || routeKey === '') {
    const title = 'The Vector Tools | Free Online Calculators, Converters & Business Utilities';
    const description = 'Free online calculators, converters, and document tools for salary, tax, VAT, PDF, Excel, unit conversion, and business workflows.';
    const canonical = `${SITE_URL}/`;

    return {
      title,
      description,
      canonical,
      keywords: ['online calculators', 'free productivity tools', 'invoice to excel', 'VAT calculator', 'salary calculator', 'PDF tools'],
      ogTitle: title,
      ogDescription: description,
      twitterTitle: title,
      twitterDescription: description,
      schema: [{
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'The Vector Tools',
        url: canonical,
        description,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${SITE_URL}/tools?query={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      }],
    };
  }

  if (routeKey === 'tools') {
    const title = 'All Tools | The Vector Tools';
    const description = 'Browse the complete library of free online calculator, converter, text, file, and business tools from The Vector Tools.';
    const canonical = `${SITE_URL}/tools`;

    return {
      title,
      description,
      canonical,
      keywords: ['all tools', 'online utilities', 'free calculators', 'business tools'],
      ogTitle: title,
      ogDescription: description,
      twitterTitle: title,
      twitterDescription: description,
      schema: [{
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: title,
        description,
        url: canonical,
      }],
    };
  }

  if (routeKey.startsWith('tools/') || routeKey.startsWith('tool/')) {
    const slug = routeKey.replace(/^tools?\//, '').trim();
    const tool = getToolBySlug(slug);

    if (tool) {
      const title = tool.seo?.title || `${tool.name} | The Vector Tools`;
      const description = tool.seo?.metaDescription || tool.longDescription || tool.shortDescription;
      const canonical = `${SITE_URL}/${routeKey}`;

      return {
        title,
        description,
        canonical,
        keywords: tool.seo?.keywords || tool.keywords || [],
        ogTitle: title,
        ogDescription: description,
        twitterTitle: title,
        twitterDescription: description,
        schema: buildToolSchema(tool, canonical),
      };
    }
  }

  const directTool = getToolBySlug(routeKey);
  if (directTool) {
    const title = directTool.seo?.title || `${directTool.name} | The Vector Tools`;
    const description = directTool.seo?.metaDescription || directTool.longDescription || directTool.shortDescription;
    const canonical = `${SITE_URL}/tools/${directTool.slug}`;

    return {
      title,
      description,
      canonical,
      keywords: directTool.seo?.keywords || directTool.keywords || [],
      ogTitle: title,
      ogDescription: description,
      twitterTitle: title,
      twitterDescription: description,
      schema: buildToolSchema(directTool, canonical),
    };
  }

  if (routeKey.startsWith('category/')) {
    const category = routeKey.replace(/^category\//, '').trim();
    const meta = getCategoryMeta(category);
    const canonical = `${SITE_URL}/${routeKey}`;

    return {
      title: meta.title,
      description: meta.description,
      canonical,
      keywords: ['free online tools', 'calculators', 'converters', 'business tools'],
      ogTitle: meta.title,
      ogDescription: meta.description,
      twitterTitle: meta.title,
      twitterDescription: meta.description,
      schema: buildCategorySchema(category, meta.title, meta.description, canonical, meta.faq),
    };
  }

  const legalPageMeta: Record<string, { title: string; description: string }> = {
    about: {
      title: 'About The Vector Tools | Free Online Utility Website',
      description: 'Learn about The Vector Tools, our mission, and the privacy-first approach behind our free online calculators and business utilities.',
    },
    contact: {
      title: 'Contact The Vector Tools',
      description: 'Get in touch with The Vector Tools for support, feedback, partnerships, or questions about our online utility tools.',
    },
    privacy: {
      title: 'Privacy Policy | The Vector Tools',
      description: 'Read the privacy policy for The Vector Tools and understand how we handle data and browser-based calculations securely.',
    },
    terms: {
      title: 'Terms of Service | The Vector Tools',
      description: 'Review the terms of service and acceptable use guidelines for The Vector Tools and its free online utility platform.',
    },
    disclaimer: {
      title: 'Disclaimer | The Vector Tools',
      description: 'Read the disclaimer and informational notice for financial estimates, utility calculations, and browser-based document tools.',
    },
    sources: {
      title: 'Sources & References | The Vector Tools',
      description: 'Browse the official references and data sources behind our calculators, converters, and business productivity utilities.',
    },
  };

  const legalMeta = legalPageMeta[routeKey] || legalPageMeta.about;
  const canonical = `${SITE_URL}/${routeKey}`;

  return {
    title: legalMeta.title,
    description: legalMeta.description,
    canonical,
    keywords: ['The Vector Tools', 'privacy policy', 'terms of service', 'contact support'],
    ogTitle: legalMeta.title,
    ogDescription: legalMeta.description,
    twitterTitle: legalMeta.title,
    twitterDescription: legalMeta.description,
    schema: [{
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: legalMeta.title,
      description: legalMeta.description,
      url: canonical,
    }],
  };
};

export const applyPageSeo = (route: string) => {
  const data = resolvePageSeo(route);

  document.title = data.title;
  ensureMetaTag('name', 'description', data.description);
  ensureMetaTag('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
  ensureMetaTag('name', 'keywords', data.keywords.join(', '));
  ensureLinkTag('canonical', data.canonical);

  ensureMetaTag('property', 'og:title', data.ogTitle);
  ensureMetaTag('property', 'og:description', data.ogDescription);
  ensureMetaTag('property', 'og:url', data.canonical);
  ensureMetaTag('property', 'og:type', 'website');
  ensureMetaTag('property', 'og:site_name', 'The Vector Tools');
  ensureMetaTag('property', 'og:image', `${SITE_URL}/thevector-logo-stacked.png`);

  ensureMetaTag('name', 'twitter:card', 'summary_large_image');
  ensureMetaTag('name', 'twitter:title', data.twitterTitle);
  ensureMetaTag('name', 'twitter:description', data.twitterDescription);
  ensureMetaTag('name', 'twitter:site', '@TheVectorTools');

  const existingSchema = document.getElementById('page-structured-data');
  if (existingSchema) {
    existingSchema.remove();
  }

  const schemaScript = document.createElement('script');
  schemaScript.id = 'page-structured-data';
  schemaScript.type = 'application/ld+json';
  schemaScript.textContent = JSON.stringify(data.schema, null, 2);
  document.head.appendChild(schemaScript);
};
