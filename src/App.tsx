import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { SearchModal } from './components/ui/SearchModal';
import { HomePage } from './pages/HomePage';
import { CategoryPage } from './pages/CategoryPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { DisclaimerPage } from './pages/DisclaimerPage';
import { SourcesPage } from './pages/SourcesPage';
import { ToolPageLayout } from './components/ToolPageLayout';
import { RouteMeta } from './components/RouteMeta';

// 15 Standard Tool Components (lazy-loaded for code splitting)
const SalaryCalculator = lazy(() => import('./components/SalaryCalculator').then(m => ({ default: m.SalaryCalculator })));
const IncomeTaxCalculator = lazy(() => import('./components/tools/IncomeTaxCalculator').then(m => ({ default: m.IncomeTaxCalculator })));
const VatCalculator = lazy(() => import('./components/tools/VatCalculator').then(m => ({ default: m.VatCalculator })));
const PercentageCalculator = lazy(() => import('./components/tools/PercentageCalculator').then(m => ({ default: m.PercentageCalculator })));
const PercentageChangeCalculator = lazy(() => import('./components/tools/PercentageChangeCalculator').then(m => ({ default: m.PercentageChangeCalculator })));
const LoanCalculator = lazy(() => import('./components/tools/LoanCalculator').then(m => ({ default: m.LoanCalculator })));
const MortgageCalculator = lazy(() => import('./components/tools/MortgageCalculator').then(m => ({ default: m.MortgageCalculator })));
const CompoundInterestCalculator = lazy(() => import('./components/tools/CompoundInterestCalculator').then(m => ({ default: m.CompoundInterestCalculator })));
const UnitConverter = lazy(() => import('./components/tools/UnitConverter').then(m => ({ default: m.UnitConverter })));
const CurrencyConverter = lazy(() => import('./components/tools/CurrencyConverter').then(m => ({ default: m.CurrencyConverter })));
const TimeZoneConverter = lazy(() => import('./components/tools/TimeZoneConverter').then(m => ({ default: m.TimeZoneConverter })));
const AgeCalculator = lazy(() => import('./components/tools/AgeCalculator').then(m => ({ default: m.AgeCalculator })));
const WordCounter = lazy(() => import('./components/tools/WordCounter').then(m => ({ default: m.WordCounter })));
const CharacterCounter = lazy(() => import('./components/tools/CharacterCounter').then(m => ({ default: m.CharacterCounter })));
const PdfToJpg = lazy(() => import('./components/tools/PdfToJpg').then(m => ({ default: m.PdfToJpg })));
const JpgToPdf = lazy(() => import('./components/tools/JpgToPdf').then(m => ({ default: m.JpgToPdf })));
const ImageFormatConverter = lazy(() => import('./components/tools/ImageFormatConverter').then(m => ({ default: m.ImageFormatConverter })));

// 14 Business Tool Components (lazy-loaded for code splitting)
const InvoiceToExcel = lazy(() => import('./components/tools/business/InvoiceToExcel').then(m => ({ default: m.InvoiceToExcel })));
const PdfTableToExcel = lazy(() => import('./components/tools/business/PdfTableToExcel').then(m => ({ default: m.PdfTableToExcel })));
const BankStatementToExcel = lazy(() => import('./components/tools/business/BankStatementToExcel').then(m => ({ default: m.BankStatementToExcel })));
const ReceiptToExpense = lazy(() => import('./components/tools/business/ReceiptToExpense').then(m => ({ default: m.ReceiptToExpense })));
const PurchaseOrderToExcel = lazy(() => import('./components/tools/business/PurchaseOrderToExcel').then(m => ({ default: m.PurchaseOrderToExcel })));
const ExcelCsvCleaner = lazy(() => import('./components/tools/business/ExcelCsvCleaner').then(m => ({ default: m.ExcelCsvCleaner })));
const CsvBusinessExcel = lazy(() => import('./components/tools/business/CsvBusinessExcel').then(m => ({ default: m.CsvBusinessExcel })));
const InvoiceGenerator = lazy(() => import('./components/tools/business/InvoiceGenerator').then(m => ({ default: m.InvoiceGenerator })));
const QuoteGenerator = lazy(() => import('./components/tools/business/QuoteGenerator').then(m => ({ default: m.QuoteGenerator })));
const ReceiptGenerator = lazy(() => import('./components/tools/business/ReceiptGenerator').then(m => ({ default: m.ReceiptGenerator })));
const ProfitMarginCalculator = lazy(() => import('./components/tools/business/ProfitMarginCalculator').then(m => ({ default: m.ProfitMarginCalculator })));
const BreakEvenCalculator = lazy(() => import('./components/tools/business/BreakEvenCalculator').then(m => ({ default: m.BreakEvenCalculator })));
const SkuGenerator = lazy(() => import('./components/tools/business/SkuGenerator').then(m => ({ default: m.SkuGenerator })));
const BusinessQrGenerator = lazy(() => import('./components/tools/business/BusinessQrGenerator').then(m => ({ default: m.BusinessQrGenerator })));

