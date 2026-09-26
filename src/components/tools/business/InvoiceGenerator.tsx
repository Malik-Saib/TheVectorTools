import React, { useState, useRef } from 'react';
import { jsPDF } from 'jspdf';
import { 
  FileText, 
  Plus, 
  Trash2, 
  Printer, 
  Download, 
  FileSpreadsheet, 
  Building2, 
  Sparkles,
  RotateCcw,
  Image as ImageIcon,
  X,
  CheckCircle2,
  FileCheck
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
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [senderName, setSenderName] = useState<string>('The Vector Systems');
  const [senderEmail, setSenderEmail] = useState<string>('billing@thevector.systems');
  const [senderPhone, setSenderPhone] = useState<string>('+44 20 7946 0912');
  const [senderWebsite, setSenderWebsite] = useState<string>('https://thevector.systems');
  const [senderAddress, setSenderAddress] = useState<string>('Innovation Hub, Suite 400\nLondon, United Kingdom');
  const [senderTaxId, setSenderTaxId] = useState<string>('GB 992 1082 44');

  // Client / Recipient
  const [clientName, setClientName] = useState<string>('Nexus Enterprises');
  const [clientEmail, setClientEmail] = useState<string>('accounts@nexus-corp.com');
  const [clientPhone, setClientPhone] = useState<string>('+1 (555) 234-5678');
  const [clientAddress, setClientAddress] = useState<string>('742 Evergreen Terrace\nSuite 100, New York, NY 10001');

  // Metadata
  const [invoiceNumber, setInvoiceNumber] = useState<string>('INV-2026-1049');
  const [invoiceDate, setInvoiceDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [dueDate, setDueDate] = useState<string>(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
  const [paymentTerms, setPaymentTerms] = useState<string>('Net 30 Days');
  const [notes, setNotes] = useState<string>('Thank you for your business. Payment via direct bank transfer or corporate card within 30 days.');
  const [bankDetails, setBankDetails] = useState<string>('Bank: Barclays Corporate\nIBAN: GB29BARC20000012345678\nBIC/SWIFT: BARCGB22');

  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);
  const logoInputRef = useRef<HTMLInputElement>(null);

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

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setLogoUrl(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveLogo = () => {
    setLogoUrl(null);
    if (logoInputRef.current) logoInputRef.current.value = '';
  };

  // Safe Calculations
  const subtotal = items.reduce((acc, it) => acc + ((Number(it.quantity) || 0) * (Number(it.unitPrice) || 0)), 0);
  const taxTotal = items.reduce((acc, it) => {
    const itemTotal = (Number(it.quantity) || 0) * (Number(it.unitPrice) || 0);
    return acc + (itemTotal * ((Number(it.taxPercent) || 0) / 100));
  }, 0);
  const discount = Math.max(0, Number(discountAmount) || 0);
  const grandTotal = Math.max(0, subtotal + taxTotal - discount);

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
      'Line Total': ((Number(it.quantity) || 0) * (Number(it.unitPrice) || 0)).toFixed(2),
      'Currency': currencyCode,
      'Invoice Subtotal': subtotal.toFixed(2),
      'Invoice Tax': taxTotal.toFixed(2),
      'Invoice Discount': discount.toFixed(2),
      'Invoice Total': grandTotal.toFixed(2)
    }));

    exportToExcelFile(data, `${invoiceNumber || 'Invoice'}.xlsx`, 'Invoice');
  };

  /**
   * Generates a pristine, vector-sharp ONE-PAGE Invoice PDF using jsPDF.
   * Auto-compacts spacing so normal invoices (1-10+ items) strictly fit on 1 page.
   * Only overflows to page 2 if items genuinely exceed printable A4 area.
   */
  const handleDownloadPdf = async () => {
    setIsGeneratingPdf(true);
    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pageWidth = 210;
      const pageHeight = 297;
      const margin = 14;
      const contentWidth = pageWidth - (margin * 2); // 182mm
      const maxY = pageHeight - margin - 10; // 273mm

      let y = margin;

      // Determine compactness based on item count
      const isCompact = items.length > 6;
      const rowPadding = items.length > 8 ? 5.5 : (items.length > 5 ? 6.5 : 7.5);
      const fontSizeNormal = items.length > 8 ? 8 : 8.5;

      // 1. Header: Logo & Company Name (Left) + INVOICE & Meta (Right)
      const headerTopY = y;
      let leftEndY = y;

      if (logoUrl) {
        try {
          doc.addImage(logoUrl, 'JPEG', margin, y, 24, 18, undefined, 'FAST');
          y += 20;
        } catch {
          // If image fails, fallback gracefully
        }
      }

      // Company info
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.setTextColor(15, 23, 42); // slate-900
      doc.text(senderName || 'Your Business Name', margin, y + 4);
      y += 8;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(100, 116, 139); // slate-500

      const senderLines = (senderAddress || '').split('\n').filter(Boolean);
      senderLines.forEach((line) => {
        doc.text(line, margin, y);
        y += 3.5;
      });

      if (senderPhone) {
        doc.text(`Phone: ${senderPhone}`, margin, y);
        y += 3.5;
      }
      if (senderEmail) {
        doc.text(senderEmail, margin, y);
        y += 3.5;
      }
      if (senderTaxId) {
        doc.text(`Tax / VAT ID: ${senderTaxId}`, margin, y);
        y += 3.5;
      }
      leftEndY = y;

      // Right side: INVOICE title & Meta
      let rightY = headerTopY;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(22);
      doc.setTextColor(0, 87, 243); // brand blue #0057F3
      doc.text('INVOICE', pageWidth - margin, rightY + 6, { align: 'right' });
      rightY += 11;

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(30, 41, 59);
      doc.text(`#${invoiceNumber || 'INV-001'}`, pageWidth - margin, rightY, { align: 'right' });
      rightY += 5;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(100, 116, 139);
      doc.text(`Invoice Date: ${invoiceDate || ''}`, pageWidth - margin, rightY, { align: 'right' });
      rightY += 4;
      doc.text(`Due Date: ${dueDate || ''}`, pageWidth - margin, rightY, { align: 'right' });
      rightY += 4;
      if (paymentTerms) {
        doc.text(`Terms: ${paymentTerms}`, pageWidth - margin, rightY, { align: 'right' });
        rightY += 4;
      }

      // Sync y below the taller column
      y = Math.max(leftEndY, rightY) + (isCompact ? 4 : 6);

      // Horizontal separator line
      doc.setDrawColor(226, 232, 240); // slate-200
      doc.setLineWidth(0.4);
      doc.line(margin, y, pageWidth - margin, y);
      y += (isCompact ? 4 : 5);

      // 2. Client Section: Billed To
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(148, 163, 184); // slate-400
      doc.text('BILLED TO:', margin, y);
      y += 4;

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10.5);
      doc.setTextColor(15, 23, 42);
      doc.text(clientName || 'Valued Customer', margin, y);
      y += 4.5;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(100, 116, 139);

      if (clientEmail) {
        doc.text(clientEmail, margin, y);
        y += 3.5;
      }
      if (clientPhone) {
        doc.text(clientPhone, margin, y);
        y += 3.5;
      }

      const clientLines = (clientAddress || '').split('\n').filter(Boolean);
      clientLines.forEach(line => {
        doc.text(line, margin, y);
        y += 3.5;
      });

      y += (isCompact ? 3 : 5);

      // 3. Invoice Items Table Header
      const colDescX = margin;
      const colDescW = 95;
      const colQtyX = margin + colDescW;
      const colQtyW = 20;
      const colPriceX = colQtyX + colQtyW;
      const colPriceW = 32;
      const colAmountX = colPriceX + colPriceW;
      const colAmountW = 35;

      // Table Header Background
      doc.setFillColor(248, 250, 252); // slate-50
      doc.rect(margin, y, contentWidth, 7, 'F');
      doc.setDrawColor(226, 232, 240);
      doc.line(margin, y + 7, pageWidth - margin, y + 7);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(100, 116, 139);
      doc.text('DESCRIPTION / SERVICE', colDescX + 2, y + 4.8);
      doc.text('QTY', colQtyX + colQtyW / 2, y + 4.8, { align: 'center' });
      doc.text(`PRICE (${currencyCode})`, colPriceX + colPriceW - 2, y + 4.8, { align: 'right' });
      doc.text(`AMOUNT (${currencyCode})`, colAmountX + colAmountW - 2, y + 4.8, { align: 'right' });
      y += 7;

      // 4. Items Table Rows
      items.forEach((item, idx) => {
        const itemQty = Number(item.quantity) || 0;
        const itemPrice = Number(item.unitPrice) || 0;
        const lineTotal = itemQty * itemPrice;

        // Wrap long descriptions
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(fontSizeNormal);
        const descLines = doc.splitTextToSize(item.description || 'Deliverable', colDescW - 4);
        const rowH = Math.max(rowPadding, descLines.length * 3.8 + 2.5);

        // Check overflow: only if row really exceeds page
        if (y + rowH > maxY - 40) {
          doc.addPage();
          y = margin;
        }

        // Zebra striping subtle
        if (idx % 2 === 1) {
          doc.setFillColor(253, 254, 255);
          doc.rect(margin, y, contentWidth, rowH, 'F');
        }

        // Draw description
        doc.setTextColor(30, 41, 59);
        doc.text(descLines, colDescX + 2, y + 4);

        // Qty
        doc.setTextColor(71, 85, 105);
        doc.text(String(itemQty), colQtyX + colQtyW / 2, y + 4, { align: 'center' });

        // Price
        doc.text(itemPrice.toFixed(2), colPriceX + colPriceW - 2, y + 4, { align: 'right' });

        // Line total
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(15, 23, 42);
        doc.text(lineTotal.toFixed(2), colAmountX + colAmountW - 2, y + 4, { align: 'right' });

        y += rowH;

        // Bottom border per row
        doc.setDrawColor(241, 245, 249);
        doc.setLineWidth(0.2);
        doc.line(margin, y, pageWidth - margin, y);
      });

      y += (isCompact ? 3 : 5);

      // 5. Totals Section (Right-aligned)
      const totalsWidth = 72;
      const totalsX = pageWidth - margin - totalsWidth;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(100, 116, 139);
      doc.text('Subtotal:', totalsX, y + 4);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(30, 41, 59);
      doc.text(`${currency}${subtotal.toFixed(2)}`, pageWidth - margin - 2, y + 4, { align: 'right' });
      y += 5.5;

      if (taxTotal > 0) {
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(100, 116, 139);
        doc.text('Tax / VAT:', totalsX, y + 4);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(30, 41, 59);
        doc.text(`${currency}${taxTotal.toFixed(2)}`, pageWidth - margin - 2, y + 4, { align: 'right' });
        y += 5.5;
      }

      if (discount > 0) {
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(5, 150, 105); // emerald-600
        doc.text('Discount:', totalsX, y + 4);
        doc.setFont('helvetica', 'bold');
        doc.text(`-${currency}${discount.toFixed(2)}`, pageWidth - margin - 2, y + 4, { align: 'right' });
        y += 5.5;
      }

      // Grand Total Box
      doc.setFillColor(239, 246, 255); // blue-50
      doc.rect(totalsX - 3, y + 1, totalsWidth + 3, 9, 'F');
      doc.setDrawColor(191, 219, 254); // blue-200
      doc.setLineWidth(0.3);
      doc.rect(totalsX - 3, y + 1, totalsWidth + 3, 9, 'S');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10.5);
      doc.setTextColor(0, 87, 243); // brand blue
      doc.text('Total Due:', totalsX, y + 7);
      doc.text(`${currency}${grandTotal.toFixed(2)}`, pageWidth - margin - 2, y + 7, { align: 'right' });

      // 6. Payment Instructions & Notes (Left side of bottom section)
      let bottomY = y + 15;

      // Divider line
      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(0.3);
      doc.line(margin, bottomY, pageWidth - margin, bottomY);
      bottomY += 4;

      const colHalfW = (contentWidth - 6) / 2;

      // Payment Info (Left Col)
      if (bankDetails) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(7.5);
        doc.setTextColor(71, 85, 105);
        doc.text('PAYMENT INSTRUCTIONS', margin, bottomY + 2);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.5);
        doc.setTextColor(100, 116, 139);
        const bankLines = doc.splitTextToSize(bankDetails, colHalfW);
        doc.text(bankLines, margin, bottomY + 6);
      }

      // Notes (Right Col)
      if (notes) {
        const rightNotesX = margin + colHalfW + 6;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(7.5);
        doc.setTextColor(71, 85, 105);
        doc.text('NOTES & TERMS', rightNotesX, bottomY + 2);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.5);
        doc.setTextColor(100, 116, 139);
        const notesLines = doc.splitTextToSize(notes, colHalfW);
        doc.text(notesLines, rightNotesX, bottomY + 6);
      }

      // 7. Footer: Thank you & company url
      const footerY = pageHeight - margin - 2;
      doc.setDrawColor(241, 245, 249);
      doc.setLineWidth(0.2);
      doc.line(margin, footerY - 3, pageWidth - margin, footerY - 3);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(148, 163, 184);
      doc.text('Thank you for your business!', margin, footerY);
      doc.text(senderWebsite || 'thevector.systems', pageWidth - margin, footerY, { align: 'right' });

      // Save PDF
      const cleanFileName = (invoiceNumber || 'Invoice').replace(/[^a-zA-Z0-9_-]/g, '_');
      doc.save(`${cleanFileName}.pdf`);
    } catch (err) {
      console.error('Error generating Invoice PDF:', err);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Scoped Print Style to ensure print preview is strictly 1 page without extra pages or web chrome */}
      <style>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 8mm 10mm;
          }
          body {
            background: #ffffff !important;
            color: #000000 !important;
          }
          header, footer, nav, button, .lg\\:col-span-5, .print\\:hidden {
            display: none !important;
          }
          #printable-invoice {
            border: none !important;
            box-shadow: none !important;
            padding: 0 !important;
            margin: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
            page-break-after: avoid !important;
            break-after: avoid !important;
            font-size: 11px !important;
          }
          #printable-invoice table {
            font-size: 10px !important;
          }
        }
      `}</style>

      {/* Action Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-blue-50 text-[#0057F3] text-[11px] font-bold uppercase tracking-wider mb-1.5">
            <Sparkles className="w-3 h-3" />
            <span>One-Page Guarantee</span>
          </div>
          <h3 className="text-lg font-black text-slate-900 tracking-tight">
            Professional Invoice Generator
          </h3>
          <p className="text-xs sm:text-sm text-slate-600">
            Generate clean, professional, single-page business invoices. Download vector-sharp A4 PDF, Excel sheet, or print directly.
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
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print</span>
          </button>

          <button
            onClick={handleDownloadPdf}
            disabled={isGeneratingPdf}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0057F3] hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer disabled:opacity-50"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isGeneratingPdf ? 'Generating...' : 'Download PDF (1-Page)'}</span>
          </button>
        </div>
      </div>

      {/* Editor & Preview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form: 5 Cols */}
        <div className="lg:col-span-5 space-y-6">
          {/* Logo & Currency */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-2">
              Invoice Setup & Branding
            </h4>

            {/* Logo Upload */}
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1.5">
                Business Logo (Optional)
              </label>
              <input
                type="file"
                ref={logoInputRef}
                accept="image/png,image/jpeg,image/webp,image/svg+xml"
                onChange={handleLogoUpload}
                className="hidden"
              />
              {logoUrl ? (
                <div className="flex items-center gap-3 p-2 bg-slate-50 border border-slate-200 rounded-xl">
                  <img src={logoUrl} alt="Logo" className="w-12 h-12 object-contain bg-white rounded border border-slate-200 p-1" />
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-semibold text-slate-800 block truncate">Company Logo Attached</span>
                    <span className="text-[10px] text-emerald-600 font-medium">Included in PDF & Print</span>
                  </div>
                  <button
                    onClick={handleRemoveLogo}
                    className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-white transition-colors cursor-pointer"
                    title="Remove logo"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => logoInputRef.current?.click()}
                  className="w-full flex items-center justify-center gap-2 p-3 border border-dashed border-slate-300 hover:border-[#0057F3] rounded-xl text-xs font-semibold text-slate-600 hover:text-[#0057F3] bg-slate-50 hover:bg-blue-50/30 transition-all cursor-pointer"
                >
                  <ImageIcon className="w-4 h-4 text-slate-400" />
                  <span>Upload Logo (PNG, JPG)</span>
                </button>
              )}
            </div>

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
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Phone Number</label>
                <input
                  type="text"
                  value={senderPhone}
                  onChange={(e) => setSenderPhone(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Tax ID / VAT Reg</label>
                <input
                  type="text"
                  value={senderTaxId}
                  onChange={(e) => setSenderTaxId(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-mono"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Website URL</label>
                <input
                  type="text"
                  value={senderWebsite}
                  onChange={(e) => setSenderWebsite(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
                />
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Physical Address</label>
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
            <div className="grid grid-cols-2 gap-2">
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
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Client Phone</label>
                <input
                  type="text"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
                />
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Client Billing Address</label>
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
                    placeholder="Description or service title"
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

          {/* Payment Terms & Notes */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-2">
              Payment Instructions & Notes
            </h4>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Bank / Transfer Details</label>
              <textarea
                rows={2}
                value={bankDetails}
                onChange={(e) => setBankDetails(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg font-mono text-slate-800"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Notes & Terms</label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
              />
            </div>
          </div>
        </div>

        {/* Right: Live Printable One-Page Invoice Document Preview (7 Cols) */}
        <div className="lg:col-span-7">
          <div className="sticky top-6">
            <div 
              id="printable-invoice" 
              className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-lg text-slate-900 font-sans print:border-none print:shadow-none print:p-0 print:m-0"
            >
              {/* Document Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b border-slate-200 pb-6">
                <div>
                  {logoUrl && (
                    <img 
                      src={logoUrl} 
                      alt="Logo" 
                      className="h-12 w-auto object-contain mb-3" 
                    />
                  )}
                  <div className="text-xl font-black text-slate-900 tracking-tight">
                    {senderName || 'Your Business Name'}
                  </div>
                  <div className="text-xs text-slate-500 mt-1 whitespace-pre-line leading-relaxed">
                    {senderAddress}
                  </div>
                  {senderPhone && (
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Phone: <span className="font-mono">{senderPhone}</span>
                    </div>
                  )}
                  {senderTaxId && (
                    <div className="text-[11px] text-slate-500">
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
                  {paymentTerms && (
                    <div className="text-[11px] text-slate-500">
                      Terms: <span className="font-semibold text-slate-700">{paymentTerms}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Billed To Strip */}
              <div className="py-5 border-b border-slate-200">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Billed To:
                </div>
                <div className="text-sm font-bold text-slate-900 mt-0.5">
                  {clientName || 'Client Name'}
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-slate-600 mt-0.5">
                  {clientEmail && <span>{clientEmail}</span>}
                  {clientPhone && <span className="font-mono">{clientPhone}</span>}
                </div>
                {clientAddress && (
                  <div className="text-xs text-slate-500 mt-1 whitespace-pre-line leading-relaxed">
                    {clientAddress}
                  </div>
                )}
              </div>

              {/* Items Table */}
              <div className="py-4">
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
                        <td className="py-2.5 pr-2 text-slate-800 font-medium">
                          {it.description}
                          {it.taxPercent > 0 && (
                            <span className="text-[10px] text-slate-400 block font-normal">
                              Tax: {it.taxPercent}%
                            </span>
                          )}
                        </td>
                        <td className="py-2.5 text-center text-slate-600 font-mono">{it.quantity}</td>
                        <td className="py-2.5 text-right text-slate-600 font-mono">
                          {currency}{Number(it.unitPrice).toFixed(2)}
                        </td>
                        <td className="py-2.5 text-right text-slate-900 font-mono font-bold">
                          {currency}{(Number(it.quantity) * Number(it.unitPrice)).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Totals Summary */}
              <div className="border-t border-slate-200 pt-3 flex justify-end">
                <div className="w-64 space-y-1.5 text-xs">
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
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-600">
                      <span>Discount:</span>
                      <span className="font-mono font-semibold">-{currency}{discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-2 border-t border-slate-200 text-base font-black text-slate-900">
                    <span>Total Due:</span>
                    <span className="font-mono text-[#0057F3]">{currency}{grandTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Payment Info & Notes */}
              <div className="mt-6 pt-4 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-500">
                {bankDetails && (
                  <div>
                    <div className="font-bold text-slate-700 uppercase text-[10px]">Payment Instructions</div>
                    <div className="mt-1 whitespace-pre-line leading-relaxed font-mono text-[11px]">
                      {bankDetails}
                    </div>
                  </div>
                )}
                {notes && (
                  <div>
                    <div className="font-bold text-slate-700 uppercase text-[10px]">Notes & Terms</div>
                    <div className="mt-1 leading-relaxed">
                      {notes}
                    </div>
                  </div>
                )}
              </div>

              {/* Document Footer */}
              <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span>Thank you for your business!</span>
                <span>{senderWebsite || 'thevector.systems'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
