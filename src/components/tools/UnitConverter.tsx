import React, { useState } from 'react';
import { ArrowLeftRight, RotateCcw, Copy, Check } from 'lucide-react';

interface UnitCategory {
  id: string;
  name: string;
  units: { id: string; name: string; toBase: (v: number) => number; fromBase: (v: number) => number }[];
}

const UNIT_CATEGORIES: UnitCategory[] = [
  {
    id: 'length',
    name: 'Length',
    units: [
      { id: 'm', name: 'Meters (m)', toBase: (v) => v, fromBase: (v) => v },
      { id: 'km', name: 'Kilometers (km)', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      { id: 'cm', name: 'Centimeters (cm)', toBase: (v) => v / 100, fromBase: (v) => v * 100 },
      { id: 'mm', name: 'Millimeters (mm)', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      { id: 'mi', name: 'Miles (mi)', toBase: (v) => v * 1609.344, fromBase: (v) => v / 1609.344 },
      { id: 'yd', name: 'Yards (yd)', toBase: (v) => v * 0.9144, fromBase: (v) => v / 0.9144 },
      { id: 'ft', name: 'Feet (ft)', toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
      { id: 'in', name: 'Inches (in)', toBase: (v) => v * 0.0254, fromBase: (v) => v / 0.0254 }
    ]
  },
  {
    id: 'weight',
    name: 'Weight & Mass',
    units: [
      { id: 'kg', name: 'Kilograms (kg)', toBase: (v) => v, fromBase: (v) => v },
      { id: 'g', name: 'Grams (g)', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      { id: 'mg', name: 'Milligrams (mg)', toBase: (v) => v / 1000000, fromBase: (v) => v * 1000000 },
      { id: 'lb', name: 'Pounds (lbs)', toBase: (v) => v * 0.45359237, fromBase: (v) => v / 0.45359237 },
      { id: 'oz', name: 'Ounces (oz)', toBase: (v) => v * 0.028349523, fromBase: (v) => v / 0.028349523 },
      { id: 't', name: 'Metric Tonnes (t)', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      { id: 'st', name: 'Stone (st)', toBase: (v) => v * 6.35029318, fromBase: (v) => v / 6.35029318 }
    ]
  },
  {
    id: 'temperature',
    name: 'Temperature',
    units: [
      { id: 'c', name: 'Celsius (°C)', toBase: (v) => v, fromBase: (v) => v },
      { id: 'f', name: 'Fahrenheit (°F)', toBase: (v) => (v - 32) * (5 / 9), fromBase: (v) => (v * 9) / 5 + 32 },
      { id: 'k', name: 'Kelvin (K)', toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15 }
    ]
  },
  {
    id: 'area',
    name: 'Area',
    units: [
      { id: 'sqm', name: 'Square Meters (m²)', toBase: (v) => v, fromBase: (v) => v },
      { id: 'sqkm', name: 'Square Kilometers (km²)', toBase: (v) => v * 1000000, fromBase: (v) => v / 1000000 },
      { id: 'sqft', name: 'Square Feet (ft²)', toBase: (v) => v * 0.09290304, fromBase: (v) => v / 0.09290304 },
      { id: 'sqyd', name: 'Square Yards (yd²)', toBase: (v) => v * 0.836127, fromBase: (v) => v / 0.836127 },
      { id: 'acre', name: 'Acres', toBase: (v) => v * 4046.85642, fromBase: (v) => v / 4046.85642 },
      { id: 'ha', name: 'Hectares (ha)', toBase: (v) => v * 10000, fromBase: (v) => v / 10000 }
    ]
  },
  {
    id: 'volume',
    name: 'Volume',
    units: [
      { id: 'l', name: 'Liters (L)', toBase: (v) => v, fromBase: (v) => v },
      { id: 'ml', name: 'Milliliters (mL)', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      { id: 'cbm', name: 'Cubic Meters (m³)', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      { id: 'gal_us', name: 'US Gallons (gal)', toBase: (v) => v * 3.785411784, fromBase: (v) => v / 3.785411784 },
      { id: 'qt_us', name: 'US Quarts (qt)', toBase: (v) => v * 0.946352946, fromBase: (v) => v / 0.946352946 },
      { id: 'cup_us', name: 'US Cups', toBase: (v) => v * 0.2365882365, fromBase: (v) => v / 0.2365882365 },
      { id: 'fl_oz_us', name: 'US Fluid Ounces (fl oz)', toBase: (v) => v * 0.0295735295, fromBase: (v) => v / 0.0295735295 }
    ]
  },
  {
    id: 'speed',
    name: 'Speed',
    units: [
      { id: 'kmh', name: 'Kilometers per hour (km/h)', toBase: (v) => v, fromBase: (v) => v },
      { id: 'mph', name: 'Miles per hour (mph)', toBase: (v) => v * 1.609344, fromBase: (v) => v / 1.609344 },
      { id: 'ms', name: 'Meters per second (m/s)', toBase: (v) => v * 3.6, fromBase: (v) => v / 3.6 },
      { id: 'knot', name: 'Knots (kn)', toBase: (v) => v * 1.852, fromBase: (v) => v / 1.852 }
    ]
  },
  {
    id: 'data',
    name: 'Data Storage',
    units: [
      { id: 'mb', name: 'Megabytes (MB)', toBase: (v) => v, fromBase: (v) => v },
      { id: 'gb', name: 'Gigabytes (GB)', toBase: (v) => v * 1024, fromBase: (v) => v / 1024 },
      { id: 'tb', name: 'Terabytes (TB)', toBase: (v) => v * 1024 * 1024, fromBase: (v) => v / (1024 * 1024) },
      { id: 'kb', name: 'Kilobytes (KB)', toBase: (v) => v / 1024, fromBase: (v) => v * 1024 },
      { id: 'bytes', name: 'Bytes (B)', toBase: (v) => v / (1024 * 1024), fromBase: (v) => v * (1024 * 1024) }
    ]
  }
];

export const UnitConverter: React.FC = () => {
  const [selectedCatId, setSelectedCatId] = useState<string>('length');
  const currentCategory = UNIT_CATEGORIES.find((c) => c.id === selectedCatId) || UNIT_CATEGORIES[0];

  const [fromUnitId, setFromUnitId] = useState<string>(currentCategory.units[0].id);
  const [toUnitId, setToUnitId] = useState<string>(currentCategory.units[4]?.id || currentCategory.units[1].id);
  const [inputValStr, setInputValStr] = useState<string>('1');
  const [copied, setCopied] = useState(false);

  // Sync units when category changes
  const handleCategoryChange = (catId: string) => {
    setSelectedCatId(catId);
    const cat = UNIT_CATEGORIES.find((c) => c.id === catId)!;
    setFromUnitId(cat.units[0].id);
    setToUnitId(cat.units[1]?.id || cat.units[0].id);
  };

  const fromUnit = currentCategory.units.find((u) => u.id === fromUnitId) || currentCategory.units[0];
  const toUnit = currentCategory.units.find((u) => u.id === toUnitId) || currentCategory.units[1];

  const inputVal = parseFloat(inputValStr);
  const isValid = !isNaN(inputVal);

  let convertedResult = 0;
  if (isValid) {
    const baseVal = fromUnit.toBase(inputVal);
    convertedResult = toUnit.fromBase(baseVal);
  }

  const handleSwap = () => {
    setFromUnitId(toUnitId);
    setToUnitId(fromUnitId);
  };

  const handleCopy = () => {
    const text = `${inputValStr} ${fromUnit.name} = ${convertedResult.toLocaleString('en-US', { maximumFractionDigits: 6 })} ${toUnit.name}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 pb-2 border-b border-slate-200">
        {UNIT_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategoryChange(cat.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              selectedCatId === cat.id
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Main Conversion Control */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-3 items-center">
        {/* From Side */}
        <div className="md:col-span-3 space-y-2">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            From
          </label>
          <input
            type="number"
            step="any"
            value={inputValStr}
            onChange={(e) => setInputValStr(e.target.value)}
            placeholder="0"
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-base text-slate-900 font-bold focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
          />
          <select
            value={fromUnitId}
            onChange={(e) => setFromUnitId(e.target.value)}
            className="w-full px-3 py-2 bg-slate-100 border border-slate-300 rounded-lg text-xs font-semibold text-slate-800"
          >
            {currentCategory.units.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>
        </div>

        {/* Swap Button */}
        <div className="md:col-span-1 flex justify-center pt-4 md:pt-6">
          <button
            onClick={handleSwap}
            className="w-10 h-10 rounded-full bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-700 border border-slate-300 flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
            title="Swap units"
          >
            <ArrowLeftRight className="w-4 h-4" />
          </button>
        </div>

        {/* To Side */}
        <div className="md:col-span-3 space-y-2">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            To
          </label>
          <div className="w-full px-3.5 py-2.5 bg-emerald-50/70 border border-emerald-300 rounded-lg text-base text-emerald-950 font-black overflow-x-auto truncate">
            {isValid ? convertedResult.toLocaleString('en-US', { maximumFractionDigits: 6 }) : '0'}
          </div>
          <select
            value={toUnitId}
            onChange={(e) => setToUnitId(e.target.value)}
            className="w-full px-3 py-2 bg-slate-100 border border-slate-300 rounded-lg text-xs font-semibold text-slate-800"
          >
            {currentCategory.units.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Reciprocal Conversion Box */}
      <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600 flex items-center justify-between flex-wrap gap-2 font-mono">
        <span>
          1 {fromUnit.id} = {toUnit.fromBase(fromUnit.toBase(1)).toLocaleString('en-US', { maximumFractionDigits: 6 })} {toUnit.id}
        </span>
        <span>
          1 {toUnit.id} = {fromUnit.fromBase(toUnit.toBase(1)).toLocaleString('en-US', { maximumFractionDigits: 6 })} {fromUnit.id}
        </span>
      </div>

      {/* All Units Comparison Table */}
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
          Equivalent Values for {isValid ? inputVal : 1} {fromUnit.name}:
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {currentCategory.units.map((u) => {
            const equiv = u.fromBase(fromUnit.toBase(isValid ? inputVal : 1));
            return (
              <div key={u.id} className="p-2.5 bg-white rounded-lg border border-slate-200 flex justify-between items-center text-xs">
                <span className="text-slate-600 font-medium">{u.name}</span>
                <span className="font-bold text-slate-900 font-mono">
                  {equiv.toLocaleString('en-US', { maximumFractionDigits: 5 })}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
        <button
          onClick={() => setInputValStr('1')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset to 1</span>
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
