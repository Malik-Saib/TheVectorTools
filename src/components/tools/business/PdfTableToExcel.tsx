import React, { useState } from 'react';
import { 
  Upload, 
  FileSpreadsheet, 
  Plus, 
  Trash2, 
  AlertCircle, 
  CheckCircle2, 
  Download, 
  Table as TableIcon,
  Info,
  ShieldAlert
} from 'lucide-react';
import { 
  validateBusinessDocumentFile, 
  exportToExcelFile,
  DetectedTable,
  TableRow
} from '../../../services/businessExtractionService';

export const PdfTableToExcel: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  // Multi-table support
  const [tables, setTables] = useState<DetectedTable[]>([
    {
      id: 'table-1',
      name: 'Table 1 (Extracted View)',
      headers: ['Item Code', 'Description', 'Quantity', 'Unit Rate', 'Amount'],
      rows: [
        { id: 'r1', 'Item Code': 'ITM-01', 'Description': 'Consulting Hours', 'Quantity': '40', 'Unit Rate': '85.00', 'Amount': '3400.00' },
        { id: 'r2', 'Item Code': 'ITM-02', 'Description': 'Server Provisioning', 'Quantity': '2', 'Unit Rate': '450.00', 'Amount': '900.00' },
        { id: 'r3', 'Item Code': 'ITM-03', 'Description': 'API Integration', 'Quantity': '1', 'Unit Rate': '1200.00', 'Amount': '1200.00' }
      ]
    }
  ]);

  const [activeTableIndex, setActiveTableIndex] = useState<number>(0);

  const currentTable = tables[activeTableIndex] || tables[0];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    const selected = e.target.files?.[0];
    if (!selected) return;

    const validation = validateBusinessDocumentFile(selected, ['pdf']);
    if (!validation.valid) {
      setFileError(validation.error || 'Please select a valid PDF document.');
      setFile(null);
      return;
    }

    setFile(selected);
  };

  const handleAddRow = () => {
    const newRow: TableRow = { id: Math.random().toString(36).substr(2, 9) };
    currentTable.headers.forEach((h) => {
      newRow[h] = '';
    });

    const updatedTables = [...tables];
    updatedTables[activeTableIndex] = {
      ...currentTable,
      rows: [...currentTable.rows, newRow]
    };
    setTables(updatedTables);
  };

  const handleDeleteRow = (rowId: string) => {
    const updatedTables = [...tables];
    updatedTables[activeTableIndex] = {
      ...currentTable,
      rows: currentTable.rows.filter(r => r.id !== rowId)
    };
    setTables(updatedTables);
  };

  const handleCellChange = (rowId: string, header: string, value: string) => {
    const updatedTables = [...tables];
    updatedTables[activeTableIndex] = {
      ...currentTable,
      rows: currentTable.rows.map(r => r.id === rowId ? { ...r, [header]: value } : r)
    };
    setTables(updatedTables);
  };

  const handleAddColumn = () => {
    const colName = prompt('Enter new column header name:');
    if (!colName || currentTable.headers.includes(colName)) return;

    const updatedTables = [...tables];
    const newHeaders = [...currentTable.headers, colName];
    const newRows = currentTable.rows.map(r => ({ ...r, [colName]: '' }));

    updatedTables[activeTableIndex] = {
      ...currentTable,
      headers: newHeaders,
      rows: newRows
    };
    setTables(updatedTables);
  };

  const handleAddTable = () => {
    const newTableId = `table-${tables.length + 1}`;
    const newTable: DetectedTable = {
      id: newTableId,
      name: `Table ${tables.length + 1}`,
      headers: ['Column A', 'Column B', 'Column C'],
      rows: [
        { id: '1', 'Column A': '', 'Column B': '', 'Column C': '' }
      ]
    };
    setTables([...tables, newTable]);
    setActiveTableIndex(tables.length);
  };

  const handleExportXlsx = () => {
    // Strip internal id from rows
    const cleanData = currentTable.rows.map(({ id, ...rest }) => rest);
    exportToExcelFile(cleanData, `${file?.name.replace('.pdf', '') || 'PDF_Table'}_export.xlsx`, currentTable.name);
  };

  return (
    <div className="space-y-8">
      {/* 1. Upload Box */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-2xs">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-lg font-black text-slate-900 tracking-tight">
              1. Upload PDF Containing Tables
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Select any PDF document with structured tabular data (Max 25MB).
            </p>
          </div>
          <span className="hidden sm:inline-flex text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-50 text-[#0057F3] border border-blue-200">
            Client-Side Memory
          </span>
        </div>

        <div className="relative border-2 border-dashed border-slate-300 hover:border-[#0057F3] rounded-2xl p-6 sm:p-8 text-center transition-colors bg-slate-50/50">
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            aria-label="Upload PDF with tables"
          />
          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0057F3] flex items-center justify-center">
              <Upload className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">
                {file ? file.name : 'Click to browse or drag & drop PDF'}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                Targeted for invoices, financial statements, schedules & reports
              </p>
            </div>
            {file && (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>PDF loaded: {(file.size / 1024).toFixed(1)} KB</span>
              </div>
            )}
          </div>
        </div>

        {fileError && (
          <div className="mt-4 p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{fileError}</span>
          </div>
        )}

        {/* Architecture & OCR Notice */}
        <div className="mt-5 p-4 rounded-xl bg-blue-50/70 border border-blue-200/80 text-xs text-slate-700 space-y-2">
          <div className="flex items-center gap-2 font-bold text-[#0057F3]">
            <Info className="w-4 h-4 shrink-0" />
            <span>Automated Table Detection Gateway</span>
          </div>
          <p className="leading-relaxed">
            Your PDF is stored securely in browser memory. Machine-learning table boundary detection and cell coordinate extraction require connecting an AI Vision or cloud PDF parsing API. You can review detected boundaries, add or edit rows and column headers, and download clean XLSX workbooks below.
          </p>
        </div>
      </div>

      {/* 2. Table Preview & Editor */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          {/* Table Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {tables.map((t, idx) => (
              <button
                key={t.id}
                onClick={() => setActiveTableIndex(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTableIndex === idx
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {t.name}
              </button>
            ))}
            <button
              onClick={handleAddTable}
              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-[#0057F3] hover:bg-blue-50 border border-dashed border-blue-300 transition-colors cursor-pointer"
            >
              + Add Table
            </button>
          </div>

          <button
            onClick={handleExportXlsx}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>Export Table to XLSX</span>
          </button>
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 font-semibold text-slate-700">
            <TableIcon className="w-4 h-4 text-[#0057F3]" />
            <span>{currentTable.name} ({currentTable.rows.length} rows, {currentTable.headers.length} columns)</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleAddColumn}
              className="font-bold text-slate-700 hover:text-slate-900 cursor-pointer"
            >
              + Add Column
            </button>
            <button
              onClick={handleAddRow}
              className="font-bold text-[#0057F3] hover:text-blue-700 cursor-pointer"
            >
              + Add Row
            </button>
          </div>
        </div>

        {/* Editable Table */}
        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-left text-xs text-slate-700 min-w-[600px]">
            <thead className="bg-slate-100/80 text-slate-800 font-bold border-b border-slate-200">
              <tr>
                {currentTable.headers.map((h, i) => (
                  <th key={i} className="p-2.5">
                    {h}
                  </th>
                ))}
                <th className="p-2.5 w-12 text-center">Del</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {currentTable.rows.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/60">
                  {currentTable.headers.map((h, i) => (
                    <td key={i} className="p-2">
                      <input
                        type="text"
                        value={row[h] ?? ''}
                        onChange={(e) => handleCellChange(row.id, h, e.target.value)}
                        className="w-full px-2 py-1 bg-transparent border border-transparent hover:border-slate-200 focus:border-[#0057F3] rounded text-xs"
                      />
                    </td>
                  ))}
                  <td className="p-2 text-center">
                    <button
                      onClick={() => handleDeleteRow(row.id)}
                      disabled={currentTable.rows.length <= 1}
                      className="text-slate-400 hover:text-red-500 transition-colors disabled:opacity-30 cursor-pointer"
                      title="Delete row"
                    >
                      <Trash2 className="w-4 h-4 mx-auto" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Privacy Note */}
        <div className="p-3.5 rounded-xl bg-slate-100/70 border border-slate-200 text-[11px] text-slate-500 leading-relaxed flex items-start gap-2">
          <ShieldAlert className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
          <span>
            <strong>Confidentiality Notice:</strong> PDF tables are manipulated strictly within your browser. Always verify numeric precision and totals before utilizing extracted tables in accounting systems.
          </span>
        </div>
      </div>
    </div>
  );
};
