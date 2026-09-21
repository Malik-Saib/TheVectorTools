import React, { useState } from 'react';
import { RotateCcw, Copy, Check, TrendingUp, TrendingDown, Minus } from 'lucide-react';

export const PercentageChangeCalculator: React.FC = () => {
  const [originalStr, setOriginalStr] = useState<string>('50');
  const [newStr, setNewStr] = useState<string>('80');
  const [copied, setCopied] = useState(false);

  const orig = parseFloat(originalStr);
  const updated = parseFloat(newStr);

  const isValidOrig = !isNaN(orig);
  const isValidNew = !isNaN(updated);

  let percentChange = 0;
  let absoluteDiff = 0;
  let status: 'increase' | 'decrease' | 'no-change' | 'undefined' = 'no-change';

  if (isValidOrig && isValidNew) {
    absoluteDiff = updated - orig;
    if (orig === 0) {
      status = updated === 0 ? 'no-change' : 'undefined';
    } else {
      percentChange = ((updated - orig) / Math.abs(orig)) * 100;
      if (percentChange > 0) status = 'increase';
      else if (percentChange < 0) status = 'decrease';
      else status = 'no-change';
    }
  }

  const handleCopy = () => {
    const text = `Original: ${orig} → New: ${updated} | Change: ${percentChange >= 0 ? '+' : ''}${percentChange.toFixed(2)}% (${status}) | Diff: ${absoluteDiff >= 0 ? '+' : ''}${absoluteDiff}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setOriginalStr('50');
    setNewStr('80');
  };

  return (
    <div className="space-y-6">
      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Original Value (Starting Point)
          </label>
          <input
            type="number"
            step="any"
            value={originalStr}
            onChange={(e) => setOriginalStr(e.target.value)}
            placeholder="e.g. 50"
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 font-bold focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
          />
          <span className="text-[11px] text-slate-400 mt-1 block">The baseline amount before the change</span>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            New Value (Ending Point)
          </label>
          <input
            type="number"
            step="any"
            value={newStr}
            onChange={(e) => setNewStr(e.target.value)}
            placeholder="e.g. 80"
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 font-bold focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
          />
          <span className="text-[11px] text-slate-400 mt-1 block">The final amount after the change</span>
        </div>
      </div>

      {/* Main Result Presentation Card */}
      <div className={`p-6 rounded-2xl border transition-all ${
        status === 'increase'
          ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
          : status === 'decrease'
          ? 'bg-rose-50/70 border-rose-300 text-rose-950'
          : status === 'undefined'
          ? 'bg-amber-50/70 border-amber-300 text-amber-950'
          : 'bg-slate-50 border-slate-300 text-slate-900'
      }`}>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              {status === 'increase' && (
                <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-200/80 text-emerald-900">
                  <TrendingUp className="w-3.5 h-3.5" /> Percentage Increase
                </span>
              )}
              {status === 'decrease' && (
                <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-200/80 text-rose-900">
                  <TrendingDown className="w-3.5 h-3.5" /> Percentage Decrease
                </span>
              )}
              {status === 'no-change' && (
                <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-200 text-slate-800">
                  <Minus className="w-3.5 h-3.5" /> No Change (0.00%)
                </span>
              )}
              {status === 'undefined' && (
                <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-200 text-amber-900">
                  Undefined (Division by zero)
                </span>
              )}
            </div>

            <div className="text-3xl sm:text-4xl font-black tracking-tight">
              {status === 'undefined' ? (
                'Cannot calculate from 0'
              ) : (
                <>
                  {percentChange > 0 ? `+${percentChange.toFixed(2)}%` : `${percentChange.toFixed(2)}%`}
                </>
              )}
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs font-semibold text-slate-500 block">Absolute Difference</span>
            <span className="text-xl sm:text-2xl font-bold font-mono">
              {absoluteDiff > 0 ? `+${absoluteDiff.toLocaleString('en-US')}` : absoluteDiff.toLocaleString('en-US')}
            </span>
          </div>
        </div>

        {/* Step-by-step formula */}
        <div className="mt-4 pt-4 border-t border-black/10 text-xs font-mono space-y-1">
          <div>Step 1: Difference = New ({updated}) - Original ({orig}) = {absoluteDiff}</div>
          <div>Step 2: Relative = Difference ({absoluteDiff}) / |Original| ({Math.abs(orig)}) = {orig !== 0 ? (absoluteDiff / Math.abs(orig)).toFixed(4) : 'Undefined'}</div>
          <div>Step 3: Percentage = {orig !== 0 ? (absoluteDiff / Math.abs(orig)).toFixed(4) : 0} × 100% = <strong>{percentChange.toFixed(2)}%</strong></div>
        </div>
      </div>

      {/* Action buttons */}
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
          <span>{copied ? 'Copied' : 'Copy Result'}</span>
        </button>
      </div>
    </div>
  );
};
