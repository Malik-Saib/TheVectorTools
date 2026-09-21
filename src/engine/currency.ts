import { CurrencyCode } from '../types';

export const CURRENCY_SYMBOLS: Record<CurrencyCode, string> = {
  EUR: '€',
  GBP: '£',
  CHF: 'CHF',
  PLN: 'zł',
  SEK: 'kr',
  DKK: 'kr',
  NOK: 'kr',
  USD: '$',
  CAD: 'CA$',
  AUD: 'A$',
  NZD: 'NZ$',
};

// Benchmark exchange rates relative to 1 EUR (representative market rates)
export const EUR_EXCHANGE_RATES: Record<CurrencyCode, number> = {
  EUR: 1.0,
  GBP: 0.855,
  CHF: 0.945,
  PLN: 4.28,
  SEK: 11.25,
  DKK: 7.46,
  NOK: 11.45,
  USD: 1.09,
  CAD: 1.48,
  AUD: 1.66,
  NZD: 1.78,
};

export function formatCurrency(
  amount: number,
  currency: CurrencyCode = 'EUR',
  options: { decimals?: number; showSymbol?: boolean } = {}
): string {
  const { decimals = 0, showSymbol = true } = options;
  const symbol = showSymbol ? CURRENCY_SYMBOLS[currency] || currency : '';

  const formattedNum = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(Math.round(amount * Math.pow(10, decimals)) / Math.pow(10, decimals));

  if (!showSymbol) return formattedNum;

  // Formatting placement
  if (['EUR', 'GBP', 'USD', 'CAD', 'AUD', 'NZD'].includes(currency)) {
    return `${symbol}${formattedNum}`;
  }
  return `${formattedNum} ${symbol}`;
}

export function convertCurrency(
  amount: number,
  from: CurrencyCode,
  to: CurrencyCode
): number {
  if (from === to) return amount;
  const eurRateFrom = EUR_EXCHANGE_RATES[from] || 1;
  const eurRateTo = EUR_EXCHANGE_RATES[to] || 1;
  
  // convert to EUR first, then to target
  const inEUR = amount / eurRateFrom;
  return inEUR * eurRateTo;
}
