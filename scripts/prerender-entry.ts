// Prerender content builder — runs at build time (see scripts/prerender.mjs).
// Produces, for every public route, a route-specific title, meta description
// and a static HTML rendering of the page's real editorial content, built from
// the same data files the React app renders from. The static HTML is injected
// into the page shell so crawlers and ad-review systems see substantive
// content without executing JavaScript; React replaces it on load.

import { TOOLS_REGISTRY, CATEGORIES_CONFIG, getToolsByCategory } from '../src/data/toolsRegistry';
import { TOOL_CONTENT_ALL } from '../src/data/toolContentAll';
import { GUIDES } from '../src/data/guidesRegistry';
import type { ToolDefinition } from '../src/types';

export interface PrerenderRoute {
  path: string; // '' for home, otherwise without leading/trailing slash
  title: string;
  description: string;
  html: string;
}

const SITE = 'https://thevectortools.online';

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function paras(text: string): string {
  return text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => `<p>${esc(p)}</p>`)
    .join('\n');
}

function toolLinks(slugs: string[]): string {
  const items = slugs
    .map((slug) => TOOLS_REGISTRY.find((t) => t.slug === slug))
    .filter((t): t is ToolDefinition => Boolean(t))
    .map((t) => `<li><a href="/tools/${t.slug}">${esc(t.name)}</a> — ${esc(t.shortDescription)}</li>`)
    .join('\n');
  return items ? `<h2>Related tools</h2>\n<ul>\n${items}\n</ul>` : '';
}

function toolHtml(tool: ToolDefinition): string {
  const ext = TOOL_CONTENT_ALL[tool.slug];
  const parts: string[] = [];
  parts.push(`<h1>${esc(tool.name)}</h1>`);
  parts.push(paras(tool.longDescription));
  parts.push(`<h2>How to use this tool</h2>\n<ol>\n${tool.howToUse.map((s) => `<li>${esc(s)}</li>`).join('\n')}\n</ol>`);
  parts.push(`<h2>How it works</h2>`);
  parts.push(paras(tool.howItWorks));
  if (ext?.howItWorksExtended) parts.push(paras(ext.howItWorksExtended));
  if (ext?.guide?.length) {
    for (const section of ext.guide) {
      parts.push(`<h2>${esc(section.heading)}</h2>`);
      parts.push(section.paragraphs.map((p) => `<p>${esc(p)}</p>`).join('\n'));
    }
  }
  const examples = [
    { title: tool.example.title, scenario: tool.example.scenario, calculation: tool.example.calculation, result: tool.example.result },
    ...(ext?.extraExamples ?? []),
  ];
  parts.push(`<h2>Worked examples</h2>`);
  for (const ex of examples) {
    parts.push(`<h3>${esc(ex.title)}</h3>`);
    parts.push(`<p>${esc(ex.scenario)}</p>`);
    parts.push(`<p>${esc(ex.calculation)}</p>`);
    parts.push(`<p><strong>Result:</strong> ${esc(ex.result)}</p>`);
  }
  const faqs = [...tool.faq, ...(ext?.extraFaqs ?? [])];
  parts.push(`<h2>Frequently asked questions</h2>`);
  for (const f of faqs) {
    parts.push(`<h3>${esc(f.question)}</h3>`);
    parts.push(`<p>${esc(f.answer)}</p>`);
  }
  parts.push(toolLinks(tool.relatedToolSlugs));
  return parts.join('\n');
}

function guideHtml(guide: (typeof GUIDES)[number]): string {
  const parts: string[] = [];
  parts.push(`<h1>${esc(guide.title)}</h1>`);
  parts.push(paras(guide.intro));
  for (const section of guide.sections) {
    parts.push(`<h2>${esc(section.heading)}</h2>`);
    parts.push(section.paragraphs.map((p) => `<p>${esc(p)}</p>`).join('\n'));
  }
  if (guide.faq?.length) {
    parts.push(`<h2>Frequently asked questions</h2>`);
    for (const f of guide.faq) {
      parts.push(`<h3>${esc(f.question)}</h3>`);
      parts.push(`<p>${esc(f.answer)}</p>`);
    }
  }
  parts.push(toolLinks(guide.relatedToolSlugs));
  return parts.join('\n');
}

