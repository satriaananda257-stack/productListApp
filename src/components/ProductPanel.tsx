import { useState } from 'react';
import { PRODUCTS } from '../data/products';
import { CategoryFilter } from './CategoryFilter';
import { ProductGrid } from './ProductGrid';

export function ProductPanel() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Derive unique categories from the static product catalogue, preserving insertion order
  const categories = Array.from(new Set(PRODUCTS.map((p) => p.category)));

  // Filter products by selected category; 'All' shows everything
  const filteredProducts =
    selectedCategory === 'All'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === selectedCategory);

  return (
    <section className="product-panel" aria-label="Product listing">
      <CategoryFilter
        categories={categories}
        selected={selectedCategory}
        onChange={setSelectedCategory}
      />
      <ProductGrid products={filteredProducts} />
    </section>
  );
}
