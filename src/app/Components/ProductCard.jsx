'use client';

export default function ProductCard({ product, onAddToCart }) {
  const out = product.stock <= 0;

  return (
    <div className="border rounded p-4 flex flex-col gap-2">
      <div className="font-semibold">{product.name}</div>
      <div className="text-sm text-gray-600">{product.category}</div>
      <div className="text-green-700 font-bold">${product.price}</div>
      <div className="text-xs">
        {out ? "Out of stock" : `In stock: ${product.stock}`}
      </div>
      <button
        className="bg-blue-600 text-white py-1 px-2 rounded disabled:bg-gray-400"
        disabled={out}
        onClick={() => onAddToCart(product.id)}
      >
        Add to Cart
      </button>
    </div>
  );
}