import { describe, it, expect } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CartProvider } from './CartContext';
import { useCart } from './useCart';

// Use a real product ID from PRODUCTS array (e1 = Wireless Noise-Cancelling Headphones)
const TEST_PRODUCT_ID = 'e1';

// Helper component to consume the cart context for testing
function CartConsumer() {
  const { state, dispatch } = useCart();
  return (
    <div>
      <span data-testid="item-count">{state.items.length}</span>
      <button
        data-testid="add-btn"
        onClick={() => dispatch({ type: 'ADD_ITEM', productId: TEST_PRODUCT_ID })}
      >
        Add
      </button>
      <button
        data-testid="remove-btn"
        onClick={() =>
          dispatch({ type: 'REMOVE_ITEM', productId: TEST_PRODUCT_ID })
        }
      >
        Remove
      </button>
      <button
        data-testid="clear-btn"
        onClick={() => dispatch({ type: 'CLEAR_CART' })}
      >
        Clear
      </button>
    </div>
  );
}

// Component that uses useCart outside a provider — for error testing
function OutsideProvider() {
  try {
    useCart();
    return <div>no error</div>;
  } catch (e) {
    return <div data-testid="error">{(e as Error).message}</div>;
  }
}

describe('CartProvider', () => {
  it('provides initial empty cart state', () => {
    render(
      <CartProvider>
        <CartConsumer />
      </CartProvider>
    );
    expect(screen.getByTestId('item-count').textContent).toBe('0');
  });

  it('dispatches ADD_ITEM and updates state', async () => {
    const user = userEvent.setup();
    render(
      <CartProvider>
        <CartConsumer />
      </CartProvider>
    );
    await user.click(screen.getByTestId('add-btn'));
    expect(screen.getByTestId('item-count').textContent).toBe('1');
  });

  it('dispatches REMOVE_ITEM and updates state', async () => {
    const user = userEvent.setup();
    render(
      <CartProvider>
        <CartConsumer />
      </CartProvider>
    );
    await user.click(screen.getByTestId('add-btn'));
    expect(screen.getByTestId('item-count').textContent).toBe('1');
    await user.click(screen.getByTestId('remove-btn'));
    expect(screen.getByTestId('item-count').textContent).toBe('0');
  });

  it('dispatches CLEAR_CART and empties items', async () => {
    const user = userEvent.setup();
    render(
      <CartProvider>
        <CartConsumer />
      </CartProvider>
    );
    await user.click(screen.getByTestId('add-btn'));
    await user.click(screen.getByTestId('add-btn'));
    // Still 1 item (same product incremented, not duplicate)
    await user.click(screen.getByTestId('clear-btn'));
    expect(screen.getByTestId('item-count').textContent).toBe('0');
  });

  it('retains cart state across renders (Requirement 7.1)', () => {
    const { rerender } = render(
      <CartProvider>
        <CartConsumer />
      </CartProvider>
    );
    act(() => {
      screen.getByTestId('add-btn').click();
    });
    expect(screen.getByTestId('item-count').textContent).toBe('1');

    // Re-render without unmounting — state should persist (Req 7.1)
    rerender(
      <CartProvider>
        <CartConsumer />
      </CartProvider>
    );
    expect(screen.getByTestId('item-count').textContent).toBe('1');
  });
});

describe('useCart', () => {
  it('throws when used outside CartProvider', () => {
    render(<OutsideProvider />);
    expect(screen.getByTestId('error').textContent).toBe(
      'useCart must be used within a CartProvider'
    );
  });
});
