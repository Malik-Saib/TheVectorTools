import React, { useState, useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import JSZip from 'jszip';
import { 
  Upload, 
  Trash2, 
  Download, 
  ShieldCheck, 
  FileText, 
  Check, 
  AlertCircle, 
  Loader2,
  FolderArchive,
  RefreshCw,
  Layers,
  Sparkles
} from 'lucide-react';

// Set up worker
try {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version || '4.2.67'}/build/pdf.worker.min.mjs`;
} catch (e) {
  console.warn('PDF.js worker setup fallback:', e);
}

export interface RenderedPage {
  pageNum: number;
  dataUrl: string;
  width: number;
  height: number;
}

export interface PdfDocumentItem {
  id: string;
  name: string;
  sizeFormatted: string;
  totalPages: number;
  status: 'idle' | 'rendering' | 'completed' | 'error';
  errorMessage?: string;
  pages: RenderedPage[];
}

export const PdfToJpg: React.FC = () => {
  const [documents, setDocuments] = useState<PdfDocumentItem[]>([]);
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

  const processSinglePdf = async (file: File): Promise<PdfDocumentItem> => {
    const docItem: PdfDocumentItem = {
      id: `${file.name}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      name: file.name,
      sizeFormatted: formatFileSize(file.size),
      totalPages: 0,
      status: 'rendering',
      pages: []
    };

    try {
      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;
      const totalPages = pdf.numPages;
      docItem.totalPages = totalPages;

      const renderedList: RenderedPage[] = [];

      for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const viewport = page.getViewport({ scale: 1.5 }); // Crisp 1.5x scale

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        if (context) {
          // White background to avoid dark/transparent rendering
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

      docItem.pages = renderedList;
      docItem.status = 'completed';
    } catch (err: any) {
      console.error(`Error rendering PDF ${file.name}:`, err);
      docItem.status = 'error';
      docItem.errorMessage = 'Unable to render PDF. File may be encrypted or corrupted.';
    }

    return docItem;
  };

  const handleFiles = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    setGlobalError(null);

    const pdfFiles = Array.from(fileList).filter(
      (f) => f.type === 'application/pdf' || f.name.toLowerCase().endsWith('.pdf')
    );

    if (pdfFiles.length === 0) {
      setGlobalError('Please select valid PDF file(s).');
      return;
    }

    setIsProcessing(true);

    for (const file of pdfFiles) {
      const renderedDoc = await processSinglePdf(file);
      setDocuments((prev) => [...prev, renderedDoc]);
    }

    setIsProcessing(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleRemoveDoc = (id: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
  };

  const handleClearAll = () => {
    setDocuments([]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDownloadSinglePage = (docName: string, page: RenderedPage) => {
    const link = document.createElement('a');
    link.href = page.dataUrl;
    link.download = `${docName.replace(/\.pdf$/i, '')}-page-${page.pageNum}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadDocAllPages = (doc: PdfDocumentItem) => {
    doc.pages.forEach((page, index) => {
      setTimeout(() => {
        handleDownloadSinglePage(doc.name, page);
      }, index * 200);
    });
  };

  /**
   * Downloads all rendered JPG pages from all uploaded PDFs as a single ZIP archive.
   */
  const handleDownloadAllZip = async () => {
    const totalPagesCount = documents.reduce((acc, d) => acc + d.pages.length, 0);
    if (totalPagesCount === 0) return;

    setIsZipping(true);
    try {
      const zip = new JSZip();

      for (const doc of documents) {
        if (doc.status === 'completed' && doc.pages.length > 0) {
          const docFolder = documents.length > 1 
            ? zip.folder(doc.name.replace(/\.pdf$/i, '')) 
            : zip;

          for (const page of doc.pages) {
            // Convert dataUrl to blob
            const res = await fetch(page.dataUrl);
            const blob = await res.blob();
            const fileName = `${doc.name.replace(/\.pdf$/i, '')}-page-${page.pageNum}.jpg`;
            docFolder?.file(fileName, blob);
          }
        }
      }

      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(zipBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `TheVector_PdfPages_JPG_${Date.now()}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error creating PDF to JPG zip:', err);
    } finally {
      setIsZipping(false);
    }
  };

  const totalPagesRendered = documents.reduce((acc, d) => acc + d.pages.length, 0);

  return (
    <div className="space-y-6">
      {/* Privacy Notice Banner */}
      <div className="p-3.5 bg-emerald-50/90 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2.5">
        <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
        <span>
          <strong>100% Client-Side Privacy:</strong> Your PDF documents never leave your computer. All rendering is executed directly in your browser memory via HTML5 Canvas.
        </span>
      </div>

      {/* Action Bar when files are loaded */}
      {documents.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
              {documents.length} PDF{documents.length > 1 ? 's' : ''} Uploaded
            </span>
            <span className="text-xs text-slate-500">
              ({totalPagesRendered} page{totalPagesRendered !== 1 ? 's' : ''} extracted)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleClearAll}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5 text-slate-500" />
              <span>Clear All</span>
            </button>

            {totalPagesRendered > 0 && (
              <button
                onClick={handleDownloadAllZip}
                disabled={isZipping}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-[#0057F3] hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer disabled:opacity-50"
              >
                {isZipping ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Creating ZIP...</span>
                  </>
                ) : (
                  <>
                    <FolderArchive className="w-3.5 h-3.5" />
                    <span>Download All Pages (ZIP)</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      )}

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
          accept="application/pdf"
          multiple
          className="hidden"
        />
        <div className="w-12 h-12 rounded-xl bg-white shadow-2xs border border-slate-200 flex items-center justify-center text-emerald-600 mb-3">
          <Upload className="w-6 h-6" />
        </div>
        <div className="text-sm font-bold text-slate-800">
          Click to choose PDF file(s) or drag and drop multiple PDFs here
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Supports multiple PDF files simultaneously. Each page is converted to crisp, high-resolution JPG.
        </p>
      </div>

      {/* Status / Loading State */}
      {isProcessing && (
        <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 flex flex-col items-center justify-center text-center">
          <Loader2 className="w-7 h-7 text-emerald-600 animate-spin mb-2" />
          <span className="text-sm font-bold text-slate-800">Rendering PDF pages to high-DPI JPG...</span>
          <span className="text-xs text-slate-500 mt-0.5">Running locally in browser memory</span>
        </div>
      )}

      {/* Global Error display */}
      {globalError && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{globalError}</span>
        </div>
      )}

      {/* Documents & Pages Gallery */}
      {documents.map((doc) => (
        <div key={doc.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
          {/* Document Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0 border border-red-100">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate max-w-md">
                  {doc.name}
                </h4>
                <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                  <span>{doc.sizeFormatted}</span>
                  <span>•</span>
                  <span>{doc.pages.length} page{doc.pages.length !== 1 ? 's' : ''}</span>
                  {doc.status === 'completed' && (
                    <span className="text-emerald-600 font-semibold flex items-center gap-1">
                      <Check className="w-3 h-3" /> Ready
                    </span>
                  )}
                  {doc.status === 'error' && (
                    <span className="text-rose-600 font-semibold">{doc.errorMessage}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {doc.pages.length > 1 && (
                <button
                  onClick={() => handleDownloadDocAllPages(doc)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Download Pages</span>
                </button>
              )}
              <button
                onClick={() => handleRemoveDoc(doc.id)}
                className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                title="Remove this PDF"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Rendered Pages Grid */}
          {doc.pages.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 pt-2">
              {doc.pages.map((page) => (
                <div 
                  key={page.pageNum}
                  className="group relative bg-slate-50 border border-slate-200 rounded-xl overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col"
                >
                  <div className="aspect-[3/4] overflow-hidden bg-white flex items-center justify-center p-2">
                    <img 
                      src={page.dataUrl} 
                      alt={`Page ${page.pageNum}`}
                      className="max-h-full max-w-full object-contain shadow-xs border border-slate-100 rounded"
                    />
                  </div>

                  <div className="p-2.5 bg-white border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-700">Page {page.pageNum}</span>
                    <button
                      onClick={() => handleDownloadSinglePage(doc.name, page)}
                      className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors cursor-pointer"
                      title="Download this page as JPG"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
