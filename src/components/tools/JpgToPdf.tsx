import React, { useState, useRef } from 'react';
import { jsPDF } from 'jspdf';
import { Upload, Trash2, ArrowDown, ShieldCheck, Download, FileText, Image as ImageIcon, RotateCcw } from 'lucide-react';

interface UploadedImage {
  id: string;
  name: string;
  size: number;
  dataUrl: string;
  mimeType: 'JPEG' | 'PNG' | 'WEBP';
  width: number;
  height: number;
}

export const JpgToPdf: React.FC = () => {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [orientation, setOrientation] = useState<'portrait' | 'landscape' | 'auto'>('auto');
  const [margin, setMargin] = useState<'none' | 'small' | 'normal'>('small');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const extension = file.name.split('.').pop()?.toLowerCase();
      const mimeType = file.type === 'image/jpeg' || extension === 'jpg' || extension === 'jpeg'
        ? 'JPEG'
        : file.type === 'image/png' || extension === 'png'
          ? 'PNG'
          : file.type === 'image/webp' || extension === 'webp'
            ? 'WEBP'
            : null;
      if (!mimeType) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        const img = new Image();
        img.onload = () => {
          setImages((prev) => [
            ...prev,
            {
              id: `${file.name}-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
              name: file.name,
              size: file.size,
              dataUrl,
              mimeType,
              width: img.naturalWidth || img.width,
              height: img.naturalHeight || img.height
            }
          ]);
        };
        img.src = dataUrl;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const handleGeneratePdf = async () => {
    if (images.length === 0) return;
    setIsProcessing(true);

    try {
      const firstImage = images[0];
      const firstPageOrientation = orientation === 'auto'
        ? (firstImage.width > firstImage.height ? 'landscape' : 'portrait')
        : orientation;
      // Create first page
      const doc = new jsPDF({
        orientation: firstPageOrientation,
        unit: 'mm',
        format: 'a4'
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      let marginMm = 10;
      if (margin === 'none') marginMm = 0;
      if (margin === 'normal') marginMm = 20;

      for (let i = 0; i < images.length; i++) {
        const img = images[i];
        if (i > 0) {
          const isLandscape = orientation === 'auto' ? img.width > img.height : orientation === 'landscape';
          doc.addPage('a4', isLandscape ? 'landscape' : 'portrait');
        }

        const currPageWidth = doc.internal.pageSize.getWidth();
        const currPageHeight = doc.internal.pageSize.getHeight();

        const availWidth = currPageWidth - marginMm * 2;
        const availHeight = currPageHeight - marginMm * 2;

        const imgRatio = img.width / img.height;
        const availRatio = availWidth / availHeight;

        let renderW = availWidth;
        let renderH = availHeight;

        if (imgRatio > availRatio) {
          renderH = availWidth / imgRatio;
        } else {
          renderW = availHeight * imgRatio;
        }

        const posX = marginMm + (availWidth - renderW) / 2;
        const posY = marginMm + (availHeight - renderH) / 2;

        doc.addImage(img.dataUrl, img.mimeType, posX, posY, renderW, renderH, undefined, 'FAST');
      }

      doc.save(`thevectortools-converted-${Date.now()}.pdf`);
    } catch (err) {
      console.error('Error generating PDF:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Privacy Notice Banner */}
      <div className="p-3.5 bg-emerald-50/90 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2.5">
        <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
        <span>
          <strong>100% Client-Side Privacy:</strong> Your images never leave your computer. All PDF compilation is performed strictly inside your browser. No files are uploaded to any server.
        </span>
      </div>

      {/* Drag & Drop Upload Zone */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className="p-8 border-2 border-dashed border-slate-300 hover:border-emerald-500 bg-slate-50 hover:bg-emerald-50/30 rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer transition-all"
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => handleFiles(e.target.files)}
          multiple
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
        />
        <div className="w-12 h-12 rounded-xl bg-white shadow-2xs border border-slate-200 flex items-center justify-center text-emerald-600 mb-3">
          <Upload className="w-6 h-6" />
        </div>
        <div className="text-sm font-bold text-slate-800">
          Click to select or drag and drop JPG, PNG, or WebP images
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Supports multiple files at once. You can reorder or adjust margins before converting.
        </p>
      </div>

      {/* Options Panel */}
      {images.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs">
          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Page Orientation
            </label>
            <select
              value={orientation}
              onChange={(e) => setOrientation(e.target.value as any)}
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg font-semibold text-slate-800"
            >
              <option value="auto">Auto-Fit (Match each image aspect)</option>
              <option value="portrait">Standard Portrait (A4 Vertical)</option>
              <option value="landscape">Landscape (A4 Horizontal)</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Page Margins
            </label>
            <select
              value={margin}
              onChange={(e) => setMargin(e.target.value as any)}
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg font-semibold text-slate-800"
            >
              <option value="small">Small Margin (10mm - Recommended)</option>
              <option value="none">No Margin (Full Bleed)</option>
              <option value="normal">Normal Margin (20mm)</option>
            </select>
          </div>
        </div>
      )}

      {/* Uploaded Images Gallery */}
      {images.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Selected Images ({images.length} page{images.length === 1 ? '' : 's'})
            </h4>
            <button
              onClick={() => setImages([])}
              className="text-xs text-rose-600 hover:text-rose-700 font-semibold cursor-pointer"
            >
              Remove All
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {images.map((img, idx) => (
              <div key={img.id} className="relative group rounded-xl border border-slate-200 bg-white p-2 shadow-2xs">
                <div className="w-full h-24 bg-slate-100 rounded-lg overflow-hidden flex items-center justify-center">
                  <img src={img.dataUrl} alt={img.name} className="w-full h-full object-contain" />
                </div>
                <div className="mt-1.5 flex items-center justify-between text-[11px]">
                  <span className="font-bold text-slate-600">Page {idx + 1}</span>
                  <button
                    onClick={() => removeImage(img.id)}
                    className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                    title="Delete image"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="text-[10px] text-slate-400 truncate" title={img.name}>
                  {img.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Convert / Download Action CTA */}
      {images.length > 0 && (
        <div className="pt-2">
          <button
            onClick={handleGeneratePdf}
            disabled={isProcessing}
            className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>{isProcessing ? 'Compiling PDF in Browser...' : `Convert & Download PDF (${images.length} Pages)`}</span>
          </button>
        </div>
      )}
    </div>
  );
};
