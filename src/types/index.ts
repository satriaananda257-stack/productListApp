export interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  category: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

export type CartAction =
  | { type: 'ADD_ITEM'; productId: string }
  | { type: 'REMOVE_ITEM'; productId: string }
  | { type: 'INCREMENT'; productId: string }
  | { type: 'DECREMENT'; productId: string }
  | { type: 'SET_QUANTITY'; productId: string; quantity: number }
  | { type: 'CLEAR_CART' };
