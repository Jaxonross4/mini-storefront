'use client';

export default function StatusMessage({ loading, error, products }) {
  if (loading) {
    return <div className="text-blue-600 text-sm">Loading products...</div>;
  }
  if (error) {
    return <div className="text-red-600 text-sm">Error: {error}</div>;
  }
  if (products.length === 0) {
    return <div className="text-gray-600 text-sm">No products match your filters.</div>;
  }
  return null;
}