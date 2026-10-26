import { useEffect, useRef } from 'react';
import { useCart } from '../store/useCart';
import { CartItemRow } from './CartItemRow';
import { CartSummary } from './CartSummary';

interface CartPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartPanel({ isOpen, onClose }: CartPanelProps) {
  const { state } = useCart();
  const panelRef = useRef<HTMLDivElement>(null);

  // Trap focus inside the panel while open
  useEffect(() => {
    if (!isOpen || !panelRef.current) return;

    const panel = panelRef.current;
    const focusableSelector =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const focusableElements = panel.querySelectorAll<HTMLElement>(focusableSelector);

    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key !== 'Tab' || focusableElements.length === 0) return;

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    panel.addEventListener('keydown', handleKeyDown);
    return () => panel.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div className="cart-overlay" onClick={onClose} />
      <div
        className="cart-panel"
        ref={panelRef}
        role="dialog"
        aria-label="Shopping cart"
      >
        <div className="cart-panel__header">
          <h2 className="cart-panel__title">Your Cart</h2>
          <button
            type="button"
            className="cart-panel__close-btn"
            aria-label="Close cart"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {state.items.length === 0 ? (
          <p className="cart-panel__empty" role="status">
            Your cart is empty.
          </p>
        ) : (
          <div className="cart-panel__items">
            {state.items.map((item) => (
              <CartItemRow key={item.product.id} item={item} />
            ))}
            <CartSummary />
          </div>
        )}
      </div>
    </>
  );
}
