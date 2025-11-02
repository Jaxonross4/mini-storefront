'use client';

import ProductCard from './ProductCard.jsx';

export default function ProductList({ products, onAddToCart }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {products.map(prod => (
        <ProductCard
          key={prod.id}
          product={prod}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}
