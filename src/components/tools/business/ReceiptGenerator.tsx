import React, { useState } from 'react';
import { 
  Receipt as ReceiptIcon, 
  Plus, 
  Trash2, 
  Printer, 
  FileSpreadsheet, 
  CheckCircle,
  CreditCard
} from 'lucide-react';
import { exportToExcelFile } from '../../../services/businessExtractionService';

interface ReceiptItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export const ReceiptGenerator: React.FC = () => {
  const [currency, setCurrency] = useState<string>('$');
  const [currencyCode, setCurrencyCode] = useState<string>('USD');

  // Merchant
  const [merchantName, setMerchantName] = useState<string>('The Vector Systems');
  const [merchantEmail, setMerchantEmail] = useState<string>('payments@thevector.systems');
  const [merchantAddress, setMerchantAddress] = useState<string>('Innovation Hub, Suite 400\nLondon, United Kingdom');

  // Customer
  const [customerName, setCustomerName] = useState<string>('Sarah Jenkins');
  const [customerEmail, setCustomerEmail] = useState<string>('sarah.jenkins@example.com');

  // Transaction Info
  const [receiptNumber, setReceiptNumber] = useState<string>('RCT-2026-9021');
  const [receiptDate, setReceiptDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [paymentMethod, setPaymentMethod] = useState<string>('Credit Card (ending 4092)');
  const [transactionRef, setTransactionRef] = useState<string>('AUTH-STRIPE-88219482');

  const [taxAmount, setTaxAmount] = useState<number>(15.00);

  // Items
  const [items, setItems] = useState<ReceiptItem[]>([
    {
      id: '1',
      description: 'Annual Cloud Architecture Subscription',
      quantity: 1,
      unitPrice: 240.00
    },
    {
      id: '2',
      description: 'Domain Security SSL Certificate & DNS Support',
      quantity: 1,
      unitPrice: 45.00
    }
  ]);

  const handleAddItem = () => {
    setItems([
      ...items,
      {
        id: Math.random().toString(36).substr(2, 9),
        description: 'New Product / Service item',
        quantity: 1,
        unitPrice: 20
      }
    ]);
  };

  const handleUpdateItem = (id: string, field: keyof ReceiptItem, val: any) => {
    setItems(items.map(it => it.id === id ? { ...it, [field]: val } : it));
  };

  const handleDeleteItem = (id: string) => {
    if (items.length <= 1) return;
    setItems(items.filter(it => it.id !== id));
  };

  const subtotal = items.reduce((acc, it) => acc + (it.quantity * it.unitPrice), 0);
  const grandTotal = subtotal + (Number(taxAmount) || 0);

  const handlePrint = () => {
    window.print();
  };

  const handleExportXlsx = () => {
    const data = items.map(it => ({
      'Receipt Number': receiptNumber,
      'Date': receiptDate,
      'Merchant': merchantName,
      'Customer': customerName,
      'Payment Method': paymentMethod,
      'Transaction Ref': transactionRef,
      'Item': it.description,
      'Quantity': it.quantity,
      'Unit Price': it.unitPrice,
      'Amount': (it.quantity * it.unitPrice).toFixed(2),
      'Tax': taxAmount,
      'Total Paid': grandTotal.toFixed(2),
      'Currency': currencyCode
    }));

    exportToExcelFile(data, `${receiptNumber || 'Receipt'}.xlsx`, 'Receipt');
  };

  return (
    <div className="space-y-8">
      {/* Action Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-black text-slate-900 tracking-tight">
            Official Receipt Generator
          </h3>
          <p className="text-xs sm:text-sm text-slate-600">
            Generate printable, stamped customer payment receipts with transaction IDs.
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
              Receipt Details
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
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Receipt Number</label>
                <input
                  type="text"
                  value={receiptNumber}
                  onChange={(e) => setReceiptNumber(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg font-mono text-slate-800"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Payment Date</label>
                <input
                  type="date"
                  value={receiptDate}
                  onChange={(e) => setReceiptDate(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Payment Method</label>
                <input
                  type="text"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
                />
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Transaction Ref / Auth Code</label>
              <input
                type="text"
                value={transactionRef}
                onChange={(e) => setTransactionRef(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg font-mono text-slate-800"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-2">
              Merchant & Customer
            </h4>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Merchant / Issuer</label>
              <input
                type="text"
                value={merchantName}
                onChange={(e) => setMerchantName(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Customer / Paid By</label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
              />
            </div>
          </div>

          {/* Items */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-800">
                Purchased Items
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
              {items.map((it) => (
                <div key={it.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      value={it.description}
                      onChange={(e) => handleUpdateItem(it.id, 'description', e.target.value)}
                      className="w-full px-2 py-1 text-xs bg-white border border-slate-300 rounded text-slate-800 mr-2"
                    />
                    <button
                      onClick={() => handleDeleteItem(it.id)}
                      disabled={items.length <= 1}
                      className="text-slate-400 hover:text-red-500 disabled:opacity-30 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
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
                      <label className="block text-[10px] text-slate-500">Price</label>
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

            <div className="pt-2">
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Sales Tax ({currency})</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={taxAmount}
                onChange={(e) => setTaxAmount(Number(e.target.value))}
                className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg font-mono text-slate-800"
              />
            </div>
          </div>
        </div>

        {/* Right Preview: 7 Cols */}
        <div className="lg:col-span-7">
          <div className="sticky top-6">
            <div 
              id="printable-receipt" 
              className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-lg text-slate-900 font-sans relative overflow-hidden print:border-none print:shadow-none print:p-0 print:m-0"
            >
              {/* PAID Badge Watermark */}
              <div className="absolute top-6 right-6 select-none pointer-events-none">
                <div className="border-2 border-emerald-600 text-emerald-700 px-3 py-1 rounded-lg font-black text-sm uppercase tracking-widest rotate-6 bg-emerald-50/80">
                  PAID IN FULL
                </div>
              </div>

              {/* Header */}
              <div className="border-b border-slate-200 pb-6 pr-24">
                <div className="text-xl font-black text-slate-900 tracking-tight">
                  {merchantName || 'Your Business'}
                </div>
                <div className="text-xs text-slate-500 mt-1 whitespace-pre-line leading-relaxed">
                  {merchantAddress}
                </div>
                {merchantEmail && (
                  <div className="text-[11px] text-slate-500">{merchantEmail}</div>
                )}
              </div>

              {/* Receipt Info Strip */}
              <div className="py-5 border-b border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div>
                  <div className="text-slate-400 text-[10px] uppercase font-bold">Receipt No</div>
                  <div className="font-mono font-bold text-slate-800 mt-0.5">{receiptNumber}</div>
                </div>
                <div>
                  <div className="text-slate-400 text-[10px] uppercase font-bold">Payment Date</div>
                  <div className="font-semibold text-slate-800 mt-0.5">{receiptDate}</div>
                </div>
                <div>
                  <div className="text-slate-400 text-[10px] uppercase font-bold">Payment Method</div>
                  <div className="font-semibold text-slate-800 mt-0.5">{paymentMethod}</div>
                </div>
                <div>
                  <div className="text-slate-400 text-[10px] uppercase font-bold">Paid By</div>
                  <div className="font-semibold text-slate-800 mt-0.5">{customerName}</div>
                </div>
              </div>

              {/* Transaction Ref */}
              <div className="py-2.5 px-3 bg-slate-50 rounded-lg text-[11px] font-mono text-slate-600 my-4 flex items-center justify-between">
                <span>Transaction Ref:</span>
                <span className="font-bold">{transactionRef}</span>
              </div>

              {/* Items Table */}
              <div className="py-4">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px]">
                      <th className="pb-2">Description</th>
                      <th className="pb-2 text-center w-12">Qty</th>
                      <th className="pb-2 text-right w-24">Price</th>
                      <th className="pb-2 text-right w-24">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {items.map((it) => (
                      <tr key={it.id}>
                        <td className="py-2.5 pr-2 text-slate-800 font-medium">{it.description}</td>
                        <td className="py-2.5 text-center text-slate-600 font-mono">{it.quantity}</td>
                        <td className="py-2.5 text-right text-slate-600 font-mono">
                          {currency}{it.unitPrice.toFixed(2)}
                        </td>
                        <td className="py-2.5 text-right text-slate-900 font-mono font-bold">
                          {currency}{(it.quantity * it.unitPrice).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Totals */}
              <div className="border-t border-slate-200 pt-4 flex justify-end">
                <div className="w-64 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal:</span>
                    <span className="font-mono font-semibold">{currency}{subtotal.toFixed(2)}</span>
                  </div>
                  {taxAmount > 0 && (
                    <div className="flex justify-between text-slate-600">
                      <span>Sales Tax:</span>
                      <span className="font-mono font-semibold">{currency}{taxAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-2 border-t border-slate-200 text-base font-black text-slate-900">
                    <span>Total Paid:</span>
                    <span className="font-mono text-emerald-700">{currency}{grandTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>Balance Remaining:</span>
                    <span className="font-mono">{currency}0.00</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-200 text-center text-xs text-slate-500">
                Thank you for your payment! Please retain this receipt for your accounting and tax records.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
