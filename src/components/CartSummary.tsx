import { useCart } from '../store/useCart';

export function CartSummary() {
  const { state } = useCart();

  if (state.items.length === 0) return null;

  const total = state.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const formattedTotal = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(total);

  return (
    <div className="cart-summary">
      <span className="cart-summary__label">Total</span>
      <span className="cart-summary__total">{formattedTotal}</span>
    </div>
  );
}
