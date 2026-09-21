import React, { useState } from 'react';
import { 
  Upload, 
  FileSpreadsheet, 
  Plus, 
  Trash2, 
  AlertCircle, 
  CheckCircle2, 
  Download, 
  Boxes,
  Info,
  ShieldAlert
} from 'lucide-react';
import { 
  validateBusinessDocumentFile, 
  exportToExcelFile,
  PurchaseOrderItem
} from '../../../services/businessExtractionService';

export const PurchaseOrderToExcel: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const [poItems, setPoItems] = useState<PurchaseOrderItem[]>([
    {
      id: '1',
      poNumber: 'PO-2026-8801',
      supplier: 'Global Logistics Supply Ltd',
      date: new Date().toISOString().split('T')[0],
      deliveryDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      sku: 'WGT-METAL-40',
      product: 'Industrial Grade Fasteners (Box of 500)',
      quantity: 10,
      unitPrice: 42.50,
      tax: 34.00,
      total: 459.00
    },
    {
      id: '2',
      poNumber: 'PO-2026-8801',
      supplier: 'Global Logistics Supply Ltd',
      date: new Date().toISOString().split('T')[0],
      deliveryDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      sku: 'WGT-POLY-12',
      product: 'Protective Polyethylene Sheeting (100m Roll)',
      quantity: 4,
      unitPrice: 95.00,
      tax: 30.40,
      total: 410.40
    }
  ]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    const selected = e.target.files?.[0];
    if (!selected) return;

    const validation = validateBusinessDocumentFile(selected, ['pdf', 'jpg', 'jpeg', 'png']);
    if (!validation.valid) {
      setFileError(validation.error || 'Please upload a valid PO document.');
      setFile(null);
      return;
    }

    setFile(selected);
  };

  const handleAddItem = () => {
    const defaultItem = poItems[0] || {
      poNumber: 'PO-2026-0001',
      supplier: 'Supplier Name',
      date: new Date().toISOString().split('T')[0],
      deliveryDate: new Date().toISOString().split('T')[0]
    };

    const newItem: PurchaseOrderItem = {
      id: Math.random().toString(36).substr(2, 9),
      poNumber: defaultItem.poNumber,
      supplier: defaultItem.supplier,
      date: defaultItem.date,
      deliveryDate: defaultItem.deliveryDate,
      sku: 'SKU-' + Math.floor(100 + Math.random() * 900),
      product: 'New Procurement Item',
      quantity: 1,
      unitPrice: 0,
      tax: 0,
      total: 0
    };
    setPoItems([...poItems, newItem]);
  };

  const handleDeleteItem = (id: string) => {
    setPoItems(poItems.filter(i => i.id !== id));
  };

  const handleUpdateItem = (id: string, field: keyof PurchaseOrderItem, value: any) => {
    setPoItems(poItems.map(item => {
      if (item.id === id) {
        const updated = { ...item, [field]: value };
        if (field === 'quantity' || field === 'unitPrice' || field === 'tax') {
          const qty = Number(updated.quantity) || 0;
          const price = Number(updated.unitPrice) || 0;
          const tax = Number(updated.tax) || 0;
          updated.total = qty * price + tax;
        }
        return updated;
      }
      return item;
    }));
  };

  const grandTotal = poItems.reduce((acc, i) => acc + (Number(i.total) || 0), 0);

  const handleExportXlsx = () => {
    const exportData = poItems.map(i => ({
      'PO Number': i.poNumber,
      'Supplier': i.supplier,
      'PO Date': i.date,
      'Expected Delivery': i.deliveryDate,
      'SKU': i.sku,
      'Product Description': i.product,
      'Quantity': i.quantity,
      'Unit Price': i.unitPrice,
      'Tax': i.tax,
      'Line Total': i.total
    }));

    exportToExcelFile(exportData, 'Purchase_Order_Report.xlsx', 'Purchase Orders');
  };

  return (
    <div className="space-y-8">
      {/* 1. Upload Area */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-2xs">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-lg font-black text-slate-900 tracking-tight">
              1. Upload Purchase Order Document
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Upload POs in PDF or image format (Max 25MB).
            </p>
          </div>
          <span className="hidden sm:inline-flex text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-50 text-[#0057F3] border border-blue-200">
            Client-Side Memory
          </span>
        </div>

        <div className="relative border-2 border-dashed border-slate-300 hover:border-[#0057F3] rounded-2xl p-6 sm:p-8 text-center transition-colors bg-slate-50/50">
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            aria-label="Upload purchase order file"
          />
          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0057F3] flex items-center justify-center">
              <Upload className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">
                {file ? file.name : 'Click to browse or drag & drop PO'}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                Staged locally in browser memory for procurement spreadsheet compilation
              </p>
            </div>
            {file && (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>PO loaded: {(file.size / 1024).toFixed(1)} KB</span>
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

        {/* OCR / Processing Notice */}
        <div className="mt-5 p-4 rounded-xl bg-blue-50/70 border border-blue-200/80 text-xs text-slate-700 space-y-2">
          <div className="flex items-center gap-2 font-bold text-[#0057F3]">
            <Info className="w-4 h-4 shrink-0" />
            <span>Procurement OCR Architecture Gateway</span>
          </div>
          <p className="leading-relaxed">
            Automatic extraction of line-item SKU matrices from supplier purchase orders requires connecting a backend OCR or Gemini Vision parsing API. You can review and edit line items, set fulfillment dates, and export directly to clean XLSX below.
          </p>
        </div>
      </div>

      {/* 2. Structured PO Editor */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-lg font-black text-slate-900 tracking-tight">
              2. Review & Edit Purchase Order Items
            </h3>
            <p className="text-xs text-slate-600">
              Verify SKU quantities, delivery dates, and pricing before spreadsheet export.
            </p>
          </div>

          <button
            onClick={handleExportXlsx}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>Export to Excel (XLSX)</span>
          </button>
        </div>

        {/* Summary Card */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
          <div className="flex items-center gap-4">
            <div>
              <span className="text-slate-500">PO Number:</span>
              <span className="ml-1.5 font-bold font-mono text-slate-900">{poItems[0]?.poNumber || 'N/A'}</span>
            </div>
            <div>
              <span className="text-slate-500">Supplier:</span>
              <span className="ml-1.5 font-bold text-slate-900">{poItems[0]?.supplier || 'N/A'}</span>
            </div>
            <div>
              <span className="text-slate-500">Items:</span>
              <span className="ml-1.5 font-bold font-mono text-slate-900">{poItems.length}</span>
            </div>
          </div>
          <div>
            <span className="text-slate-500">PO Grand Total:</span>
            <span className="ml-2 font-black font-mono text-emerald-700 text-sm">${grandTotal.toFixed(2)}</span>
          </div>
        </div>

        {/* Table */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Procurement Items
            </span>
            <button
              onClick={handleAddItem}
              className="inline-flex items-center gap-1 text-xs font-bold text-[#0057F3] hover:text-blue-700 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Line Item</span>
            </button>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left text-xs text-slate-700 min-w-[800px]">
              <thead className="bg-slate-100/80 text-slate-800 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-2.5 w-24">SKU</th>
                  <th className="p-2.5">Product Description</th>
                  <th className="p-2.5 w-28">Delivery Date</th>
                  <th className="p-2.5 w-20">Qty</th>
                  <th className="p-2.5 w-24">Unit Price</th>
                  <th className="p-2.5 w-20">Tax</th>
                  <th className="p-2.5 w-24">Total</th>
                  <th className="p-2.5 w-10 text-center">Del</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {poItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/60">
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
                        type="text"
                        value={item.product}
                        onChange={(e) => handleUpdateItem(item.id, 'product', e.target.value)}
                        className="w-full px-2 py-1 bg-transparent border border-transparent hover:border-slate-200 focus:border-[#0057F3] rounded"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="date"
                        value={item.deliveryDate}
                        onChange={(e) => handleUpdateItem(item.id, 'deliveryDate', e.target.value)}
                        className="w-full px-2 py-1 bg-transparent border border-transparent hover:border-slate-200 focus:border-[#0057F3] rounded text-[11px]"
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
                      ${item.total.toFixed(2)}
                    </td>
                    <td className="p-2 text-center">
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        disabled={poItems.length <= 1}
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
            <strong>Procurement Privacy:</strong> Vendor quotes, SKUs, and unit pricing remain strictly inside client memory. Confirm final order totals with your ERP system before issuing payment.
          </span>
        </div>
      </div>
    </div>
  );
};
