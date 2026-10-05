import React, { useEffect } from 'react';
import { getToolBySlug } from '../data/toolsRegistry';

const SITE_URL = 'https://thevectortools.online';

interface RouteMetaInfo {
  title: string;
  description: string;
}

// Per-route SEO for non-tool pages. Tool routes are skipped:
// ToolPageLayout sets its own title/meta/canonical from the tool registry.
const ROUTE_META: Record<string, RouteMetaInfo> = {
  home: {
    title: 'THE VECTOR TOOLS – Free Online Calculators, Converters & File Tools',
    description:
      'Free online calculators, converters, counters and file tools. Calculate salary, tax, loans, convert units and currency, count words, convert PDF and images — all in your browser.',
  },
  tools: {
    title: 'All Tools Directory – THE VECTOR TOOLS',
    description:
      'Browse all 31 free online tools: calculators, converters, text tools and business utilities.',
  },
  'category/calculators': {
    title: 'Free Online Calculators – Salary, Tax, Loan & More – THE VECTOR TOOLS',
    description:
      'Free calculators: salary, income tax, VAT, percentage, loan, mortgage, compound interest and age calculators.',
  },
  'category/converters': {
    title: 'Free Unit, Currency & Time Zone Converters – THE VECTOR TOOLS',
    description:
      'Convert units, currencies and time zones instantly, free in your browser.',
  },
  'category/text-tools': {
    title: 'Free Text & File Tools – Counters, PDF & Image Converters – THE VECTOR TOOLS',
    description:
      'Word counter, character counter, PDF to JPG, JPG to PDF and image format converter — free online.',
  },
  'category/text-file': {
    title: 'Free Text & File Tools – Counters, PDF & Image Converters – THE VECTOR TOOLS',
    description:
      'Word counter, character counter, PDF to JPG, JPG to PDF and image format converter — free online.',
  },
  'category/business': {
    title: 'Free Business Tools – Invoices, Excel, Quotes & Finance – THE VECTOR TOOLS',
    description:
      'Invoice to Excel, PDF table to Excel, invoice generator, quote generator, profit margin and break-even calculators.',
  },
  about: {
    title: 'About Us – THE VECTOR TOOLS',
    description:
      'Learn about The Vector Tools — free, privacy-friendly online calculators, converters and file tools that run entirely in your browser.',
  },
  contact: {
    title: 'Contact – THE VECTOR TOOLS',
    description:
      'Contact The Vector Tools support at thevectorrr@gmail.com for questions, feedback or tool requests.',
  },
  privacy: {
    title: 'Privacy Policy – THE VECTOR TOOLS',
    description:
      'Privacy policy for The Vector Tools — how your data is handled when you use our free online tools.',
  },
  terms: {
    title: 'Terms of Service – THE VECTOR TOOLS',
    description:
      'Terms of service for using The Vector Tools\u2019 free online calculators, converters and file tools.',
  },
  disclaimer: {
    title: 'Disclaimer – THE VECTOR TOOLS',
    description:
      'Disclaimer for The Vector Tools — calculator results are estimates for informational purposes only.',
  },
  sources: {
    title: 'Sources – THE VECTOR TOOLS',
    description:
      'Official data sources and methodology behind The Vector Tools\u2019 calculators and converters.',
  },
};

function isToolRoute(route: string): boolean {
  if (route.startsWith('tools/') || route.startsWith('tool/')) return true;
  return Boolean(getToolBySlug(route));
}

export const RouteMeta: React.FC<{ route: string }> = ({ route }) => {
  useEffect(() => {
    if (isToolRoute(route)) return;
    const meta = ROUTE_META[route];
    if (!meta) return;

    document.title = meta.title;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', meta.description);
    }

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', SITE_URL + (route === 'home' ? '/' : `/${route}`));
  }, [route]);

  return null;
};
