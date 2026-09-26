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
  ShieldAlert,
  Files,
  X
} from 'lucide-react';
import { 
  validateBusinessDocumentFile, 
  exportToExcelFile,
  ExpenseRow
} from '../../../services/businessExtractionService';

interface UploadedReceipt {
  id: string;
  file: File;
  name: string;
  sizeFormatted: string;
  previewUrl: string | null;
  isPdf: boolean;
}

export const ReceiptToExpense: React.FC = () => {
  const [receiptFiles, setReceiptFiles] = useState<UploadedReceipt[]>([]);
  const [activeFileId, setActiveFileId] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

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

  const handleFilesAdded = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setFileError(null);

    const newItems: UploadedReceipt[] = [];

    Array.from(files).forEach((file) => {
      const validation = validateBusinessDocumentFile(file, ['pdf', 'jpg', 'jpeg', 'png', 'webp']);
      if (!validation.valid) {
        setFileError(validation.error || 'Please select valid image or PDF receipts.');
        return;
      }

      const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
      const previewUrl = isPdf ? null : URL.createObjectURL(file);
      const sizeFormatted = (file.size / 1024).toFixed(1) + ' KB';

      newItems.push({
        id: `${file.name}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        file,
        name: file.name,
        sizeFormatted,
        previewUrl,
        isPdf
      });
    });

    if (newItems.length > 0) {
      setReceiptFiles((prev) => [...prev, ...newItems]);
      if (!activeFileId) {
        setActiveFileId(newItems[0].id);
      }
    }
  };

  const handleRemoveReceipt = (id: string) => {
    setReceiptFiles((prev) => {
      const target = prev.find(f => f.id === id);
      if (target?.previewUrl) URL.revokeObjectURL(target.previewUrl);
      const updated = prev.filter(f => f.id !== id);
      if (activeFileId === id) {
        setActiveFileId(updated.length > 0 ? updated[0].id : null);
      }
      return updated;
    });
  };

  const handleClearAll = () => {
    receiptFiles.forEach(f => {
      if (f.previewUrl) URL.revokeObjectURL(f.previewUrl);
    });
    setReceiptFiles([]);
    setActiveFileId(null);
  };

  const activeReceipt = receiptFiles.find(f => f.id === activeFileId) || receiptFiles[0] || null;

  const handleAddRow = () => {
    const newRow: ExpenseRow = {
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString().split('T')[0],
      merchant: activeReceipt ? activeReceipt.name.replace(/\.[^/.]+$/, '') : '',
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
      {/* 1. Upload Box with Multi-Receipt Support */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-2xs">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-lg font-black text-slate-900 tracking-tight">
              1. Upload Receipt Image(s) or PDF(s)
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Upload single or batch receipts (photos, scans, PDF). Max 25MB each.
            </p>
          </div>
          <span className="hidden sm:inline-flex text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-50 text-[#0057F3] border border-blue-200">
            Multi-Receipt Batch Memory
          </span>
        </div>

        <div className="relative border-2 border-dashed border-slate-300 hover:border-[#0057F3] rounded-2xl p-6 sm:p-8 text-center transition-colors bg-slate-50/50">
          <input
            type="file"
            multiple
            accept=".pdf,.jpg,.jpeg,.png,.webp"
            onChange={(e) => handleFilesAdded(e.target.files)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            aria-label="Upload receipt images or PDFs"
          />
          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0057F3] flex items-center justify-center">
              <Upload className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">
                Click to browse or drag & drop one or multiple receipts
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                Processed locally in browser memory for unified expense ledger compilation
              </p>
            </div>
            {receiptFiles.length > 0 && (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{receiptFiles.length} receipt{receiptFiles.length > 1 ? 's' : ''} staged in memory</span>
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

        {/* Uploaded Receipt Batch Queue Strip */}
        {receiptFiles.length > 0 && (
          <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Staged Receipts ({receiptFiles.length})
              </span>
              <button
                onClick={handleClearAll}
                className="text-xs text-slate-500 hover:text-red-500 transition-colors cursor-pointer"
              >
                Clear All Receipts
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {receiptFiles.map((rf) => (
                <div
                  key={rf.id}
                  onClick={() => setActiveFileId(rf.id)}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs cursor-pointer transition-all ${
                    activeFileId === rf.id 
                      ? 'bg-blue-50 border-[#0057F3] text-slate-900 font-bold shadow-xs' 
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Receipt className="w-3.5 h-3.5 text-[#0057F3]" />
                  <span className="max-w-[140px] truncate">{rf.name}</span>
                  <span className="text-[10px] text-slate-400">({rf.sizeFormatted})</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveReceipt(rf.id);
                    }}
                    className="text-slate-400 hover:text-red-500 ml-1 p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* OCR / Vision Architecture Notice */}
        <div className="mt-6 p-4 rounded-xl bg-amber-50/70 border border-amber-200/70 text-xs text-amber-900 flex items-start gap-3">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-amber-950">Local Browser Processing</p>
            <p className="text-amber-800 leading-relaxed">
              Your sensitive financial documents and receipts never leave your browser. Review the extracted expense records below, customize tax and category allocations, and export directly into corporate-ready Excel (.xlsx).
            </p>
          </div>
        </div>
      </div>

      {/* 2. Side-by-side or stacked view: Receipt Preview & Structured Ledger */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Document Inspection Panel (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs flex flex-col">
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 mb-3 flex items-center justify-between">
            <span>Receipt Inspection</span>
            {activeReceipt && (
              <span className="text-[10px] font-normal text-slate-400 truncate max-w-[120px]">
                {activeReceipt.name}
              </span>
            )}
          </h4>
          
          <div className="flex-1 min-h-[300px] border border-slate-100 rounded-xl bg-slate-50 flex items-center justify-center p-2 overflow-hidden">
            {activeReceipt && activeReceipt.previewUrl ? (
              <img 
                src={activeReceipt.previewUrl} 
                alt="Receipt Inspection" 
                className="max-h-[460px] max-w-full object-contain rounded-lg shadow-2xs"
              />
            ) : activeReceipt && activeReceipt.isPdf ? (
              <div className="text-center p-6 text-slate-500">
                <Receipt className="w-12 h-12 mx-auto text-slate-400 mb-2" />
                <p className="text-xs font-semibold text-slate-700">{activeReceipt.name}</p>
                <p className="text-[11px] text-slate-400 mt-1">PDF receipt loaded in memory.</p>
              </div>
            ) : (
              <div className="text-center p-6 text-slate-400">
                <Receipt className="w-10 h-10 mx-auto mb-2 opacity-50" />
                <p className="text-xs font-medium">No receipt selected</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Upload receipt image or PDF to inspect</p>
              </div>
            )}
          </div>
        </div>

        {/* Structured Expense Ledger (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-800">
                Expense Ledger Breakdown
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Edit items, reconcile sales tax, and assign cost-center codes.
              </p>
            </div>
            <button
              onClick={handleAddRow}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Expense</span>
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50/80 text-slate-500 uppercase font-semibold text-[11px] border-y border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3">Merchant</th>
                  <th className="py-2.5 px-3">Category</th>
                  <th className="py-2.5 px-3">Description</th>
                  <th className="py-2.5 px-3 text-right">Subtotal</th>
                  <th className="py-2.5 px-3 text-right">Tax</th>
                  <th className="py-2.5 px-3 text-right">Total</th>
                  <th className="py-2.5 px-2 text-center"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {expenses.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/50">
                    <td className="py-2 px-2">
                      <input
                        type="date"
                        value={row.date}
                        onChange={(e) => handleUpdateRow(row.id, 'date', e.target.value)}
                        className="w-28 px-1.5 py-1 text-xs border border-slate-200 rounded text-slate-800"
                      />
                    </td>
                    <td className="py-2 px-2">
                      <input
                        type="text"
                        value={row.merchant}
                        placeholder="Merchant"
                        onChange={(e) => handleUpdateRow(row.id, 'merchant', e.target.value)}
                        className="w-32 px-1.5 py-1 text-xs border border-slate-200 rounded text-slate-800"
                      />
                    </td>
                    <td className="py-2 px-2">
                      <select
                        value={row.category}
                        onChange={(e) => handleUpdateRow(row.id, 'category', e.target.value)}
                        className="w-28 px-1.5 py-1 text-xs border border-slate-200 rounded text-slate-800 bg-white"
                      >
                        <option value="Meals & Entertainment">Meals</option>
                        <option value="Travel & Transport">Travel</option>
                        <option value="Office Supplies">Office</option>
                        <option value="Software & SaaS">Software</option>
                        <option value="Utilities">Utilities</option>
                        <option value="Other">Other</option>
                      </select>
                    </td>
                    <td className="py-2 px-2">
                      <input
                        type="text"
                        value={row.description}
                        placeholder="Details"
                        onChange={(e) => handleUpdateRow(row.id, 'description', e.target.value)}
                        className="w-36 px-1.5 py-1 text-xs border border-slate-200 rounded text-slate-800"
                      />
                    </td>
                    <td className="py-2 px-2 text-right">
                      <input
                        type="number"
                        step="0.01"
                        value={row.subtotal}
                        onChange={(e) => handleUpdateRow(row.id, 'subtotal', Number(e.target.value))}
                        className="w-20 px-1.5 py-1 text-xs border border-slate-200 rounded text-right font-mono text-slate-800"
                      />
                    </td>
                    <td className="py-2 px-2 text-right">
                      <input
                        type="number"
                        step="0.01"
                        value={row.tax}
                        onChange={(e) => handleUpdateRow(row.id, 'tax', Number(e.target.value))}
                        className="w-16 px-1.5 py-1 text-xs border border-slate-200 rounded text-right font-mono text-slate-800"
                      />
                    </td>
                    <td className="py-2 px-3 text-right font-mono font-bold text-slate-900">
                      ${Number(row.total || 0).toFixed(2)}
                    </td>
                    <td className="py-2 px-2 text-center">
                      <button
                        onClick={() => handleDeleteRow(row.id)}
                        disabled={expenses.length <= 1}
                        className="text-slate-400 hover:text-red-500 disabled:opacity-30 cursor-pointer p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals & Export Bar */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-end sm:items-center justify-between gap-4">
            <div className="text-right sm:text-left space-y-1">
              <div className="text-xs text-slate-500">
                Sales Tax: <span className="font-mono font-bold text-slate-700">${totalTax.toFixed(2)}</span>
              </div>
              <div className="text-sm font-black text-slate-900">
                Total Expenses: <span className="font-mono text-[#0057F3] text-base">${totalExpense.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleExportXlsx}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Download Expense Report (.XLSX)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
