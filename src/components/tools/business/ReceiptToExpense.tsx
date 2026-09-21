import React, { useState } from 'react';
import { 
  Upload, 
  FileSpreadsheet, 
  Plus, 
  Trash2, 
  AlertCircle, 
  CheckCircle2, 
  Download, 
  Receipt,
  Info,
  ShieldAlert
} from 'lucide-react';
import { 
  validateBusinessDocumentFile, 
  exportToExcelFile,
  ExpenseRow
} from '../../../services/businessExtractionService';

export const ReceiptToExpense: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null);

  const [expenses, setExpenses] = useState<ExpenseRow[]>([
    {
      id: '1',
      date: new Date().toISOString().split('T')[0],
      merchant: 'Starbucks Coffee',
      category: 'Meals & Entertainment',
      description: 'Client project kickoff meeting',
      subtotal: 18.50,
      tax: 1.85,
      total: 20.35,
      currency: 'USD',
      paymentMethod: 'Corporate Card'
    },
    {
      id: '2',
      date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
      merchant: 'Delta Airlines',
      category: 'Travel & Transport',
      description: 'Flight to tech conference',
      subtotal: 340.00,
      tax: 28.50,
      total: 368.50,
      currency: 'USD',
      paymentMethod: 'Corporate Card'
    }
  ]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    const selected = e.target.files?.[0];
    if (!selected) return;

    const validation = validateBusinessDocumentFile(selected, ['pdf', 'jpg', 'jpeg', 'png', 'webp']);
    if (!validation.valid) {
      setFileError(validation.error || 'Please select a valid image or PDF receipt.');
      setFile(null);
      setFilePreviewUrl(null);
      return;
    }

    setFile(selected);
    if (selected.type.startsWith('image/')) {
      const url = URL.createObjectURL(selected);
      setFilePreviewUrl(url);
    } else {
      setFilePreviewUrl(null);
    }
  };

  const handleAddRow = () => {
    const newRow: ExpenseRow = {
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString().split('T')[0],
      merchant: '',
      category: 'Office Supplies',
      description: '',
      subtotal: 0,
      tax: 0,
      total: 0,
      currency: 'USD',
      paymentMethod: 'Corporate Card'
    };
    setExpenses([...expenses, newRow]);
  };

  const handleDeleteRow = (id: string) => {
    setExpenses(expenses.filter(e => e.id !== id));
  };

  const handleUpdateRow = (id: string, field: keyof ExpenseRow, value: any) => {
    setExpenses(expenses.map(item => {
      if (item.id === id) {
        const updated = { ...item, [field]: value };
        if (field === 'subtotal' || field === 'tax') {
          updated.total = (Number(updated.subtotal) || 0) + (Number(updated.tax) || 0);
        }
        return updated;
      }
      return item;
    }));
  };

  const totalExpense = expenses.reduce((acc, e) => acc + (Number(e.total) || 0), 0);
  const totalTax = expenses.reduce((acc, e) => acc + (Number(e.tax) || 0), 0);

  const handleExportXlsx = () => {
    const exportData = expenses.map(e => ({
      'Date': e.date,
      'Merchant': e.merchant || 'N/A',
      'Category': e.category,
      'Description': e.description,
      'Subtotal': e.subtotal,
      'Tax': e.tax,
      'Total': e.total,
      'Currency': e.currency,
      'Payment Method': e.paymentMethod
    }));

    exportToExcelFile(exportData, 'Expense_Report.xlsx', 'Expenses');
  };

  return (
    <div className="space-y-8">
      {/* 1. Upload Box */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-2xs">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-lg font-black text-slate-900 tracking-tight">
              1. Upload Receipt Image or PDF
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Upload photos, scans, or PDF receipts (Max 25MB).
            </p>
          </div>
          <span className="hidden sm:inline-flex text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-50 text-[#0057F3] border border-blue-200">
            Client-Side Memory
          </span>
        </div>

        <div className="relative border-2 border-dashed border-slate-300 hover:border-[#0057F3] rounded-2xl p-6 sm:p-8 text-center transition-colors bg-slate-50/50">
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png,.webp"
            onChange={handleFileUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            aria-label="Upload receipt image or PDF"
          />
          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0057F3] flex items-center justify-center">
              <Upload className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">
                {file ? file.name : 'Click to browse or drag & drop receipt'}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                Processed locally in browser memory for expense ledger compilation
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

        {/* OCR / Vision Architecture Notice */}
        <div className="mt-5 p-4 rounded-xl bg-blue-50/70 border border-blue-200/80 text-xs text-slate-700 space-y-2">
          <div className="flex items-center gap-2 font-bold text-[#0057F3]">
            <Info className="w-4 h-4 shrink-0" />
            <span>Automated Receipt OCR Gateway</span>
          </div>
          <p className="leading-relaxed">
            Your receipt image is held in client memory. Automated text extraction for merchant name, tax identification, and line breakdown is architected to connect with an AI vision OCR endpoint. You can inspect your receipt, record line items, and generate compliant accounting spreadsheets below.
          </p>
        </div>

        {filePreviewUrl && (
          <div className="mt-4 p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center gap-4">
            <img 
              src={filePreviewUrl} 
              alt="Receipt Preview" 
              className="w-16 h-16 object-cover rounded-lg border border-slate-300" 
            />
            <div className="text-xs">
              <div className="font-bold text-slate-800">{file?.name}</div>
              <div className="text-slate-500">Previewing receipt scan</div>
            </div>
          </div>
        )}
      </div>

      {/* 2. Structured Expense Ledger */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-lg font-black text-slate-900 tracking-tight">
              2. Expense Log & Category Assignment
            </h3>
            <p className="text-xs text-slate-600">
              Categorize expenses for tax reporting and reimbursement before downloading.
            </p>
          </div>

          <button
            onClick={handleExportXlsx}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>Export Expenses (XLSX)</span>
          </button>
        </div>

        {/* Metric Pill */}
        <div className="flex flex-wrap items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
          <div>
            <span className="text-slate-500">Total Items:</span>
            <span className="ml-1.5 font-bold font-mono text-slate-900">{expenses.length}</span>
          </div>
          <div>
            <span className="text-slate-500">Total Tax Reclaimable:</span>
            <span className="ml-1.5 font-bold font-mono text-slate-900">${totalTax.toFixed(2)}</span>
          </div>
          <div>
            <span className="text-slate-500">Grand Total Expense:</span>
            <span className="ml-1.5 font-black font-mono text-emerald-700 text-sm">${totalExpense.toFixed(2)}</span>
          </div>
        </div>

        {/* Table */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Expense Records
            </span>
            <button
              onClick={handleAddRow}
              className="inline-flex items-center gap-1 text-xs font-bold text-[#0057F3] hover:text-blue-700 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Expense Record</span>
            </button>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left text-xs text-slate-700 min-w-[760px]">
              <thead className="bg-slate-100/80 text-slate-800 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-2.5 w-28">Date</th>
                  <th className="p-2.5 w-36">Merchant</th>
                  <th className="p-2.5 w-36">Category</th>
                  <th className="p-2.5">Description</th>
                  <th className="p-2.5 w-20">Subtotal</th>
                  <th className="p-2.5 w-16">Tax</th>
                  <th className="p-2.5 w-20">Total</th>
                  <th className="p-2.5 w-28">Payment</th>
                  <th className="p-2.5 w-10 text-center">Del</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {expenses.map((e) => (
                  <tr key={e.id} className="hover:bg-slate-50/60">
                    <td className="p-2">
                      <input
                        type="date"
                        value={e.date}
                        onChange={(ev) => handleUpdateRow(e.id, 'date', ev.target.value)}
                        className="w-full px-2 py-1 bg-transparent border border-transparent hover:border-slate-200 focus:border-[#0057F3] rounded text-[11px]"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="text"
                        value={e.merchant}
                        placeholder="Merchant"
                        onChange={(ev) => handleUpdateRow(e.id, 'merchant', ev.target.value)}
                        className="w-full px-2 py-1 bg-transparent border border-transparent hover:border-slate-200 focus:border-[#0057F3] rounded font-semibold"
                      />
                    </td>
                    <td className="p-2">
                      <select
                        value={e.category}
                        onChange={(ev) => handleUpdateRow(e.id, 'category', ev.target.value)}
                        className="w-full px-2 py-1 bg-transparent border border-transparent hover:border-slate-200 focus:border-[#0057F3] rounded text-[11px]"
                      >
                        <option value="Meals & Entertainment">Meals & Entertainment</option>
                        <option value="Travel & Transport">Travel & Transport</option>
                        <option value="Office Supplies">Office Supplies</option>
                        <option value="Software & Cloud">Software & Cloud</option>
                        <option value="Professional Services">Professional Services</option>
                        <option value="Advertising & Marketing">Advertising & Marketing</option>
                        <option value="Utilities">Utilities</option>
                        <option value="Miscellaneous">Miscellaneous</option>
                      </select>
                    </td>
                    <td className="p-2">
                      <input
                        type="text"
                        value={e.description}
                        placeholder="Business purpose"
                        onChange={(ev) => handleUpdateRow(e.id, 'description', ev.target.value)}
                        className="w-full px-2 py-1 bg-transparent border border-transparent hover:border-slate-200 focus:border-[#0057F3] rounded"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        step="0.01"
                        value={e.subtotal}
                        onChange={(ev) => handleUpdateRow(e.id, 'subtotal', Number(ev.target.value))}
                        className="w-full px-2 py-1 bg-transparent border border-transparent hover:border-slate-200 focus:border-[#0057F3] rounded font-mono"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        step="0.01"
                        value={e.tax}
                        onChange={(ev) => handleUpdateRow(e.id, 'tax', Number(ev.target.value))}
                        className="w-full px-2 py-1 bg-transparent border border-transparent hover:border-slate-200 focus:border-[#0057F3] rounded font-mono"
                      />
                    </td>
                    <td className="p-2 font-mono font-bold text-slate-900">
                      ${e.total.toFixed(2)}
                    </td>
                    <td className="p-2">
                      <select
                        value={e.paymentMethod}
                        onChange={(ev) => handleUpdateRow(e.id, 'paymentMethod', ev.target.value)}
                        className="w-full px-1.5 py-1 bg-transparent border border-transparent hover:border-slate-200 focus:border-[#0057F3] rounded text-[11px]"
                      >
                        <option value="Corporate Card">Corporate Card</option>
                        <option value="Personal Card">Personal Card</option>
                        <option value="Cash">Cash</option>
                        <option value="Bank Transfer">Bank Transfer</option>
                        <option value="Reimbursement">Reimbursement</option>
                      </select>
                    </td>
                    <td className="p-2 text-center">
                      <button
                        onClick={() => handleDeleteRow(e.id)}
                        disabled={expenses.length <= 1}
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

        {/* Privacy Note */}
        <div className="p-3.5 rounded-xl bg-slate-100/70 border border-slate-200 text-[11px] text-slate-500 leading-relaxed flex items-start gap-2">
          <ShieldAlert className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
          <span>
            <strong>Confidentiality Note:</strong> Expense logs are processed entirely in browser memory. Verify all vendor names and tax amounts against official receipts before submitting expense reports for reimbursement.
          </span>
        </div>
      </div>
    </div>
  );
};
