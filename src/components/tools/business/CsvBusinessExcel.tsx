import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { 
  Upload, 
  FileSpreadsheet, 
  CheckCircle2, 
  AlertCircle, 
  Download, 
  Layers, 
  Settings2,
  BarChart3,
  ShieldCheck
} from 'lucide-react';
import { exportMultiSheetExcel } from '../../../services/businessExtractionService';

interface ColumnConfig {
  name: string;
  included: boolean;
  type: 'text' | 'number' | 'currency' | 'date' | 'percentage';
}

export const CsvBusinessExcel: React.FC = () => {
  const [fileName, setFileName] = useState<string>('');
  const [columns, setColumns] = useState<ColumnConfig[]>([]);
  const [rows, setRows] = useState<Record<string, any>[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.csv')) {
      setError('Please upload a standard CSV file.');
      return;
    }

    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const csvText = event.target?.result as string;
        const workbook = XLSX.read(csvText, { type: 'string' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const json: Record<string, any>[] = XLSX.utils.sheet_to_json(firstSheet, { defval: '' });

        if (!json || json.length === 0) {
          setError('The CSV contains no readable records.');
          return;
        }

        const detectedCols = Object.keys(json[0] || {});
        const config: ColumnConfig[] = detectedCols.map(col => {
          // Detect simple heuristic type
          const sampleVal = json.find(r => r[col] !== '')?.[col];
          let detectedType: ColumnConfig['type'] = 'text';
          if (sampleVal !== undefined && !isNaN(Number(sampleVal)) && sampleVal !== '') {
            detectedType = 'number';
          }
          return {
            name: col,
            included: true,
            type: detectedType
          };
        });

        setColumns(config);
        setRows(json);
      } catch (err) {
        console.error(err);
        setError('Failed to parse CSV format. Please verify file encoding (UTF-8).');
      }
    };

    reader.readAsText(file);
  };

  const handleToggleColumn = (colName: string) => {
    setColumns(columns.map(c => c.name === colName ? { ...c, included: !c.included } : c));
  };

  const handleTypeChange = (colName: string, type: ColumnConfig['type']) => {
    setColumns(columns.map(c => c.name === colName ? { ...c, type } : c));
  };

  const handleGenerateWorkbook = () => {
    if (rows.length === 0) return;

    const activeCols = columns.filter(c => c.included);
    if (activeCols.length === 0) {
      setError('Please select at least one column to export.');
      return;
    }

    // 1. Sheet 1: Clean Data
    const cleanData = rows.map(r => {
      const rowObj: Record<string, any> = {};
      activeCols.forEach(col => {
        let val = r[col.name];
        if (col.type === 'number' || col.type === 'currency' || col.type === 'percentage') {
          const num = Number(val);
          val = isNaN(num) ? val : num;
        }
        rowObj[col.name] = val;
      });
      return rowObj;
    });

    // 2. Sheet 2: Summary (strictly computed from data)
    const summaryData: Record<string, any>[] = [];
    summaryData.push({ 'Metric': 'Total Rows in Dataset', 'Value': rows.length });
    summaryData.push({ 'Metric': 'Exported Columns', 'Value': activeCols.length });

    activeCols.forEach(col => {
      if (col.type === 'number' || col.type === 'currency' || col.type === 'percentage') {
        const nums = rows.map(r => Number(r[col.name])).filter(n => !isNaN(n));
        if (nums.length > 0) {
          const sum = nums.reduce((a, b) => a + b, 0);
          const min = Math.min(...nums);
          const max = Math.max(...nums);
          const avg = sum / nums.length;
          summaryData.push({ 'Metric': `Sum of ${col.name}`, 'Value': Number(sum.toFixed(2)) });
          summaryData.push({ 'Metric': `Average of ${col.name}`, 'Value': Number(avg.toFixed(2)) });
          summaryData.push({ 'Metric': `Min of ${col.name}`, 'Value': min });
          summaryData.push({ 'Metric': `Max of ${col.name}`, 'Value': max });
        }
      }
    });

    // 3. Sheet 3: Data Quality (nulls & completeness)
    const qualityData = activeCols.map(col => {
      const populated = rows.filter(r => r[col.name] !== '' && r[col.name] !== null && r[col.name] !== undefined).length;
      const completeness = ((populated / rows.length) * 100).toFixed(1) + '%';
      return {
        'Column Header': col.name,
        'Format Type': col.type,
        'Populated Rows': populated,
        'Missing Values': rows.length - populated,
        'Completeness Rate': completeness
      };
    });

    const exportFileName = fileName.replace(/\.[^/.]+$/, '') + '_Business_Workbook.xlsx';
    exportMultiSheetExcel([
      { name: 'Clean Data', data: cleanData },
      { name: 'Summary', data: summaryData },
      { name: 'Data Quality', data: qualityData }
    ], exportFileName);
  };

  return (
    <div className="space-y-8">
      {/* 1. Upload */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-2xs">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-lg font-black text-slate-900 tracking-tight">
              1. Upload Raw CSV File
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Transform flat CSV files into structured multi-sheet Microsoft Excel workbooks.
            </p>
          </div>
          <span className="hidden sm:inline-flex text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            Client-Side Generation
          </span>
        </div>

        <div className="relative border-2 border-dashed border-slate-300 hover:border-[#0057F3] rounded-2xl p-6 sm:p-8 text-center transition-colors bg-slate-50/50">
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            aria-label="Upload CSV to format"
          />
          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0057F3] flex items-center justify-center">
              <Upload className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">
                {fileName ? fileName : 'Click to browse or drag & drop CSV'}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                Generates a 3-sheet workbook: Clean Data, Statistical Summary & Data Quality
              </p>
            </div>
            {fileName && (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Loaded {rows.length} records</span>
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
      </div>

      {/* 2. Workbook Formatting Settings */}
      {rows.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-lg font-black text-slate-900 tracking-tight">
                2. Configure Column Formatting & Types
              </h3>
              <p className="text-xs text-slate-600">
                Select columns to include and assign types for numerical aggregation in the Summary sheet.
              </p>
            </div>

            <button
              onClick={handleGenerateWorkbook}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer shrink-0"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Download 3-Sheet Excel Workbook</span>
            </button>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-2.5 w-16 text-center">Include</th>
                  <th className="p-2.5">Column Header</th>
                  <th className="p-2.5 w-48">Format Classification</th>
                  <th className="p-2.5 w-48">Sample Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {columns.map((col) => (
                  <tr key={col.name} className="hover:bg-slate-50/60">
                    <td className="p-2.5 text-center">
                      <input
                        type="checkbox"
                        checked={col.included}
                        onChange={() => handleToggleColumn(col.name)}
                        className="rounded text-[#0057F3]"
                      />
                    </td>
                    <td className="p-2.5 font-bold font-mono text-slate-900">
                      {col.name}
                    </td>
                    <td className="p-2.5">
                      <select
                        value={col.type}
                        onChange={(e) => handleTypeChange(col.name, e.target.value as any)}
                        className="w-full px-2.5 py-1 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:ring-2 focus:ring-[#0057F3]"
                      >
                        <option value="text">Text (General)</option>
                        <option value="number">Number (Numeric)</option>
                        <option value="currency">Currency ($ € £)</option>
                        <option value="percentage">Percentage (%)</option>
                        <option value="date">Date (YYYY-MM-DD)</option>
                      </select>
                    </td>
                    <td className="p-2.5 text-slate-500 font-mono truncate max-w-[200px]">
                      {String(rows[0]?.[col.name] ?? '')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Workbook Structure Specs */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
            <div className="font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#0057F3]" />
              <span>Workbook Architecture Generated:</span>
            </div>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li><strong>Sheet 1: Clean Data</strong> — Formatted tabular view with user-selected columns and parsed data types.</li>
              <li><strong>Sheet 2: Summary</strong> — Mathematical totals, min/max bounds, and averages computed strictly from numeric columns.</li>
              <li><strong>Sheet 3: Data Quality</strong> — Completeness percentages, null counts, and column header classifications.</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
