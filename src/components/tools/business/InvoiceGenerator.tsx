import React, { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Trash2, 
  Printer, 
  Download, 
  FileSpreadsheet, 
  Building2, 
  Sparkles,
  RotateCcw
} from 'lucide-react';
import { exportToExcelFile } from '../../../services/businessExtractionService';

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  taxPercent: number;
}

export const InvoiceGenerator: React.FC = () => {
  const [currency, setCurrency] = useState<string>('$');
  const [currencyCode, setCurrencyCode] = useState<string>('USD');

  // Business / Sender
  const [senderName, setSenderName] = useState<string>('The Vector Systems');
  const [senderEmail, setSenderEmail] = useState<string>('billing@thevector.systems');
  const [senderAddress, setSenderAddress] = useState<string>('Innovation Hub, Suite 400\nLondon, United Kingdom');
  const [senderTaxId, setSenderTaxId] = useState<string>('GB 992 1082 44');

  // Client / Recipient
  const [clientName, setClientName] = useState<string>('Nexus Enterprises');
  const [clientEmail, setClientEmail] = useState<string>('accounts@nexus-corp.com');
  const [clientAddress, setClientAddress] = useState<string>('742 Evergreen Terrace\nSuite 100, New York, NY 10001');

  // Metadata
  const [invoiceNumber, setInvoiceNumber] = useState<string>('INV-2026-1049');
  const [invoiceDate, setInvoiceDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [dueDate, setDueDate] = useState<string>(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
  const [paymentTerms, setPaymentTerms] = useState<string>('Net 30 Days');
  const [notes, setNotes] = useState<string>('Thank you for your business. Payment via direct bank transfer or corporate card within 30 days.');
  const [bankDetails, setBankDetails] = useState<string>('Bank: Barclays Corporate\nIBAN: GB29BARC20000012345678\nBIC/SWIFT: BARCGB22');

  const [discountAmount, setDiscountAmount] = useState<number>(0);

  // Line items
  const [items, setItems] = useState<InvoiceItem[]>([
    {
      id: '1',
      description: 'Cloud Infrastructure & Microservices Architecture',
      quantity: 1,
      unitPrice: 3200,
      taxPercent: 10
    },
    {
      id: '2',
      description: 'Senior UI/UX Technical Consulting (40 hrs)',
      quantity: 40,
      unitPrice: 85,
      taxPercent: 10
    }
  ]);

  const handleAddItem = () => {
    setItems([
      ...items,
      {
        id: Math.random().toString(36).substr(2, 9),
        description: 'New Deliverable or Service',
        quantity: 1,
        unitPrice: 100,
        taxPercent: 0
      }
    ]);
  };

  const handleUpdateItem = (id: string, field: keyof InvoiceItem, val: any) => {
    setItems(items.map(it => it.id === id ? { ...it, [field]: val } : it));
  };

  const handleDeleteItem = (id: string) => {
    if (items.length <= 1) return;
    setItems(items.filter(it => it.id !== id));
  };

  // Calculations
  const subtotal = items.reduce((acc, it) => acc + (it.quantity * it.unitPrice), 0);
  const taxTotal = items.reduce((acc, it) => acc + ((it.quantity * it.unitPrice) * (it.taxPercent / 100)), 0);
  const grandTotal = Math.max(0, subtotal + taxTotal - (Number(discountAmount) || 0));

  const handlePrint = () => {
    window.print();
  };

  const handleExportXlsx = () => {
    const data = items.map(it => ({
      'Invoice Number': invoiceNumber,
      'Date': invoiceDate,
      'Due Date': dueDate,
      'Sender': senderName,
      'Client': clientName,
      'Item Description': it.description,
      'Quantity': it.quantity,
      'Unit Price': it.unitPrice,
      'Tax (%)': it.taxPercent,
      'Line Total': (it.quantity * it.unitPrice).toFixed(2),
      'Currency': currencyCode,
      'Invoice Subtotal': subtotal.toFixed(2),
      'Invoice Tax': taxTotal.toFixed(2),
      'Invoice Discount': discountAmount,
      'Invoice Total': grandTotal.toFixed(2)
    }));

    exportToExcelFile(data, `${invoiceNumber || 'Invoice'}.xlsx`, 'Invoice');
  };

  return (
    <div className="space-y-8">
      {/* Action Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-black text-slate-900 tracking-tight">
            Professional Invoice Generator
          </h3>
          <p className="text-xs sm:text-sm text-slate-600">
            Create, customize, print, or download clean business invoices.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleExportXlsx}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
            <span>Export XLSX</span>
          </button>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>

      {/* Editor & Preview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form: 5 Cols */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-2">
              Currency & Terms
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Currency Symbol</label>
                <select
                  value={currency}
                  onChange={(e) => {
                    setCurrency(e.target.value);
                    const map: Record<string, string> = { '$': 'USD', '€': 'EUR', '£': 'GBP', '₨': 'PKR', '₹': 'INR', '¥': 'JPY', 'AED': 'AED', 'SAR': 'SAR' };
                    setCurrencyCode(map[e.target.value] || 'USD');
                  }}
                  className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
                >
                  <option value="$">$ (USD / CAD / AUD)</option>
                  <option value="€">€ (EUR)</option>
                  <option value="£">£ (GBP)</option>
                  <option value="₨">₨ (PKR)</option>
                  <option value="₹">₹ (INR)</option>
                  <option value="¥">¥ (JPY)</option>
                  <option value="AED">AED (Dirham)</option>
                  <option value="SAR">SAR (Riyal)</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Invoice Number</label>
                <input
                  type="text"
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-mono"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Issue Date</label>
                <input
                  type="date"
                  value={invoiceDate}
                  onChange={(e) => setInvoiceDate(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Due Date</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
                />
              </div>
            </div>
          </div>

          {/* Your Business (Sender) */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-2">
              Your Business (Sender)
            </h4>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Company / Your Name</label>
              <input
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Billing Email</label>
                <input
                  type="email"
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Tax ID / VAT Reg</label>
                <input
                  type="text"
                  value={senderTaxId}
                  onChange={(e) => setSenderTaxId(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-mono"
                />
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Address & Phone</label>
              <textarea
                rows={2}
                value={senderAddress}
                onChange={(e) => setSenderAddress(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
              />
            </div>
          </div>

          {/* Client Details */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-2">
              Billed To (Client)
            </h4>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Client Name / Company</label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Client Email</label>
              <input
                type="email"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Client Address</label>
              <textarea
                rows={2}
                value={clientAddress}
                onChange={(e) => setClientAddress(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
              />
            </div>
          </div>

          {/* Line Items Editor */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-800">
                Items & Services
              </h4>
              <button
                onClick={handleAddItem}
                className="text-xs font-bold text-[#0057F3] hover:text-blue-700 inline-flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Item</span>
              </button>
            </div>

            <div className="space-y-3">
              {items.map((it, idx) => (
                <div key={it.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-500">Item #{idx + 1}</span>
                    <button
                      onClick={() => handleDeleteItem(it.id)}
                      disabled={items.length <= 1}
                      className="text-slate-400 hover:text-red-500 disabled:opacity-30 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <input
                    type="text"
                    value={it.description}
                    placeholder="Description"
                    onChange={(e) => handleUpdateItem(it.id, 'description', e.target.value)}
                    className="w-full px-2 py-1 text-xs bg-white border border-slate-300 rounded text-slate-800"
                  />
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-[10px] text-slate-500">Qty</label>
                      <input
                        type="number"
                        min="1"
                        value={it.quantity}
                        onChange={(e) => handleUpdateItem(it.id, 'quantity', Number(e.target.value))}
                        className="w-full px-2 py-1 text-xs bg-white border border-slate-300 rounded font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-500">Unit Price</label>
                      <input
                        type="number"
                        step="0.01"
                        value={it.unitPrice}
                        onChange={(e) => handleUpdateItem(it.id, 'unitPrice', Number(e.target.value))}
                        className="w-full px-2 py-1 text-xs bg-white border border-slate-300 rounded font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-500">Tax %</label>
                      <input
                        type="number"
                        value={it.taxPercent}
                        onChange={(e) => handleUpdateItem(it.id, 'taxPercent', Number(e.target.value))}
                        className="w-full px-2 py-1 text-xs bg-white border border-slate-300 rounded font-mono"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Discount Amount ({currency})</label>
              <input
                type="number"
                min="0"
                value={discountAmount}
                onChange={(e) => setDiscountAmount(Number(e.target.value))}
                className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg font-mono text-slate-800"
              />
            </div>
          </div>
        </div>

        {/* Right: Live Printable Invoice Document Preview (7 Cols) */}
        <div className="lg:col-span-7">
          <div className="sticky top-6">
            <div 
              id="printable-invoice" 
              className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-lg text-slate-900 font-sans print:border-none print:shadow-none print:p-0 print:m-0"
            >
              {/* Document Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b border-slate-200 pb-6">
                <div>
                  <div className="text-xl font-black text-slate-900 tracking-tight">
                    {senderName || 'Your Business Name'}
                  </div>
                  <div className="text-xs text-slate-500 mt-1 whitespace-pre-line leading-relaxed">
                    {senderAddress}
                  </div>
                  {senderTaxId && (
                    <div className="text-[11px] text-slate-500 mt-1">
                      Tax Reg / VAT: <span className="font-mono">{senderTaxId}</span>
                    </div>
                  )}
                  {senderEmail && (
                    <div className="text-[11px] text-slate-500">
                      {senderEmail}
                    </div>
                  )}
                </div>

                <div className="sm:text-right">
                  <span className="text-2xl font-black text-[#0057F3] uppercase tracking-wider block">
                    INVOICE
                  </span>
                  <div className="text-xs font-mono font-bold text-slate-800 mt-1">
                    #{invoiceNumber}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-2">
                    Date: <span className="font-semibold text-slate-700">{invoiceDate}</span>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Due Date: <span className="font-semibold text-slate-700">{dueDate}</span>
                  </div>
                </div>
              </div>

              {/* Billed To Strip */}
              <div className="py-6 border-b border-slate-200">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Billed To:
                </div>
                <div className="text-sm font-bold text-slate-900 mt-1">
                  {clientName || 'Client Name'}
                </div>
                {clientEmail && (
                  <div className="text-xs text-slate-600 mt-0.5">{clientEmail}</div>
                )}
                <div className="text-xs text-slate-500 mt-1 whitespace-pre-line leading-relaxed">
                  {clientAddress}
                </div>
              </div>

              {/* Items Table */}
              <div className="py-6">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px]">
                      <th className="pb-2">Description</th>
                      <th className="pb-2 text-center w-12">Qty</th>
                      <th className="pb-2 text-right w-24">Price</th>
                      <th className="pb-2 text-right w-24">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {items.map((it) => (
                      <tr key={it.id}>
                        <td className="py-3 pr-2 text-slate-800 font-medium">
                          {it.description}
                          {it.taxPercent > 0 && (
                            <span className="text-[10px] text-slate-400 block font-normal">
                              Tax: {it.taxPercent}%
                            </span>
                          )}
                        </td>
                        <td className="py-3 text-center text-slate-600 font-mono">{it.quantity}</td>
                        <td className="py-3 text-right text-slate-600 font-mono">
                          {currency}{it.unitPrice.toFixed(2)}
                        </td>
                        <td className="py-3 text-right text-slate-900 font-mono font-bold">
                          {currency}{(it.quantity * it.unitPrice).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Totals Summary */}
              <div className="border-t border-slate-200 pt-4 flex justify-end">
                <div className="w-64 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal:</span>
                    <span className="font-mono font-semibold">{currency}{subtotal.toFixed(2)}</span>
                  </div>
                  {taxTotal > 0 && (
                    <div className="flex justify-between text-slate-600">
                      <span>Tax / VAT:</span>
                      <span className="font-mono font-semibold">{currency}{taxTotal.toFixed(2)}</span>
                    </div>
                  )}
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-600">
                      <span>Discount:</span>
                      <span className="font-mono font-semibold">-{currency}{discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-2 border-t border-slate-200 text-base font-black text-slate-900">
                    <span>Total Due:</span>
                    <span className="font-mono text-[#0057F3]">{currency}{grandTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Payment Info & Notes */}
              <div className="mt-8 pt-6 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-500">
                <div>
                  <div className="font-bold text-slate-700 uppercase text-[10px]">Payment Instructions</div>
                  <div className="mt-1 whitespace-pre-line leading-relaxed font-mono text-[11px]">
                    {bankDetails}
                  </div>
                </div>
                <div>
                  <div className="font-bold text-slate-700 uppercase text-[10px]">Notes & Terms</div>
                  <div className="mt-1 leading-relaxed">
                    {notes}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
