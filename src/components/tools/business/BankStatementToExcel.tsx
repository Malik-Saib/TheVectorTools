import React, { useState } from 'react';
import { 
  Upload, 
  FileSpreadsheet, 
  Plus, 
  Trash2, 
  AlertCircle, 
  CheckCircle2, 
  Download, 
  ShieldAlert,
  Info,
  DollarSign
} from 'lucide-react';
import { 
  validateBusinessDocumentFile, 
  exportToExcelFile,
  BankStatementRow 
} from '../../../services/businessExtractionService';

export const BankStatementToExcel: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [currency, setCurrency] = useState<string>('USD ($)');

  const [statementRows, setStatementRows] = useState<BankStatementRow[]>([
    {
      id: '1',
      date: '2026-03-01',
      description: 'Payroll Direct Deposit - Acme Corp',
      reference: 'ACH-982134',
      debit: null,
      credit: 4250.00,
      balance: 12450.00,
      currency: 'USD'
    },
    {
      id: '2',
      date: '2026-03-03',
      description: 'AWS Cloud Infrastructure Hosting',
      reference: 'TXN-110294',
      debit: 345.20,
      credit: null,
      balance: 12104.80,
      currency: 'USD'
    },
    {
      id: '3',
      date: '2026-03-05',
      description: 'Office Lease Monthly Payment',
      reference: 'WIRE-55410',
      debit: 1800.00,
      credit: null,
      balance: 10304.80,
      currency: 'USD'
    }
  ]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    const selected = e.target.files?.[0];
    if (!selected) return;

    const validation = validateBusinessDocumentFile(selected, ['pdf', 'csv', 'txt']);
    if (!validation.valid) {
      setFileError(validation.error || 'Please select a valid bank statement file.');
      setFile(null);
      return;
    }

    setFile(selected);
  };

  const handleAddRow = () => {
    const newRow: BankStatementRow = {
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString().split('T')[0],
      description: 'New Transaction',
      reference: 'REF-' + Math.floor(100000 + Math.random() * 900000),
      debit: null,
      credit: null,
      balance: 0,
      currency: currency.substring(0, 3)
    };
    setStatementRows([...statementRows, newRow]);
  };

  const handleDeleteRow = (id: string) => {
    setStatementRows(statementRows.filter(r => r.id !== id));
  };

  const handleUpdateRow = (id: string, field: keyof BankStatementRow, value: any) => {
    setStatementRows(statementRows.map(r => {
      if (r.id === id) {
        return { ...r, [field]: value };
      }
      return r;
    }));
  };

  const totalDebits = statementRows.reduce((acc, r) => acc + (Number(r.debit) || 0), 0);
  const totalCredits = statementRows.reduce((acc, r) => acc + (Number(r.credit) || 0), 0);
  const netChange = totalCredits - totalDebits;

  const handleExportXlsx = () => {
    const exportData = statementRows.map(r => ({
      'Date': r.date,
      'Description': r.description,
      'Reference': r.reference,
      'Debit (-)': r.debit !== null ? r.debit : '',
      'Credit (+)': r.credit !== null ? r.credit : '',
      'Balance': r.balance,
      'Currency': currency
    }));

    exportToExcelFile(exportData, 'Bank_Statement_Export.xlsx', 'Statement Transactions');
  };

  return (
    <div className="space-y-8">
      {/* 1. Upload Box */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-2xs">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-lg font-black text-slate-900 tracking-tight">
              1. Upload Bank Statement (PDF or CSV)
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Upload PDF or CSV export from your bank (Max 25MB).
            </p>
          </div>
          <span className="hidden sm:inline-flex text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-50 text-[#0057F3] border border-blue-200">
            Client-Side Memory
          </span>
        </div>

        <div className="relative border-2 border-dashed border-slate-300 hover:border-[#0057F3] rounded-2xl p-6 sm:p-8 text-center transition-colors bg-slate-50/50">
          <input
            type="file"
            accept=".pdf,.csv,.txt"
            onChange={handleFileUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            aria-label="Upload bank statement"
          />
          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0057F3] flex items-center justify-center">
              <Upload className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">
                {file ? file.name : 'Click to browse or drag & drop bank statement'}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                Staged locally in browser memory for preview and structuring
              </p>
            </div>
            {file && (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>File loaded: {(file.size / 1024).toFixed(1)} KB</span>
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

        {/* Banking Notice & Privacy */}
        <div className="mt-5 p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-slate-700 space-y-2">
          <div className="flex items-center gap-2 font-bold text-amber-800">
            <ShieldAlert className="w-4 h-4 shrink-0 text-amber-600" />
            <span>Banking Data Transparency & Accuracy Notice</span>
          </div>
          <p className="leading-relaxed">
            Bank statement structures vary widely between institutions (JPMorgan, HSBC, Barclays, Revolut, Wise, etc.). While this tool formats data into standardized debit/credit columns, automatic parsing across all financial formats requires custom OCR bank statement mappings. Always verify account balances against your official banking portal.
          </p>
        </div>
      </div>

      {/* 2. Editable Statement Transactions */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-lg font-black text-slate-900 tracking-tight">
              2. Transaction Ledger Preview
            </h3>
            <p className="text-xs text-slate-600">
              Review, edit, or append transactions before exporting to XLSX.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-[#0057F3]"
            >
              <option value="USD ($)">USD ($)</option>
              <option value="EUR (€)">EUR (€)</option>
              <option value="GBP (£)">GBP (£)</option>
              <option value="CAD ($)">CAD ($)</option>
              <option value="AUD ($)">AUD ($)</option>
              <option value="PKR (₨)">PKR (₨)</option>
            </select>

            <button
              onClick={handleExportXlsx}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer shrink-0"
            >
              <Download className="w-4 h-4" />
              <span>Export to XLSX</span>
            </button>
          </div>
        </div>

        {/* Metrics Summary Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Total Debits (-)</span>
            <span className="text-lg font-black font-mono text-red-600">${totalDebits.toFixed(2)}</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Total Credits (+)</span>
            <span className="text-lg font-black font-mono text-emerald-600">${totalCredits.toFixed(2)}</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Net Period Change</span>
            <span className={`text-lg font-black font-mono ${netChange >= 0 ? 'text-emerald-700' : 'text-red-600'}`}>
              {netChange >= 0 ? '+' : ''}${netChange.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Table */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              {statementRows.length} Transactions
            </span>
            <button
              onClick={handleAddRow}
              className="inline-flex items-center gap-1 text-xs font-bold text-[#0057F3] hover:text-blue-700 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Transaction</span>
            </button>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left text-xs text-slate-700 min-w-[700px]">
              <thead className="bg-slate-100/80 text-slate-800 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-2.5 w-28">Date</th>
                  <th className="p-2.5">Description</th>
                  <th className="p-2.5 w-28">Reference</th>
                  <th className="p-2.5 w-24">Debit (-)</th>
                  <th className="p-2.5 w-24">Credit (+)</th>
                  <th className="p-2.5 w-28">Balance</th>
                  <th className="p-2.5 w-12 text-center">Del</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {statementRows.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/60">
                    <td className="p-2">
                      <input
                        type="date"
                        value={r.date}
                        onChange={(e) => handleUpdateRow(r.id, 'date', e.target.value)}
                        className="w-full px-2 py-1 bg-transparent border border-transparent hover:border-slate-200 focus:border-[#0057F3] rounded text-[11px]"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="text"
                        value={r.description}
                        onChange={(e) => handleUpdateRow(r.id, 'description', e.target.value)}
                        className="w-full px-2 py-1 bg-transparent border border-transparent hover:border-slate-200 focus:border-[#0057F3] rounded"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="text"
                        value={r.reference}
                        onChange={(e) => handleUpdateRow(r.id, 'reference', e.target.value)}
                        className="w-full px-2 py-1 bg-transparent border border-transparent hover:border-slate-200 focus:border-[#0057F3] rounded font-mono text-[11px]"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        step="0.01"
                        value={r.debit ?? ''}
                        placeholder="0.00"
                        onChange={(e) => handleUpdateRow(r.id, 'debit', e.target.value ? Number(e.target.value) : null)}
                        className="w-full px-2 py-1 bg-transparent border border-transparent hover:border-slate-200 focus:border-[#0057F3] rounded font-mono text-red-600 font-semibold"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        step="0.01"
                        value={r.credit ?? ''}
                        placeholder="0.00"
                        onChange={(e) => handleUpdateRow(r.id, 'credit', e.target.value ? Number(e.target.value) : null)}
                        className="w-full px-2 py-1 bg-transparent border border-transparent hover:border-slate-200 focus:border-[#0057F3] rounded font-mono text-emerald-600 font-semibold"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        step="0.01"
                        value={r.balance}
                        onChange={(e) => handleUpdateRow(r.id, 'balance', Number(e.target.value))}
                        className="w-full px-2 py-1 bg-transparent border border-transparent hover:border-slate-200 focus:border-[#0057F3] rounded font-mono font-bold text-slate-900"
                      />
                    </td>
                    <td className="p-2 text-center">
                      <button
                        onClick={() => handleDeleteRow(r.id)}
                        disabled={statementRows.length <= 1}
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
        </div>

        {/* Privacy & Legal disclaimer */}
        <div className="p-3.5 rounded-xl bg-slate-100/70 border border-slate-200 text-[11px] text-slate-500 leading-relaxed flex items-start gap-2">
          <ShieldAlert className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
          <span>
            <strong>Confidentiality Notice:</strong> Financial information is staged inside browser memory. We do not provide financial, banking, or accounting advice. Always reconcile converted statements with certified banking documents.
          </span>
        </div>
      </div>
    </div>
  );
};
