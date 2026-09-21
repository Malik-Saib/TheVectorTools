import React, { useState } from 'react';
import { RotateCcw, Copy, Check, Percent, ArrowRight } from 'lucide-react';

const VAT_COUNTRY_PRESETS = [
  { name: 'Custom Rate', rate: 20 },
  { name: 'United Kingdom (20%)', rate: 20 },
  { name: 'Germany (19%)', rate: 19 },
  { name: 'France (20%)', rate: 20 },
  { name: 'Spain (21%)', rate: 21 },
  { name: 'Italy (22%)', rate: 22 },
  { name: 'Netherlands (21%)', rate: 21 },
  { name: 'Belgium (21%)', rate: 21 },
  { name: 'Ireland (23%)', rate: 23 },
  { name: 'Poland (23%)', rate: 23 },
  { name: 'Sweden (25%)', rate: 25 },
  { name: 'Switzerland (8.1%)', rate: 8.1 }
];

export const VatCalculator: React.FC = () => {
  const [mode, setMode] = useState<'add' | 'remove'>('add');
  const [amountStr, setAmountStr] = useState<string>('100');
  const [vatRateStr, setVatRateStr] = useState<string>('20');
  const [currencySymbol, setCurrencySymbol] = useState<string>('€');
  const [copied, setCopied] = useState(false);

  const amount = Math.max(0, parseFloat(amountStr) || 0);
  const vatRate = Math.max(0, parseFloat(vatRateStr) || 0);

  let netPrice = 0;
  let grossPrice = 0;
  let vatAmount = 0;

  if (mode === 'add') {
    // Net to Gross
    netPrice = amount;
    vatAmount = netPrice * (vatRate / 100);
    grossPrice = netPrice + vatAmount;
  } else {
    // Gross to Net
    grossPrice = amount;
    netPrice = grossPrice / (1 + vatRate / 100);
    vatAmount = grossPrice - netPrice;
  }

  const format = (n: number) => {
    return `${currencySymbol}${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const handleCopy = () => {
    const text = `Net: ${format(netPrice)} | VAT (${vatRate}%): ${format(vatAmount)} | Gross Total: ${format(grossPrice)}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setAmountStr('100');
    setVatRateStr('20');
    setMode('add');
  };

  return (
    <div className="space-y-6">
      {/* Mode Switcher Tabs */}
      <div className="flex rounded-xl bg-slate-100 p-1 border border-slate-200">
        <button
          onClick={() => setMode('add')}
          className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer ${
            mode === 'add'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Add VAT (Net → Gross)
        </button>
        <button
          onClick={() => setMode('remove')}
          className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer ${
            mode === 'remove'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Remove VAT (Gross → Net)
        </button>
      </div>

      {/* Input Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Currency & Amount */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            {mode === 'add' ? 'Net Price (Excl. VAT)' : 'Gross Price (Incl. VAT)'}
          </label>
          <div className="flex">
            <select
              value={currencySymbol}
              onChange={(e) => setCurrencySymbol(e.target.value)}
              className="px-3 py-2.5 bg-slate-100 border border-r-0 border-slate-300 rounded-l-lg text-sm font-bold text-slate-700 focus:outline-hidden"
            >
              <option value="€">€ (EUR)</option>
              <option value="$">$ (USD)</option>
              <option value="£">£ (GBP)</option>
              <option value="CHF">CHF</option>
              <option value="zł">zł (PLN)</option>
            </select>
            <input
              type="number"
              min="0"
              step="any"
              value={amountStr}
              onChange={(e) => setAmountStr(e.target.value)}
              placeholder="100.00"
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-r-lg text-sm text-slate-900 font-semibold focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* VAT Rate */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            VAT Rate (%)
          </label>
          <div className="relative">
            <input
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={vatRateStr}
              onChange={(e) => setVatRateStr(e.target.value)}
              placeholder="20"
              className="w-full px-3 py-2.5 pr-8 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 font-semibold focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
            <span className="absolute right-3 top-2.5 text-slate-400 text-sm font-bold">%</span>
          </div>
        </div>
      </div>

      {/* Country Presets Quick Pills */}
      <div>
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
          Country Rate Presets:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {VAT_COUNTRY_PRESETS.map((p) => (
            <button
              key={p.name}
              onClick={() => setVatRateStr(p.rate.toString())}
              className={`text-xs px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
                parseFloat(vatRateStr) === p.rate
                  ? 'bg-slate-900 text-white border-slate-900 font-bold'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Result Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
        <div className={`p-4 rounded-xl border ${mode === 'add' ? 'bg-slate-50 border-slate-200' : 'bg-emerald-50/70 border-emerald-200'}`}>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Net Price (Excl. VAT)
          </span>
          <div className="text-2xl font-black text-slate-900 mt-1">
            {format(netPrice)}
          </div>
          <span className="text-[11px] text-slate-400">Base goods / service value</span>
        </div>

        <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
            VAT Amount ({vatRate}%)
          </span>
          <div className="text-2xl font-black text-amber-900 mt-1">
            {format(vatAmount)}
          </div>
          <span className="text-[11px] text-amber-700 font-semibold">Tax collected</span>
        </div>

        <div className={`p-4 rounded-xl border ${mode === 'remove' ? 'bg-slate-50 border-slate-200' : 'bg-emerald-50/70 border-emerald-200'}`}>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
            Gross Total (Incl. VAT)
          </span>
          <div className="text-2xl font-black text-emerald-900 mt-1">
            {format(grossPrice)}
          </div>
          <span className="text-[11px] text-emerald-700 font-semibold">Customer invoice total</span>
        </div>
      </div>

      {/* Mathematical step explanation */}
      <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600 font-mono">
        {mode === 'add' ? (
          <div>
            Formula: Net ({format(netPrice)}) × (1 + {vatRate} / 100) = <strong className="text-slate-900">{format(grossPrice)}</strong>
          </div>
        ) : (
          <div>
            Formula: Gross ({format(grossPrice)}) / (1 + {vatRate} / 100) = <strong className="text-slate-900">{format(netPrice)}</strong> (VAT: {format(vatAmount)})
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
        <button
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>

        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs transition-colors cursor-pointer"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied VAT Breakdown' : 'Copy Result'}</span>
        </button>
      </div>
    </div>
  );
};
