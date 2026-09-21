import React, { useState } from 'react';
import { ArrowLeftRight, RotateCcw, Copy, Check, Clock, AlertCircle } from 'lucide-react';

interface CurrencyInfo {
  code: string;
  name: string;
  symbol: string;
  rateToUsd: number; // reference baseline: 1 USD = X currency
}

const CURRENCIES: CurrencyInfo[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$', rateToUsd: 1.0 },
  { code: 'EUR', name: 'Euro', symbol: '€', rateToUsd: 0.925 },
  { code: 'GBP', name: 'British Pound', symbol: '£', rateToUsd: 0.772 },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', rateToUsd: 154.2 },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', rateToUsd: 1.365 },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', rateToUsd: 1.518 },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', rateToUsd: 0.884 },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', rateToUsd: 85.35 },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', rateToUsd: 7.23 },
  { code: 'PLN', name: 'Polish Zloty', symbol: 'zł', rateToUsd: 3.98 },
  { code: 'SEK', name: 'Swedish Krona', symbol: 'kr', rateToUsd: 10.45 },
  { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr', rateToUsd: 10.82 },
  { code: 'DKK', name: 'Danish Krone', symbol: 'kr', rateToUsd: 6.90 },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', rateToUsd: 5.65 }
];

export const CurrencyConverter: React.FC = () => {
  const [fromCode, setFromCode] = useState<string>('USD');
  const [toCode, setToCode] = useState<string>('EUR');
  const [amountStr, setAmountStr] = useState<string>('100');
  const [useCustomRate, setUseCustomRate] = useState<boolean>(false);
  const [customRateStr, setCustomRateStr] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const fromCurr = CURRENCIES.find((c) => c.code === fromCode) || CURRENCIES[0];
  const toCurr = CURRENCIES.find((c) => c.code === toCode) || CURRENCIES[1];

  const amount = Math.max(0, parseFloat(amountStr) || 0);

  // Standard benchmark exchange rate (From -> To)
  // 1 From in USD = 1 / fromCurr.rateToUsd
  // In To = (1 / fromCurr.rateToUsd) * toCurr.rateToUsd
  const standardRate = toCurr.rateToUsd / fromCurr.rateToUsd;
  const effectiveRate = useCustomRate && parseFloat(customRateStr) > 0 ? parseFloat(customRateStr) : standardRate;

  const convertedAmount = amount * effectiveRate;

  const handleSwap = () => {
    setFromCode(toCode);
    setToCode(fromCode);
    if (useCustomRate && effectiveRate > 0) {
      setCustomRateStr((1 / effectiveRate).toFixed(4));
    }
  };

  const handleCopy = () => {
    const text = `${fromCurr.symbol}${amount.toLocaleString()} ${fromCode} = ${toCurr.symbol}${convertedAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${toCode} (Rate: 1 ${fromCode} = ${effectiveRate.toFixed(4)} ${toCode})`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Rate Notice */}
      <div className="p-3 bg-blue-50/80 rounded-xl border border-blue-200 text-xs text-blue-900 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-blue-600 shrink-0" />
          <span>
            <strong>Reference Exchange Rates:</strong> Sourced from European Central Bank & interbank reference data.
          </span>
        </div>
        <span className="text-[11px] font-mono text-blue-700 bg-white/70 px-2 py-0.5 rounded border border-blue-200">
          Updated: Daily Reference Benchmarks
        </span>
      </div>

      {/* Main Conversion Form */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-3 items-center">
        {/* From Side */}
        <div className="md:col-span-3 space-y-2">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            Amount & Currency
          </label>
          <div className="flex">
            <span className="px-3 py-2.5 bg-slate-100 border border-r-0 border-slate-300 rounded-l-lg text-sm font-bold text-slate-600">
              {fromCurr.symbol}
            </span>
            <input
              type="number"
              min="0"
              step="any"
              value={amountStr}
              onChange={(e) => setAmountStr(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-r-lg text-base text-slate-900 font-bold focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <select
            value={fromCode}
            onChange={(e) => setFromCode(e.target.value)}
            className="w-full px-3 py-2 bg-slate-100 border border-slate-300 rounded-lg text-xs font-semibold text-slate-800"
          >
            {CURRENCIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.code} – {c.name} ({c.symbol})
              </option>
            ))}
          </select>
        </div>

        {/* Swap Button */}
        <div className="md:col-span-1 flex justify-center pt-4 md:pt-6">
          <button
            onClick={handleSwap}
            className="w-10 h-10 rounded-full bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-700 border border-slate-300 flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
            title="Swap currencies"
          >
            <ArrowLeftRight className="w-4 h-4" />
          </button>
        </div>

        {/* To Side */}
        <div className="md:col-span-3 space-y-2">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            Converted Amount
          </label>
          <div className="flex">
            <span className="px-3 py-2.5 bg-emerald-100/60 border border-r-0 border-emerald-300 rounded-l-lg text-sm font-bold text-emerald-800">
              {toCurr.symbol}
            </span>
            <div className="w-full px-3 py-2.5 bg-emerald-50/70 border border-emerald-300 rounded-r-lg text-base text-emerald-950 font-black overflow-x-auto truncate">
              {convertedAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>
          <select
            value={toCode}
            onChange={(e) => setToCode(e.target.value)}
            className="w-full px-3 py-2 bg-slate-100 border border-slate-300 rounded-lg text-xs font-semibold text-slate-800"
          >
            {CURRENCIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.code} – {c.name} ({c.symbol})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Exchange Rate Badge */}
      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between flex-wrap gap-2 text-xs">
        <div>
          <span className="text-slate-500 font-medium">Exchange Rate: </span>
          <span className="font-bold text-slate-900 font-mono">
            1 {fromCode} = {effectiveRate.toFixed(4)} {toCode}
          </span>
          <span className="text-slate-400 text-[11px] ml-2 font-mono">
            (1 {toCode} = {(1 / (effectiveRate || 1)).toFixed(4)} {fromCode})
          </span>
        </div>

        <button
          onClick={() => setUseCustomRate(!useCustomRate)}
          className="text-emerald-700 hover:text-emerald-800 font-semibold cursor-pointer underline text-[11px]"
        >
          {useCustomRate ? 'Use Standard Rate' : 'Enter Custom Bank Rate'}
        </button>
      </div>

      {/* Custom Rate Input Drawer */}
      {useCustomRate && (
        <div className="p-3.5 bg-amber-50 rounded-lg border border-amber-200 text-xs">
          <label className="block font-bold text-amber-900 mb-1">
            Custom Exchange Rate (1 {fromCode} in {toCode})
          </label>
          <div className="flex gap-2 max-w-xs">
            <input
              type="number"
              step="0.0001"
              value={customRateStr}
              onChange={(e) => setCustomRateStr(e.target.value)}
              placeholder={standardRate.toFixed(4)}
              className="px-3 py-1.5 bg-white border border-amber-300 rounded text-xs font-mono font-bold text-slate-900"
            />
            <button
              onClick={() => setCustomRateStr(standardRate.toFixed(4))}
              className="px-2 py-1 bg-white border border-amber-300 rounded text-amber-800 font-medium"
            >
              Reset
            </button>
          </div>
          <span className="text-[11px] text-amber-700 mt-1 block">
            Useful if your credit card or transfer service charges an additional markup spread.
          </span>
        </div>
      )}

      {/* Quick Benchmark Amount Pills */}
      <div>
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
          Quick Amount Presets:
        </span>
        <div className="flex flex-wrap gap-2">
          {['50', '100', '250', '500', '1000', '5000'].map((preset) => (
            <button
              key={preset}
              onClick={() => setAmountStr(preset)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                amountStr === preset
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {fromCurr.symbol}{preset}
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
        <button
          onClick={() => {
            setAmountStr('100');
            setFromCode('USD');
            setToCode('EUR');
            setUseCustomRate(false);
          }}
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
          <span>{copied ? 'Copied' : 'Copy Conversion'}</span>
        </button>
      </div>
    </div>
  );
};
