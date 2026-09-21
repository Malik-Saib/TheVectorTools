import React, { useState } from 'react';
import { 
  Barcode, 
  Copy, 
  Check, 
  Plus, 
  Trash2, 
  Download, 
  FileSpreadsheet, 
  Layers, 
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { exportToExcelFile } from '../../../services/businessExtractionService';

export const SkuGenerator: React.FC = () => {
  // Config state
  const [brandCode, setBrandCode] = useState<string>('VEC');
  const [categoryCode, setCategoryCode] = useState<string>('APP');
  const [productCode, setProductCode] = useState<string>('TEE');
  const [delimiter, setDelimiter] = useState<string>('-');
  const [caseFormat, setCaseFormat] = useState<'upper' | 'lower'>('upper');
  const [paddingLength, setPaddingLength] = useState<number>(3);
  const [startSequence, setStartSequence] = useState<number>(1);

  // Batch matrix options
  const [colorsInput, setColorsInput] = useState<string>('BLK, WHT, NVY, GRN');
  const [sizesInput, setSizesInput] = useState<string>('S, M, L, XL');

  const [copied, setCopied] = useState<boolean>(false);

  // Parse color & size lists
  const colors = colorsInput.split(',').map(c => c.trim().toUpperCase()).filter(Boolean);
  const sizes = sizesInput.split(',').map(s => s.trim().toUpperCase()).filter(Boolean);

  // Generate SKU matrix
  const generateMatrix = () => {
    const list: { id: string; sku: string; color: string; size: string; sequence: number }[] = [];
    let seq = startSequence;

    if (colors.length === 0 && sizes.length === 0) {
      const seqStr = String(seq).padStart(paddingLength, '0');
      const parts = [brandCode, categoryCode, productCode, seqStr].filter(Boolean);
      let sku = parts.join(delimiter);
      if (caseFormat === 'lower') sku = sku.toLowerCase();
      list.push({ id: '1', sku, color: 'N/A', size: 'N/A', sequence: seq });
      return list;
    }

    const activeColors = colors.length > 0 ? colors : ['STD'];
    const activeSizes = sizes.length > 0 ? sizes : ['ONE'];

    activeColors.forEach(col => {
      activeSizes.forEach(sz => {
        const seqStr = String(seq).padStart(paddingLength, '0');
        const parts = [brandCode, categoryCode, productCode, col, sz, seqStr].filter(Boolean);
        let sku = parts.join(delimiter);
        if (caseFormat === 'lower') sku = sku.toLowerCase();
        list.push({
          id: `${col}-${sz}-${seq}`,
          sku,
          color: col,
          size: sz,
          sequence: seq
        });
        seq++;
      });
    });

    return list;
  };

  const generatedSkus = generateMatrix();

  const handleCopyAll = () => {
    const text = generatedSkus.map(s => s.sku).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportXlsx = () => {
    const data = generatedSkus.map(s => ({
      'SKU': s.sku,
      'Brand Code': brandCode,
      'Category': categoryCode,
      'Product': productCode,
      'Color Code': s.color,
      'Size Code': s.size,
      'Sequence Index': s.sequence
    }));

    exportToExcelFile(data, 'Generated_SKU_Inventory.xlsx', 'SKUs');
  };

  return (
    <div className="space-y-8">
      {/* Overview */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs">
        <h3 className="text-lg font-black text-slate-900 tracking-tight">
          Product SKU Matrix Generator
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Generate clean, standardized Stock Keeping Units for e-commerce stores (Shopify, Amazon, WooCommerce) and inventory management.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Config: 5 Cols */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-2">
              SKU Pattern Architecture
            </h4>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Brand Code</label>
                <input
                  type="text"
                  value={brandCode}
                  maxLength={6}
                  onChange={(e) => setBrandCode(e.target.value.toUpperCase())}
                  className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-mono"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Category</label>
                <input
                  type="text"
                  value={categoryCode}
                  maxLength={6}
                  onChange={(e) => setCategoryCode(e.target.value.toUpperCase())}
                  className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-mono"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Product</label>
                <input
                  type="text"
                  value={productCode}
                  maxLength={6}
                  onChange={(e) => setProductCode(e.target.value.toUpperCase())}
                  className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Delimiter</label>
                <select
                  value={delimiter}
                  onChange={(e) => setDelimiter(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
                >
                  <option value="-">Hyphen (-)</option>
                  <option value="_">Underscore (_)</option>
                  <option value=".">Dot (.)</option>
                  <option value="/">Slash (/)</option>
                  <option value="">None (No separator)</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Casing</label>
                <select
                  value={caseFormat}
                  onChange={(e) => setCaseFormat(e.target.value as any)}
                  className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
                >
                  <option value="upper">UPPERCASE</option>
                  <option value="lower">lowercase</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Starting Number</label>
                <input
                  type="number"
                  min="0"
                  value={startSequence}
                  onChange={(e) => setStartSequence(Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg font-mono text-slate-900"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Zero Padding</label>
                <select
                  value={paddingLength}
                  onChange={(e) => setPaddingLength(Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800"
                >
                  <option value={2}>2 digits (01)</option>
                  <option value={3}>3 digits (001)</option>
                  <option value={4}>4 digits (0001)</option>
                  <option value={5}>5 digits (00001)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Matrix Variant Inputs */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-2">
              Variant Matrix Generation
            </h4>
            <p className="text-xs text-slate-500">
              Enter comma-separated values to produce multi-attribute SKU permutations.
            </p>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Color Codes (Comma-separated)</label>
              <input
                type="text"
                value={colorsInput}
                onChange={(e) => setColorsInput(e.target.value)}
                placeholder="BLK, WHT, NVY, RED"
                className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg font-mono text-slate-900"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Sizes (Comma-separated)</label>
              <input
                type="text"
                value={sizesInput}
                onChange={(e) => setSizesInput(e.target.value)}
                placeholder="S, M, L, XL"
                className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg font-mono text-slate-900"
              />
            </div>
          </div>
        </div>

        {/* Right Output: 7 Cols */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-black text-slate-900 tracking-tight">
                  Generated SKUs ({generatedSkus.length} variants)
                </h3>
                <p className="text-xs text-slate-600">
                  Ready for copy or import into ERP / retail inventory spreadsheets.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyAll}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy All'}</span>
                </button>
                <button
                  onClick={handleExportXlsx}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>Export XLSX</span>
                </button>
              </div>
            </div>

            {/* List */}
            <div className="overflow-x-auto border border-slate-200 rounded-xl max-h-[500px]">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200 sticky top-0">
                  <tr>
                    <th className="p-2.5">#</th>
                    <th className="p-2.5">Generated SKU</th>
                    <th className="p-2.5">Color</th>
                    <th className="p-2.5">Size</th>
                    <th className="p-2.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono text-xs">
                  {generatedSkus.map((s, idx) => (
                    <tr key={s.id} className="hover:bg-slate-50/60">
                      <td className="p-2.5 text-slate-400">{idx + 1}</td>
                      <td className="p-2.5 font-bold text-slate-900">{s.sku}</td>
                      <td className="p-2.5 text-slate-600">{s.color}</td>
                      <td className="p-2.5 text-slate-600">{s.size}</td>
                      <td className="p-2.5 text-right">
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(s.sku);
                          }}
                          className="text-slate-400 hover:text-[#0057F3] cursor-pointer"
                          title="Copy SKU"
                        >
                          <Copy className="w-3.5 h-3.5 ml-auto" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
