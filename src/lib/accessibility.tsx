import * as React from 'react';

// Utility functions for accessibility
export const getAriaLabel = (element: string, index?: number, total?: number): string => {
  if (index !== undefined && total !== undefined) {
    return `${element} ${index + 1} of ${total}`;
  }
  return element;
};

// Focus management
export const focusOnFirst = (containerId: string): void => {
  if (typeof document === 'undefined') return;
  
  const container = document.getElementById(containerId);
  if (container) {
    const focusable = container.querySelector<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    focusable?.focus();
  }
};

// ARIA live regions
export const announce = (message: string, mode: 'polite' | 'assertive' = 'polite'): void => {
  if (typeof document === 'undefined') return;
  
  const liveRegion = document.getElementById('a11y-live-region');
  if (liveRegion) {
    liveRegion.setAttribute('aria-live', 'off');
    liveRegion.textContent = message;
    liveRegion.setAttribute('aria-live', mode);
  }
};

// Initialize live region if it doesn't exist
const initLiveRegion = (): void => {
  if (typeof document !== 'undefined' && !document.getElementById('a11y-live-region')) {
    const liveRegion = document.createElement('div');
    liveRegion.id = 'a11y-live-region';
    liveRegion.className = 'sr-only';
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    document.body.appendChild(liveRegion);
  }
};

// Initialize live region on import
initLiveRegion();

// Screen reader only class
export const srOnly = 'sr-only';

// Focus styles for keyboard navigation
export const focusRing = 'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background';

// Skip link component
export const SkipLink: React.FC = () => {
  return (
    <a
      href="#main-content"
      className={`${srOnly} focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-background focus:text-foreground focus:ring-2 focus:ring-primary`}
    >
      Skip to main content
    </a>
  );
};
