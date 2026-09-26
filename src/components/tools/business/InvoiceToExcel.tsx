import React, { useState } from 'react';
import { 
  Upload, 
  FileSpreadsheet, 
  Plus, 
  Trash2, 
  AlertCircle, 
  CheckCircle2, 
  Download, 
  FileText, 
  Info,
  ShieldAlert,
  Edit3,
  X
} from 'lucide-react';
import { 
  validateBusinessDocumentFile, 
  exportToExcelFile, 
  InvoiceLineItem,
  InvoiceData 
} from '../../../services/businessExtractionService';

interface StagedInvoiceFile {
  id: string;
  file: File;
  name: string;
  sizeFormatted: string;
  previewUrl: string | null;
  isPdf: boolean;
}

export const InvoiceToExcel: React.FC = () => {
  const [stagedFiles, setStagedFiles] = useState<StagedInvoiceFile[]>([]);
  const [activeFileId, setActiveFileId] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  // Structured Invoice Header State
  const [invoice, setInvoice] = useState<InvoiceData>({
    supplier: 'Apex Logistics Corp',
    invoiceNumber: 'INV-2026-892',
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    currency: 'USD ($)',
    subtotal: 1850.00,
    tax: 185.00,
    discount: 0,
    total: 2035.00,
    items: [
      {
        id: '1',
        description: 'Freight Transport & Cold Storage Operations',
        sku: 'LOG-409',
        quantity: 1,
        unitPrice: 1200.00,
        tax: 120.00,
        lineTotal: 1200.00
      },
      {
        id: '2',
        description: 'Customs Clearance & Documentation Handling',
        sku: 'CUS-102',
        quantity: 1,
        unitPrice: 650.00,
        tax: 65.00,
        lineTotal: 650.00
      }
    ]
  });

  // Calculate totals whenever line items or discounts change
  const recalculateTotals = (items: InvoiceLineItem[], discount: number) => {
    const subtotal = items.reduce((acc, item) => acc + item.quantity * item.unitPrice, 0);
    const tax = items.reduce((acc, item) => acc + item.tax, 0);
    const total = Math.max(0, subtotal + tax - discount);
    return { subtotal, tax, total };
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;

    const newFiles: StagedInvoiceFile[] = [];

    Array.from(selectedFiles).forEach(selected => {
      const validation = validateBusinessDocumentFile(selected, ['pdf', 'jpg', 'jpeg', 'png', 'webp']);
      if (!validation.valid) {
        setFileError(validation.error || 'Invalid file format');
        return;
      }

      const isPdf = selected.type === 'application/pdf' || selected.name.toLowerCase().endsWith('.pdf');
      const previewUrl = isPdf ? null : URL.createObjectURL(selected);

      newFiles.push({
        id: `${selected.name}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        file: selected,
        name: selected.name,
        sizeFormatted: (selected.size / 1024).toFixed(1) + ' KB',
        previewUrl,
        isPdf
      });
    });

    if (newFiles.length > 0) {
      setStagedFiles(prev => [...prev, ...newFiles]);
      if (!activeFileId) {
        setActiveFileId(newFiles[0].id);
      }
    }
  };

  const handleRemoveFile = (id: string) => {
    setStagedFiles(prev => {
      const target = prev.find(f => f.id === id);
      if (target?.previewUrl) URL.revokeObjectURL(target.previewUrl);
      const remaining = prev.filter(f => f.id !== id);
      if (activeFileId === id) {
        setActiveFileId(remaining.length > 0 ? remaining[0].id : null);
      }
      return remaining;
    });
  };

  const handleClearAll = () => {
    stagedFiles.forEach(f => {
      if (f.previewUrl) URL.revokeObjectURL(f.previewUrl);
    });
    setStagedFiles([]);
    setActiveFileId(null);
  };

  const activeStagedFile = stagedFiles.find(f => f.id === activeFileId) || stagedFiles[0] || null;

  const handleAddItem = () => {
    const newItem: InvoiceLineItem = {
      id: Math.random().toString(36).substr(2, 9),
      description: 'New Line Item',
      sku: 'SKU-' + Math.floor(100 + Math.random() * 900),
      quantity: 1,
      unitPrice: 0,
      tax: 0,
      lineTotal: 0
    };
    const updated = [...invoice.items, newItem];
    const { subtotal, tax, total } = recalculateTotals(updated, invoice.discount);
    setInvoice({ ...invoice, items: updated, subtotal, tax, total });
  };

  const handleUpdateItem = (id: string, field: keyof InvoiceLineItem, value: any) => {
    const updated = invoice.items.map(item => {
      if (item.id === id) {
        const modified = { ...item, [field]: value };
        if (field === 'quantity' || field === 'unitPrice') {
          modified.lineTotal = Number(modified.quantity) * Number(modified.unitPrice);
        }
        return modified;
      }
      return item;
    });
    const { subtotal, tax, total } = recalculateTotals(updated, invoice.discount);
    setInvoice({ ...invoice, items: updated, subtotal, tax, total });
  };

  const handleDeleteItem = (id: string) => {
    const updated = invoice.items.filter(item => item.id !== id);
    const { subtotal, tax, total } = recalculateTotals(updated, invoice.discount);
    setInvoice({ ...invoice, items: updated, subtotal, tax, total });
  };

  const handleExportXlsx = () => {
    const exportRows = invoice.items.map(item => ({
      'Supplier / Merchant': invoice.supplier || 'N/A',
      'Invoice Number': invoice.invoiceNumber || 'N/A',
      'Invoice Date': invoice.date,
      'Due Date': invoice.dueDate,
      'Currency': invoice.currency,
      'Item SKU': item.sku,
      'Description': item.description,
      'Quantity': item.quantity,
      'Unit Price': item.unitPrice,
      'Item Tax': item.tax,
      'Line Total': item.lineTotal,
      'Invoice Subtotal': invoice.subtotal,
      'Invoice Discount': invoice.discount,
      'Total Tax': invoice.tax,
      'Invoice Grand Total': invoice.total
    }));

    exportToExcelFile(exportRows, `Invoice_${invoice.invoiceNumber || 'Export'}.xlsx`, 'Invoice Data');
  };

  return (
    <div className="space-y-8">
      {/* 1. Upload Area with Multi-File Staging */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-2xs">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-lg font-black text-slate-900 tracking-tight">
              1. Upload Invoice(s) or Receipt(s)
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Select one or multiple PDF, JPG, PNG, or WEBP invoices (Max 25MB each).
            </p>
          </div>
          <span className="hidden sm:inline-flex text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-50 text-[#0057F3] border border-blue-200">
            Client-Side Memory
          </span>
        </div>

        <div className="relative border-2 border-dashed border-slate-300 hover:border-[#0057F3] rounded-2xl p-6 sm:p-8 text-center transition-colors bg-slate-50/50">
          <input
            type="file"
            multiple
            accept=".pdf,.jpg,.jpeg,.png,.webp"
            onChange={handleFileUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            aria-label="Upload invoice files"
          />
          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0057F3] flex items-center justify-center">
              <Upload className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">
                Click to browse or drag & drop one or multiple invoices
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                Supported: PDF, JPG, PNG, WEBP (Processed locally in browser memory)
              </p>
            </div>
            {stagedFiles.length > 0 && (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{stagedFiles.length} file{stagedFiles.length > 1 ? 's' : ''} loaded in memory</span>
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

        {/* Uploaded Invoices Strip */}
        {stagedFiles.length > 0 && (
          <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Staged Invoices ({stagedFiles.length})
              </span>
              <button
                onClick={handleClearAll}
                className="text-xs text-slate-500 hover:text-red-500 transition-colors cursor-pointer"
              >
                Clear All
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {stagedFiles.map((sf) => (
                <div
                  key={sf.id}
                  onClick={() => setActiveFileId(sf.id)}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs cursor-pointer transition-all ${
                    activeFileId === sf.id 
                      ? 'bg-blue-50 border-[#0057F3] text-slate-900 font-bold shadow-xs' 
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5 text-[#0057F3]" />
                  <span className="max-w-[140px] truncate">{sf.name}</span>
                  <span className="text-[10px] text-slate-400">({sf.sizeFormatted})</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFile(sf.id);
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

        {/* OCR Architecture Notice */}
        <div className="mt-5 p-4 rounded-xl bg-blue-50/70 border border-blue-200/80 text-xs text-slate-700 space-y-2">
          <div className="flex items-center gap-2 font-bold text-[#0057F3]">
            <Info className="w-4 h-4 shrink-0" />
            <span>Browser-Local Privacy Guarantee</span>
          </div>
          <p className="leading-relaxed">
            Your document data is staged safely in local browser memory. You can inspect your invoices, review and adjust fields, add line items, and export directly into clean XLSX below.
          </p>
        </div>

        {/* Preview of active staged file */}
        {activeStagedFile && activeStagedFile.previewUrl && (
          <div className="mt-4 p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center gap-4">
            <img 
              src={activeStagedFile.previewUrl} 
              alt="Invoice Preview" 
              className="w-16 h-16 object-cover rounded-lg border border-slate-300" 
            />
            <div className="text-xs">
              <div className="font-bold text-slate-800">{activeStagedFile.name}</div>
              <div className="text-slate-500">Previewing active invoice image</div>
            </div>
          </div>
        )}
      </div>

      {/* 2. Structured Invoice Editor */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-lg font-black text-slate-900 tracking-tight">
              2. Review & Edit Invoice Data
            </h3>
            <p className="text-xs text-slate-600">
              Verify header information and line items before generating the Excel workbook.
            </p>
          </div>
          <button
            onClick={handleExportXlsx}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Export to Excel (XLSX)</span>
          </button>
        </div>

        {/* Top Header Fields Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              Supplier / Merchant
            </label>
            <input
              type="text"
              value={invoice.supplier}
              onChange={(e) => setInvoice({ ...invoice, supplier: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:border-[#0057F3]"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              Invoice Number
            </label>
            <input
              type="text"
              value={invoice.invoiceNumber}
              onChange={(e) => setInvoice({ ...invoice, invoiceNumber: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-800 focus:bg-white focus:border-[#0057F3]"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              Invoice Date
            </label>
            <input
              type="date"
              value={invoice.date}
              onChange={(e) => setInvoice({ ...invoice, date: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:border-[#0057F3]"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              Due Date
            </label>
            <input
              type="date"
              value={invoice.dueDate}
              onChange={(e) => setInvoice({ ...invoice, dueDate: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:border-[#0057F3]"
            />
          </div>
        </div>

        {/* Line Items Table */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Line Items ({invoice.items.length})
            </h4>
            <button
              onClick={handleAddItem}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Item</span>
            </button>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase font-semibold text-[11px] border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">SKU / Code</th>
                  <th className="py-2.5 px-3">Description</th>
                  <th className="py-2.5 px-3 text-right">Qty</th>
                  <th className="py-2.5 px-3 text-right">Unit Price</th>
                  <th className="py-2.5 px-3 text-right">Tax ($)</th>
                  <th className="py-2.5 px-3 text-right">Line Total</th>
                  <th className="py-2.5 px-2 text-center w-10"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {invoice.items.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50">
                    <td className="py-2 px-3">
                      <input
                        type="text"
                        value={item.sku}
                        onChange={(e) => handleUpdateItem(item.id, 'sku', e.target.value)}
                        className="w-24 px-2 py-1 text-xs border border-slate-200 rounded font-mono text-slate-800"
                      />
                    </td>
                    <td className="py-2 px-3">
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => handleUpdateItem(item.id, 'description', e.target.value)}
                        className="w-full min-w-[200px] px-2 py-1 text-xs border border-slate-200 rounded text-slate-800"
                      />
                    </td>
                    <td className="py-2 px-3 text-right">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleUpdateItem(item.id, 'quantity', Number(e.target.value))}
                        className="w-16 px-2 py-1 text-xs border border-slate-200 rounded text-right font-mono text-slate-800"
                      />
                    </td>
                    <td className="py-2 px-3 text-right">
                      <input
                        type="number"
                        step="0.01"
                        value={item.unitPrice}
                        onChange={(e) => handleUpdateItem(item.id, 'unitPrice', Number(e.target.value))}
                        className="w-20 px-2 py-1 text-xs border border-slate-200 rounded text-right font-mono text-slate-800"
                      />
                    </td>
                    <td className="py-2 px-3 text-right">
                      <input
                        type="number"
                        step="0.01"
                        value={item.tax}
                        onChange={(e) => handleUpdateItem(item.id, 'tax', Number(e.target.value))}
                        className="w-16 px-2 py-1 text-xs border border-slate-200 rounded text-right font-mono text-slate-800"
                      />
                    </td>
                    <td className="py-2 px-3 text-right font-mono font-bold text-slate-900">
                      ${Number(item.lineTotal || 0).toFixed(2)}
                    </td>
                    <td className="py-2 px-2 text-center">
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        disabled={invoice.items.length <= 1}
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
        </div>

        {/* Totals Section */}
        <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row justify-end items-end gap-6">
          <div className="w-full sm:w-72 space-y-2 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal:</span>
              <span className="font-mono font-bold">${invoice.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Tax Total:</span>
              <span className="font-mono font-bold">${invoice.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-slate-600">
              <span>Discount ($):</span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={invoice.discount}
                onChange={(e) => {
                  const discount = Number(e.target.value);
                  const { total } = recalculateTotals(invoice.items, discount);
                  setInvoice({ ...invoice, discount, total });
                }}
                className="w-20 px-2 py-1 text-xs border border-slate-200 rounded text-right font-mono text-slate-800"
              />
            </div>
            <div className="flex justify-between pt-2 border-t border-slate-200 text-sm font-black text-slate-900">
              <span>Grand Total:</span>
              <span className="font-mono text-[#0057F3] text-base">${invoice.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
