import React, { useState } from 'react';
import { RotateCcw, Copy, Check, Clock, Globe, ArrowLeftRight, Sun, Moon } from 'lucide-react';

interface ZoneItem {
  id: string;
  name: string;
  city: string;
  offsetHours: number; // Winter baseline offset from UTC
}

const TIME_ZONES: ZoneItem[] = [
  { id: 'America/New_York', name: 'New York (EDT/EST)', city: 'New York', offsetHours: -5 },
  { id: 'America/Los_Angeles', name: 'Los Angeles (PDT/PST)', city: 'Los Angeles', offsetHours: -8 },
  { id: 'America/Chicago', name: 'Chicago (CDT/CST)', city: 'Chicago', offsetHours: -6 },
  { id: 'Europe/London', name: 'London (GMT/BST)', city: 'London', offsetHours: 0 },
  { id: 'Europe/Paris', name: 'Paris / Berlin / Rome (CET/CEST)', city: 'Paris', offsetHours: 1 },
  { id: 'Europe/Athens', name: 'Athens / Helsinki (EET/EEST)', city: 'Athens', offsetHours: 2 },
  { id: 'Asia/Dubai', name: 'Dubai (GST)', city: 'Dubai', offsetHours: 4 },
  { id: 'Asia/Kolkata', name: 'India Standard Time (IST)', city: 'New Delhi', offsetHours: 5.5 },
  { id: 'Asia/Singapore', name: 'Singapore / Hong Kong (SGT/HKT)', city: 'Singapore', offsetHours: 8 },
  { id: 'Asia/Tokyo', name: 'Tokyo (JST)', city: 'Tokyo', offsetHours: 9 },
  { id: 'Australia/Sydney', name: 'Sydney (AEST/AEDT)', city: 'Sydney', offsetHours: 10 },
  { id: 'Pacific/Auckland', name: 'Auckland (NZST/NZDT)', city: 'Auckland', offsetHours: 12 },
  { id: 'UTC', name: 'Universal Coordinated Time (UTC)', city: 'UTC', offsetHours: 0 }
];