function toolListHtml(tools: ToolDefinition[]): string {
  return `<ul>\n${tools
    .map((t) => `<li><a href="/tools/${t.slug}">${esc(t.name)}</a> — ${esc(t.longDescription)}</li>`)
    .join('\n')}\n</ul>`;
}

// Non-tool route meta — mirror of ROUTE_META in src/components/RouteMeta.tsx.
// Keep the two in sync when titles/descriptions change.
const STATIC_META: Record<string, { title: string; description: string; heading: string; body: string }> = {
  '': {
    title: 'THE VECTOR TOOLS – Free Online Calculators, Converters & File Tools',
    description:
      'Free online calculators, converters, counters and file tools. Calculate salary, tax, loans, convert units and currency, count words, convert PDF and images — all in your browser.',
    heading: 'Free Online Calculators, Converters & File Tools',
    body: 'The Vector Tools is a collection of free online calculators, converters, counters and file utilities that run entirely in your browser. Calculate take-home pay, income tax, VAT, loan and mortgage payments, convert currencies, units and time zones, count words, and convert PDF, image and spreadsheet files — without uploading your data to a server. Every tool is free, works instantly, and is explained in depth with formulas, worked examples and guides.',
  },
  tools: {
    title: 'All Tools Directory – THE VECTOR TOOLS',
    description: 'Browse all 31 free online tools: calculators, converters, text tools and business utilities.',
    heading: 'All Tools Directory',
    body: 'Browse the full directory of free online tools: financial and tax calculators, unit, currency and time-zone converters, text counters and file converters, and business document generators. Every tool runs in your browser and is free to use.',
  },
  guides: {
    title: 'Guides & Tutorials – THE VECTOR TOOLS',
    description:
      'In-depth guides that explain the concepts behind our calculators and converters: German take-home pay, PDF conversion privacy, formulas, worked examples and FAQs.',
    heading: 'Guides & Tutorials',
    body: 'In-depth guides that explain the concepts behind the calculators and converters on this site — the formulas, the reasoning, and fully worked examples you can check by hand.',
  },
  about: {
    title: 'About Us – THE VECTOR TOOLS',
    description:
      'Learn about The Vector Tools — free, privacy-friendly online calculators, converters and file tools that run entirely in your browser.',
    heading: 'About The Vector Tools',
    body: 'The Vector Tools is a free collection of online calculators, converters and file utilities built by The Vector, a software house in Peshawar, Pakistan. The tools are designed to be fast, accurate and privacy-friendly: calculations and file conversions run entirely in your browser, so your numbers and documents never leave your device. Each tool is documented with its methodology, worked examples and the official sources behind its formulas.',
  },
  contact: {
    title: 'Contact – THE VECTOR TOOLS',
    description: 'Contact The Vector Tools support at thevectorrr@gmail.com for questions, feedback or tool requests.',
    heading: 'Contact',
    body: 'Questions, feedback, correction reports or tool requests are welcome. Email The Vector Tools at thevectorrr@gmail.com. The Vector is based at FF-410, Deans Trade Center, Peshawar, Pakistan, and works Monday to Saturday, 9 AM to 5 PM Pakistan time.',
  },
  privacy: {
    title: 'Privacy Policy – THE VECTOR TOOLS',
    description: 'Privacy policy for The Vector Tools — how your data is handled when you use our free online tools.',
    heading: 'Privacy Policy',
    body: 'The Vector Tools is built to minimise data collection: the calculators and file converters on this site run entirely in your browser, and the files and figures you enter are not uploaded to or stored on our servers. This page summarises what limited data the site itself processes (such as standard hosting logs and, where enabled, advertising cookies) and the choices you have. The full policy text loads with the interactive page.',
  },
  terms: {
    title: 'Terms of Service – THE VECTOR TOOLS',
    description: 'Terms of service for using The Vector Tools’ free online calculators, converters and file tools.',
    heading: 'Terms of Service',
    body: 'These terms govern your use of The Vector Tools’ free online calculators, converters and file tools. The tools are provided for informational purposes; results are estimates and should be verified before being relied on for financial, tax or legal decisions. The full terms load with the interactive page.',
  },
  disclaimer: {
    title: 'Disclaimer – THE VECTOR TOOLS',
    description: 'Disclaimer for The Vector Tools — calculator results are estimates for informational purposes only.',
    heading: 'Disclaimer',
    body: 'Calculator and converter results on The Vector Tools are estimates provided for general information only. Tax rules, rates and formulas change and vary by jurisdiction and personal circumstances, so results are not a substitute for professional tax, accounting, legal or financial advice. Always confirm important figures with an official source or a qualified professional.',
  },
  sources: {
    title: 'Sources – THE VECTOR TOOLS',
    description: 'Official data sources and methodology behind The Vector Tools’ calculators and converters.',
    heading: 'Sources & Methodology',
    body: 'The calculators on this site are built from official published sources: national tax authorities and finance ministries for brackets, allowances and contribution rates, and central-bank or reference data for conversion factors. Each tool page lists the specific sources behind its calculation. Rates are reviewed against the official publications for the years the tools cover.',
  },
};

