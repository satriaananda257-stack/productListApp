import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CartProvider } from '../store/CartContext';
import { Header } from './Header';

function renderHeader(onToggleCart = vi.fn()) {
  return render(
    <CartProvider>
      <Header onToggleCart={onToggleCart} />
    </CartProvider>
  );
}

describe('Header', () => {
  it('renders the app title', () => {
    renderHeader();
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('renders a cart button', () => {
    renderHeader();
    expect(screen.getByRole('button', { name: /toggle cart/i })).toBeInTheDocument();
  });

  it('calls onToggleCart when the cart button is clicked', async () => {
    const user = userEvent.setup();
    const onToggleCart = vi.fn();
    renderHeader(onToggleCart);

    await user.click(screen.getByRole('button', { name: /toggle cart/i }));
    expect(onToggleCart).toHaveBeenCalledTimes(1);
  });

  it('renders the CartBadge inside the cart button', () => {
    renderHeader();
    const button = screen.getByRole('button', { name: /toggle cart/i });
    // CartBadge is a span with aria-label inside the button
    const badge = button.querySelector('.cart-badge');
    expect(badge).toBeInTheDocument();
  });

  it('cart button has an accessible label', () => {
    renderHeader();
    const button = screen.getByRole('button', { name: /toggle cart/i });
    expect(button).toHaveAttribute('aria-label');
  });
});
