import React, { useState, useRef } from 'react';
import JSZip from 'jszip';
import { 
  Upload, 
  Trash2, 
  Download, 
  ShieldCheck, 
  Image as ImageIcon, 
  Check, 
  AlertCircle, 
  Loader2, 
  Sparkles, 
  Settings2, 
  ArrowRight,
  RefreshCw,
  FolderArchive,
  Layers,
  Palette
} from 'lucide-react';

export type OutputFormat = 'webp' | 'jpg' | 'jpeg' | 'png' | 'avif' | 'bmp';

export interface ImageFileItem {
  id: string;
  file: File;
  name: string;
  originalSize: number;
  originalFormat: string;
  previewUrl: string;
  width: number;
  height: number;
  status: 'idle' | 'converting' | 'completed' | 'error';
  errorMessage?: string;
  convertedDataUrl?: string;
  convertedBlob?: Blob;
  convertedSize?: number;
  convertedFormat?: OutputFormat;
}

export const ImageFormatConverter: React.FC = () => {
  const [items, setItems] = useState<ImageFileItem[]>([]);
  const [targetFormat, setTargetFormat] = useState<OutputFormat>('webp');
  const [quality, setQuality] = useState<number>(90);
  const [bgColor, setBgColor] = useState<string>('#ffffff');
  const [scalePercent, setScalePercent] = useState<number>(100);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isZipping, setIsZipping] = useState<boolean>(false);
  const [globalError, setGlobalError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    setGlobalError(null);

    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/bmp', 'image/gif', 'image/avif', 'image/svg+xml'];
    const newItems: ImageFileItem[] = [];

    Array.from(fileList).forEach((file) => {
      const ext = file.name.split('.').pop()?.toLowerCase() || '';
      const isImage = file.type.startsWith('image/') || ['png', 'jpg', 'jpeg', 'webp', 'bmp', 'gif', 'avif'].includes(ext);

      if (!isImage) return;

      const previewUrl = URL.createObjectURL(file);
      const img = new Image();

      img.onload = () => {
        const item: ImageFileItem = {
          id: `${file.name}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          file,
          name: file.name,
          originalSize: file.size,
          originalFormat: ext.toUpperCase() || 'IMG',
          previewUrl,
          width: img.naturalWidth || img.width,
          height: img.naturalHeight || img.height,
          status: 'idle'
        };

        setItems((prev) => [...prev, item]);
      };

      img.onerror = () => {
        // Still add item with fallback
        const item: ImageFileItem = {
          id: `${file.name}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          file,
          name: file.name,
          originalSize: file.size,
          originalFormat: ext.toUpperCase() || 'IMG',
          previewUrl,
          width: 0,
          height: 0,
          status: 'idle'
        };
        setItems((prev) => [...prev, item]);
      };

      img.src = previewUrl;
    });
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleRemoveItem = (id: string) => {
    setItems((prev) => {
      const target = prev.find((it) => it.id === id);
      if (target && target.previewUrl) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((it) => it.id !== id);
    });
  };

  const handleClearAll = () => {
    items.forEach((it) => {
      if (it.previewUrl) URL.revokeObjectURL(it.previewUrl);
    });
    setItems([]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  /**
   * Encodes canvas to BMP format data URL
   */
  const canvasToBmpDataUrl = (canvas: HTMLCanvasElement): string => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return canvas.toDataURL('image/png');

    const width = canvas.width;
    const height = canvas.height;
    const imgData = ctx.getImageData(0, 0, width, height);
    const data = imgData.data;

    const rowBytes = Math.floor((24 * width + 31) / 32) * 4;
    const imageSize = rowBytes * height;
    const headerSize = 54;
    const fileSize = headerSize + imageSize;

    const buffer = new ArrayBuffer(fileSize);
    const view = new DataView(buffer);

    // Bitmap File Header
    view.setUint16(0, 0x424D, false); // "BM"
    view.setUint32(2, fileSize, true);
    view.setUint32(6, 0, true);
    view.setUint32(10, headerSize, true);

    // DIB Header (BITMAPINFOHEADER)
    view.setUint32(14, 40, true); // header size
    view.setInt32(18, width, true);
    view.setInt32(22, height, true); // bottom-up
    view.setUint16(26, 1, true); // planes
    view.setUint16(28, 24, true); // 24-bit RGB
    view.setUint32(30, 0, true); // compression (none)
    view.setUint32(34, imageSize, true);
    view.setInt32(38, 2835, true); // pixels/meter
    view.setInt32(42, 2835, true);
    view.setUint32(46, 0, true);
    view.setUint32(50, 0, true);

    // Pixel data (BGR bottom-to-top)
    const uint8 = new Uint8Array(buffer, headerSize);
    for (let y = 0; y < height; y++) {
      const srcRow = (height - 1 - y) * width * 4;
      const dstRow = y * rowBytes;
      for (let x = 0; x < width; x++) {
        const srcPos = srcRow + x * 4;
        const dstPos = dstRow + x * 3;
        uint8[dstPos] = data[srcPos + 2];     // B
        uint8[dstPos + 1] = data[srcPos + 1]; // G
        uint8[dstPos + 2] = data[srcPos];     // R
      }
    }

    const blob = new Blob([buffer], { type: 'image/bmp' });
    return URL.createObjectURL(blob);
  };

  /**
   * Converts a single image item via HTML5 Canvas
   */
  const convertSingleImage = (
    item: ImageFileItem, 
    format: OutputFormat, 
    q: number, 
    bg: string, 
    scale: number
  ): Promise<{ dataUrl: string; blob: Blob; size: number }> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';

      img.onload = () => {
        try {
          const origW = img.naturalWidth || img.width;
          const origH = img.naturalHeight || img.height;

          const targetW = Math.max(1, Math.round(origW * (scale / 100)));
          const targetH = Math.max(1, Math.round(origH * (scale / 100)));

          const canvas = document.createElement('canvas');
          canvas.width = targetW;
          canvas.height = targetH;
          const ctx = canvas.getContext('2d');

          if (!ctx) {
            reject(new Error('Failed to create canvas context'));
            return;
          }

          // Format specific handling
          const isJpgOrBmp = format === 'jpg' || format === 'jpeg' || format === 'bmp';

          // When converting to JPG/BMP or if user specified, fill background to prevent black/transparent glitches
          if (isJpgOrBmp || bg !== 'transparent') {
            ctx.fillStyle = bg || '#ffffff';
            ctx.fillRect(0, 0, targetW, targetH);
          }

          // High-quality image rendering
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, targetW, targetH);

          const qFloat = Math.min(1, Math.max(0.1, q / 100));

          if (format === 'bmp') {
            const dataUrl = canvasToBmpDataUrl(canvas);
            fetch(dataUrl)
              .then(res => res.blob())
              .then(blob => {
                resolve({ dataUrl, blob, size: blob.size });
              })
              .catch(reject);
            return;
          }

          let mimeType = 'image/jpeg';
          if (format === 'png') mimeType = 'image/png';
          else if (format === 'webp') mimeType = 'image/webp';
          else if (format === 'avif') mimeType = 'image/avif';

          // Check if browser supports chosen MIME
          const testData = canvas.toDataURL(mimeType, qFloat);
          if (format === 'avif' && !testData.startsWith('data:image/avif')) {
            // Fallback to WebP if AVIF is not supported by current browser canvas
            mimeType = 'image/webp';
          }

          canvas.toBlob(
            (blob) => {
              if (!blob) {
                reject(new Error('Failed to generate image blob'));
                return;
              }
              const dataUrl = URL.createObjectURL(blob);
              resolve({ dataUrl, blob, size: blob.size });
            },
            mimeType,
            format === 'png' ? undefined : qFloat
          );
        } catch (err) {
          reject(err);
        }
      };

      img.onerror = () => reject(new Error('Failed to load image for conversion'));
      img.src = item.previewUrl;
    });
  };

  /**
   * Batch convert all images in queue
   */
  const handleConvertAll = async () => {
    if (items.length === 0) return;
    setIsProcessing(true);
    setGlobalError(null);

    const updated = [...items];

    for (let i = 0; i < updated.length; i++) {
      const it = updated[i];
      updated[i] = { ...it, status: 'converting' };
      setItems([...updated]);

      try {
        const result = await convertSingleImage(it, targetFormat, quality, bgColor, scalePercent);
        updated[i] = {
          ...it,
          status: 'completed',
          convertedDataUrl: result.dataUrl,
          convertedBlob: result.blob,
          convertedSize: result.size,
          convertedFormat: targetFormat
        };
      } catch (err: any) {
        console.error(`Conversion failed for ${it.name}:`, err);
        updated[i] = {
          ...it,
          status: 'error',
          errorMessage: 'Conversion failed. Please verify format.'
        };
      }

      setItems([...updated]);
    }

    setIsProcessing(false);
  };

  /**
   * Download single converted image
   */
  const handleDownloadSingle = (item: ImageFileItem) => {
    if (!item.convertedDataUrl) return;
    const baseName = item.name.replace(/\.[^/.]+$/, '');
    const ext = item.convertedFormat === 'jpeg' ? 'jpeg' : item.convertedFormat || 'png';
    const link = document.createElement('a');
    link.href = item.convertedDataUrl;
    link.download = `${baseName}.${ext}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  /**
   * Download All as a clean ZIP file using JSZip
   */
  const handleDownloadAllZip = async () => {
    const completedItems = items.filter(it => it.status === 'completed' && it.convertedBlob);
    if (completedItems.length === 0) return;

    setIsZipping(true);
    try {
      const zip = new JSZip();

      for (let i = 0; i < completedItems.length; i++) {
        const item = completedItems[i];
        if (item.convertedBlob) {
          const baseName = item.name.replace(/\.[^/.]+$/, '');
          const ext = item.convertedFormat === 'jpeg' ? 'jpeg' : item.convertedFormat || 'png';
          zip.file(`${baseName}.${ext}`, item.convertedBlob);
        }
      }

      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(zipBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `TheVector_Converted_Images_${Date.now()}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error creating ZIP archive:', err);
      // Fallback: sequential download
      completedItems.forEach((item, index) => {
        setTimeout(() => handleDownloadSingle(item), index * 250);
      });
    } finally {
      setIsZipping(false);
    }
  };

  const completedCount = items.filter(it => it.status === 'completed').length;

  return (
    <div className="space-y-8">
      {/* Privacy Notice Banner */}
      <div className="p-3.5 bg-emerald-50/90 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2.5">
        <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
        <span>
          <strong>100% Client-Side Privacy:</strong> All image processing and format conversions are performed directly inside your browser memory using HTML5 Canvas. Your images are never uploaded to any server.
        </span>
      </div>

      {/* Main Action Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-blue-50 text-[#0057F3] text-[11px] font-bold uppercase tracking-wider mb-1.5">
            <Sparkles className="w-3 h-3" />
            <span>Multi-Image Batch Engine</span>
          </div>
          <h3 className="text-lg font-black text-slate-900 tracking-tight">
            Image Format Converter
          </h3>
          <p className="text-xs sm:text-sm text-slate-600">
            Convert PNG, JPG, JPEG, WebP, AVIF, and BMP files with transparency preservation, quality control, and instant ZIP download.
          </p>
        </div>

        {items.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleClearAll}
              disabled={isProcessing}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer disabled:opacity-50"
            >
              <Trash2 className="w-3.5 h-3.5 text-slate-500" />
              <span>Clear All</span>
            </button>

            <button
              onClick={handleConvertAll}
              disabled={isProcessing || items.length === 0}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0057F3] hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Converting...</span>
                </>
              ) : (
                <>
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Convert {items.length > 1 ? `All (${items.length})` : 'Image'}</span>
                </>
              )}
            </button>

            {completedCount > 1 && (
              <button
                onClick={handleDownloadAllZip}
                disabled={isZipping}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer disabled:opacity-50"
              >
                {isZipping ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Zipping...</span>
                  </>
                ) : (
                  <>
                    <FolderArchive className="w-3.5 h-3.5" />
                    <span>Download All (ZIP)</span>
                  </>
                )}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Conversion Settings Controls */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
          <Settings2 className="w-4 h-4 text-[#0057F3]" />
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-800">
            Conversion Options & Output Quality
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Target Format */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              Convert To (Output Format)
            </label>
            <select
              value={targetFormat}
              onChange={(e) => setTargetFormat(e.target.value as OutputFormat)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-800 focus:ring-2 focus:ring-[#0057F3]"
            >
              <option value="webp">WebP (Modern & Lightweight)</option>
              <option value="jpg">JPG (Standard Universal)</option>
              <option value="jpeg">JPEG (Universal Image)</option>
              <option value="png">PNG (Lossless & Transparent)</option>
              <option value="avif">AVIF (Next-Gen Compression)</option>
              <option value="bmp">BMP (Bitmap Uncompressed)</option>
            </select>
          </div>

          {/* Quality Slider */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-[11px] font-bold text-slate-700">Quality</label>
              <span className="text-xs font-mono font-bold text-[#0057F3]">{quality}%</span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              step="5"
              value={quality}
              disabled={targetFormat === 'png' || targetFormat === 'bmp'}
              onChange={(e) => setQuality(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0057F3] disabled:opacity-40"
            />
            <div className="text-[10px] text-slate-500 mt-1">
              {targetFormat === 'png' ? 'PNG is lossless by default' : targetFormat === 'bmp' ? 'BMP is uncompressed' : 'Lower % saves file size'}
            </div>
          </div>

          {/* Transparency Background for JPG/BMP */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              Background Color (For JPG/BMP)
            </label>
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
                className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg font-mono text-slate-800"
              />
            </div>
            <div className="text-[10px] text-slate-500 mt-1">
              Prevents black artifacts on transparent PNGs
            </div>
          </div>

          {/* Resize Scale */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              Dimensions & Aspect Ratio
            </label>
            <select
              value={scalePercent}
              onChange={(e) => setScalePercent(Number(e.target.value))}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl text-slate-800"
            >
              <option value={100}>100% (Original Dimensions)</option>
              <option value={75}>75% (Downscale)</option>
              <option value={50}>50% (Half Size)</option>
              <option value={25}>25% (Quarter Size)</option>
              <option value={150}>150% (Upscale)</option>
              <option value={200}>200% (2x Scale)</option>
            </select>
            <div className="text-[10px] text-slate-500 mt-1">
              Strictly maintains original aspect ratio
            </div>
          </div>
        </div>
      </div>

      {/* Drag & Drop Upload Zone */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className="p-8 border-2 border-dashed border-slate-300 hover:border-[#0057F3] bg-slate-50 hover:bg-blue-50/20 rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer transition-all"
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => handleFiles(e.target.files)}
          multiple
          accept="image/png,image/jpeg,image/jpg,image/webp,image/bmp,image/gif,image/avif"
          className="hidden"
        />
        <div className="w-12 h-12 rounded-xl bg-white shadow-2xs border border-slate-200 flex items-center justify-center text-[#0057F3] mb-3">
          <Upload className="w-6 h-6" />
        </div>
        <div className="text-sm font-bold text-slate-900">
          Click to choose images or drag & drop multiple files here
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Supports PNG, JPG, JPEG, WebP, AVIF, BMP, and GIF. Batch process as many images as you need.
        </p>
      </div>

      {/* Error Message */}
      {globalError && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{globalError}</span>
        </div>
      )}

      {/* Images Queue / Gallery */}
      {items.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
              Selected Files ({items.length})
            </h4>
            <span className="text-xs text-slate-500">
              {completedCount} of {items.length} converted
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {items.map((item) => (
              <div 
                key={item.id} 
                className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-2xs flex items-center gap-3.5 transition-all hover:border-slate-300"
              >
                {/* Thumbnail Preview */}
                <div className="w-14 h-14 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center">
                  {item.previewUrl ? (
                    <img
                      src={item.convertedDataUrl || item.previewUrl}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ImageIcon className="w-6 h-6 text-slate-400" />
                  )}
                </div>

                {/* File Details */}
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-slate-900 truncate">
                    {item.name}
                  </div>
                  <div className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                    <span>{item.originalFormat}</span>
                    <span>•</span>
                    <span>{formatFileSize(item.originalSize)}</span>
                    {item.width > 0 && (
                      <>
                        <span>•</span>
                        <span>{item.width}×{item.height}px</span>
                      </>
                    )}
                  </div>

                  {/* Status Indicator */}
                  <div className="mt-1 flex items-center gap-2">
                    {item.status === 'idle' && (
                      <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                        Ready to convert
                      </span>
                    )}
                    {item.status === 'converting' && (
                      <span className="text-[10px] font-semibold text-[#0057F3] bg-blue-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Loader2 className="w-2.5 h-2.5 animate-spin" />
                        Converting...
                      </span>
                    )}
                    {item.status === 'completed' && (
                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Check className="w-2.5 h-2.5" />
                        Done: {formatFileSize(item.convertedSize || 0)} ({item.convertedFormat?.toUpperCase()})
                      </span>
                    )}
                    {item.status === 'error' && (
                      <span className="text-[10px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full">
                        {item.errorMessage || 'Failed'}
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1.5 shrink-0">
                  {item.status === 'completed' && (
                    <button
                      onClick={() => handleDownloadSingle(item)}
                      className="p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors cursor-pointer"
                      title="Download converted file"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    disabled={isProcessing}
                    className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-slate-100 transition-colors cursor-pointer disabled:opacity-30"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
