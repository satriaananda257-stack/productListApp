import type { CartState, CartAction } from '../types';
import { PRODUCTS } from '../data/products';

const MAX_QUANTITY = 999;

export const initialCartState: CartState = { items: [] };

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingIndex = state.items.findIndex(
        (item) => item.product.id === action.productId
      );

      if (existingIndex === -1) {
        const product = PRODUCTS.find((p) => p.id === action.productId);
        if (!product) return state;
        return {
          ...state,
          items: [...state.items, { product, quantity: 1 }],
        };
      }

      const existingItem = state.items[existingIndex];
      if (existingItem.quantity >= MAX_QUANTITY) {
        return state;
      }

      return {
        ...state,
        items: state.items.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    }

    case 'INCREMENT': {
      return {
        ...state,
        items: state.items.map((item) =>
          item.product.id === action.productId
            ? { ...item, quantity: Math.min(item.quantity + 1, MAX_QUANTITY) }
            : item
        ),
      };
    }

    case 'DECREMENT': {
      const targetItem = state.items.find(
        (item) => item.product.id === action.productId
      );

      if (!targetItem) return state;

      if (targetItem.quantity === 1) {
        return {
          ...state,
          items: state.items.filter(
            (item) => item.product.id !== action.productId
          ),
        };
      }

      return {
        ...state,
        items: state.items.map((item) =>
          item.product.id === action.productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };
    }

    case 'REMOVE_ITEM': {
      return {
        ...state,
        items: state.items.filter(
          (item) => item.product.id !== action.productId
        ),
      };
    }

    case 'SET_QUANTITY': {
      const { productId, quantity } = action;
      if (
        !Number.isInteger(quantity) ||
        quantity < 1 ||
        quantity > MAX_QUANTITY
      ) {
        return state;
      }

      return {
        ...state,
        items: state.items.map((item) =>
          item.product.id === productId
            ? { ...item, quantity }
            : item
        ),
      };
    }

    case 'CLEAR_CART': {
      return { items: [] };
    }

    default:
      return state;
  }
}