import { useCart } from '../store/useCart';
import { ProductCard } from './ProductCard';
import type { Product } from '../types';

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  const { state, dispatch } = useCart();

  if (products.length === 0) {
    return (
      <div className="product-grid__empty" role="status">
        No products found for this category.
      </div>
    );
  }

  return (
    <div className="product-grid" role="list">
      {products.map((product) => {
        const cartItem = state.items.find((item) => item.product.id === product.id);
        const inCart = cartItem !== undefined;
        const atMax = cartItem !== undefined && cartItem.quantity >= 999;

        return (
          <div key={product.id} role="listitem">
            <ProductCard
              product={product}
              inCart={inCart}
              atMax={atMax}
              onAddToCart={() => dispatch({ type: 'ADD_ITEM', productId: product.id })}
            />
          </div>
        );
      })}
    </div>
  );
}
