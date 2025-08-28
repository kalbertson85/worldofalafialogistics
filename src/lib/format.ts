/**
 * Format a number as currency
 * Uses Sierra Leone Leones (SLL) as default currency
 */
export function formatCurrency(value: number, currency = 'SLL'): string {
  return new Intl.NumberFormat('en-SL', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0, // SLL doesn't use decimal places
    currencyDisplay: 'code', // Shows 'SLL' instead of 'Le'
  }).format(value).replace('SLL', 'SLL '); // Add space after SLL for better readability
}

/**
 * Format a number with commas
 */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value);
}

/**
 * Format a date string
 */
export function formatDate(dateString: string, options: Intl.DateTimeFormatOptions = {}) {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  };
  
  return new Date(dateString).toLocaleDateString('en-US', defaultOptions);
}

/**
 * Format a duration in minutes to a human-readable string
 */
export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (remainingMinutes === 0) {
    return `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
  }
  
  return `${hours} ${hours === 1 ? 'hour' : 'hours'} ${remainingMinutes} min`;
}
