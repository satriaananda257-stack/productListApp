import type { Product } from '../types';

export const PRODUCTS: Product[] = [
  // Electronics
  {
    id: 'e1',
    name: 'Wireless Noise-Cancelling Headphones',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80',
    price: 79.99,
    category: 'Electronics',
  },
  {
    id: 'e2',
    name: 'Portable Bluetooth Speaker',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&q=80',
    price: 49.95,
    category: 'Electronics',
  },
  {
    id: 'e3',
    name: 'USB-C Fast Charger 65W',
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400&q=80',
    price: 24.99,
    category: 'Electronics',
  },

  // Clothing
  {
    id: 'c1',
    name: 'Classic Cotton T-Shirt',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80',
    price: 19.99,
    category: 'Clothing',
  },
  {
    id: 'c2',
    name: 'Slim-Fit Chino Pants',
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&q=80',
    price: 44.99,
    category: 'Clothing',
  },
  {
    id: 'c3',
    name: 'Waterproof Rain Jacket',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&q=80',
    price: 89.95,
    category: 'Clothing',
  },

  // Books
  {
    id: 'b1',
    name: 'Clean Code: A Handbook of Agile Software Craftsmanship',
    image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&q=80',
    price: 34.99,
    category: 'Books',
  },
  {
    id: 'b2',
    name: 'The Pragmatic Programmer',
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&q=80',
    price: 39.99,
    category: 'Books',
  },
  {
    id: 'b3',
    name: 'Designing Data-Intensive Applications',
    image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400&q=80',
    price: 54.95,
    category: 'Books',
  },
];