// Category editorial — mirror of CATEGORY_INFO in src/pages/CategoryPage.tsx.
// Keep the two in sync when category copy changes.
const CATEGORY_EDITORIAL: Record<string, { title: string; description: string; editorial: string[]; faq: { q: string; a: string }[] }> = {
  calculators: {
    title: 'Financial & Mathematical Calculators',
    description: 'Precision calculators for gross-to-net salary, progressive income tax, VAT rates, loan payments, mortgage amortization, compound interest growth, and percentages.',
    editorial: [
      'A calculator is only as trustworthy as the method behind it, so every calculator in this category is built on the official formula or statutory table it claims to use: progressive income tax is applied bracket by bracket rather than as a flat rate on your whole income, loan payments use the standard amortisation formula so the interest share falls and the principal share rises over the term, and compound growth applies the contribution schedule you enter instead of assuming a single lump sum. Each tool page explains its method in plain language, works a complete example with real numbers, and names its official sources, so you can reproduce any result with a pen, a spreadsheet or a second calculator.',
      'These tools are planning instruments, not professional advice. Salary and tax results are estimates: real payroll also reflects personal allowances, church tax, employer-specific agreements and mid-year rule changes that no general calculator can fully model. Use the figures here to compare job offers, sanity-check a payslip, price a freelance rate or understand what a loan truly costs — and confirm binding decisions with an accountant, a tax adviser or your lender.',
    ],
    faq: [
      { q: 'Are the financial calculations legally binding?', a: 'No. All calculations are provided as educational estimates based on official reference formulas. Individual circumstances, deductions, and local municipal variations can alter final figures.' },
      { q: 'How frequently are tax rates updated?', a: 'Our tax datasets reflect statutory 2025/2026 rates published by authorized national tax agencies and ministries across Europe and the US.' },
    ],
  },
  converters: {
    title: 'Unit, Currency & Time Zone Converters',
    description: 'Accurate two-way converters for metric and imperial units, international currencies with central bank benchmark rates, global time zones, and chronological age.',
    editorial: [
      'Conversion errors are usually quiet ones: a temperature read in the wrong scale, a meeting set an hour off because one side changed clocks for daylight saving, a price converted at a rate no bank would actually pay. The converters in this category are built to remove those traps. Unit conversions use exact defined factors (an inch is exactly 25.4 millimetres, not an approximation), time zone conversions follow the official IANA rules including daylight saving transitions, and age is calculated on calendar rules rather than by dividing days by 365.',
      'Currency deserves one honest warning. The rates shown here are benchmark reference rates of the kind published by central banks — useful for checking a price, estimating a budget or comparing offers. Your bank or card provider will almost always apply a less favourable rate plus a spread or fee, so the amount that finally leaves your account will differ slightly. For an exact figure, convert with the custom-rate option using the rate your provider quotes you.',
    ],
    faq: [
      { q: 'Where do the currency exchange rates come from?', a: 'Currency rates are benchmark reference rates based on European Central Bank (ECB) and interbank daily fixes. You can also enter custom rates if your bank applies a spread.' },
      { q: 'Does the time zone converter handle Daylight Saving Time (DST)?', a: 'Yes. Our converter uses official IANA time zone rules to account for standard time and summer time transitions automatically.' },
    ],
  },
  'text-file': {
    title: 'Text & File Processing Utilities',
    description: 'Privacy-focused document tools running 100% inside your browser. Count words, evaluate character limits for social media, convert PDF to JPG, and bundle JPG images into PDF.',
    editorial: [
      'Text and file work looks simple until privacy enters the picture. Uploading a contract, an ID scan or an unpublished manuscript to a random converter means handing a copy to a server you know nothing about — how long it keeps the file, who can access it, and whether it is resold as training data are questions most upload-based tools never answer. Every tool in this category takes the opposite approach: the file is read into your browser memory, processed with JavaScript and WebAssembly on your own device, and never transmitted. You can verify this yourself by loading a tool, switching your device to flight mode, and converting — it still works, because there is no server step to cut off.',
      'The same local processing shapes the practical limits. Output quality is a choice, not an accident: converting a PDF page at 150 DPI is usually right for screens and email, while 300 DPI is the safer choice for print or OCR. Very large files are bounded by your device memory rather than by an upload cap, so a modern laptop handles long documents comfortably, while an older phone may prefer smaller batches.',
    ],
    faq: [
      { q: 'Are my PDF or image files uploaded to your servers?', a: 'Never. All PDF rendering, image conversions, and text analyses run strictly inside your browser memory using HTML5 Canvas and WebAssembly. No files are transmitted to our servers.' },
      { q: 'Is there a limit on the number of pages or file size?', a: 'Because conversions occur client-side, limits depend on your device memory. For optimal performance, we recommend PDFs under 100 pages or image batches under 50MB.' },
    ],
  },
  business: {
    title: 'Business Tools & Office Automation',
    description: 'Convert invoices, statements, and tables to Excel, clean messy CSVs, create professional invoices, calculate profit margins, and manage product inventory codes.',
    editorial: [
      'Business paperwork usually arrives in the wrong format: an invoice locked inside a PDF, a bank statement that will not paste cleanly into a spreadsheet, a CSV export full of blank rows and stray spaces. The tools in this category were built for exactly that daily friction. They extract, clean and reformat documents and data in your browser, and they pair that document work with the small financial calculations every small business runs repeatedly — profit margin, markup and break-even — using the standard accounting formulas, so the number you get here matches the number your accountant would compute by hand.',
      'Two habits make this category work better. First, always review extracted data before importing it into accounting software: automated extraction is fast, but a quick scan of totals, tax amounts and dates catches the rare misread cell. Second, keep your source files — because everything is processed locally in your browser, nothing is stored on our side, so the copy on your device is the only copy.',
    ],
    faq: [
      { q: 'Are my confidential business invoices or financial statements uploaded to your servers?', a: 'No. File processing, staging, and table extraction occur in your local browser memory. Files are not permanently stored or shared.' },
      { q: 'Should I review the extracted Excel sheets before importing into accounting software?', a: 'Yes! Automated extraction tools provide an interactive verification and review table. Always inspect figures, tax amounts, and totals before importing into software like QuickBooks or Xero.' },
      { q: 'Are the financial and margin calculators specific to any single country?', a: 'No. The calculators use universally accepted accounting formulas (COGS, Gross Margin, Net Margin, Markup, and Break-Even Point) and support all major world currencies.' },
    ],
  },
};

