import React, { useState } from 'react';
import { ToolCategory, ToolDefinition } from '../types';
import { getToolsByCategory } from '../data/toolsRegistry';
import { ToolCard } from '../components/ui/ToolCard';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { Calculator, RefreshCw, FileText, HelpCircle, Building2, Filter } from 'lucide-react';

interface CategoryPageProps {
  category: ToolCategory;
  onNavigate: (route: string) => void;
}

const businessToolsInfo = {
  title: 'Business Tools & Office Automation',
  description: 'Convert invoices, statements, and tables to Excel, clean messy CSVs, create professional invoices, calculate profit margins, and manage product inventory codes.',
  editorial: [
    'Business paperwork usually arrives in the wrong format: an invoice locked inside a PDF, a bank statement that will not paste cleanly into a spreadsheet, a CSV export full of blank rows and stray spaces. The tools in this category were built for exactly that daily friction. They extract, clean and reformat documents and data in your browser, and they pair that document work with the small financial calculations every small business runs repeatedly — profit margin, markup and break-even — using the standard accounting formulas, so the number you get here matches the number your accountant would compute by hand.',
    'Two habits make this category work better. First, always review extracted data before importing it into accounting software: automated extraction is fast, but a quick scan of totals, tax amounts and dates catches the rare misread cell. Second, keep your source files — because everything is processed locally in your browser, nothing is stored on our side, so the copy on your device is the only copy.'
  ],
  icon: <Building2 className="w-6 h-6 text-[#0057F3]" />,
  faq: [
    {
      q: 'Are my confidential business invoices or financial statements uploaded to your servers?',
      a: 'No. File processing, staging, and table extraction occur in your local browser memory. Files are not permanently stored or shared.'
    },
    {
      q: 'Should I review the extracted Excel sheets before importing into accounting software?',
      a: 'Yes! Automated extraction tools provide an interactive verification and review table. Always inspect figures, tax amounts, and totals before importing into software like QuickBooks or Xero.'
    },
    {
      q: 'Are the financial and margin calculators specific to any single country?',
      a: 'No. The calculators use universally accepted accounting formulas (COGS, Gross Margin, Net Margin, Markup, and Break-Even Point) and support all major world currencies.'
    }
  ]
};

const textToolsInfo = {
  title: 'Text & File Processing Utilities',
  description: 'Privacy-focused document tools running 100% inside your browser. Count words, evaluate character limits for social media, convert PDF to JPG, and bundle JPG images into PDF.',
  editorial: [
    'Text and file work looks simple until privacy enters the picture. Uploading a contract, an ID scan or an unpublished manuscript to a random converter means handing a copy to a server you know nothing about — how long it keeps the file, who can access it, and whether it is resold as training data are questions most upload-based tools never answer. Every tool in this category takes the opposite approach: the file is read into your browser memory, processed with JavaScript and WebAssembly on your own device, and never transmitted. You can verify this yourself by loading a tool, switching your device to flight mode, and converting — it still works, because there is no server step to cut off.',
    'The same local processing shapes the practical limits. Output quality is a choice, not an accident: converting a PDF page at 150 DPI is usually right for screens and email, while 300 DPI is the safer choice for print or OCR. Very large files are bounded by your device memory rather than by an upload cap, so a modern laptop handles long documents comfortably, while an older phone may prefer smaller batches.'
  ],
  icon: <FileText className="w-6 h-6 text-amber-600" />,
  faq: [
    {
      q: 'Are my PDF or image files uploaded to your servers?',
      a: 'Never. All PDF rendering, image conversions, and text analyses run strictly inside your browser memory using HTML5 Canvas and WebAssembly. No files are transmitted to our servers.'
    },
    {
      q: 'Is there a limit on the number of pages or file size?',
      a: 'Because conversions occur client-side, limits depend on your device memory. For optimal performance, we recommend PDFs under 100 pages or image batches under 50MB.'
    }
  ]
};

