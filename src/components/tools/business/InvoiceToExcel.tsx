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
  Edit3
} from 'lucide-react';
import { 
  validateBusinessDocumentFile, 
  exportToExcelFile, 
  InvoiceLineItem,
  InvoiceData 
} from '../../../services/businessExtractionService';

export const InvoiceToExcel: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null);

  // Structured Invoice Header State
  const [invoice, setInvoice] = useState<InvoiceData>({
    supplier: '',
    invoiceNumber: '',
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    currency: 'USD ($)',
    subtotal: 0,
    tax: 0,
    discount: 0,
    total: 0,
    items: [
      {
        id: '1',
        description: 'Professional Services',
        sku: 'SRV-001',
        quantity: 1,
        unitPrice: 150.00,
        tax: 0,
        lineTotal: 150.00
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
    const selected = e.target.files?.[0];
    if (!selected) return;

    const validation = validateBusinessDocumentFile(selected, ['pdf', 'jpg', 'jpeg', 'png', 'webp']);
    if (!validation.valid) {
      setFileError(validation.error || 'Invalid file uploaded');
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
    // Flatten invoice into clean tabular structure for Excel export
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
      {/* 1. Upload Area */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-2xs">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-lg font-black text-slate-900 tracking-tight">
              1. Upload Invoice or Receipt
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Select any PDF, JPG, PNG, or WEBP document (Max 25MB).
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
            aria-label="Upload invoice file"
          />
          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0057F3] flex items-center justify-center">
              <Upload className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">
                {file ? file.name : 'Click to browse or drag & drop invoice'}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                Supported: PDF, JPG, PNG, WEBP (Processed locally in browser memory)
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
            <span>OCR Extraction Gateway Architecture</span>
          </div>
          <p className="leading-relaxed">
            Your document is safely staged in local browser memory. Fully automated optical character recognition (OCR) layout extraction requires connecting a dedicated server OCR or Gemini Vision endpoint. You can inspect your document, review and adjust fields, add line items, and export directly to clean XLSX below.
          </p>
          <p className="text-[11px] text-slate-500 font-medium">
            🔒 Privacy guarantee: No files are uploaded to remote servers without explicit configuration.
          </p>
        </div>

        {/* Optional Image Preview if image */}
        {filePreviewUrl && (
          <div className="mt-4 p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center gap-4">
            <img 
              src={filePreviewUrl} 
              alt="Invoice Preview" 
              className="w-16 h-16 object-cover rounded-lg border border-slate-300" 
            />
            <div className="text-xs">
              <div className="font-bold text-slate-800">{file?.name}</div>
              <div className="text-slate-500">Previewing document image</div>
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

        {/* Header Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Supplier / Merchant
            </label>
            <input
              type="text"
              value={invoice.supplier}
              onChange={(e) => setInvoice({ ...invoice, supplier: e.target.value })}
              placeholder="e.g. Acme Corp / Adobe Inc."
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#0057F3]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Invoice Number
            </label>
            <input
              type="text"
              value={invoice.invoiceNumber}
              onChange={(e) => setInvoice({ ...invoice, invoiceNumber: e.target.value })}
              placeholder="e.g. INV-2026-0042"
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#0057F3]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Invoice Date
            </label>
            <input
              type="date"
              value={invoice.date}
              onChange={(e) => setInvoice({ ...invoice, date: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#0057F3]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Currency
            </label>
            <select
              value={invoice.currency}
              onChange={(e) => setInvoice({ ...invoice, currency: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#0057F3]"
            >
              <option value="USD ($)">USD ($)</option>
              <option value="EUR (€)">EUR (€)</option>
              <option value="GBP (£)">GBP (£)</option>
              <option value="CAD ($)">CAD ($)</option>
              <option value="AUD ($)">AUD ($)</option>
              <option value="PKR (₨)">PKR (₨)</option>
              <option value="INR (₹)">INR (₹)</option>
              <option value="JPY (¥)">JPY (¥)</option>
            </select>
          </div>
        </div>

        {/* Line Items Table */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-800">
              Line Items
            </h4>
            <button
              onClick={handleAddItem}
              className="inline-flex items-center gap-1 text-xs font-bold text-[#0057F3] hover:text-blue-700 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Line Item</span>
            </button>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left text-xs text-slate-700 min-w-[600px]">
              <thead className="bg-slate-100/80 text-slate-800 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-2.5">Description</th>
                  <th className="p-2.5 w-24">SKU</th>
                  <th className="p-2.5 w-20">Qty</th>
                  <th className="p-2.5 w-28">Unit Price</th>
                  <th className="p-2.5 w-24">Tax</th>
                  <th className="p-2.5 w-28">Total</th>
                  <th className="p-2.5 w-12 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {invoice.items.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/60">
                    <td className="p-2">
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => handleUpdateItem(item.id, 'description', e.target.value)}
                        className="w-full px-2 py-1 bg-transparent border border-transparent hover:border-slate-200 focus:border-[#0057F3] rounded"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="text"
                        value={item.sku}
                        onChange={(e) => handleUpdateItem(item.id, 'sku', e.target.value)}
                        className="w-full px-2 py-1 bg-transparent border border-transparent hover:border-slate-200 focus:border-[#0057F3] rounded font-mono text-[11px]"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleUpdateItem(item.id, 'quantity', Number(e.target.value))}
                        className="w-full px-2 py-1 bg-transparent border border-transparent hover:border-slate-200 focus:border-[#0057F3] rounded font-mono"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        step="0.01"
                        value={item.unitPrice}
                        onChange={(e) => handleUpdateItem(item.id, 'unitPrice', Number(e.target.value))}
                        className="w-full px-2 py-1 bg-transparent border border-transparent hover:border-slate-200 focus:border-[#0057F3] rounded font-mono"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        step="0.01"
                        value={item.tax}
                        onChange={(e) => handleUpdateItem(item.id, 'tax', Number(e.target.value))}
                        className="w-full px-2 py-1 bg-transparent border border-transparent hover:border-slate-200 focus:border-[#0057F3] rounded font-mono"
                      />
                    </td>
                    <td className="p-2 font-mono font-bold text-slate-900">
                      ${(item.quantity * item.unitPrice + item.tax).toFixed(2)}
                    </td>
                    <td className="p-2 text-center">
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        disabled={invoice.items.length <= 1}
                        className="text-slate-400 hover:text-red-500 transition-colors disabled:opacity-30 cursor-pointer"
                        title="Delete line item"
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

        {/* Invoice Summary Box */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-xs">
            <div>
              <span className="text-slate-500">Subtotal:</span>
              <span className="ml-1.5 font-bold font-mono text-slate-800">${invoice.subtotal.toFixed(2)}</span>
            </div>
            <div>
              <span className="text-slate-500">Tax:</span>
              <span className="ml-1.5 font-bold font-mono text-slate-800">${invoice.tax.toFixed(2)}</span>
            </div>
            <div>
              <span className="text-slate-500">Total:</span>
              <span className="ml-1.5 font-black font-mono text-emerald-700 text-sm">${invoice.total.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={handleExportXlsx}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download Clean XLSX</span>
          </button>
        </div>

        {/* Trust & Privacy Notice */}
        <div className="p-3.5 rounded-xl bg-slate-100/70 border border-slate-200 text-[11px] text-slate-500 leading-relaxed flex items-start gap-2">
          <ShieldAlert className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
          <span>
            <strong>Privacy & Compliance Note:</strong> Review extracted information before exporting. Do not upload documents containing information you are not authorized to process. The Vector Tools does not persist or transmit your business data to external storage.
          </span>
        </div>
      </div>
    </div>
  );
};
