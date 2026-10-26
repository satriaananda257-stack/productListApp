import { useCart } from '../store/useCart';

export function CartBadge() {
  const { state } = useCart();
  const count = state.items.length;

  return (
    <span
      aria-label={`${count} item${count !== 1 ? 's' : ''} in cart`}
      className="cart-badge"
    >
      {count}
    </span>
  );
}