const CATEGORY_INFO: Partial<Record<ToolCategory, { title: string; description: string; icon: React.ReactNode; faq: { q: string; a: string }[]; editorial: string[] }>> = {
  calculators: {
    title: 'Financial & Mathematical Calculators',
    description: 'Precision calculators for gross-to-net salary, progressive income tax, VAT rates, loan payments, mortgage amortization, compound interest growth, and percentages.',
    editorial: [
      'A calculator is only as trustworthy as the method behind it, so every calculator in this category is built on the official formula or statutory table it claims to use: progressive income tax is applied bracket by bracket rather than as a flat rate on your whole income, loan payments use the standard amortisation formula so the interest share falls and the principal share rises over the term, and compound growth applies the contribution schedule you enter instead of assuming a single lump sum. Each tool page explains its method in plain language, works a complete example with real numbers, and names its official sources, so you can reproduce any result with a pen, a spreadsheet or a second calculator.',
      'These tools are planning instruments, not professional advice. Salary and tax results are estimates: real payroll also reflects personal allowances, church tax, employer-specific agreements and mid-year rule changes that no general calculator can fully model. Use the figures here to compare job offers, sanity-check a payslip, price a freelance rate or understand what a loan truly costs — and confirm binding decisions with an accountant, a tax adviser or your lender.'
    ],
    icon: <Calculator className="w-6 h-6 text-emerald-600" />,
    faq: [
      {
        q: 'Are the financial calculations legally binding?',
        a: 'No. All calculations are provided as educational estimates based on official reference formulas. Individual circumstances, deductions, and local municipal variations can alter final figures.'
      },
      {
        q: 'How frequently are tax rates updated?',
        a: 'Our tax datasets reflect statutory 2025/2026 rates published by authorized national tax agencies and ministries across Europe and the US.'
      }
    ]
  },
  converters: {
    title: 'Unit, Currency & Time Zone Converters',
    description: 'Accurate two-way converters for metric and imperial units, international currencies with central bank benchmark rates, global time zones, and chronological age.',
    editorial: [
      'Conversion errors are usually quiet ones: a temperature read in the wrong scale, a meeting set an hour off because one side changed clocks for daylight saving, a price converted at a rate no bank would actually pay. The converters in this category are built to remove those traps. Unit conversions use exact defined factors (an inch is exactly 25.4 millimetres, not an approximation), time zone conversions follow the official IANA rules including daylight saving transitions, and age is calculated on calendar rules rather than by dividing days by 365.',
      'Currency deserves one honest warning. The rates shown here are benchmark reference rates of the kind published by central banks — useful for checking a price, estimating a budget or comparing offers. Your bank or card provider will almost always apply a less favourable rate plus a spread or fee, so the amount that finally leaves your account will differ slightly. For an exact figure, convert with the custom-rate option using the rate your provider quotes you.'
    ],
    icon: <RefreshCw className="w-6 h-6 text-blue-600" />,
    faq: [
      {
        q: 'Where do the currency exchange rates come from?',
        a: 'Currency rates are benchmark reference rates based on European Central Bank (ECB) and interbank daily fixes. You can also enter custom rates if your bank applies a spread.'
      },
      {
        q: 'Does the time zone converter handle Daylight Saving Time (DST)?',
        a: 'Yes. Our converter uses official IANA time zone rules to account for standard time and summer time transitions automatically.'
      }
    ]
  },
  'text-file': textToolsInfo,
  'text-tools': textToolsInfo,
  pdf: textToolsInfo,
  business: businessToolsInfo
};

export const CategoryPage: React.FC<CategoryPageProps> = ({ category, onNavigate }) => {
  const normalizedCategory = category === 'text-tools' ? 'text-file' : category;
  const info = CATEGORY_INFO[category] || CATEGORY_INFO[normalizedCategory] || CATEGORY_INFO.calculators!;
  const allTools = getToolsByCategory(normalizedCategory);

  const [activeSubcategory, setActiveSubcategory] = useState<string>('all');

  // Subcategory options for business category
  const subcategories = [
    { id: 'all', label: 'All Business Tools' },
    { id: 'documents-data', label: 'Documents & Data to Excel' },
    { id: 'spreadsheet-tools', label: 'Spreadsheet Cleanup' },
    { id: 'business-documents', label: 'Document Generators' },
    { id: 'business-calculators', label: 'Profit & Break-Even' },
    { id: 'product-marketing', label: 'Inventory & Marketing' },
  ];

  const filteredTools = (category === 'business' && activeSubcategory !== 'all')
    ? allTools.filter(t => t.subcategory === activeSubcategory)
    : allTools;

  return (
    <div className="py-8 sm:py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Home', onClick: () => onNavigate('home') },
          { label: info.title }
        ]}
      />

      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-2xs">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">
            {info.icon}
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Category</span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {info.title}
            </h1>
          </div>
        </div>
        <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
          {info.description}
        </p>

        {/* Subcategory Filter Pills for Business Tools */}
        {category === 'business' && (
          <div className="mt-6 pt-5 border-t border-slate-100">
            <div className="flex items-center gap-2 mb-2 text-xs font-bold text-slate-500">
              <Filter className="w-3.5 h-3.5" />
              <span>Filter by Subcategory:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {subcategories.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => setActiveSubcategory(sub.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    activeSubcategory === sub.id
                      ? 'bg-slate-900 text-white shadow-xs font-bold'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80'
                  }`}
                >
                  {sub.label}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-500 font-semibold">
          Showing {filteredTools.length} verified tools in this {activeSubcategory !== 'all' ? 'section' : 'category'}
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTools.map((tool) => (
          <ToolCard
            key={tool.id}
            tool={tool}
            onSelectTool={(slug) => onNavigate(`tools/${slug}`)}
          />
        ))}
      </div>

      {/* Category editorial */}
      {info.editorial && info.editorial.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-2xs">
          <h2 className="text-lg font-bold text-slate-900 mb-3">
            About this category
          </h2>
          {info.editorial.map((para, idx) => (
            <p key={idx} className="text-sm text-slate-600 leading-relaxed mb-3 last:mb-0">
              {para}
            </p>
          ))}
        </div>
      )}

      {/* Category FAQ */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="w-5 h-5 text-emerald-600" />
          <h2 className="text-lg font-bold text-slate-900">
            Category Questions & Notes
          </h2>
        </div>
        <div className="space-y-4">
          {info.faq.map((item, idx) => (
            <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200">
              <h3 className="text-sm font-bold text-slate-900 mb-1">{item.q}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

