import React, { useState } from 'react';
import { RotateCcw, Copy, Check, Calendar, Gift, Clock, Sparkles } from 'lucide-react';

export const AgeCalculator: React.FC = () => {
  const [birthDateStr, setBirthDateStr] = useState<string>('1995-06-15');
  const [asOfDateStr, setAsOfDateStr] = useState<string>(() => new Date().toISOString().split('T')[0]);
  const [copied, setCopied] = useState(false);

  const birthDate = new Date(birthDateStr);
  const asOfDate = new Date(asOfDateStr);

  const isValidBirth = !isNaN(birthDate.getTime());
  const isValidAsOf = !isNaN(asOfDate.getTime());

  let years = 0;
  let months = 0;
  let days = 0;
  let totalDays = 0;
  let totalWeeks = 0;
  let totalMonths = 0;
  let daysToNextBirthday = 0;
  let dayOfWeekBorn = '';
  let isFutureDate = false;

  if (isValidBirth && isValidAsOf) {
    if (birthDate > asOfDate) {
      isFutureDate = true;
    } else {
      const bYear = birthDate.getFullYear();
      const bMonth = birthDate.getMonth();
      const bDay = birthDate.getDate();

      const aYear = asOfDate.getFullYear();
      const aMonth = asOfDate.getMonth();
      const aDay = asOfDate.getDate();

      years = aYear - bYear;
      months = aMonth - bMonth;
      days = aDay - bDay;

      if (days < 0) {
        months -= 1;
        // Days in previous month
        const prevMonth = new Date(aYear, aMonth, 0);
        days += prevMonth.getDate();
      }

      if (months < 0) {
        years -= 1;
        months += 12;
      }

      const diffMs = asOfDate.getTime() - birthDate.getTime();
      totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      totalWeeks = Math.floor(totalDays / 7);
      totalMonths = years * 12 + months;

      // Next birthday countdown
      let nextBday = new Date(aYear, bMonth, bDay);
      if (nextBday < asOfDate) {
        nextBday = new Date(aYear + 1, bMonth, bDay);
      }
      const bdayDiffMs = nextBday.getTime() - asOfDate.getTime();
      daysToNextBirthday = Math.ceil(bdayDiffMs / (1000 * 60 * 60 * 24));

      // Day of week born
      const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      dayOfWeekBorn = daysOfWeek[birthDate.getDay()];
    }
  }

  const handleCopy = () => {
    const text = `Age: ${years} years, ${months} months, ${days} days | Total days: ${totalDays.toLocaleString()} | Born on a ${dayOfWeekBorn} | Next birthday in ${daysToNextBirthday} days`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setBirthDateStr('1995-06-15');
    setAsOfDateStr(new Date().toISOString().split('T')[0]);
  };

  return (
    <div className="space-y-6">
      {/* Date Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Date of Birth
          </label>
          <input
            type="date"
            value={birthDateStr}
            onChange={(e) => setBirthDateStr(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 font-bold focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Age as of Date (Today)
          </label>
          <input
            type="date"
            value={asOfDateStr}
            onChange={(e) => setAsOfDateStr(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 font-bold focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {isFutureDate ? (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-sm font-semibold">
          The selected birth date is in the future relative to the &quot;as of&quot; date. Please select a past date of birth.
        </div>
      ) : (
        <>
          {/* Hero Exact Age Display */}
          <div className="p-6 rounded-2xl bg-slate-900 text-white shadow-lg">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Exact Chronological Age
            </span>
            <div className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mt-2">
              {years} <span className="text-xl sm:text-2xl font-medium text-slate-300">years</span>,{' '}
              {months} <span className="text-xl sm:text-2xl font-medium text-slate-300">months</span>,{' '}
              {days} <span className="text-xl sm:text-2xl font-medium text-slate-300">days</span>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between flex-wrap gap-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Born on a <strong>{dayOfWeekBorn}</strong></span>
              </div>
              <div className="flex items-center gap-2 text-emerald-300 font-medium">
                <Gift className="w-4 h-4 text-emerald-400" />
                <span>Next Birthday: <strong>{daysToNextBirthday === 0 ? 'Today! 🎂' : `in ${daysToNextBirthday} days`}</strong></span>
              </div>
            </div>
          </div>

          {/* Alternative Units Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[11px] font-semibold text-slate-500 uppercase">Total Months</span>
              <div className="text-lg sm:text-xl font-black text-slate-900 mt-0.5">
                {totalMonths.toLocaleString()}
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[11px] font-semibold text-slate-500 uppercase">Total Weeks</span>
              <div className="text-lg sm:text-xl font-black text-slate-900 mt-0.5">
                {totalWeeks.toLocaleString()}
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[11px] font-semibold text-slate-500 uppercase">Total Days</span>
              <div className="text-lg sm:text-xl font-black text-slate-900 mt-0.5">
                {totalDays.toLocaleString()}
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[11px] font-semibold text-slate-500 uppercase">Total Hours</span>
              <div className="text-lg sm:text-xl font-black text-slate-900 mt-0.5">
                {(totalDays * 24).toLocaleString()}
              </div>
            </div>
          </div>
        </>
      )}

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
          <span>{copied ? 'Copied Age' : 'Copy Age Summary'}</span>
        </button>
      </div>
    </div>
  );
};
