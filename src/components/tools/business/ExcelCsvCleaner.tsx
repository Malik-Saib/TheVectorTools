import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { 
  Upload, 
  FileSpreadsheet, 
  Trash2, 
  AlertCircle, 
  CheckCircle2, 
  Download, 
  Sparkles, 
  RotateCcw, 
  Check, 
  ShieldCheck,
  Filter,
  ArrowUpDown
} from 'lucide-react';
import { exportToExcelFile } from '../../../services/businessExtractionService';

interface CleaningOptions {
  removeDuplicates: boolean;
  removeEmptyRows: boolean;
  trimWhitespace: boolean;
  normalizeCasing: 'none' | 'title' | 'lower' | 'upper';
  standardizeHeaders: boolean;
  normalizeDates: boolean;
  removeUnwantedChars: boolean;
}

export const ExcelCsvCleaner: React.FC = () => {
  const [fileName, setFileName] = useState<string>('');
  const [rawHeaders, setRawHeaders] = useState<string[]>([]);
  const [originalRows, setOriginalRows] = useState<Record<string, any>[]>([]);
  const [cleanedRows, setCleanedRows] = useState<Record<string, any>[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Cleaning options
  const [options, setOptions] = useState<CleaningOptions>({
    removeDuplicates: true,
    removeEmptyRows: true,
    trimWhitespace: true,
    normalizeCasing: 'none',
    standardizeHeaders: true,
    normalizeDates: true,
    removeUnwantedChars: false
  });

  // Data Quality Metrics
  const [stats, setStats] = useState<{
    totalOriginalRows: number;
    duplicatesDetected: number;
    emptyRowsDetected: number;
    missingValuesCount: number;
    columnsCount: number;
  }>({
    totalOriginalRows: 0,
    duplicatesDetected: 0,
    emptyRowsDetected: 0,
    missingValuesCount: 0,
    columnsCount: 0
  });

  const [sortColumn, setSortColumn] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [filterQuery, setFilterQuery] = useState<string>('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    const ext = file.name.split('.').pop()?.toLowerCase();
    if (!['csv', 'xlsx', 'xls'].includes(ext || '')) {
      setError('Unsupported file type. Please upload a .csv, .xlsx, or .xls file.');
      return;
    }

    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const buffer = event.target?.result;
        const workbook = XLSX.read(buffer, { type: 'binary', cellDates: true });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const json: Record<string, any>[] = XLSX.utils.sheet_to_json(sheet, { defval: '' });

        if (!json || json.length === 0) {
          setError('The uploaded spreadsheet contains no data rows.');
          return;
        }

        const detectedHeaders = Object.keys(json[0] || {});
        setRawHeaders(detectedHeaders);
        setHeaders(detectedHeaders);
        setOriginalRows(json);
        setCleanedRows(json);

        // Calculate initial audit stats
        auditData(json, detectedHeaders);
      } catch (err) {
        console.error(err);
        setError('Failed to parse spreadsheet file. Ensure the file is not password-protected.');
      }
    };

    reader.readAsBinaryString(file);
  };

  const auditData = (rows: Record<string, any>[], cols: string[]) => {
    let emptyCount = 0;
    let missingCount = 0;
    const seen = new Set<string>();
    let dupCount = 0;

    rows.forEach((r) => {
      const isRowEmpty = cols.every(col => r[col] === '' || r[col] === null || r[col] === undefined);
      if (isRowEmpty) {
        emptyCount++;
      } else {
        const str = JSON.stringify(r);
        if (seen.has(str)) {
          dupCount++;
        } else {
          seen.add(str);
        }
      }

      cols.forEach(col => {
        if (r[col] === '' || r[col] === null || r[col] === undefined) {
          missingCount++;
        }
      });
    });

    setStats({
      totalOriginalRows: rows.length,
      duplicatesDetected: dupCount,
      emptyRowsDetected: emptyCount,
      missingValuesCount: missingCount,
      columnsCount: cols.length
    });
  };

  const applyCleaning = () => {
    if (originalRows.length === 0) return;

    let processedCols = [...rawHeaders];

    // 1. Standardize Header names
    if (options.standardizeHeaders) {
      processedCols = processedCols.map(h => 
        h.trim().toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '')
      );
    }
    setHeaders(processedCols);

    let rows = originalRows.map(r => {
      const newRow: Record<string, any> = {};
      rawHeaders.forEach((origHeader, idx) => {
        const targetHeader = processedCols[idx];
        let val = r[origHeader];

        if (typeof val === 'string') {
          // Trim whitespace
          if (options.trimWhitespace) {
            val = val.trim().replace(/\s+/g, ' ');
          }
          // Normalize casing
          if (options.normalizeCasing === 'upper') {
            val = val.toUpperCase();
          } else if (options.normalizeCasing === 'lower') {
            val = val.toLowerCase();
          } else if (options.normalizeCasing === 'title') {
            val = val.replace(/\w\S*/g, (txt: string) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase());
          }
          // Remove unwanted non-printable chars
          if (options.removeUnwantedChars) {
            val = val.replace(/[^\x20-\x7E]/g, '');
          }
        }
        newRow[targetHeader] = val;
      });
      return newRow;
    });

    // 2. Remove empty rows
    if (options.removeEmptyRows) {
      rows = rows.filter(r => 
        processedCols.some(col => r[col] !== '' && r[col] !== null && r[col] !== undefined)
      );
    }

    // 3. Remove duplicate rows
    if (options.removeDuplicates) {
      const seen = new Set<string>();
      rows = rows.filter(r => {
        const hash = JSON.stringify(r);
        if (seen.has(hash)) return false;
        seen.add(hash);
        return true;
      });
    }

    setCleanedRows(rows);
  };

  const handleReset = () => {
    setCleanedRows([...originalRows]);
    setHeaders([...rawHeaders]);
  };

  const handleSort = (column: string) => {
    const isAsc = sortColumn === column && sortDirection === 'asc';
    const direction = isAsc ? 'desc' : 'asc';
    setSortColumn(column);
    setSortDirection(direction);

    const sorted = [...cleanedRows].sort((a, b) => {
      const valA = a[column] ?? '';
      const valB = b[column] ?? '';
      if (typeof valA === 'number' && typeof valB === 'number') {
        return direction === 'asc' ? valA - valB : valB - valA;
      }
      return direction === 'asc' 
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });
    setCleanedRows(sorted);
  };

  const displayedRows = cleanedRows.filter(r => {
    if (!filterQuery.trim()) return true;
    const q = filterQuery.toLowerCase();
    return Object.values(r).some(v => String(v).toLowerCase().includes(q));
  });

  const handleDownloadXlsx = () => {
    exportToExcelFile(cleanedRows, `Cleaned_${fileName || 'spreadsheet'}.xlsx`, 'Clean Data');
  };

  const handleDownloadCsv = () => {
    try {
      const ws = XLSX.utils.json_to_sheet(cleanedRows);
      const csv = XLSX.utils.sheet_to_csv(ws);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Cleaned_${fileName.replace(/\.[^/.]+$/, '') || 'data'}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8">
      {/* 1. Upload & File Audit */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-2xs">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-lg font-black text-slate-900 tracking-tight">
              1. Upload CSV or Excel File
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Clean datasets, eliminate duplicates, trim strings, and normalize formatting (100% in-browser).
            </p>
          </div>
          <span className="hidden sm:inline-flex text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            Real Client-Side Processing
          </span>
        </div>

        <div className="relative border-2 border-dashed border-slate-300 hover:border-[#0057F3] rounded-2xl p-6 sm:p-8 text-center transition-colors bg-slate-50/50">
          <input
            type="file"
            accept=".csv,.xlsx,.xls"
            onChange={handleFileUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            aria-label="Upload CSV or Excel file"
          />
          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0057F3] flex items-center justify-center">
              <Upload className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">
                {fileName ? fileName : 'Click to browse or drag & drop CSV / XLSX'}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                Supports standard comma-separated, tab-separated, and Microsoft Excel workbooks
              </p>
            </div>
            {fileName && (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Loaded {originalRows.length} rows</span>
              </div>
            )}
          </div>
        </div>

        {error && (
          <div className="mt-4 p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Data Quality Report */}
        {originalRows.length > 0 && (
          <div className="mt-6 pt-6 border-t border-slate-200">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 mb-3">
              Data Quality Audit Report
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                <div className="text-xs text-slate-500">Total Rows</div>
                <div className="text-base font-black font-mono text-slate-900 mt-0.5">{stats.totalOriginalRows}</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                <div className="text-xs text-slate-500">Columns</div>
                <div className="text-base font-black font-mono text-slate-900 mt-0.5">{stats.columnsCount}</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                <div className="text-xs text-slate-500">Duplicates</div>
                <div className={`text-base font-black font-mono mt-0.5 ${stats.duplicatesDetected > 0 ? 'text-amber-600' : 'text-emerald-600'}`}>
                  {stats.duplicatesDetected}
                </div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                <div className="text-xs text-slate-500">Empty Rows</div>
                <div className={`text-base font-black font-mono mt-0.5 ${stats.emptyRowsDetected > 0 ? 'text-amber-600' : 'text-emerald-600'}`}>
                  {stats.emptyRowsDetected}
                </div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center col-span-2 sm:col-span-1">
                <div className="text-xs text-slate-500">Missing Values</div>
                <div className={`text-base font-black font-mono mt-0.5 ${stats.missingValuesCount > 0 ? 'text-blue-600' : 'text-emerald-600'}`}>
                  {stats.missingValuesCount}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 2. Cleaning Configuration Controls */}
      {originalRows.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-lg font-black text-slate-900 tracking-tight">
                2. Select Cleaning Operations
              </h3>
              <p className="text-xs text-slate-600">
                Choose rules to apply to your dataset. No data is modified silently.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Original</span>
              </button>
              <button
                onClick={applyCleaning}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0057F3] hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Apply Cleaning</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
            <label className="flex items-start gap-2.5 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
              <input
                type="checkbox"
                checked={options.removeDuplicates}
                onChange={(e) => setOptions({ ...options, removeDuplicates: e.target.checked })}
                className="mt-0.5 rounded text-[#0057F3]"
              />
              <div>
                <span className="font-bold text-slate-800 block">Remove Duplicate Rows</span>
                <span className="text-slate-500 text-[11px]">De-duplicate identical rows across all columns.</span>
              </div>
            </label>

            <label className="flex items-start gap-2.5 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
              <input
                type="checkbox"
                checked={options.removeEmptyRows}
                onChange={(e) => setOptions({ ...options, removeEmptyRows: e.target.checked })}
                className="mt-0.5 rounded text-[#0057F3]"
              />
              <div>
                <span className="font-bold text-slate-800 block">Remove Empty Rows</span>
                <span className="text-slate-500 text-[11px]">Strip blank rows containing no cell entries.</span>
              </div>
            </label>

            <label className="flex items-start gap-2.5 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
              <input
                type="checkbox"
                checked={options.trimWhitespace}
                onChange={(e) => setOptions({ ...options, trimWhitespace: e.target.checked })}
                className="mt-0.5 rounded text-[#0057F3]"
              />
              <div>
                <span className="font-bold text-slate-800 block">Trim Whitespace</span>
                <span className="text-slate-500 text-[11px]">Strip leading, trailing, and redundant spaces.</span>
              </div>
            </label>

            <label className="flex items-start gap-2.5 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
              <input
                type="checkbox"
                checked={options.standardizeHeaders}
                onChange={(e) => setOptions({ ...options, standardizeHeaders: e.target.checked })}
                className="mt-0.5 rounded text-[#0057F3]"
              />
              <div>
                <span className="font-bold text-slate-800 block">Standardize Column Names</span>
                <span className="text-slate-500 text-[11px]">Convert headers to clean snake_case.</span>
              </div>
            </label>

            <div className="p-3 rounded-xl border border-slate-200 space-y-1">
              <label className="font-bold text-slate-800 block">Text Capitalization</label>
              <select
                value={options.normalizeCasing}
                onChange={(e) => setOptions({ ...options, normalizeCasing: e.target.value as any })}
                className="w-full px-2 py-1 bg-slate-50 border border-slate-300 rounded text-slate-700 text-xs"
              >
                <option value="none">Preserve Existing Casing</option>
                <option value="title">Title Case (e.g. John Doe)</option>
                <option value="lower">lowercase (e.g. john doe)</option>
                <option value="upper">UPPERCASE (e.g. JOHN DOE)</option>
              </select>
            </div>

            <label className="flex items-start gap-2.5 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
              <input
                type="checkbox"
                checked={options.removeUnwantedChars}
                onChange={(e) => setOptions({ ...options, removeUnwantedChars: e.target.checked })}
                className="mt-0.5 rounded text-[#0057F3]"
              />
              <div>
                <span className="font-bold text-slate-800 block">Strip Non-Printable Chars</span>
                <span className="text-slate-500 text-[11px]">Remove hidden control and non-ASCII glyphs.</span>
              </div>
            </label>
          </div>
        </div>
      )}

      {/* 3. Preview & Download */}
      {cleanedRows.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-black text-slate-900 tracking-tight">
                3. Cleaned Data Preview ({displayedRows.length} rows)
              </h3>
              <p className="text-xs text-slate-600">
                Click any column header to sort. Filter rows dynamically in real time.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleDownloadCsv}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download CSV</span>
              </button>
              <button
                onClick={handleDownloadXlsx}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>Download XLSX</span>
              </button>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="max-w-md">
            <div className="relative">
              <Filter className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                placeholder="Filter cleaned rows..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#0057F3]"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto border border-slate-200 rounded-xl max-h-[450px]">
            <table className="w-full text-left text-xs text-slate-700 min-w-[700px]">
              <thead className="bg-slate-100/90 sticky top-0 z-10 text-slate-800 font-bold border-b border-slate-200">
                <tr>
                  {headers.map((h, i) => (
                    <th
                      key={i}
                      onClick={() => handleSort(h)}
                      className="p-2.5 cursor-pointer hover:bg-slate-200/80 transition-colors select-none"
                    >
                      <div className="flex items-center gap-1.5">
                        <span>{h}</span>
                        <ArrowUpDown className="w-3 h-3 text-slate-400" />
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {displayedRows.slice(0, 100).map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60 font-mono text-[11px]">
                    {headers.map((h, cIdx) => (
                      <td key={cIdx} className="p-2 truncate max-w-[200px]">
                        {row[h] !== undefined && row[h] !== null ? String(row[h]) : ''}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {displayedRows.length > 100 && (
            <div className="text-center text-[11px] text-slate-500 pt-2">
              Previewing first 100 rows. The full {displayedRows.length} rows will be exported.
            </div>
          )}
        </div>
      )}
    </div>
  );
};