export const TimeZoneConverter: React.FC = () => {
  const [fromZoneId, setFromZoneId] = useState<string>('America/New_York');
  const [toZoneId, setToZoneId] = useState<string>('Europe/London');
  const [selectedDate, setSelectedDate] = useState<string>(() => new Date().toISOString().split('T')[0]);
  const [selectedHour, setSelectedHour] = useState<number>(14); // 2:00 PM
  const [selectedMinute, setSelectedMinute] = useState<number>(0);
  const [copied, setCopied] = useState(false);

  const fromZone = TIME_ZONES.find((z) => z.id === fromZoneId) || TIME_ZONES[0];
  const toZone = TIME_ZONES.find((z) => z.id === toZoneId) || TIME_ZONES[3];

  // Calculate target time based on difference
  const hourDiff = toZone.offsetHours - fromZone.offsetHours;
  const totalMinutes = selectedHour * 60 + selectedMinute + hourDiff * 60;

  // Normalized to 24h day
  let dayOffset = 0;
  let targetTotalMinutes = totalMinutes;

  while (targetTotalMinutes < 0) {
    targetTotalMinutes += 24 * 60;
    dayOffset -= 1;
  }
  while (targetTotalMinutes >= 24 * 60) {
    targetTotalMinutes -= 24 * 60;
    dayOffset += 1;
  }

  const targetHour = Math.floor(targetTotalMinutes / 60);
  const targetMinute = Math.round(targetTotalMinutes % 60);

  const formatTime12 = (h: number, m: number) => {
    const period = h >= 12 ? 'PM' : 'AM';
    const displayH = h % 12 === 0 ? 12 : h % 12;
    const displayM = m.toString().padStart(2, '0');
    return `${displayH}:${displayM} ${period}`;
  };

  const formatTime24 = (h: number, m: number) => {
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
  };

  const handleSwap = () => {
    setFromZoneId(toZoneId);
    setToZoneId(fromZoneId);
  };

  const handleCopy = () => {
    const text = `${formatTime12(selectedHour, selectedMinute)} (${fromZone.city}) is ${formatTime12(targetHour, targetMinute)} (${toZone.city}) [${hourDiff >= 0 ? '+' : ''}${hourDiff}h difference]`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Date & Time Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Reference Date
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 font-semibold focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Hour (0 - 23)
          </label>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="0"
              max="23"
              value={selectedHour}
              onChange={(e) => setSelectedHour(parseInt(e.target.value, 10))}
              className="w-full accent-emerald-600"
            />
            <span className="text-xs font-bold font-mono px-2 py-1 bg-slate-100 rounded text-slate-800 shrink-0">
              {formatTime24(selectedHour, selectedMinute)}
            </span>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Minute
          </label>
          <select
            value={selectedMinute}
            onChange={(e) => setSelectedMinute(parseInt(e.target.value, 10))}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 font-semibold focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
          >
            <option value="0">:00</option>
            <option value="15">:15</option>
            <option value="30">:30</option>
            <option value="45">:45</option>
          </select>
        </div>
      </div>

      {/* Dual Zone Selector and Clocks */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4 items-center">
        {/* Source Zone */}
        <div className="md:col-span-3 p-5 rounded-2xl bg-slate-50 border border-slate-200">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            Base Time Zone
          </label>
          <select
            value={fromZoneId}
            onChange={(e) => setFromZoneId(e.target.value)}
            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-800 mb-3"
          >
            {TIME_ZONES.map((z) => (
              <option key={z.id} value={z.id}>
                {z.name} (UTC{z.offsetHours >= 0 ? `+${z.offsetHours}` : z.offsetHours})
              </option>
            ))}
          </select>

          <div className="text-3xl font-black text-slate-900 tracking-tight">
            {formatTime12(selectedHour, selectedMinute)}
          </div>
          <div className="text-xs text-slate-500 mt-1 font-medium flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>24-Hour: {formatTime24(selectedHour, selectedMinute)}</span>
            <span>• Base Reference</span>
          </div>
        </div>

        {/* Swap */}
        <div className="md:col-span-1 flex justify-center">
          <button
            onClick={handleSwap}
            className="w-10 h-10 rounded-full bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-700 border border-slate-300 flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
            title="Swap time zones"
          >
            <ArrowLeftRight className="w-4 h-4" />
          </button>
        </div>

        {/* Target Zone */}
        <div className="md:col-span-3 p-5 rounded-2xl bg-emerald-50/70 border border-emerald-300">
          <label className="block text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2">
            Target Time Zone
          </label>
          <select
            value={toZoneId}
            onChange={(e) => setToZoneId(e.target.value)}
            className="w-full px-3 py-2 bg-white border border-emerald-300 rounded-lg text-xs font-bold text-slate-800 mb-3"
          >
            {TIME_ZONES.map((z) => (
              <option key={z.id} value={z.id}>
                {z.name} (UTC{z.offsetHours >= 0 ? `+${z.offsetHours}` : z.offsetHours})
              </option>
            ))}
          </select>

          <div className="text-3xl font-black text-emerald-950 tracking-tight">
            {formatTime12(targetHour, targetMinute)}
          </div>
          <div className="text-xs text-emerald-800 mt-1 font-semibold flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5" />
            <span>24-Hour: {formatTime24(targetHour, targetMinute)}</span>
            <span>•</span>
            <span>
              {dayOffset === 0 ? 'Same Day' : dayOffset > 0 ? '+1 Day (Tomorrow)' : '-1 Day (Yesterday)'}
            </span>
          </div>
        </div>
      </div>

      {/* Difference Summary Badge */}
      <div className="p-4 rounded-xl bg-slate-900 text-white flex items-center justify-between flex-wrap gap-2 text-xs">
        <div>
          <span className="text-slate-400">Time Difference: </span>
          <strong className="text-emerald-400 text-sm">
            {hourDiff === 0
              ? 'No difference (0 hours)'
              : hourDiff > 0
              ? `${toZone.city} is ${hourDiff} hour${Math.abs(hourDiff) === 1 ? '' : 's'} ahead of ${fromZone.city}`
              : `${toZone.city} is ${Math.abs(hourDiff)} hour${Math.abs(hourDiff) === 1 ? '' : 's'} behind ${fromZone.city}`}
          </strong>
        </div>
        <div className="flex items-center gap-2 text-slate-300">
          {targetHour >= 7 && targetHour <= 19 ? (
            <span className="inline-flex items-center gap-1 text-amber-300 font-semibold">
              <Sun className="w-3.5 h-3.5" /> Daytime in {toZone.city}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-blue-300 font-semibold">
              <Moon className="w-3.5 h-3.5" /> Nighttime in {toZone.city}
            </span>
          )}
        </div>
      </div>

      {/* 24-Hour Meeting Planner Bar */}
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
          24-Hour Timeline Planner:
        </h4>
        <div className="overflow-x-auto pb-2">
          <div className="grid grid-cols-12 gap-1 min-w-[600px] text-center text-[10px]">
            {[8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19].map((hr) => {
              const tgtHr = (hr + hourDiff + 24) % 24;
              const isSelected = selectedHour === hr;
              const isWorkHour = tgtHr >= 9 && tgtHr <= 17;

              return (
                <button
                  key={hr}
                  onClick={() => setSelectedHour(hr)}
                  className={`p-2 rounded-lg border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                      : isWorkHour
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <div className="font-bold">{hr}:00</div>
                  <div className="text-[9px] opacity-75">{tgtHr}:00</div>
                  <div className="text-[8px] mt-0.5 font-semibold">
                    {isWorkHour ? 'Office' : 'Off-hrs'}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
        <button
          onClick={() => {
            setSelectedHour(14);
            setSelectedMinute(0);
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset to 2:00 PM</span>
        </button>

        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs transition-colors cursor-pointer"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied' : 'Copy Converted Time'}</span>
        </button>
      </div>
    </div>
  );
};