const CATEGORY_ROUTE_TO_ID: Record<string, string> = {
  'category/calculators': 'calculators',
  'category/converters': 'converters',
  'category/text-tools': 'text-file',
  'category/text-file': 'text-file',
  'category/business': 'business',
};

const CATEGORY_META: Record<string, { title: string; description: string }> = {
  'category/calculators': {
    title: 'Free Online Calculators – Salary, Tax, Loan & More – THE VECTOR TOOLS',
    description: 'Free calculators: salary, income tax, VAT, percentage, loan, mortgage, compound interest and age calculators.',
  },
  'category/converters': {
    title: 'Free Unit, Currency & Time Zone Converters – THE VECTOR TOOLS',
    description: 'Convert units, currencies and time zones instantly, free in your browser.',
  },
  'category/text-tools': {
    title: 'Free Text & File Tools – Counters, PDF & Image Converters – THE VECTOR TOOLS',
    description: 'Word counter, character counter, PDF to JPG, JPG to PDF and image format converter — free online.',
  },
  'category/text-file': {
    title: 'Free Text & File Tools – Counters, PDF & Image Converters – THE VECTOR TOOLS',
    description: 'Word counter, character counter, PDF to JPG, JPG to PDF and image format converter — free online.',
  },
  'category/business': {
    title: 'Free Business Tools – Invoices, Excel, Quotes & Finance – THE VECTOR TOOLS',
    description: 'Invoice to Excel, PDF table to Excel, invoice generator, quote generator, profit margin and break-even calculators.',
  },
};

