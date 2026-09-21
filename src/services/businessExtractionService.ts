import * as XLSX from 'xlsx';

export type ExtractionStatus = 
  | 'idle' 
  | 'file_uploaded' 
  | 'requires_api_connection' 
  | 'completed' 
  | 'error';

export interface FileValidationResult {
  valid: boolean;
  error?: string;
  fileInfo?: {
    name: string;
    sizeFormatted: string;
    type: string;
  };
}

export interface InvoiceLineItem {
  id: string;
  description: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  tax: number;
  lineTotal: number;
}

export interface InvoiceData {
  supplier: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  currency: string;
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  items: InvoiceLineItem[];
}

export interface BankStatementRow {
  id: string;
  date: string;
  description: string;
  reference: string;
  debit: number | null;
  credit: number | null;
  balance: number;
  currency: string;
}

export interface ExpenseRow {
  id: string;
  date: string;
  merchant: string;
  category: string;
  description: string;
  subtotal: number;
  tax: number;
  total: number;
  currency: string;
  paymentMethod: string;
}

export interface PurchaseOrderItem {
  id: string;
  poNumber: string;
  supplier: string;
  date: string;
  deliveryDate: string;
  sku: string;
  product: string;
  quantity: number;
  unitPrice: number;
  tax: number;
  total: number;
}

export interface TableRow {
  id: string;
  [column: string]: any;
}

export interface DetectedTable {
  id: string;
  name: string;
  headers: string[];
  rows: TableRow[];
}

/**
 * Validates uploaded files against acceptable formats and size limits (max 25MB)
 */
export function validateBusinessDocumentFile(
  file: File, 
  allowedExtensions: string[] = ['pdf', 'jpg', 'jpeg', 'png', 'webp']
): FileValidationResult {
  const extension = file.name.split('.').pop()?.toLowerCase() || '';
  
  if (!allowedExtensions.includes(extension)) {
    return {
      valid: false,
      error: `Unsupported file format (.${extension}). Allowed formats: ${allowedExtensions.map(e => '.' + e).join(', ')}.`
    };
  }

  const maxBytes = 25 * 1024 * 1024; // 25MB
  if (file.size > maxBytes) {
    return {
      valid: false,
      error: `File size exceeds the 25MB client memory limit. Current size: ${(file.size / (1024 * 1024)).toFixed(1)}MB.`
    };
  }

  if (file.size === 0) {
    return {
      valid: false,
      error: 'The uploaded file is empty (0 bytes).'
    };
  }

  const sizeFormatted = file.size > 1024 * 1024 
    ? `${(file.size / (1024 * 1024)).toFixed(2)} MB`
    : `${(file.size / 1024).toFixed(1)} KB`;

  return {
    valid: true,
    fileInfo: {
      name: file.name,
      sizeFormatted,
      type: file.type || extension.toUpperCase()
    }
  };
}

/**
 * Universal XLSX Export Utility
 */
export function exportToExcelFile(
  data: any[], 
  fileName: string = 'export.xlsx', 
  sheetName: string = 'Data'
): boolean {
  try {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, fileName.endsWith('.xlsx') ? fileName : `${fileName}.xlsx`);
    return true;
  } catch (err) {
    console.error('Failed to export Excel file:', err);
    return false;
  }
}

/**
 * Multi-sheet XLSX Export Utility (used by CSV to Business Formatter)
 */
export function exportMultiSheetExcel(
  sheets: { name: string; data: any[] }[],
  fileName: string = 'business_workbook.xlsx'
): boolean {
  try {
    const wb = XLSX.utils.book_new();
    sheets.forEach((s) => {
      const ws = XLSX.utils.json_to_sheet(s.data);
      XLSX.utils.book_append_sheet(wb, ws, s.name.substring(0, 31));
    });
    XLSX.writeFile(wb, fileName.endsWith('.xlsx') ? fileName : `${fileName}.xlsx`);
    return true;
  } catch (err) {
    console.error('Failed to export multi-sheet Excel file:', err);
    return false;
  }
}
