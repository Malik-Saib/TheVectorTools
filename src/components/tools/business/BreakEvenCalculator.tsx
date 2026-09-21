import React, { useState } from 'react';
import { 
  Target, 
  TrendingUp, 
  DollarSign, 
  HelpCircle, 
  Calculator,
  Table as TableIcon
} from 'lucide-react';

export const BreakEvenCalculator: React.FC = () => {
  const [fixedCosts, setFixedCosts] = useState<number>(5000);
  const [variableCostPerUnit, setVariableCostPerUnit] = useState<number>(25);
  const [sellingPricePerUnit, setSellingPricePerUnit] = useState<number>(65);
  const [targetProfit, setTargetProfit] = useState<number>(2000);

  // Calculations
  const contributionMargin = Math.max(0, sellingPricePerUnit - variableCostPerUnit);
  const contributionMarginRatio = sellingPricePerUnit > 0 
    ? (contributionMargin / sellingPricePerUnit) * 100 
    : 0;

  const breakEvenUnits = contributionMargin > 0 
    ? Math.ceil(fixedCosts / contributionMargin) 
    : 0;

  const breakEvenRevenue = breakEvenUnits * sellingPricePerUnit;

  const unitsForTargetProfit = contributionMargin > 0 
    ? Math.ceil((fixedCosts + (targetProfit || 0)) / contributionMargin) 
    : 0;
  const revenueForTargetProfit = unitsForTargetProfit * sellingPricePerUnit;

  // Milestone schedule
  const volumes = [
    Math.round(breakEvenUnits * 0.5),
    Math.round(breakEvenUnits * 0.75),
    breakEvenUnits,
    Math.round(breakEvenUnits * 1.25),
    Math.round(breakEvenUnits * 1.5)
  ];

  return (
    <div className="space-y-8">
      {/* Overview Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs">
        <h3 className="text-lg font-black text-slate-900 tracking-tight">
          Break-Even Point (BEP) Calculator
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Calculate the exact unit volume and revenue required to cover all fixed and variable overhead.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs: 5 Cols */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-5">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-2">
              Cost & Pricing Variables
            </h4>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-800">
                  Total Fixed Costs
                </label>
                <span className="text-[11px] text-slate-500">Rent, payroll, software</span>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                <input
                  type="number"
                  min="0"
                  value={fixedCosts}
                  onChange={(e) => setFixedCosts(Number(e.target.value))}
                  className="w-full pl-8 pr-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-mono focus:ring-2 focus:ring-[#0057F3]"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-800">
                  Variable Cost per Unit
                </label>
                <span className="text-[11px] text-slate-500">Materials, shipping, fees</span>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={variableCostPerUnit}
                  onChange={(e) => setVariableCostPerUnit(Number(e.target.value))}
                  className="w-full pl-8 pr-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-mono focus:ring-2 focus:ring-[#0057F3]"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-800">
                  Selling Price per Unit
                </label>
                <span className="text-[11px] text-slate-500">Gross customer price</span>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={sellingPricePerUnit}
                  onChange={(e) => setSellingPricePerUnit(Number(e.target.value))}
                  className="w-full pl-8 pr-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-mono focus:ring-2 focus:ring-[#0057F3]"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-800">
                  Target Profit Goal (Optional)
                </label>
                <span className="text-[11px] text-slate-500">Desired net profit</span>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                <input
                  type="number"
                  min="0"
                  value={targetProfit}
                  onChange={(e) => setTargetProfit(Number(e.target.value))}
                  className="w-full pl-8 pr-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-mono focus:ring-2 focus:ring-[#0057F3]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Output: 7 Cols */}
        <div className="lg:col-span-7 space-y-6">
          {/* Key Output Metric Hero */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Break-Even Units</span>
              <div className="text-3xl font-black font-mono text-[#0057F3] mt-1">
                {breakEvenUnits.toLocaleString()} units
              </div>
              <div className="text-xs text-slate-500 mt-2 flex items-center justify-between pt-2 border-t border-slate-100">
                <span>Required Revenue:</span>
                <span className="font-bold font-mono text-slate-900">${breakEvenRevenue.toLocaleString()}</span>
              </div>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Unit Contribution Margin</span>
              <div className="text-3xl font-black font-mono text-emerald-700 mt-1">
                ${contributionMargin.toFixed(2)}
              </div>
              <div className="text-xs text-slate-500 mt-2 flex items-center justify-between pt-2 border-t border-slate-100">
                <span>Contribution Ratio:</span>
                <span className="font-bold font-mono text-slate-900">{contributionMarginRatio.toFixed(1)}%</span>
              </div>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs col-span-1 sm:col-span-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Units Needed for Target Profit (${targetProfit.toLocaleString()})</span>
                  <div className="text-2xl font-black font-mono text-slate-900 mt-1">
                    {unitsForTargetProfit.toLocaleString()} units (${revenueForTargetProfit.toLocaleString()} revenue)
                  </div>
                </div>
                <div className="text-xs text-slate-500 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200">
                  {unitsForTargetProfit - breakEvenUnits} units beyond break-even
                </div>
              </div>
            </div>
          </div>

          {/* Volume Milestone Projection Table */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-2">
              Volume Sensitivity & Profit Curve
            </h4>

            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-2.5">Volume (Units)</th>
                    <th className="p-2.5">Total Revenue</th>
                    <th className="p-2.5">Total Costs</th>
                    <th className="p-2.5 text-right">Net Profit / Loss</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono text-xs">
                  {volumes.map((v, idx) => {
                    const rev = v * sellingPricePerUnit;
                    const totalCost = fixedCosts + (v * variableCostPerUnit);
                    const net = rev - totalCost;
                    const isBEP = v === breakEvenUnits;

                    return (
                      <tr key={idx} className={isBEP ? 'bg-blue-50/70 font-bold' : 'hover:bg-slate-50/60'}>
                        <td className="p-2.5">
                          {v.toLocaleString()} {isBEP && <span className="ml-1 text-[10px] text-[#0057F3] uppercase font-black tracking-wide">(BEP)</span>}
                        </td>
                        <td className="p-2.5">${rev.toLocaleString()}</td>
                        <td className="p-2.5">${totalCost.toLocaleString()}</td>
                        <td className={`p-2.5 text-right font-black ${net > 0 ? 'text-emerald-700' : net < 0 ? 'text-red-600' : 'text-slate-900'}`}>
                          {net >= 0 ? '+' : ''}${net.toLocaleString()}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
