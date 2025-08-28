/**
 * Accessibility utilities for better keyboard navigation and screen reader support
 */

type AriaProps = {
  // Standard ARIA attributes
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-hidden'?: boolean | 'false' | 'true';
  'aria-modal'?: 'true' | 'false' | boolean;
  'aria-invalid'?: 'true' | 'false' | boolean | 'grammar' | 'spelling';
  'aria-expanded'?: 'true' | 'false' | boolean;
  'aria-controls'?: string;
  'aria-haspopup'?: boolean | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog';
  
  // Standard HTML attributes
  role?: string;
  tabIndex?: number;
  id?: string;
};

/**
 * Returns the appropriate ARIA attributes for an icon button
 */
export function getIconButtonAriaProps(label: string, describedBy?: string): AriaProps {
  return {
    'aria-label': label,
    'aria-labelledby': describedBy ? describedBy : undefined,
    role: 'button',
    tabIndex: 0,
  };
}

/**
 * Returns the appropriate ARIA attributes for a modal/dialog
 */
export function getModalAriaProps(id: string, labelledBy: string): AriaProps {
  return {
    role: 'dialog',
    'aria-modal': 'true',
    'aria-labelledby': labelledBy,
    tabIndex: -1,
  };
}

/**
 * Returns the appropriate ARIA attributes for a form field
 */
export function getFormFieldAriaProps(
  id: string,
  label: string,
  error?: string,
  description?: string
): AriaProps {
  const props: AriaProps = {
    'aria-labelledby': `${id}-label`,
  };

  if (error) {
    props['aria-invalid'] = 'true';
    props['aria-describedby'] = `${id}-error`;
  } else if (description) {
    props['aria-describedby'] = `${id}-description`;
  }

  return props;
}

/**
 * Focuses the first focusable element in a container
 */
export function focusFirstFocusable(container: HTMLElement | null) {
  if (!container) return;

  const focusable = container.querySelector<HTMLElement>(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  if (focusable) {
    focusable.focus();
  }
}

/**
 * Traps focus within a container for modal dialogs
 */
export function trapFocus(container: HTMLElement | null) {
  if (!container) return () => {};

  const focusableElements = container.querySelectorAll<HTMLElement>(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );

  if (focusableElements.length === 0) return () => {};

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

  document.addEventListener('keydown', handleKeyDown);
  return () => document.removeEventListener('keydown', handleKeyDown);
}

/**
 * Adds smooth scrolling behavior to the document
 */
export function enableSmoothScrolling() {
  document.documentElement.style.scrollBehavior = 'smooth';
  return () => {
    document.documentElement.style.scrollBehavior = '';
  };
}

/**
 * Disables scrolling on the body (for modals)
 */
export function disableBodyScroll(active = true) {
  if (active) {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }
  return () => {};
}
