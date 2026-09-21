import React, { useState } from 'react';
import { RotateCcw, Copy, Check, Clock, Mic, FileText, Trash2 } from 'lucide-react';

export const WordCounter: React.FC = () => {
  const [text, setText] = useState<string>(
    'The Vector Tools provides fast, privacy-focused online utilities for everyday calculations, conversions, and document processing. All calculations execute directly in your browser with zero latency and high precision.'
  );
  const [copied, setCopied] = useState(false);

  // Analytics calculation
  const trimmed = text.trim();
  const words = trimmed.length === 0 ? 0 : trimmed.split(/\s+/).length;
  const charsWithSpaces = text.length;
  const charsNoSpaces = text.replace(/\s/g, '').length;

  // Sentences: match punctuation . ! ? followed by whitespace or end of string
  const sentences = trimmed.length === 0 ? 0 : (text.match(/[^.!?]+[.!?]+(\s|$)/g) || [1]).length;

  // Paragraphs
  const paragraphs = trimmed.length === 0 ? 0 : text.split(/\n+/).filter((p) => p.trim().length > 0).length;

  // Estimated reading time (~200 words per min)
  const readingTimeMin = Math.ceil(words / 200);
  const readingTimeSec = Math.round((words / 200) * 60);

  // Speaking time (~130 words per min)
  const speakingTimeMin = Math.ceil(words / 130);

  // Top keywords
  const wordTokens = trimmed.toLowerCase().match(/\b[a-z0-9]{3,}\b/g) || [];
  const freqMap: Record<string, number> = {};
  wordTokens.forEach((w) => {
    // filter common stopwords
    if (!['the', 'and', 'for', 'with', 'this', 'that', 'from', 'your', 'are'].includes(w)) {
      freqMap[w] = (freqMap[w] || 0) + 1;
    }
  });

  const topKeywords = Object.entries(freqMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setText('');
  };

  return (
    <div className="space-y-6">
      {/* Real-time Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="p-3.5 bg-slate-900 text-white rounded-xl col-span-2 sm:col-span-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">Words</span>
          <div className="text-2xl sm:text-3xl font-black mt-0.5">{words.toLocaleString()}</div>
        </div>

        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
          <span className="text-[11px] font-semibold uppercase text-slate-500">Chars (with spaces)</span>
          <div className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">{charsWithSpaces.toLocaleString()}</div>
        </div>

        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
          <span className="text-[11px] font-semibold uppercase text-slate-500">Chars (no spaces)</span>
          <div className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">{charsNoSpaces.toLocaleString()}</div>
        </div>

        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
          <span className="text-[11px] font-semibold uppercase text-slate-500">Sentences</span>
          <div className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">{sentences.toLocaleString()}</div>
        </div>

        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
          <span className="text-[11px] font-semibold uppercase text-slate-500">Paragraphs</span>
          <div className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">{paragraphs.toLocaleString()}</div>
        </div>
      </div>

      {/* Large Text Area */}
      <div className="relative">
        <textarea
          rows={8}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste your text here to begin instant real-time analysis..."
          className="w-full p-4 bg-slate-50 border border-slate-300 rounded-xl text-sm sm:text-base text-slate-900 leading-relaxed focus:outline-hidden focus:ring-2 focus:ring-emerald-500 resize-y"
        />
        {text.length > 0 && (
          <button
            onClick={handleClear}
            className="absolute top-3 right-3 p-1.5 rounded-md bg-white border border-slate-200 text-slate-400 hover:text-rose-600 hover:border-rose-300 transition-colors cursor-pointer shadow-2xs"
            title="Clear text"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Additional Stats: Reading Time & Top Keywords */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block">Reading Time</span>
            <span className="text-sm font-bold text-slate-900">
              {readingTimeSec < 60 ? `~${readingTimeSec} seconds` : `~${readingTimeMin} min`}
            </span>
          </div>
        </div>

        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
            <Mic className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block">Speaking Time</span>
            <span className="text-sm font-bold text-slate-900">~{speakingTimeMin} min (~130 wpm)</span>
          </div>
        </div>

        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block mb-1">Top Keywords</span>
          <div className="flex flex-wrap gap-1">
            {topKeywords.length > 0 ? (
              topKeywords.map(([kw, count]) => (
                <span key={kw} className="text-xs px-2 py-0.5 bg-white border border-slate-200 rounded font-medium text-slate-700">
                  {kw} <strong className="text-slate-900">({count})</strong>
                </span>
              ))
            ) : (
              <span className="text-xs text-slate-400">Add more text to see keyword density</span>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
        <button
          onClick={handleClear}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Clear Text</span>
        </button>

        <button
          onClick={handleCopy}
          disabled={!text}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 disabled:opacity-50 rounded-lg shadow-xs transition-colors cursor-pointer"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied to Clipboard' : 'Copy Text'}</span>
        </button>
      </div>
    </div>
  );
};
