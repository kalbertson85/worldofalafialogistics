import { useEffect, useRef } from 'react';

export function useFocusTrap(active = true) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!active || !ref.current) return;

    const focusableElements = ref.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    // Focus the first element when the trap is activated
    firstElement.focus();

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [active]);

  return ref;
}

export function useAriaLive(active = true) {
  useEffect(() => {
    if (!active) return;

    const root = document.documentElement;
    root.setAttribute('aria-live', 'polite');
    root.setAttribute('aria-atomic', 'true');

    return () => {
      root.removeAttribute('aria-live');
      root.removeAttribute('aria-atomic');
    };
  }, [active]);
}

export function useSkipToContent() {
  useEffect(() => {
    const mainContent = document.getElementById('main-content');
    if (!mainContent) return;

    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-background focus:text-foreground focus:ring-2 focus:ring-primary focus:rounded';
    skipLink.textContent = 'Skip to main content';
    
    document.body.prepend(skipLink);
    
    return () => {
      if (document.body.contains(skipLink)) {
        document.body.removeChild(skipLink);
      }
    };
  }, []);
}
