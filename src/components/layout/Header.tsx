import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  Search, 
  Menu, 
  X, 
  Layers, 
  ExternalLink,
  ChevronDown,
  ArrowRight
} from 'lucide-react';
import { TheVectorLogo } from '../ui/TheVectorLogo';
import { ToolIcon } from '../ui/ToolIcon';
import { 
  TOOLS_REGISTRY, 
  getNavigationCategories, 
  getToolBySlug,
  CategoryNavGroup 
} from '../../data/toolsRegistry';

interface HeaderProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentRoute, onNavigate, onOpenSearch }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [expandedMobileCategories, setExpandedMobileCategories] = useState<Record<string, boolean>>({});
  
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  // Dynamic navigation categories derived from TOOLS_REGISTRY
  const navCategories = useMemo<CategoryNavGroup[]>(() => {
    return getNavigationCategories();
  }, []);

  // Determine current active tool or category
  const activeCategoryId = useMemo(() => {
    if (currentRoute.startsWith('category/')) {
      return currentRoute.replace('category/', '');
    }
    if (currentRoute.startsWith('tools/') || currentRoute.startsWith('tool/')) {
      const slug = currentRoute.replace(/^tools?\//, '');
      const tool = getToolBySlug(slug);
      return tool ? tool.category : null;
    }
    const directTool = getToolBySlug(currentRoute);
    if (directTool) {
      return directTool.category;
    }
    return null;
  }, [currentRoute]);

  const isHomeActive = currentRoute === 'home' || currentRoute === '';
  const isAllToolsActive = currentRoute === 'tools';

  // Keyboard and outside-click handling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenDropdown(null);
        setMobileMenuOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close menus on route change
  useEffect(() => {
    setOpenDropdown(null);
    setMobileMenuOpen(false);
  }, [currentRoute]);

  const handleLinkClick = (route: string) => {
    onNavigate(route);
    setOpenDropdown(null);
    setMobileMenuOpen(false);
  };

  const handleToolClick = (slug: string) => {
    onNavigate(`tools/${slug}`);
    setOpenDropdown(null);
    setMobileMenuOpen(false);
  };

  const handleMouseEnter = (catId: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setOpenDropdown(catId);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 180);
  };

  const toggleDropdown = (catId: string) => {
    setOpenDropdown(prev => prev === catId ? null : catId);
  };

  const toggleMobileCategory = (catId: string) => {
    setExpandedMobileCategories(prev => ({
      ...prev,
      [catId]: !prev[catId]
    }));
  };

  // Helper to get custom width for category dropdown
  const getDropdownWidth = (catId: string) => {
    switch (catId) {
      case 'business':
        return 'w-[680px] lg:w-[720px]';
      case 'calculators':
        return 'w-[520px]';
      case 'converters':
        return 'w-[440px]';
      case 'text-file':
        return 'w-[420px]';
      default:
        return 'w-[480px]';
    }
  };

  return (
    <header 
      ref={headerRef}
      className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-17">
          
          {/* 1. Left Brand / Logo */}
          <div className="flex items-center shrink-0 mr-4">
            <TheVectorLogo
              onNavigateHome={() => handleLinkClick('home')}
              showTagline={true}
              showCompanyLink={false}
              variant="header"
            />
          </div>

          {/* 2. Desktop Center Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5" aria-label="Main Navigation">
            {/* Home Link */}
            <button
              onClick={() => handleLinkClick('home')}
              className={`relative px-3 py-2 text-xs xl:text-sm font-medium transition-colors cursor-pointer rounded-lg hover:text-slate-900 ${
                isHomeActive
                  ? 'text-[#0057F3] font-semibold after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:bg-[#0057F3] after:rounded-full'
                  : 'text-slate-600 hover:bg-slate-50/80'
              }`}
            >
              Home
            </button>

            {/* Dynamic Dropdown Categories */}
            {navCategories.map((cat) => {
              const isOpen = openDropdown === cat.categoryId;
              const isActive = activeCategoryId === cat.categoryId;
              const dropdownWidth = getDropdownWidth(cat.categoryId);
              const totalTools = cat.subcategories.reduce((acc, sub) => acc + sub.tools.length, 0);

              return (
                <div
                  key={cat.categoryId}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(cat.categoryId)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    onClick={() => toggleDropdown(cat.categoryId)}
                    className={`relative inline-flex items-center gap-1 px-2.5 xl:px-3 py-2 text-xs xl:text-sm font-medium transition-colors cursor-pointer rounded-lg hover:text-slate-900 ${
                      isActive || isOpen
                        ? 'text-[#0057F3] font-semibold after:absolute after:bottom-0 after:left-2.5 after:right-2.5 after:h-0.5 after:bg-[#0057F3] after:rounded-full'
                        : 'text-slate-600 hover:bg-slate-50/80'
                    }`}
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                  >
                    <span>{cat.navName}</span>
                    <ChevronDown 
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#0057F3]' : 'text-slate-400'
                      }`} 
                    />
                  </button>

                  {/* Desktop Dropdown Panel */}
                  {isOpen && (
                    <div 
                      className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 ${dropdownWidth}`}
                      role="menu"
                    >
                      <div className="bg-white rounded-2xl shadow-xl shadow-slate-900/10 border border-slate-200/90 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150">
                        {/* Dropdown Content Columns */}
                        <div className="p-4 sm:p-5">
                          <div className={`grid ${cat.subcategories.length > 1 ? 'grid-cols-2 gap-x-6 gap-y-5' : 'grid-cols-1'}`}>
                            {cat.subcategories.map((sub) => (
                              <div key={sub.key} className="space-y-1.5">
                                <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-2 pb-0.5">
                                  {sub.label}
                                </div>
                                <div className="space-y-0.5">
                                  {sub.tools.map((tool) => {
                                    const isToolCurrent = currentRoute === `tools/${tool.slug}` || currentRoute === `tool/${tool.slug}`;
                                    return (
                                      <button
                                        key={tool.id}
                                        onClick={() => handleToolClick(tool.slug)}
                                        className={`w-full text-left flex items-start gap-2.5 p-2 rounded-xl transition-all group cursor-pointer ${
                                          isToolCurrent
                                            ? 'bg-blue-50/80 text-[#0057F3]'
                                            : 'hover:bg-slate-50 text-slate-700 hover:text-slate-900'
                                        }`}
                                        role="menuitem"
                                      >
                                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                                          isToolCurrent
                                            ? 'bg-blue-100 text-[#0057F3]'
                                            : 'bg-slate-100 text-slate-600 group-hover:bg-blue-50 group-hover:text-[#0057F3]'
                                        }`}>
                                          <ToolIcon name={tool.iconName} className="w-4 h-4" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                          <div className="text-xs font-semibold text-slate-800 group-hover:text-[#0057F3] transition-colors truncate">
                                            {tool.name}
                                          </div>
                                          <div className="text-[11px] text-slate-400 group-hover:text-slate-500 truncate leading-tight mt-0.5">
                                            {tool.shortDescription}
                                          </div>
                                        </div>
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Dropdown Footer Link */}
                        <div className="bg-slate-50/80 border-t border-slate-100 px-4 sm:px-5 py-2.5 flex items-center justify-between">
                          <span className="text-[11px] text-slate-400 font-medium">
                            {totalTools} free verified tools
                          </span>
                          <button
                            onClick={() => handleLinkClick(cat.route)}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0057F3] hover:text-blue-700 transition-colors cursor-pointer"
                          >
                            <span>Explore all {cat.navName}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* All Tools Link */}
            <button
              onClick={() => handleLinkClick('tools')}
              className={`relative px-3 py-2 text-xs xl:text-sm font-medium transition-colors cursor-pointer rounded-lg hover:text-slate-900 ${
                isAllToolsActive
                  ? 'text-[#0057F3] font-semibold after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:bg-[#0057F3] after:rounded-full'
                  : 'text-slate-600 hover:bg-slate-50/80'
              }`}
            >
              <span>All Tools</span>
              <span className="ml-1 text-[11px] text-slate-400 font-normal">
                · {TOOLS_REGISTRY.length}
              </span>
            </button>
          </nav>

          {/* 3. Right Controls: Search, Secondary Company Link & Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Compact Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100/90 hover:bg-slate-200/80 rounded-lg border border-slate-200/60 transition-colors cursor-pointer"
              title="Search all tools (⌘K)"
              aria-label="Search tools"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden md:inline-flex items-center px-1.5 py-0.2 rounded bg-white text-[10px] text-slate-400 font-mono border border-slate-200 shadow-2xs">
                ⌘K
              </kbd>
            </button>

            {/* Secondary Company Text Link */}
            <a
              href="https://www.thevector.systems"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden xl:inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-[#0057F3] transition-colors px-2 py-1 rounded-md hover:bg-slate-50"
              title="Visit Parent Company: thevector.systems"
            >
              <span>thevector.systems</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* 4. Mobile Navigation Drawer (Accordion Structure) */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 shadow-xl max-h-[calc(100vh-4.25rem)] overflow-y-auto animate-in slide-in-from-top-2 duration-150">
          <div className="px-4 py-3 space-y-1 divide-y divide-slate-100">
            {/* Home Link */}
            <div className="pb-1">
              <button
                onClick={() => handleLinkClick('home')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
                  isHomeActive
                    ? 'text-[#0057F3] bg-blue-50/80 font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>Home</span>
              </button>
            </div>

            {/* Category Accordions */}
            <div className="py-2 space-y-1.5">
              {navCategories.map((cat) => {
                const isExpanded = !!expandedMobileCategories[cat.categoryId];
                const isActive = activeCategoryId === cat.categoryId;
                const toolCount = cat.subcategories.reduce((acc, sub) => acc + sub.tools.length, 0);

                return (
                  <div key={cat.categoryId} className="rounded-xl border border-slate-100 bg-slate-50/50 overflow-hidden">
                    {/* Category Header */}
                    <button
                      onClick={() => toggleMobileCategory(cat.categoryId)}
                      className="w-full flex items-center justify-between p-3 text-left font-semibold text-sm text-slate-800 hover:bg-slate-100/60 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <span className={isActive ? 'text-[#0057F3] font-bold' : ''}>
                          {cat.navName}
                        </span>
                        <span className="text-[11px] font-normal text-slate-400">
                          ({toolCount})
                        </span>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                          isExpanded ? 'rotate-180 text-[#0057F3]' : ''
                        }`}
                      />
                    </button>

                    {/* Accordion Content */}
                    {isExpanded && (
                      <div className="p-3 bg-white border-t border-slate-100 space-y-3">
                        <button
                          onClick={() => handleLinkClick(cat.route)}
                          className="w-full text-left text-xs font-bold text-[#0057F3] hover:text-blue-700 flex items-center justify-between py-1 border-b border-slate-100"
                        >
                          <span>Explore all {cat.navName}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>

                        {cat.subcategories.map((sub) => (
                          <div key={sub.key} className="space-y-1">
                            <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-1">
                              {sub.label}
                            </div>
                            <div className="space-y-0.5">
                              {sub.tools.map((tool) => (
                                <button
                                  key={tool.id}
                                  onClick={() => handleToolClick(tool.slug)}
                                  className="w-full flex items-center gap-2.5 p-2 rounded-lg text-left text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-[#0057F3] transition-colors cursor-pointer"
                                >
                                  <div className="w-6 h-6 rounded-md bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                                    <ToolIcon name={tool.iconName} className="w-3.5 h-3.5" />
                                  </div>
                                  <span className="truncate">{tool.name}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* All Tools Link */}
            <div className="py-2">
              <button
                onClick={() => handleLinkClick('tools')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
                  isAllToolsActive
                    ? 'text-[#0057F3] bg-blue-50/80 font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Layers className="w-4 h-4 text-slate-400" />
                  <span>All Tools</span>
                </div>
                <span className="text-xs text-slate-400 font-normal">
                  {TOOLS_REGISTRY.length} tools
                </span>
              </button>
            </div>

            {/* Mobile Search Button */}
            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSearch();
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-xs font-medium transition-colors cursor-pointer"
              >
                <Search className="w-4 h-4 text-slate-400" />
                <span>Search all {TOOLS_REGISTRY.length} tools...</span>
              </button>
            </div>

            {/* Company Footer Info in Mobile Drawer */}
            <div className="pt-3 pb-2 space-y-2">
              <a
                href="https://www.thevector.systems"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-blue-50/80 border border-blue-200/60 text-xs font-semibold text-[#0057F3]"
              >
                <div className="flex items-center gap-2">
                  <img 
                    src="/thevector-symbol.webp" 
                    alt="The Vector" 
                    className="w-5 h-5 object-contain" 
                  />
                  <div>
                    <div className="font-extrabold text-slate-900">The Vector Systems</div>
                    <div className="text-[10px] text-blue-600 font-medium">thevector.systems ↗</div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-[#0057F3]" />
              </a>

              <div className="flex items-center justify-between text-[11px] text-slate-400 px-2">
                <span>thevectortools.online</span>
                <span>{TOOLS_REGISTRY.length} Free Utilities</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