import { getToolBySlug, TOOLS_REGISTRY } from './data/toolsRegistry';
import { ToolCategory } from './types';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<string>('home');
  const [searchOpen, setSearchOpen] = useState<boolean>(false);

  // Parse clean path on mount, handle back/forward navigation,
  // and redirect legacy #/ URLs to their clean-path equivalents
  useEffect(() => {
    const parsePath = () => {
      const path = window.location.pathname.replace(/^\/+|\/+$/g, '').trim();
      setCurrentRoute(path === '' ? 'home' : path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Legacy support: #/tools/loan-calculator -> /tools/loan-calculator (no reload)
    const legacyHash = window.location.hash;
    if (legacyHash.startsWith('#/')) {
      const legacyRoute = legacyHash.replace(/^#\/?/, '').trim();
      window.history.replaceState({}, '', legacyRoute === '' ? '/' : `/${legacyRoute}`);
    }

    parsePath();
    window.addEventListener('popstate', parsePath);
    return () => window.removeEventListener('popstate', parsePath);
  }, []);

  // Keyboard shortcut for Command/Ctrl + K (Search)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigate = (route: string) => {
    const cleanRoute = route.replace(/^#\/?/, '').replace(/^\/+/, '').trim();
    const normalizedRoute = cleanRoute === '' ? 'home' : cleanRoute;
    const path = normalizedRoute === 'home' ? '/' : `/${normalizedRoute}`;
    window.history.pushState({}, '', path);
    setCurrentRoute(normalizedRoute);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render Tool interactive component based on slug
  const renderToolComponent = (slug: string) => {
    switch (slug) {
      // Calculators
      case 'salary-calculator':
        return <SalaryCalculator />;
      case 'income-tax-calculator':
        return <IncomeTaxCalculator />;
      case 'vat-calculator':
        return <VatCalculator />;
      case 'percentage-calculator':
        return <PercentageCalculator />;
      case 'percentage-change-calculator':
        return <PercentageChangeCalculator />;
      case 'loan-calculator':
        return <LoanCalculator />;
      case 'mortgage-calculator':
        return <MortgageCalculator />;
      case 'compound-interest-calculator':
        return <CompoundInterestCalculator />;

      // Converters
      case 'unit-converter':
        return <UnitConverter />;
      case 'currency-converter':
        return <CurrencyConverter />;
      case 'time-zone-converter':
        return <TimeZoneConverter />;
      case 'age-calculator':
        return <AgeCalculator />;

      // Text & File Tools
      case 'word-counter':
        return <WordCounter />;
      case 'character-counter':
        return <CharacterCounter />;
      case 'pdf-to-jpg':
        return <PdfToJpg />;
      case 'jpg-to-pdf':
        return <JpgToPdf />;
      case 'image-format-converter':
        return <ImageFormatConverter />;

      // Business Tools (14 tools)
      case 'invoice-to-excel':
        return <InvoiceToExcel />;
      case 'pdf-table-to-excel':
        return <PdfTableToExcel />;
      case 'bank-statement-to-excel':
        return <BankStatementToExcel />;
      case 'receipt-to-expense':
        return <ReceiptToExpense />;
      case 'purchase-order-to-excel':
        return <PurchaseOrderToExcel />;
      case 'excel-csv-cleaner':
        return <ExcelCsvCleaner />;
      case 'csv-to-business-excel':
        return <CsvBusinessExcel />;
      case 'invoice-generator':
        return <InvoiceGenerator />;
      case 'quote-generator':
        return <QuoteGenerator />;
      case 'receipt-generator':
        return <ReceiptGenerator />;
      case 'profit-margin-calculator':
        return <ProfitMarginCalculator />;
      case 'break-even-calculator':
        return <BreakEvenCalculator />;
      case 'sku-generator':
        return <SkuGenerator />;
      case 'business-qr-generator':
        return <BusinessQrGenerator />;

      default:
        return (
          <div className="p-8 text-center text-slate-600 font-semibold">
            Tool is initializing...
          </div>
        );
    }
  };

  // Main Route Dispatcher
  const renderContent = () => {
    // 1. Tool Detail Pages (e.g. tools/salary-calculator or tool/invoice-to-excel)
    if (currentRoute.startsWith('tools/') || currentRoute.startsWith('tool/')) {
      const slug = currentRoute.replace(/^tools?\//, '').trim();
      const tool = getToolBySlug(slug);

      if (tool) {
        return (
          <ToolPageLayout tool={tool} onNavigate={handleNavigate}>
            <Suspense fallback={<div className="p-8 text-center text-slate-600 font-semibold">Tool is initializing...</div>}>
              {renderToolComponent(tool.slug)}
            </Suspense>
          </ToolPageLayout>
        );
      }
    }

    // Direct slug alias (e.g. #/vat-calculator or #/invoice-to-excel)
    const directTool = getToolBySlug(currentRoute);
    if (directTool) {
      return (
        <ToolPageLayout tool={directTool} onNavigate={handleNavigate}>
          <Suspense fallback={<div className="p-8 text-center text-slate-600 font-semibold">Tool is initializing...</div>}>
            {renderToolComponent(directTool.slug)}
          </Suspense>
        </ToolPageLayout>
      );
    }

    // 2. Category Pages
    if (currentRoute === 'category/calculators') {
      return <CategoryPage category="calculators" onNavigate={handleNavigate} />;
    }
    if (currentRoute === 'category/converters') {
      return <CategoryPage category="converters" onNavigate={handleNavigate} />;
    }
    if (currentRoute === 'category/text-file' || currentRoute === 'category/text-tools') {
      return <CategoryPage category="text-tools" onNavigate={handleNavigate} />;
    }
    if (currentRoute === 'category/business') {
      return <CategoryPage category="business" onNavigate={handleNavigate} />;
    }

    // 3. Trust & Legal Pages
    if (currentRoute === 'about') {
      return <AboutPage onNavigate={handleNavigate} />;
    }
    if (currentRoute === 'contact') {
      return <ContactPage onNavigate={handleNavigate} />;
    }
    if (currentRoute === 'privacy') {
      return <PrivacyPage onNavigate={handleNavigate} />;
    }
    if (currentRoute === 'terms') {
      return <TermsPage onNavigate={handleNavigate} />;
    }
    if (currentRoute === 'disclaimer') {
      return <DisclaimerPage onNavigate={handleNavigate} />;
    }
    if (currentRoute === 'sources') {
      return <SourcesPage onNavigate={handleNavigate} />;
    }

    // All-tools directory
    if (currentRoute === 'tools') {
      return (
        <HomePage
          onNavigate={handleNavigate}
          onOpenSearch={() => setSearchOpen(true)}
        />
      );
    }

    // Default: Home Page
    return (
      <HomePage
        onNavigate={handleNavigate}
        onOpenSearch={() => setSearchOpen(true)}
      />
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans antialiased text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
      {/* Per-route SEO meta (skips tool routes — ToolPageLayout owns those) */}
      <RouteMeta route={currentRoute} />

      {/* Global Header */}
      <Header
        currentRoute={currentRoute}
        onNavigate={handleNavigate}
        onOpenSearch={() => setSearchOpen(true)}
      />

      {/* Main Dynamic View */}
      <main className="flex-1">
        {renderContent()}
      </main>

      {/* Global Search Dialog Modal (Command+K) */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectTool={(slug) => {
          handleNavigate(`tools/${slug}`);
          setSearchOpen(false);
        }}
      />

      {/* Global Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
