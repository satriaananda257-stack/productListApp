import { CartBadge } from './CartBadge';

interface HeaderProps {
  onToggleCart: () => void;
}

export function Header({ onToggleCart }: HeaderProps) {
  return (
    <header className="app-header">
      <h1 className="app-title">Product List</h1>
      <button
        className="cart-button"
        onClick={onToggleCart}
        aria-label="Toggle cart"
        type="button"
      >
        <svg
          className="cart-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          focusable="false"
          width="24"
          height="24"
        >
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
        <CartBadge />
      </button>
    </header>
  );
}
