import React from 'react';
import { ExternalLink } from 'lucide-react';

interface TheVectorLogoProps {
  variant?: 'header' | 'footer' | 'hero' | 'compact';
  theme?: 'light' | 'dark';
  showTagline?: boolean;
  showCompanyLink?: boolean;
  onNavigateHome?: () => void;
  className?: string;
}

export const TheVectorLogo: React.FC<TheVectorLogoProps> = ({
  variant = 'header',
  theme = 'light',
  showTagline = true,
  showCompanyLink = false,
  onNavigateHome,
  className = '',
}) => {
  const isDark = theme === 'dark';

  // The Vector exact symbol image
  const symbolSrc = isDark ? '/thevector-symbol-light.webp' : '/thevector-symbol.webp';

  if (variant === 'compact') {
    return (
      <div className={`inline-flex items-center gap-2.5 ${className}`}>
        <img
          src={symbolSrc}
          alt="The Vector"
          className="w-8 h-8 object-contain shrink-0"
          onError={(e) => {
            // Fallback SVG if image loading is interrupted
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
        <div className="flex items-center text-base font-extrabold tracking-tight">
          <span className={isDark ? 'text-white' : 'text-slate-900'}>The</span>
          <span className="text-[#0057F3] ml-1">Vector</span>
          <span className={`ml-1.5 text-[11px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
            isDark ? 'bg-blue-900/60 text-blue-300' : 'bg-blue-50 text-blue-700'
          }`}>
            Tools
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col ${className}`}>
      <div className="flex items-center gap-3">
        {/* Clickable Brand / Emblem */}
        <button
          onClick={onNavigateHome}
          className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-hidden"
          title="The Vector Tools Home"
        >
          <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center p-0.5 bg-slate-950 shadow-md group-hover:scale-105 transition-transform duration-200 border border-slate-800/80">
            <img
              src="/thevector-symbol-light.webp"
              alt="The Vector Symbol"
              className="w-7 h-7 object-contain drop-shadow-md"
            />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 leading-none">
              <span className={`font-black text-lg sm:text-xl tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                The <span className="text-[#0057F3]">Vector</span>
              </span>
              <span className={`text-[10px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded ${
                isDark ? 'bg-blue-950 text-blue-400 border border-blue-800/60' : 'bg-slate-900 text-white'
              }`}>
                Tools
              </span>
            </div>

            {/* Tagline from picture: "— WE BUILD. WE INNOVATE. WE SCALE. —" */}
            {showTagline && (
              <div className="flex items-center gap-1.5 mt-1 text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider text-[#0057F3]">
                <span className="w-2.5 h-[1.5px] bg-[#0057F3] rounded-full hidden sm:inline-block opacity-80" />
                <span>We Build. We Innovate. We Scale.</span>
                <span className="w-2.5 h-[1.5px] bg-[#0057F3] rounded-full hidden sm:inline-block opacity-80" />
              </div>
            )}
          </div>
        </button>

        {/* Company Website Link */}
        {showCompanyLink && (
          <a
            href="https://www.thevector.systems"
            target="_blank"
            rel="noopener noreferrer"
            title="Visit Company Website: thevector.systems"
            className={`hidden xl:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all border ${
              isDark
                ? 'bg-blue-950/70 border-blue-800/80 text-blue-300 hover:bg-blue-900/80 hover:text-white'
                : 'bg-blue-50 border-blue-200 text-[#0057F3] hover:bg-blue-100 hover:border-blue-300'
            }`}
          >
            <span>thevector.systems</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    </div>
  );
};
