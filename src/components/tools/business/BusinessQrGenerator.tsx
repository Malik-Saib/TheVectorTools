import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { 
  QrCode, 
  Download, 
  Copy, 
  Check, 
  Printer, 
  Globe, 
  User, 
  Wifi, 
  DollarSign, 
  FileText,
  CreditCard,
  Building,
  Smartphone,
  ShieldAlert,
  Info
} from 'lucide-react';

type QrType = 'url' | 'easypaisa' | 'jazzcash' | 'bank' | 'payment' | 'vcard' | 'wifi' | 'text';

export const BusinessQrGenerator: React.FC = () => {
  const [qrType, setQrType] = useState<QrType>('url');
  
  // URL mode
  const [url, setUrl] = useState<string>('https://thevector.systems');

  // EasyPaisa mode
  const [easypaisaNumber, setEasypaisaNumber] = useState<string>('03001234567');
  const [easypaisaTitle, setEasypaisaTitle] = useState<string>('Alex Morgan');
  const [easypaisaAmount, setEasypaisaAmount] = useState<string>('');
  const [easypaisaRef, setEasypaisaRef] = useState<string>('INV-2026-1049');

  // JazzCash mode
  const [jazzcashNumber, setJazzcashNumber] = useState<string>('03011234567');
  const [jazzcashTitle, setJazzcashTitle] = useState<string>('Alex Morgan');
  const [jazzcashAmount, setJazzcashAmount] = useState<string>('');
  const [jazzcashRef, setJazzcashRef] = useState<string>('INV-2026-1049');

  // Bank Account mode
  const [bankAccountName, setBankAccountName] = useState<string>('The Vector Systems Ltd');
  const [bankName, setBankName] = useState<string>('Barclays Corporate Bank');
  const [bankAccountNumber, setBankAccountNumber] = useState<string>('1234567890');
  const [bankIban, setBankIban] = useState<string>('GB29BARC20000012345678');
  const [bankAmount, setBankAmount] = useState<string>('');
  const [bankRef, setBankRef] = useState<string>('Invoice 1049');

  // General Payment mode (PayPal / UPI / Custom)
  const [paymentProvider, setPaymentProvider] = useState<'paypal' | 'upi' | 'custom'>('paypal');
  const [paymentHandle, setPaymentHandle] = useState<string>('thevectorsystems');
  const [paymentAmount, setPaymentAmount] = useState<string>('50.00');

  // vCard mode
  const [vcardName, setVcardName] = useState<string>('Alex Morgan');
  const [vcardCompany, setVcardCompany] = useState<string>('The Vector Systems');
  const [vcardTitle, setVcardTitle] = useState<string>('Solutions Architect');
  const [vcardEmail, setVcardEmail] = useState<string>('contact@thevector.systems');
  const [vcardPhone, setVcardPhone] = useState<string>('+44 20 7946 0912');
  const [vcardWebsite, setVcardWebsite] = useState<string>('https://thevector.systems');

  // WiFi mode
  const [wifiSsid, setWifiSsid] = useState<string>('Office_Guest_WiFi');
  const [wifiPassword, setWifiPassword] = useState<string>('FastSecure2026!');
  const [wifiEncryption, setWifiEncryption] = useState<string>('WPA');

  // Text mode
  const [plainText, setPlainText] = useState<string>('Welcome to The Vector Systems.');

  // Customization
  const [fgColor, setFgColor] = useState<string>('#0f172a');
  const [bgColor, setBgColor] = useState<string>('#ffffff');
  const [size, setSize] = useState<number>(320);
  const [errorCorrection, setErrorCorrection] = useState<'L' | 'M' | 'Q' | 'H'>('M');

  // Generated QR output
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  // Compute text to encode
  const getEncodedText = (): string => {
    switch (qrType) {
      case 'url':
        return url.trim() || 'https://thevector.systems';

      case 'easypaisa': {
        const lines = [
          'EASYPAISA PAYMENT INFO',
          `Account Number: ${easypaisaNumber.trim()}`,
          `Account Title: ${easypaisaTitle.trim()}`
        ];
        if (easypaisaAmount.trim()) lines.push(`Amount: PKR ${easypaisaAmount.trim()}`);
        if (easypaisaRef.trim()) lines.push(`Reference: ${easypaisaRef.trim()}`);
        return lines.join('\n');
      }

      case 'jazzcash': {
        const lines = [
          'JAZZCASH PAYMENT INFO',
          `Mobile Account: ${jazzcashNumber.trim()}`,
          `Account Title: ${jazzcashTitle.trim()}`
        ];
        if (jazzcashAmount.trim()) lines.push(`Amount: PKR ${jazzcashAmount.trim()}`);
        if (jazzcashRef.trim()) lines.push(`Reference: ${jazzcashRef.trim()}`);
        return lines.join('\n');
      }

      case 'bank': {
        const lines = [
          'BANK TRANSFER DETAILS',
          `Account Holder: ${bankAccountName.trim()}`,
          `Bank Name: ${bankName.trim()}`
        ];
        if (bankAccountNumber.trim()) lines.push(`Account No: ${bankAccountNumber.trim()}`);
        if (bankIban.trim()) lines.push(`IBAN: ${bankIban.trim()}`);
        if (bankAmount.trim()) lines.push(`Amount: ${bankAmount.trim()}`);
        if (bankRef.trim()) lines.push(`Reference: ${bankRef.trim()}`);
        return lines.join('\n');
      }

      case 'payment':
        if (paymentProvider === 'paypal') {
          return `https://paypal.me/${paymentHandle}/${paymentAmount}`;
        } else if (paymentProvider === 'upi') {
          return `upi://pay?pa=${paymentHandle}&pn=Merchant&am=${paymentAmount}&cu=INR`;
        }
        return `https://thevector.systems/pay?merchant=${paymentHandle}&amount=${paymentAmount}`;

      case 'vcard':
        return [
          'BEGIN:VCARD',
          'VERSION:3.0',
          `FN:${vcardName}`,
          `ORG:${vcardCompany}`,
          `TITLE:${vcardTitle}`,
          `TEL:${vcardPhone}`,
          `EMAIL:${vcardEmail}`,
          `URL:${vcardWebsite}`,
          'END:VCARD'
        ].join('\n');

      case 'wifi':
        return `WIFI:T:${wifiEncryption};S:${wifiSsid};P:${wifiPassword};;`;

      case 'text':
      default:
        return plainText;
    }
  };

  useEffect(() => {
    const text = getEncodedText();
    QRCode.toDataURL(text, {
      width: size,
      margin: 2,
      color: {
        dark: fgColor,
        light: bgColor
      },
      errorCorrectionLevel: errorCorrection
    })
      .then(url => setQrDataUrl(url))
      .catch(err => console.error(err));
  }, [
    qrType, 
    url, 
    easypaisaNumber,
    easypaisaTitle,
    easypaisaAmount,
    easypaisaRef,
    jazzcashNumber,
    jazzcashTitle,
    jazzcashAmount,
    jazzcashRef,
    bankAccountName,
    bankName,
    bankAccountNumber,
    bankIban,
    bankAmount,
    bankRef,
    vcardName, 
    vcardCompany, 
    vcardTitle, 
    vcardEmail, 
    vcardPhone, 
    vcardWebsite, 
    wifiSsid, 
    wifiPassword, 
    wifiEncryption, 
    paymentProvider, 
    paymentHandle, 
    paymentAmount, 
    plainText, 
    fgColor, 
    bgColor, 
    size, 
    errorCorrection
  ]);

  const handleDownload = () => {
    if (!qrDataUrl) return;
    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = `TheVector_QR_${qrType}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadSvg = async () => {
    try {
      const text = getEncodedText();
      const svgString = await QRCode.toString(text, {
        type: 'svg',
        width: size,
        margin: 2,
        color: {
          dark: fgColor,
          light: bgColor
        },
        errorCorrectionLevel: errorCorrection
      });
      const blob = new Blob([svgString], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `TheVector_QR_${qrType}.svg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error generating SVG QR:', err);
    }
  };

  const handleCopyPayload = () => {
    const text = getEncodedText();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8">
      {/* Overview */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs">
        <h3 className="text-lg font-black text-slate-900 tracking-tight">
          Business & Payment QR Code Generator
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Create high-resolution, customized QR codes for website URLs, EasyPaisa, JazzCash, Bank Accounts, vCard contacts, and guest WiFi.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs: 7 Cols */}
        <div className="lg:col-span-7 space-y-6">
          {/* Type Selector Tabs */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-2">
              Select QR Code Format & Payment Type
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => setQrType('url')}
                className={`p-2.5 rounded-xl text-xs font-bold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                  qrType === 'url' ? 'bg-[#0057F3] text-white shadow-xs' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Globe className="w-4 h-4" />
                <span>Website URL</span>
              </button>

              <button
                onClick={() => setQrType('easypaisa')}
                className={`p-2.5 rounded-xl text-xs font-bold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                  qrType === 'easypaisa' ? 'bg-[#0057F3] text-white shadow-xs' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Smartphone className="w-4 h-4 text-emerald-500" />
                <span>EasyPaisa</span>
              </button>

              <button
                onClick={() => setQrType('jazzcash')}
                className={`p-2.5 rounded-xl text-xs font-bold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                  qrType === 'jazzcash' ? 'bg-[#0057F3] text-white shadow-xs' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <CreditCard className="w-4 h-4 text-amber-500" />
                <span>JazzCash</span>
              </button>

              <button
                onClick={() => setQrType('bank')}
                className={`p-2.5 rounded-xl text-xs font-bold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                  qrType === 'bank' ? 'bg-[#0057F3] text-white shadow-xs' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Building className="w-4 h-4 text-blue-500" />
                <span>Bank Account</span>
              </button>

              <button
                onClick={() => setQrType('payment')}
                className={`p-2.5 rounded-xl text-xs font-bold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                  qrType === 'payment' ? 'bg-[#0057F3] text-white shadow-xs' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <DollarSign className="w-4 h-4 text-indigo-500" />
                <span>PayPal / UPI</span>
              </button>

              <button
                onClick={() => setQrType('vcard')}
                className={`p-2.5 rounded-xl text-xs font-bold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                  qrType === 'vcard' ? 'bg-[#0057F3] text-white shadow-xs' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <User className="w-4 h-4" />
                <span>vCard Contact</span>
              </button>

              <button
                onClick={() => setQrType('wifi')}
                className={`p-2.5 rounded-xl text-xs font-bold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                  qrType === 'wifi' ? 'bg-[#0057F3] text-white shadow-xs' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Wifi className="w-4 h-4" />
                <span>Guest WiFi</span>
              </button>

              <button
                onClick={() => setQrType('text')}
                className={`p-2.5 rounded-xl text-xs font-bold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                  qrType === 'text' ? 'bg-[#0057F3] text-white shadow-xs' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Plain Text</span>
              </button>
            </div>

            {/* Dynamic Type Fields */}
            <div className="pt-2">
              {/* 1. Website URL */}
              {qrType === 'url' && (
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Destination URL</label>
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com/promo"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-[#0057F3]"
                  />
                </div>
              )}

              {/* 2. EasyPaisa */}
              {qrType === 'easypaisa' && (
                <div className="space-y-3">
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-[11px] text-emerald-900 flex items-start gap-2">
                    <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>EasyPaisa Payment Info QR:</strong> Encodes your recipient account number and title for scanning apps and mobile camera OCR. (Note: Non-API payment information code).
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Mobile / Account Number *</label>
                      <input
                        type="text"
                        value={easypaisaNumber}
                        onChange={(e) => setEasypaisaNumber(e.target.value)}
                        placeholder="03001234567"
                        className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg font-mono text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Account Title / Name *</label>
                      <input
                        type="text"
                        value={easypaisaTitle}
                        onChange={(e) => setEasypaisaTitle(e.target.value)}
                        placeholder="Alex Morgan"
                        className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Amount in PKR (Optional)</label>
                      <input
                        type="number"
                        value={easypaisaAmount}
                        onChange={(e) => setEasypaisaAmount(e.target.value)}
                        placeholder="e.g. 2500"
                        className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg font-mono text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Reference / Description (Optional)</label>
                      <input
                        type="text"
                        value={easypaisaRef}
                        onChange={(e) => setEasypaisaRef(e.target.value)}
                        placeholder="INV-1049"
                        className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* 3. JazzCash */}
              {qrType === 'jazzcash' && (
                <div className="space-y-3">
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900 flex items-start gap-2">
                    <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>JazzCash Payment Info QR:</strong> Encodes your JazzCash wallet credentials for instant camera reading, copy-paste, and billing receipts. (Non-API payment information code).
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Mobile / Account Number *</label>
                      <input
                        type="text"
                        value={jazzcashNumber}
                        onChange={(e) => setJazzcashNumber(e.target.value)}
                        placeholder="03011234567"
                        className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg font-mono text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Account Title / Name *</label>
                      <input
                        type="text"
                        value={jazzcashTitle}
                        onChange={(e) => setJazzcashTitle(e.target.value)}
                        placeholder="Alex Morgan"
                        className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Amount in PKR (Optional)</label>
                      <input
                        type="number"
                        value={jazzcashAmount}
                        onChange={(e) => setJazzcashAmount(e.target.value)}
                        placeholder="e.g. 5000"
                        className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg font-mono text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Reference / Description (Optional)</label>
                      <input
                        type="text"
                        value={jazzcashRef}
                        onChange={(e) => setJazzcashRef(e.target.value)}
                        placeholder="INV-1049"
                        className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* 4. Bank Account */}
              {qrType === 'bank' && (
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-[11px] text-blue-900 flex items-start gap-2">
                    <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Bank Account Transfer QR:</strong> Encodes complete banking details (Account Name, Bank, Account #, IBAN, and Reference) for effortless digital wire transfers.
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Account Holder Name *</label>
                      <input
                        type="text"
                        value={bankAccountName}
                        onChange={(e) => setBankAccountName(e.target.value)}
                        placeholder="The Vector Systems Ltd"
                        className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Bank Name *</label>
                      <input
                        type="text"
                        value={bankName}
                        onChange={(e) => setBankName(e.target.value)}
                        placeholder="Barclays / Meezan Bank / HBL"
                        className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Account Number</label>
                      <input
                        type="text"
                        value={bankAccountNumber}
                        onChange={(e) => setBankAccountNumber(e.target.value)}
                        placeholder="0123456789"
                        className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg font-mono text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">IBAN</label>
                      <input
                        type="text"
                        value={bankIban}
                        onChange={(e) => setBankIban(e.target.value)}
                        placeholder="PK16MEZN0001234567890123"
                        className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg font-mono text-slate-900"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Amount (Optional)</label>
                      <input
                        type="text"
                        value={bankAmount}
                        onChange={(e) => setBankAmount(e.target.value)}
                        placeholder="e.g. 500.00"
                        className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg font-mono text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Payment Reference (Optional)</label>
                      <input
                        type="text"
                        value={bankRef}
                        onChange={(e) => setBankRef(e.target.value)}
                        placeholder="e.g. Invoice #1049"
                        className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* 5. PayPal / UPI */}
              {qrType === 'payment' && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Gateway</label>
                      <select
                        value={paymentProvider}
                        onChange={(e) => setPaymentProvider(e.target.value as any)}
                        className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                      >
                        <option value="paypal">PayPal.me</option>
                        <option value="upi">UPI (India)</option>
                        <option value="custom">Direct Checkout URL</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Handle / VPA ID</label>
                      <input
                        type="text"
                        value={paymentHandle}
                        onChange={(e) => setPaymentHandle(e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg font-mono text-slate-900"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Default Amount (Optional)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg font-mono text-slate-900"
                    />
                  </div>
                </div>
              )}

              {/* 6. vCard */}
              {qrType === 'vcard' && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        value={vcardName}
                        onChange={(e) => setVcardName(e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Company</label>
                      <input
                        type="text"
                        value={vcardCompany}
                        onChange={(e) => setVcardCompany(e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Job Title</label>
                      <input
                        type="text"
                        value={vcardTitle}
                        onChange={(e) => setVcardTitle(e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Phone Number</label>
                      <input
                        type="text"
                        value={vcardPhone}
                        onChange={(e) => setVcardPhone(e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg font-mono text-slate-900"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Email</label>
                      <input
                        type="email"
                        value={vcardEmail}
                        onChange={(e) => setVcardEmail(e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Website</label>
                      <input
                        type="url"
                        value={vcardWebsite}
                        onChange={(e) => setVcardWebsite(e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* 7. WiFi */}
              {qrType === 'wifi' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">Network Name (SSID)</label>
                    <input
                      type="text"
                      value={wifiSsid}
                      onChange={(e) => setWifiSsid(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl text-slate-900"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Password</label>
                      <input
                        type="text"
                        value={wifiPassword}
                        onChange={(e) => setWifiPassword(e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg font-mono text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Security Type</label>
                      <select
                        value={wifiEncryption}
                        onChange={(e) => setWifiEncryption(e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                      >
                        <option value="WPA">WPA / WPA2 / WPA3</option>
                        <option value="WEP">WEP</option>
                        <option value="nopass">None (Open Network)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* 8. Plain Text */}
              {qrType === 'text' && (
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Plain Text Message</label>
                  <textarea
                    rows={4}
                    value={plainText}
                    onChange={(e) => setPlainText(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl text-slate-900"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Visual Customization */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-2">
              Color & Styling Controls
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Foreground</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="w-8 h-8 rounded-lg cursor-pointer border border-slate-300"
                  />
                  <input
                    type="text"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="w-full px-2 py-1 text-xs bg-slate-50 border border-slate-300 rounded font-mono text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Background</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-8 h-8 rounded-lg cursor-pointer border border-slate-300"
                  />
                  <input
                    type="text"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-full px-2 py-1 text-xs bg-slate-50 border border-slate-300 rounded font-mono text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Resolution (px)</label>
                <select
                  value={size}
                  onChange={(e) => setSize(Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
                >
                  <option value={200}>200 x 200 (Thumb)</option>
                  <option value={320}>320 x 320 (Medium)</option>
                  <option value={500}>500 x 500 (HD Print)</option>
                  <option value={800}>800 x 800 (Ultra HD)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Error Correction</label>
                <select
                  value={errorCorrection}
                  onChange={(e) => setErrorCorrection(e.target.value as any)}
                  className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
                >
                  <option value="L">Low (7%)</option>
                  <option value="M">Medium (15%)</option>
                  <option value="Q">Quartile (25%)</option>
                  <option value="H">High (30% recovery)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Right Output Preview: 5 Cols */}
        <div className="lg:col-span-5">
          <div className="sticky top-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-2xs text-center space-y-6">
              <div>
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                  Live QR Preview
                </h4>
                <div className="text-xs text-slate-500 mt-0.5">
                  Point any phone camera or banking scanner app to test
                </div>
              </div>

              {/* QR Image Box */}
              <div className="flex justify-center p-6 bg-slate-50 rounded-2xl border border-slate-200">
                {qrDataUrl ? (
                  <img
                    src={qrDataUrl}
                    alt="Generated QR Code"
                    className="max-w-[260px] h-auto shadow-md rounded-xl"
                  />
                ) : (
                  <div className="w-64 h-64 flex items-center justify-center text-slate-400">
                    Generating...
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2">
                <button
                  onClick={handleDownload}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0057F3] hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download High-Res PNG</span>
                </button>

                <button
                  onClick={handleDownloadSvg}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4 text-emerald-600" />
                  <span>Download Vector SVG</span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={handleCopyPayload}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy Text'}</span>
                  </button>

                  <button
                    onClick={handlePrint}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Card</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
