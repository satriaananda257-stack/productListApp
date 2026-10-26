import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import type { Product } from '../types';
import { ProductCard } from './ProductCard';

const product: Product = {
  id: 'e1',
  name: 'Wireless Headphones',
  image: 'https://example.com/headphones.jpg',
  price: 79.99,
  category: 'Electronics',
};

describe('ProductCard', () => {
  it('renders product name, category, and formatted price', () => {
    render(
      <ProductCard product={product} inCart={false} atMax={false} onAddToCart={() => {}} />
    );
    expect(screen.getByText('Wireless Headphones')).toBeInTheDocument();
    expect(screen.getByText('Electronics')).toBeInTheDocument();
    expect(screen.getByText('$79.99')).toBeInTheDocument();
  });

  it('renders product image with alt equal to product name', () => {
    render(
      <ProductCard product={product} inCart={false} atMax={false} onAddToCart={() => {}} />
    );
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('alt', 'Wireless Headphones');
    expect(img).toHaveAttribute('src', product.image);
  });

  it('shows "Add to Cart" button when inCart is false', () => {
    render(
      <ProductCard product={product} inCart={false} atMax={false} onAddToCart={() => {}} />
    );
    expect(screen.getByRole('button', { name: /add wireless headphones to cart/i })).toBeInTheDocument();
    expect(screen.getByRole('button').textContent).toBe('Add to Cart');
  });

  it('shows "Added to Cart" button when inCart is true', () => {
    render(
      <ProductCard product={product} inCart={true} atMax={false} onAddToCart={() => {}} />
    );
    expect(screen.getByRole('button').textContent).toBe('Added to Cart');
    expect(screen.getByRole('button')).toHaveClass('product-card__add-btn--in-cart');
  });

  it('disables button and sets aria-disabled when atMax is true', () => {
    render(
      <ProductCard product={product} inCart={true} atMax={true} onAddToCart={() => {}} />
    );
    const btn = screen.getByRole('button');
    expect(btn).toBeDisabled();
    expect(btn).toHaveAttribute('aria-disabled', 'true');
  });

  it('calls onAddToCart when the button is clicked', async () => {
    const onAddToCart = vi.fn();
    render(
      <ProductCard product={product} inCart={false} atMax={false} onAddToCart={onAddToCart} />
    );
    await userEvent.click(screen.getByRole('button'));
    expect(onAddToCart).toHaveBeenCalledTimes(1);
  });

  it('does not call onAddToCart when button is disabled (atMax)', async () => {
    const onAddToCart = vi.fn();
    render(
      <ProductCard product={product} inCart={true} atMax={true} onAddToCart={onAddToCart} />
    );
    await userEvent.click(screen.getByRole('button'));
    expect(onAddToCart).not.toHaveBeenCalled();
  });

  it('swaps image src to placeholder on image load error', () => {
    render(
      <ProductCard product={product} inCart={false} atMax={false} onAddToCart={() => {}} />
    );
    const img = screen.getByRole('img');
    fireEvent.error(img);
    // After error, src should be a data URI (placeholder), not the original URL
    expect(img.getAttribute('src')).toMatch(/^data:/);
    // alt must still be non-empty
    expect(img.getAttribute('alt')).toBe('Wireless Headphones');
  });

  it('placeholder does not re-trigger onError (src is a data URI)', () => {
    render(
      <ProductCard product={product} inCart={false} atMax={false} onAddToCart={() => {}} />
    );
    const img = screen.getByRole('img');
    // First error: swaps to placeholder
    fireEvent.error(img);
    const placeholderSrc = img.getAttribute('src');
    expect(placeholderSrc).toMatch(/^data:/);
    // Second error should NOT change src again (guard prevents loop)
    fireEvent.error(img);
    expect(img.getAttribute('src')).toBe(placeholderSrc);
  });

  it('formats price with exactly two decimal places', () => {
    const productWithWholePennies: Product = { ...product, price: 10 };
    render(
      <ProductCard product={productWithWholePennies} inCart={false} atMax={false} onAddToCart={() => {}} />
    );
    expect(screen.getByText('$10.00')).toBeInTheDocument();
  });

  it('button is keyboard-activatable via Enter', async () => {
    const onAddToCart = vi.fn();
    render(
      <ProductCard product={product} inCart={false} atMax={false} onAddToCart={onAddToCart} />
    );
    const btn = screen.getByRole('button');
    btn.focus();
    await userEvent.keyboard('{Enter}');
    expect(onAddToCart).toHaveBeenCalledTimes(1);
  });
});
