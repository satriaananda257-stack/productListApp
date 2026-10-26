import { describe, it, expect } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { CartProvider } from '../store/CartContext';
import { CartBadge } from './CartBadge';
import { useCart } from '../store/useCart';

// Helper that renders CartBadge inside a CartProvider and exposes dispatch
function BadgeWithDispatch() {
  const { dispatch } = useCart();
  return (
    <>
      <CartBadge />
      <button
        data-testid="add-btn"
        onClick={() => dispatch({ type: 'ADD_ITEM', productId: 'e1' })}
      >
        Add
      </button>
      <button
        data-testid="add-e2"
        onClick={() => dispatch({ type: 'ADD_ITEM', productId: 'e2' })}
      >
        Add e2
      </button>
      <button
        data-testid="remove-btn"
        onClick={() => dispatch({ type: 'REMOVE_ITEM', productId: 'e1' })}
      >
        Remove
      </button>
    </>
  );
}

function renderBadge() {
  return render(
    <CartProvider>
      <BadgeWithDispatch />
    </CartProvider>
  );
}

describe('CartBadge', () => {
  it('shows 0 when cart is empty', () => {
    renderBadge();
    const badge = screen.getByRole('generic', { name: '0 items in cart' });
    expect(badge).toBeInTheDocument();
    expect(badge.textContent).toBe('0');
  });

  it('uses singular aria-label for exactly 1 item', async () => {
    renderBadge();
    act(() => {
      screen.getByTestId('add-btn').click();
    });
    const badge = screen.getByRole('generic', { name: '1 item in cart' });
    expect(badge).toBeInTheDocument();
    expect(badge.textContent).toBe('1');
  });

  it('uses plural aria-label for more than 1 item', async () => {
    renderBadge();
    act(() => {
      screen.getByTestId('add-btn').click();
      screen.getByTestId('add-e2').click();
    });
    const badge = screen.getByRole('generic', { name: '2 items in cart' });
    expect(badge).toBeInTheDocument();
    expect(badge.textContent).toBe('2');
  });

  it('updates count reactively when item is removed', async () => {
    renderBadge();
    act(() => {
      screen.getByTestId('add-btn').click();
      screen.getByTestId('add-e2').click();
    });
    expect(screen.getByRole('generic', { name: '2 items in cart' })).toBeInTheDocument();

    act(() => {
      screen.getByTestId('remove-btn').click();
    });
    expect(screen.getByRole('generic', { name: '1 item in cart' })).toBeInTheDocument();
  });
});