export function buildRoutes(): PrerenderRoute[] {
  const routes: PrerenderRoute[] = [];

  // Home
  {
    const meta = STATIC_META[''];
    const popular = TOOLS_REGISTRY.filter((t) => t.popular);
    const html = [
      `<h1>${esc(meta.heading)}</h1>`,
      `<p>${esc(meta.body)}</p>`,
      `<h2>Popular tools</h2>`,
      toolListHtml(popular.length ? popular : TOOLS_REGISTRY.slice(0, 8)),
      `<h2>Browse by category</h2>`,
      `<ul>\n${CATEGORIES_CONFIG.map((c) => `<li><strong>${esc(c.name)}</strong> — ${esc(c.description)}</li>`).join('\n')}\n</ul>`,
      `<h2>Latest guides</h2>`,
      `<ul>\n${GUIDES.map((g) => `<li><a href="/guides/${g.slug}">${esc(g.title)}</a></li>`).join('\n')}\n</ul>`,
    ].join('\n');
    routes.push({ path: '', title: meta.title, description: meta.description, html });
  }

  // Tools directory
  {
    const meta = STATIC_META['tools'];
    const grouped = CATEGORIES_CONFIG.map((c) => {
      const tools = getToolsByCategory(c.id);
      return `<h2>${esc(c.name)}</h2>\n<p>${esc(c.description)}</p>\n${toolListHtml(tools)}`;
    }).join('\n');
    routes.push({
      path: 'tools',
      title: meta.title,
      description: meta.description,
      html: `<h1>${esc(meta.heading)}</h1>\n<p>${esc(meta.body)}</p>\n${grouped}`,
    });
  }

  // Tool pages
  for (const tool of TOOLS_REGISTRY) {
    routes.push({
      path: `tools/${tool.slug}`,
      title: tool.seo.title,
      description: tool.seo.metaDescription,
      html: toolHtml(tool),
    });
  }

  // Guides index
  {
    const meta = STATIC_META['guides'];
    const list = GUIDES.map(
      (g) => `<h2><a href="/guides/${g.slug}">${esc(g.title)}</a></h2>\n${paras(g.intro)}`,
    ).join('\n');
    routes.push({
      path: 'guides',
      title: meta.title,
      description: meta.description,
      html: `<h1>${esc(meta.heading)}</h1>\n<p>${esc(meta.body)}</p>\n${list}`,
    });
  }

  // Guide pages
  for (const guide of GUIDES) {
    routes.push({
      path: `guides/${guide.slug}`,
      title: `${guide.title} – THE VECTOR TOOLS`,
      description: guide.metaDescription,
      html: guideHtml(guide),
    });
  }

  // Category pages
  for (const [route, catId] of Object.entries(CATEGORY_ROUTE_TO_ID)) {
    if (route === 'category/text-file') continue; // alias of text-tools; only one canonical page
    const cat = CATEGORIES_CONFIG.find((c) => c.id === catId)!;
    const meta = CATEGORY_META[route];
    const info = CATEGORY_EDITORIAL[catId];
    const tools = getToolsByCategory(catId);
    const parts: string[] = [];
    parts.push(`<h1>${esc(info?.title ?? cat.name)}</h1>`);
    parts.push(`<p>${esc(info?.description ?? cat.description)}</p>`);
    for (const p of info?.editorial ?? []) parts.push(`<p>${esc(p)}</p>`);
    parts.push(toolListHtml(tools));
    if (info?.faq?.length) {
      parts.push(`<h2>Frequently asked questions</h2>`);
      for (const f of info.faq) {
        parts.push(`<h3>${esc(f.q)}</h3>`);
        parts.push(`<p>${esc(f.a)}</p>`);
      }
    }
    routes.push({ path: route, title: meta.title, description: meta.description, html: parts.join('\n') });
  }

  // Static pages
  for (const key of ['about', 'contact', 'privacy', 'terms', 'disclaimer', 'sources']) {
    const meta = STATIC_META[key];
    routes.push({
      path: key,
      title: meta.title,
      description: meta.description,
      html: `<h1>${esc(meta.heading)}</h1>\n<p>${esc(meta.body)}</p>`,
    });
  }

  return routes;
}

export { SITE };
