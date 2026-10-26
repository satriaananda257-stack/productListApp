import { useState } from 'react';
import type { CartItem } from '../types';
import { useCart } from '../store/useCart';
import { QuantityControl } from './QuantityControl';

// Same placeholder used by ProductCard — a data URI that never triggers onError
const PLACEHOLDER_SRC =
  'data:image/svg+xml,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%22400%22 height%3D%22300%22 viewBox%3D%220 0 400 300%22%3E%3Crect width%3D%22400%22 height%3D%22300%22 fill%3D%22%23e5e7eb%22%2F%3E%3Ctext x%3D%2250%25%22 y%3D%2250%25%22 dominant-baseline%3D%22middle%22 text-anchor%3D%22middle%22 font-family%3D%22sans-serif%22 font-size%3D%2216%22 fill%3D%22%236b7280%22%3EImage not available%3C%2Ftext%3E%3C%2Fsvg%3E';

const usd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export interface CartItemRowProps {
  item: CartItem;
}

export function CartItemRow({ item }: CartItemRowProps) {
  const { dispatch } = useCart();
  const { product, quantity } = item;

  const [imgSrc, setImgSrc] = useState(product.image);
  const [imgFailed, setImgFailed] = useState(false);

  function handleImageError() {
    if (!imgFailed) {
      setImgFailed(true);
      setImgSrc(PLACEHOLDER_SRC);
    }
  }

  const unitPrice = usd.format(product.price);
  const subtotal = usd.format(product.price * quantity);

  return (
    <div className="cart-item-row">
      <div className="cart-item-row__image-wrapper">
        <img
          src={imgSrc}
          alt={product.name}
          className="cart-item-row__image"
          onError={handleImageError}
        />
      </div>

      <div className="cart-item-row__details">
        <p className="cart-item-row__name">{product.name}</p>
        <p className="cart-item-row__unit-price">{unitPrice}</p>
      </div>

      <div className="cart-item-row__quantity">
        <QuantityControl
          quantity={quantity}
          onIncrement={() =>
            dispatch({ type: 'INCREMENT', productId: product.id })
          }
          onDecrement={() =>
            dispatch({ type: 'DECREMENT', productId: product.id })
          }
          onChange={(n) =>
            dispatch({ type: 'SET_QUANTITY', productId: product.id, quantity: n })
          }
        />
      </div>

      <p className="cart-item-row__subtotal">{subtotal}</p>

      <button
        type="button"
        className="cart-item-row__remove-btn"
        aria-label={`Remove ${product.name} from cart`}
        onClick={() => dispatch({ type: 'REMOVE_ITEM', productId: product.id })}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            dispatch({ type: 'REMOVE_ITEM', productId: product.id });
          }
        }}
      >
        Remove
      </button>
    </div>
  );
}
