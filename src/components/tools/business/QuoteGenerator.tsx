import React, { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Trash2, 
  Printer, 
  FileSpreadsheet, 
  FileSignature
} from 'lucide-react';
import { exportToExcelFile } from '../../../services/businessExtractionService';

interface QuoteItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export const QuoteGenerator: React.FC = () => {
  const [currency, setCurrency] = useState<string>('$');
  const [currencyCode, setCurrencyCode] = useState<string>('USD');

  // Business
  const [senderName, setSenderName] = useState<string>('The Vector Systems');
  const [senderEmail, setSenderEmail] = useState<string>('proposals@thevector.systems');
  const [senderAddress, setSenderAddress] = useState<string>('The Vector Systems Ltd\nLondon, United Kingdom');

  // Client
  const [clientName, setClientName] = useState<string>('Summit Retail Group');
  const [clientEmail, setClientEmail] = useState<string>('procurement@summitretail.com');
  const [clientAddress, setClientAddress] = useState<string>('500 Commercial Blvd, Chicago, IL');

  // Metadata
  const [quoteNumber, setQuoteNumber] = useState<string>('EST-2026-0412');
  const [quoteDate, setQuoteDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [validUntil, setValidUntil] = useState<string>(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
  const [scopeNotes, setScopeNotes] = useState<string>('This estimate covers architecture, backend development, and system rollout. Milestone deliverables will be provided bi-weekly.');

  // Items
  const [items, setItems] = useState<QuoteItem[]>([
    {
      id: '1',
      description: 'System Architecture Specification & Discovery Phase',
      quantity: 1,
      unitPrice: 2400
    },
    {
      id: '2',
      description: 'Enterprise API Development & Data Ingestion Pipeline',
      quantity: 1,
      unitPrice: 5600
    },
    {
      id: '3',
      description: 'QA Testing, Security Review & Staging Deployment',
      quantity: 1,
      unitPrice: 1800
    }
  ]);

  const handleAddItem = () => {
    setItems([
      ...items,
      {
        id: Math.random().toString(36).substr(2, 9),
        description: 'Additional Workstream Deliverable',
        quantity: 1,
        unitPrice: 500
      }
    ]);
  };

  const handleUpdateItem = (id: string, field: keyof QuoteItem, val: any) => {
    setItems(items.map(it => it.id === id ? { ...it, [field]: val } : it));
  };

  const handleDeleteItem = (id: string) => {
    if (items.length <= 1) return;
    setItems(items.filter(it => it.id !== id));
  };

  const subtotal = items.reduce((acc, it) => acc + (it.quantity * it.unitPrice), 0);

  const handlePrint = () => {
    window.print();
  };

  const handleExportXlsx = () => {
    const data = items.map(it => ({
      'Estimate Number': quoteNumber,
      'Date': quoteDate,
      'Valid Until': validUntil,
      'Sender': senderName,
      'Client': clientName,
      'Item Description': it.description,
      'Quantity': it.quantity,
      'Unit Rate': it.unitPrice,
      'Amount': (it.quantity * it.unitPrice).toFixed(2),
      'Currency': currencyCode,
      'Total Estimated': subtotal.toFixed(2)
    }));

    exportToExcelFile(data, `${quoteNumber || 'Estimate'}.xlsx`, 'Estimate');
  };

  return (
    <div className="space-y-8">
      {/* Action Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-black text-slate-900 tracking-tight">
            Quote / Estimate Generator
          </h3>
          <p className="text-xs sm:text-sm text-slate-600">
            Generate formal project estimates, pricing proposals, and client contracts.
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form: 5 Cols */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-2">
              Proposal Metadata
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Currency</label>
                <select
                  value={currency}
                  onChange={(e) => {
                    setCurrency(e.target.value);
                    const map: Record<string, string> = { '$': 'USD', '€': 'EUR', '£': 'GBP', '₨': 'PKR', '₹': 'INR' };
                    setCurrencyCode(map[e.target.value] || 'USD');
                  }}
                  className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
                >
                  <option value="$">$ (USD)</option>
                  <option value="€">€ (EUR)</option>
                  <option value="£">£ (GBP)</option>
                  <option value="₨">₨ (PKR)</option>
                  <option value="₹">₹ (INR)</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Estimate Number</label>
                <input
                  type="text"
                  value={quoteNumber}
                  onChange={(e) => setQuoteNumber(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg font-mono text-slate-800"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Proposal Date</label>
                <input
                  type="date"
                  value={quoteDate}
                  onChange={(e) => setQuoteDate(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Valid Until</label>
                <input
                  type="date"
                  value={validUntil}
                  onChange={(e) => setValidUntil(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-2">
              Parties
            </h4>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Prepared By</label>
              <input
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Client Name</label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-800">
                Scope & Deliverables
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
                    <span className="text-[11px] font-bold text-slate-500">Deliverable #{idx + 1}</span>
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
                    onChange={(e) => handleUpdateItem(it.id, 'description', e.target.value)}
                    className="w-full px-2 py-1 text-xs bg-white border border-slate-300 rounded text-slate-800"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] text-slate-500">Quantity / Units</label>
                      <input
                        type="number"
                        min="1"
                        value={it.quantity}
                        onChange={(e) => handleUpdateItem(it.id, 'quantity', Number(e.target.value))}
                        className="w-full px-2 py-1 text-xs bg-white border border-slate-300 rounded font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-500">Estimated Rate</label>
                      <input
                        type="number"
                        step="0.01"
                        value={it.unitPrice}
                        onChange={(e) => handleUpdateItem(it.id, 'unitPrice', Number(e.target.value))}
                        className="w-full px-2 py-1 text-xs bg-white border border-slate-300 rounded font-mono"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Preview: 7 Cols */}
        <div className="lg:col-span-7">
          <div className="sticky top-6">
            <div 
              id="printable-quote" 
              className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-lg text-slate-900 font-sans print:border-none print:shadow-none print:p-0 print:m-0"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b border-slate-200 pb-6">
                <div>
                  <div className="text-xl font-black text-slate-900 tracking-tight">
                    {senderName || 'Your Business'}
                  </div>
                  <div className="text-xs text-slate-500 mt-1 whitespace-pre-line leading-relaxed">
                    {senderAddress}
                  </div>
                  {senderEmail && (
                    <div className="text-[11px] text-slate-500">{senderEmail}</div>
                  )}
                </div>

                <div className="sm:text-right">
                  <span className="text-2xl font-black text-[#0057F3] uppercase tracking-wider block">
                    PRICE ESTIMATE
                  </span>
                  <div className="text-xs font-mono font-bold text-slate-800 mt-1">
                    #{quoteNumber}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-2">
                    Date: <span className="font-semibold text-slate-700">{quoteDate}</span>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Valid Until: <span className="font-semibold text-slate-700">{validUntil}</span>
                  </div>
                </div>
              </div>

              {/* Estimate For */}
              <div className="py-6 border-b border-slate-200">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Prepared For:
                </div>
                <div className="text-sm font-bold text-slate-900 mt-1">
                  {clientName || 'Client / Entity'}
                </div>
                {clientEmail && (
                  <div className="text-xs text-slate-600 mt-0.5">{clientEmail}</div>
                )}
                <div className="text-xs text-slate-500 mt-1 whitespace-pre-line leading-relaxed">
                  {clientAddress}
                </div>
              </div>

              {/* Table */}
              <div className="py-6">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px]">
                      <th className="pb-2">Deliverable Specification</th>
                      <th className="pb-2 text-center w-12">Qty</th>
                      <th className="pb-2 text-right w-24">Unit Rate</th>
                      <th className="pb-2 text-right w-24">Estimated Cost</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {items.map((it) => (
                      <tr key={it.id}>
                        <td className="py-3 pr-2 text-slate-800 font-medium">{it.description}</td>
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

              {/* Total Estimate */}
              <div className="border-t border-slate-200 pt-4 flex justify-end">
                <div className="w-64 space-y-2 text-xs">
                  <div className="flex justify-between text-base font-black text-slate-900 pt-2">
                    <span>Total Estimated:</span>
                    <span className="font-mono text-[#0057F3]">{currency}{subtotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Client Acceptance Signature Section */}
              <div className="mt-8 pt-6 border-t border-slate-200">
                <div className="text-xs text-slate-600 leading-relaxed">
                  {scopeNotes}
                </div>
                <div className="mt-6 pt-6 border-t border-dashed border-slate-300 grid grid-cols-2 gap-6 text-xs">
                  <div>
                    <div className="text-slate-400 uppercase text-[10px] font-bold">Authorized Acceptance</div>
                    <div className="mt-8 border-b border-slate-400"></div>
                    <div className="mt-1 text-slate-500 text-[11px]">Authorized Signatory & Date</div>
                  </div>
                  <div>
                    <div className="text-slate-400 uppercase text-[10px] font-bold">Client Entity Stamp</div>
                    <div className="mt-8 border-b border-slate-400"></div>
                    <div className="mt-1 text-slate-500 text-[11px]">Printed Name & Title</div>
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
