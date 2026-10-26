import { createContext, useReducer } from 'react';
import type { Dispatch, ReactNode } from 'react';
import { cartReducer } from './cartReducer';
import type { CartState, CartAction } from '../types';

interface CartContextValue {
  state: CartState;
  dispatch: Dispatch<CartAction>;
}

export const CartContext = createContext<CartContextValue | null>(null);

const initialState: CartState = { items: [] };

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}
