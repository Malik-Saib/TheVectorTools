import React, { useState, useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import workerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import { Upload, Trash2, Download, ShieldCheck, FileText, Check, AlertCircle, Loader2 } from 'lucide-react';

// Set up worker
pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;

interface RenderedPage {
  pageNum: number;
  dataUrl: string;
  width: number;
  height: number;
}

export const PdfToJpg: React.FC = () => {
  const [fileName, setFileName] = useState<string>('');
  const [pages, setPages] = useState<RenderedPage[]>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [downloadedAll, setDownloadedAll] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePdfUpload = async (file: File) => {
    const isPdf = file?.type === 'application/pdf' || /\.pdf$/i.test(file?.name ?? '');
    if (!file || !isPdf) {
      setErrorMsg('Please select a valid PDF file.');
      return;
    }

    setErrorMsg(null);
    setIsProcessing(true);
    setFileName(file.name);
    setPages([]);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;
      const totalPages = pdf.numPages;

      const renderedList: RenderedPage[] = [];

      for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const viewport = page.getViewport({ scale: 150 / 72 });

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        if (context) {
          // White background
          context.fillStyle = '#FFFFFF';
          context.fillRect(0, 0, canvas.width, canvas.height);

          await page.render({
            canvasContext: context,
            viewport: viewport,
            canvas: canvas
          } as any).promise;

          const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
          renderedList.push({
            pageNum,
            dataUrl,
            width: viewport.width,
            height: viewport.height
          });
        }
      }

      setPages(renderedList);
    } catch (err: any) {
      console.error('PDF parsing error:', err);
      setErrorMsg('Unable to render PDF in browser. The file might be password-protected or corrupted.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadSingle = (page: RenderedPage) => {
    const link = document.createElement('a');
    link.href = page.dataUrl;
    link.download = `${fileName.replace(/\.pdf$/i, '')}-page-${page.pageNum}.jpg`;
    link.click();
  };

  const handleDownloadAll = () => {
    pages.forEach((page, index) => {
      setTimeout(() => {
        handleDownloadSingle(page);
      }, index * 200);
    });
    setDownloadedAll(true);
    setTimeout(() => setDownloadedAll(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Privacy Notice Banner */}
      <div className="p-3.5 bg-emerald-50/90 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2.5">
        <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
        <span>
          <strong>100% Client-Side Privacy:</strong> Your PDF never leaves your device. Conversion happens directly on your machine using HTML5 Canvas.
        </span>
      </div>

      {/* Drag & Drop Upload Zone */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          if (e.dataTransfer.files?.[0]) handlePdfUpload(e.dataTransfer.files[0]);
        }}
        onClick={() => fileInputRef.current?.click()}
        className="p-8 border-2 border-dashed border-slate-300 hover:border-emerald-500 bg-slate-50 hover:bg-emerald-50/30 rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer transition-all"
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => {
            if (e.target.files?.[0]) handlePdfUpload(e.target.files[0]);
          }}
          accept="application/pdf"
          className="hidden"
        />
        <div className="w-12 h-12 rounded-xl bg-white shadow-2xs border border-slate-200 flex items-center justify-center text-emerald-600 mb-3">
          <Upload className="w-6 h-6" />
        </div>
        <div className="text-sm font-bold text-slate-800">
          Click to choose a PDF file or drag and drop here
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Supports single-page and multi-page PDFs. Converted to high-quality JPGs.
        </p>
      </div>

      {/* Status / Loading State */}
      {isProcessing && (
        <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 flex flex-col items-center justify-center text-center">
          <Loader2 className="w-7 h-7 text-emerald-600 animate-spin mb-2" />
          <span className="text-sm font-bold text-slate-800">Rendering PDF pages to JPG...</span>
          <span className="text-xs text-slate-500 mt-0.5">This runs locally in your browser memory</span>
        </div>
      )}

      {/* Error display */}
      {errorMsg && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Rendered Pages Gallery */}
      {pages.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Extracted Pages ({pages.length} Pages from {fileName})
              </h4>
              <span className="text-xs text-slate-400">Crisp 150 DPI JPG rendering</span>
            </div>

            <button
              onClick={handleDownloadAll}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-xs transition-colors cursor-pointer"
            >
              {downloadedAll ? <Check className="w-3.5 h-3.5" /> : <Download className="w-3.5 h-3.5" />}
              <span>{downloadedAll ? 'Downloading Pages...' : 'Download All Pages (.JPG)'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pages.map((page) => (
              <div key={page.pageNum} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
                <div className="w-full h-56 bg-slate-100 flex items-center justify-center p-2 border-b border-slate-100">
                  <img
                    src={page.dataUrl}
                    alt={`Page ${page.pageNum}`}
                    className="max-w-full max-h-full object-contain shadow-xs rounded"
                  />
                </div>
                <div className="p-3 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">
                    Page {page.pageNum}
                  </span>
                  <button
                    onClick={() => handleDownloadSingle(page)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-md cursor-pointer transition-colors"
                  >
                    <Download className="w-3 h-3" />
                    <span>Download JPG</span>
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
