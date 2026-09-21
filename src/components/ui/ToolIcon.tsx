import React from 'react';
import {
  Banknote,
  Receipt,
  Percent,
  Calculator,
  TrendingUp,
  Coins,
  Home,
  PiggyBank,
  Ruler,
  ArrowLeftRight,
  Clock,
  Calendar,
  FileText,
  Type,
  FileImage,
  FileCheck,
  FileSpreadsheet,
  Table,
  Building2,
  Sparkles,
  DollarSign,
  FileSignature,
  QrCode,
  Barcode,
  Target,
  LineChart,
  ShoppingBag,
  HelpCircle
} from 'lucide-react';

interface ToolIconProps {
  name: string;
  className?: string;
}

export const ToolIcon: React.FC<ToolIconProps> = ({ name, className = 'w-5 h-5' }) => {
  switch (name) {
    case 'Banknote': return <Banknote className={className} />;
    case 'Receipt': return <Receipt className={className} />;
    case 'Percent': return <Percent className={className} />;
    case 'Calculator': return <Calculator className={className} />;
    case 'TrendingUp': return <TrendingUp className={className} />;
    case 'Coins': return <Coins className={className} />;
    case 'Home': return <Home className={className} />;
    case 'PiggyBank': return <PiggyBank className={className} />;
    case 'Ruler': return <Ruler className={className} />;
    case 'ArrowLeftRight': return <ArrowLeftRight className={className} />;
    case 'Clock': return <Clock className={className} />;
    case 'Calendar': return <Calendar className={className} />;
    case 'FileText': return <FileText className={className} />;
    case 'Type': return <Type className={className} />;
    case 'FileImage': return <FileImage className={className} />;
    case 'FileCheck': return <FileCheck className={className} />;
    case 'FileSpreadsheet': return <FileSpreadsheet className={className} />;
    case 'Table': return <Table className={className} />;
    case 'Building2': return <Building2 className={className} />;
    case 'Sparkles': return <Sparkles className={className} />;
    case 'DollarSign': return <DollarSign className={className} />;
    case 'FileSignature': return <FileSignature className={className} />;
    case 'QrCode': return <QrCode className={className} />;
    case 'Barcode': return <Barcode className={className} />;
    case 'Target': return <Target className={className} />;
    case 'LineChart': return <LineChart className={className} />;
    case 'ShoppingBag': return <ShoppingBag className={className} />;
    default: return <HelpCircle className={className} />;
  }
};
