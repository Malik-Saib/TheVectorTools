import React, { useState } from 'react';
import { 
  Percent, 
  TrendingUp, 
  DollarSign, 
  HelpCircle, 
  Calculator,
  ArrowRight,
  Info
} from 'lucide-react';

export const ProfitMarginCalculator: React.FC = () => {
  const [cost, setCost] = useState<number>(60);
  const [sellingPrice, setSellingPrice] = useState<number>(100);
  const [operatingExpenses, setOperatingExpenses] = useState<number>(15);

  // Target solver mode
  const [targetMargin, setTargetMargin] = useState<number>(45);

  // Calculations
  const grossProfit = Math.max(0, sellingPrice - cost);
  const grossMargin = sellingPrice > 0 ? (grossProfit / sellingPrice) * 100 : 0;
  const markup = cost > 0 ? (grossProfit / cost) * 100 : 0;

  const netProfit = sellingPrice - cost - (operatingExpenses || 0);
  const netMargin = sellingPrice > 0 ? (netProfit / sellingPrice) * 100 : 0;

  // Target price calculation: Target Price = Cost / (1 - Target Margin / 100)
  const targetSellingPrice = targetMargin < 100 && cost > 0 
    ? cost / (1 - targetMargin / 100) 
    : 0;
  const targetGrossProfit = targetSellingPrice - cost;
  const targetMarkup = cost > 0 ? (targetGrossProfit / cost) * 100 : 0;

  return (
    <div className="space-y-8">
      {/* Overview Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs">
        <h3 className="text-lg font-black text-slate-900 tracking-tight">
          Profit Margin & Markup Calculator
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Calculate gross margin, net margin, and markup percentage. Never confuse margin with markup when setting retail or service prices.
        </p>
      </div>

      {/* Main Calculator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs: 5 Cols */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-5">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-2">
              Cost & Revenue Inputs
            </h4>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-800">
                  Cost of Goods Sold (COGS)
                </label>
                <span className="text-[11px] text-slate-500">Unit cost</span>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={cost}
                  onChange={(e) => setCost(Number(e.target.value))}
                  className="w-full pl-8 pr-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-mono focus:ring-2 focus:ring-[#0057F3]"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-800">
                  Selling Price / Revenue
                </label>
                <span className="text-[11px] text-slate-500">Customer price</span>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={sellingPrice}
                  onChange={(e) => setSellingPrice(Number(e.target.value))}
                  className="w-full pl-8 pr-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-mono focus:ring-2 focus:ring-[#0057F3]"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-800">
                  Operating Expenses per Unit (Optional)
                </label>
                <span className="text-[11px] text-slate-500">Shipping, ads, fees</span>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={operatingExpenses}
                  onChange={(e) => setOperatingExpenses(Number(e.target.value))}
                  className="w-full pl-8 pr-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-mono focus:ring-2 focus:ring-[#0057F3]"
                />
              </div>
            </div>
          </div>

          {/* Margin vs Markup Explainer Box */}
          <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200/80 text-xs text-slate-700 space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-[#0057F3]">
              <Info className="w-4 h-4 shrink-0" />
              <span>Markup vs. Margin: The Critical Difference</span>
            </div>
            <p className="leading-relaxed">
              <strong>Profit Margin</strong> is profit divided by the <em>Selling Price</em>. It tells you what percentage of your revenue you keep.
            </p>
            <p className="leading-relaxed">
              <strong>Markup</strong> is profit divided by the <em>Cost</em>. It tells you how much you marked up the original wholesale price.
            </p>
          </div>
        </div>

        {/* Right Output Dashboard: 7 Cols */}
        <div className="lg:col-span-7 space-y-6">
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Gross Profit Margin</span>
              <div className="text-3xl font-black font-mono text-emerald-700 mt-1">
                {grossMargin.toFixed(1)}%
              </div>
              <div className="text-xs text-slate-500 mt-2 flex items-center justify-between pt-2 border-t border-slate-100">
                <span>Gross Dollar Profit:</span>
                <span className="font-bold font-mono text-slate-900">${grossProfit.toFixed(2)}</span>
              </div>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Markup Percentage</span>
              <div className="text-3xl font-black font-mono text-[#0057F3] mt-1">
                {markup.toFixed(1)}%
              </div>
              <div className="text-xs text-slate-500 mt-2 flex items-center justify-between pt-2 border-t border-slate-100">
                <span>Markup Multiplier:</span>
                <span className="font-bold font-mono text-slate-900">{(sellingPrice / (cost || 1)).toFixed(2)}x</span>
              </div>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Net Profit Margin</span>
              <div className={`text-3xl font-black font-mono mt-1 ${netMargin >= 0 ? 'text-emerald-700' : 'text-red-600'}`}>
                {netMargin.toFixed(1)}%
              </div>
              <div className="text-xs text-slate-500 mt-2 flex items-center justify-between pt-2 border-t border-slate-100">
                <span>Net Dollar Profit:</span>
                <span className="font-bold font-mono text-slate-900">${netProfit.toFixed(2)}</span>
              </div>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Cost-to-Price Ratio</span>
              <div className="text-3xl font-black font-mono text-slate-800 mt-1">
                {sellingPrice > 0 ? ((cost / sellingPrice) * 100).toFixed(1) : 0}%
              </div>
              <div className="text-xs text-slate-500 mt-2 flex items-center justify-between pt-2 border-t border-slate-100">
                <span>Total Cost Burden:</span>
                <span className="font-bold font-mono text-slate-900">${(cost + (operatingExpenses || 0)).toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Target Margin Solver Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-2">
              Target Margin Pricing Calculator
            </h4>
            <p className="text-xs text-slate-600">
              Want a specific profit margin? Enter your desired margin percentage to discover the exact price to charge.
            </p>

            <div className="flex items-center gap-3">
              <div className="w-48">
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Desired Margin (%)</label>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    max="99"
                    value={targetMargin}
                    onChange={(e) => setTargetMargin(Number(e.target.value))}
                    className="w-full pr-7 pl-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg font-mono text-slate-900"
                  />
                  <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">%</span>
                </div>
              </div>

              <div className="flex-1 p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-emerald-800 uppercase block">Required Selling Price</span>
                  <span className="text-xl font-black font-mono text-emerald-700">${targetSellingPrice.toFixed(2)}</span>
                </div>
                <div className="text-right text-xs">
                  <span className="text-emerald-700 font-medium block">Required Markup:</span>
                  <span className="font-mono font-bold text-emerald-900">{targetMarkup.toFixed(1)}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
