import React, { useState, useEffect } from 'react';
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

// 15 Standard Tool Components
import { SalaryCalculator } from './components/SalaryCalculator';
import { IncomeTaxCalculator } from './components/tools/IncomeTaxCalculator';
import { VatCalculator } from './components/tools/VatCalculator';
import { PercentageCalculator } from './components/tools/PercentageCalculator';
import { PercentageChangeCalculator } from './components/tools/PercentageChangeCalculator';
import { LoanCalculator } from './components/tools/LoanCalculator';
import { MortgageCalculator } from './components/tools/MortgageCalculator';
import { CompoundInterestCalculator } from './components/tools/CompoundInterestCalculator';
import { UnitConverter } from './components/tools/UnitConverter';
import { CurrencyConverter } from './components/tools/CurrencyConverter';
import { TimeZoneConverter } from './components/tools/TimeZoneConverter';
import { AgeCalculator } from './components/tools/AgeCalculator';
import { WordCounter } from './components/tools/WordCounter';
import { CharacterCounter } from './components/tools/CharacterCounter';
import { PdfToJpg } from './components/tools/PdfToJpg';
import { JpgToPdf } from './components/tools/JpgToPdf';

// 14 Business Tool Components
import { InvoiceToExcel } from './components/tools/business/InvoiceToExcel';
import { PdfTableToExcel } from './components/tools/business/PdfTableToExcel';
import { BankStatementToExcel } from './components/tools/business/BankStatementToExcel';
import { ReceiptToExpense } from './components/tools/business/ReceiptToExpense';
import { PurchaseOrderToExcel } from './components/tools/business/PurchaseOrderToExcel';
import { ExcelCsvCleaner } from './components/tools/business/ExcelCsvCleaner';
import { CsvBusinessExcel } from './components/tools/business/CsvBusinessExcel';
import { InvoiceGenerator } from './components/tools/business/InvoiceGenerator';
import { QuoteGenerator } from './components/tools/business/QuoteGenerator';
import { ReceiptGenerator } from './components/tools/business/ReceiptGenerator';
import { ProfitMarginCalculator } from './components/tools/business/ProfitMarginCalculator';
import { BreakEvenCalculator } from './components/tools/business/BreakEvenCalculator';
import { SkuGenerator } from './components/tools/business/SkuGenerator';
import { BusinessQrGenerator } from './components/tools/business/BusinessQrGenerator';

import { getToolBySlug, TOOLS_REGISTRY } from './data/toolsRegistry';
import { ToolCategory } from './types';
import { applyPageSeo } from './utils/seo';

const normalizeRoute = (value: string): string => {
  const trimmed = value.replace(/^#\/?/, '').replace(/^\/+/, '').trim();
  return trimmed || 'home';
};

const getRouteFromLocation = (): string => {
  const pathname = window.location.pathname.replace(/^\/+/, '').trim();
  if (!pathname || pathname === 'index.html') return 'home';
  return pathname;
};

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<string>('home');
  const [searchOpen, setSearchOpen] = useState<boolean>(false);

  useEffect(() => {
    const legacyHash = window.location.hash;
    if (legacyHash && legacyHash.startsWith('#/')) {
      const legacyPath = normalizeRoute(legacyHash);
      const nextPath = legacyPath === 'home' ? '/' : `/${legacyPath}`;
      window.history.replaceState({}, '', nextPath);
    }

    const handleLocationChange = () => {
      setCurrentRoute(getRouteFromLocation());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    handleLocationChange();
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  useEffect(() => {
    applyPageSeo(currentRoute);
  }, [currentRoute]);

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
    const normalized = normalizeRoute(route);
    const nextPath = normalized === 'home' ? '/' : `/${normalized}`;
    const currentPath = window.location.pathname;

    if (currentPath !== nextPath) {
      window.history.pushState({}, '', nextPath);
    }

    setCurrentRoute(normalized);
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
            {renderToolComponent(tool.slug)}
          </ToolPageLayout>
        );
      }
    }

    // Direct slug alias (e.g. #/vat-calculator or #/invoice-to-excel)
    const directTool = getToolBySlug(currentRoute);
    if (directTool) {
      return (
        <ToolPageLayout tool={directTool} onNavigate={handleNavigate}>
          {renderToolComponent(directTool.slug)}
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

    // 2b. Tools listing page
    if (currentRoute === 'tools') {
      return <HomePage onNavigate={handleNavigate} onOpenSearch={() => setSearchOpen(true)} />;
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
