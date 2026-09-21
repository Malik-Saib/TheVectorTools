import React, { useState } from 'react';
import { RotateCcw, Copy, Check, Calculator } from 'lucide-react';

export const PercentageCalculator: React.FC = () => {
  // Mode 1: What is X% of Y?
  const [m1X, setM1X] = useState<string>('15');
  const [m1Y, setM1Y] = useState<string>('80');

  // Mode 2: X is what % of Y?
  const [m2X, setM2X] = useState<string>('25');
  const [m2Y, setM2Y] = useState<string>('200');

  // Mode 3: Percentage increase / decrease
  const [m3From, setM3From] = useState<string>('50');
  const [m3To, setM3To] = useState<string>('75');

  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Calculations
  // 1.
  const val1X = parseFloat(m1X) || 0;
  const val1Y = parseFloat(m1Y) || 0;
  const res1 = (val1X / 100) * val1Y;

  // 2.
  const val2X = parseFloat(m2X) || 0;
  const val2Y = parseFloat(m2Y) || 0;
  const res2 = val2Y !== 0 ? (val2X / val2Y) * 100 : 0;

  // 3.
  const val3From = parseFloat(m3From) || 0;
  const val3To = parseFloat(m3To) || 0;
  const diff3 = val3To - val3From;
  const res3 = val3From !== 0 ? ((val3To - val3From) / Math.abs(val3From)) * 100 : 0;

  const copyResult = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Operation 1: What is X% of Y? */}
      <div className="p-5 sm:p-6 bg-slate-50 rounded-xl border border-slate-200">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs">1</span>
            What is X% of Y?
          </h3>
          <button
            onClick={() => copyResult(`${val1X}% of ${val1Y} = ${res1}`, 'op1')}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 inline-flex items-center gap-1 cursor-pointer"
          >
            {copiedId === 'op1' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedId === 'op1' ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-sm font-semibold text-slate-700">
          <span>What is</span>
          <div className="relative w-24">
            <input
              type="number"
              step="any"
              value={m1X}
              onChange={(e) => setM1X(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 font-bold focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <span>% of</span>
          <div className="relative w-28">
            <input
              type="number"
              step="any"
              value={m1Y}
              onChange={(e) => setM1Y(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 font-bold focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <span>?</span>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between flex-wrap gap-2">
          <div className="text-xs text-slate-500 font-mono">
            Formula: ({val1X} / 100) × {val1Y}
          </div>
          <div className="text-lg sm:text-xl font-black text-emerald-700 bg-white px-3 py-1 rounded-lg border border-emerald-200">
            = {res1.toLocaleString('en-US', { maximumFractionDigits: 4 })}
          </div>
        </div>
      </div>

      {/* Operation 2: X is what percentage of Y? */}
      <div className="p-5 sm:p-6 bg-slate-50 rounded-xl border border-slate-200">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">2</span>
            X is what percentage of Y?
          </h3>
          <button
            onClick={() => copyResult(`${val2X} is ${res2.toFixed(2)}% of ${val2Y}`, 'op2')}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 inline-flex items-center gap-1 cursor-pointer"
          >
            {copiedId === 'op2' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedId === 'op2' ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-sm font-semibold text-slate-700">
          <div className="relative w-24">
            <input
              type="number"
              step="any"
              value={m2X}
              onChange={(e) => setM2X(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 font-bold focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <span>is what % of</span>
          <div className="relative w-28">
            <input
              type="number"
              step="any"
              value={m2Y}
              onChange={(e) => setM2Y(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 font-bold focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <span>?</span>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between flex-wrap gap-2">
          <div className="text-xs text-slate-500 font-mono">
            Formula: ({val2X} / {val2Y}) × 100
          </div>
          <div className="text-lg sm:text-xl font-black text-blue-700 bg-white px-3 py-1 rounded-lg border border-blue-200">
            = {val2Y === 0 ? 'Undefined' : `${res2.toLocaleString('en-US', { maximumFractionDigits: 2 })}%`}
          </div>
        </div>
      </div>

      {/* Operation 3: Percentage increase / decrease */}
      <div className="p-5 sm:p-6 bg-slate-50 rounded-xl border border-slate-200">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center text-xs">3</span>
            Percentage Increase or Decrease
          </h3>
          <button
            onClick={() => copyResult(`From ${val3From} to ${val3To} is a change of ${res3 >= 0 ? '+' : ''}${res3.toFixed(2)}%`, 'op3')}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 inline-flex items-center gap-1 cursor-pointer"
          >
            {copiedId === 'op3' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedId === 'op3' ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-sm font-semibold text-slate-700">
          <span>From</span>
          <div className="relative w-28">
            <input
              type="number"
              step="any"
              value={m3From}
              onChange={(e) => setM3From(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 font-bold focus:outline-hidden focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <span>to</span>
          <div className="relative w-28">
            <input
              type="number"
              step="any"
              value={m3To}
              onChange={(e) => setM3To(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 font-bold focus:outline-hidden focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between flex-wrap gap-2">
          <div className="text-xs text-slate-500 font-mono">
            Diff: {diff3 >= 0 ? `+${diff3}` : diff3} | Formula: (({val3To} - {val3From}) / |{val3From}|) × 100
          </div>
          <div className={`text-lg sm:text-xl font-black px-3 py-1 rounded-lg border ${
            res3 > 0
              ? 'text-emerald-700 bg-emerald-50 border-emerald-300'
              : res3 < 0
              ? 'text-rose-700 bg-rose-50 border-rose-300'
              : 'text-slate-700 bg-slate-100 border-slate-300'
          }`}>
            {res3 > 0 ? `+${res3.toFixed(2)}% Increase` : res3 < 0 ? `${res3.toFixed(2)}% Decrease` : '0% No Change'}
          </div>
        </div>
      </div>
    </div>
  );
};
