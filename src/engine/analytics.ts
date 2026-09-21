// Privacy-conscious anonymous analytics helper
export type AnalyticsEvent = 
  | 'calculator_started'
  | 'calculator_completed'
  | 'country_selected'
  | 'calculator_type_selected'
  | 'tax_year_changed'
  | 'frequency_changed'
  | 'comparison_performed';

interface EventPayload {
  country?: string;
  taxYear?: number;
  calculatorType?: string;
  frequency?: string;
  [key: string]: any;
}

export function trackEvent(eventName: AnalyticsEvent, payload: EventPayload = {}): void {
  // Never log exact sensitive salary values
  const safePayload = { ...payload };
  delete safePayload.grossSalary;
  delete safePayload.netSalary;
  delete safePayload.salary;

  try {
    // 1. Local telemetry event for debugging / compliance
    if (typeof window !== 'undefined' && (window as any).__EUROSALARY_ANALYTICS_DEBUG__) {
      console.log(`[EuroSalary Analytics] Event: ${eventName}`, safePayload);
    }

    // 2. Extensible hooks for Plausible / Umami / Cloudflare Web Analytics if configured
    if (typeof window !== 'undefined' && typeof (window as any).plausible === 'function') {
      (window as any).plausible(eventName, { props: safePayload });
    }
  } catch {
    // Fail silently to never interrupt user interaction
  }
}
