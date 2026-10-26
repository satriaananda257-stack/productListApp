import { useState } from 'react';
import type { Product } from '../types';

// A minimal 1×1 grey PNG data URI — never triggers another onError
const PLACEHOLDER_SRC =
  'data:image/svg+xml,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%22400%22 height%3D%22300%22 viewBox%3D%220 0 400 300%22%3E%3Crect width%3D%22400%22 height%3D%22300%22 fill%3D%22%23e5e7eb%22%2F%3E%3Ctext x%3D%2250%25%22 y%3D%2250%25%22 dominant-baseline%3D%22middle%22 text-anchor%3D%22middle%22 font-family%3D%22sans-serif%22 font-size%3D%2216%22 fill%3D%22%236b7280%22%3EImage not available%3C%2Ftext%3E%3C%2Fsvg%3E';

export interface ProductCardProps {
  product: Product;
  inCart: boolean;
  atMax: boolean;
  onAddToCart: () => void;
}

export function ProductCard({ product, inCart, atMax, onAddToCart }: ProductCardProps) {
  const [imgSrc, setImgSrc] = useState(product.image);
  const [imgFailed, setImgFailed] = useState(false);

  function handleImageError() {
    if (!imgFailed) {
      setImgFailed(true);
      setImgSrc(PLACEHOLDER_SRC);
    }
  }

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(product.price);

  const buttonLabel = inCart ? 'Added to Cart' : 'Add to Cart';
  const buttonDisabled = atMax;

  return (
    <article className="product-card">
      <div className="product-card__image-wrapper">
        <img
          src={imgSrc}
          alt={product.name}
          className="product-card__image"
          onError={handleImageError}
        />
      </div>
      <div className="product-card__body">
        <span className="product-card__category">{product.category}</span>
        <h2 className="product-card__name">{product.name}</h2>
        <p className="product-card__price">{formattedPrice}</p>
      </div>
      <div className="product-card__footer">
        <button
          type="button"
          className={`product-card__add-btn${inCart ? ' product-card__add-btn--in-cart' : ''}`}
          onClick={onAddToCart}
          disabled={buttonDisabled}
          aria-disabled={buttonDisabled ? 'true' : undefined}
          aria-label={
            atMax
              ? `${product.name} — maximum quantity reached`
              : inCart
              ? `${product.name} — added to cart`
              : `Add ${product.name} to cart`
          }
        >
          {buttonLabel}
        </button>
      </div>
    </article>
  );
}
