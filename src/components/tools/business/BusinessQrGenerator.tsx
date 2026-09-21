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
  Sparkles
} from 'lucide-react';

type QrType = 'url' | 'vcard' | 'wifi' | 'payment' | 'text';

export const BusinessQrGenerator: React.FC = () => {
  const [qrType, setQrType] = useState<QrType>('url');
  
  // URL mode
  const [url, setUrl] = useState<string>('https://thevector.systems');

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

  // Payment mode
  const [paymentProvider, setPaymentProvider] = useState<'paypal' | 'upi' | 'custom'>('paypal');
  const [paymentHandle, setPaymentHandle] = useState<string>('thevectorsystems');
  const [paymentAmount, setPaymentAmount] = useState<string>('50.00');

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
      case 'payment':
        if (paymentProvider === 'paypal') {
          return `https://paypal.me/${paymentHandle}/${paymentAmount}`;
        } else if (paymentProvider === 'upi') {
          return `upi://pay?pa=${paymentHandle}&pn=Merchant&am=${paymentAmount}&cu=INR`;
        }
        return `https://thevector.systems/pay?merchant=${paymentHandle}&amount=${paymentAmount}`;
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
    link.download = `Business_QR_${qrType}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8">
      {/* Overview */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs">
        <h3 className="text-lg font-black text-slate-900 tracking-tight">
          Business QR Code Generator
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Create high-resolution, customized QR codes for marketing campaigns, corporate business cards (vCard), guest WiFi, and instant customer checkout.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs: 7 Cols */}
        <div className="lg:col-span-7 space-y-6">
          {/* Type Selector Tabs */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-2">
              Select QR Code Format
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
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
                onClick={() => setQrType('payment')}
                className={`p-2.5 rounded-xl text-xs font-bold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                  qrType === 'payment' ? 'bg-[#0057F3] text-white shadow-xs' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <DollarSign className="w-4 h-4" />
                <span>Payment</span>
              </button>

              <button
                onClick={() => setQrType('text')}
                className={`p-2.5 rounded-xl text-xs font-bold flex flex-col items-center gap-1.5 transition-all cursor-pointer col-span-2 sm:col-span-1 ${
                  qrType === 'text' ? 'bg-[#0057F3] text-white shadow-xs' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Plain Text</span>
              </button>
            </div>

            {/* Dynamic Type Fields */}
            <div className="pt-2">
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

              {qrType === 'vcard' && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        value={vcardName}
                        onChange={(e) => setVcardName(e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Company</label>
                      <input
                        type="text"
                        value={vcardCompany}
                        onChange={(e) => setVcardCompany(e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg"
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
                        className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Phone Number</label>
                      <input
                        type="text"
                        value={vcardPhone}
                        onChange={(e) => setVcardPhone(e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg font-mono"
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
                        className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Website</label>
                      <input
                        type="url"
                        value={vcardWebsite}
                        onChange={(e) => setVcardWebsite(e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              )}

              {qrType === 'wifi' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">Network Name (SSID)</label>
                    <input
                      type="text"
                      value={wifiSsid}
                      onChange={(e) => setWifiSsid(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Password</label>
                      <input
                        type="text"
                        value={wifiPassword}
                        onChange={(e) => setWifiPassword(e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Security Type</label>
                      <select
                        value={wifiEncryption}
                        onChange={(e) => setWifiEncryption(e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg"
                      >
                        <option value="WPA">WPA / WPA2 / WPA3</option>
                        <option value="WEP">WEP</option>
                        <option value="nopass">None (Open Network)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {qrType === 'payment' && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Gateway</label>
                      <select
                        value={paymentProvider}
                        onChange={(e) => setPaymentProvider(e.target.value as any)}
                        className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg"
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
                        className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg font-mono"
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
                      className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg font-mono"
                    />
                  </div>
                </div>
              )}

              {qrType === 'text' && (
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Plain Text Message</label>
                  <textarea
                    rows={4}
                    value={plainText}
                    onChange={(e) => setPlainText(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl"
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
                    className="w-full px-2 py-1 text-xs bg-slate-50 border border-slate-300 rounded font-mono"
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
                    className="w-full px-2 py-1 text-xs bg-slate-50 border border-slate-300 rounded font-mono"
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
                  Point any phone camera to test instant scanning
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
                  onClick={handlePrint}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print QR Code Card</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
