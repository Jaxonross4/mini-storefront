'use client';

import { useEffect, useState } from 'react';
import ProductList from './ProductList.jsx';
import CategoryFilter from './CategoryFilter.jsx';
import PriceFilter from './PriceFilter.jsx';
import CartSummary from './CartSummary.jsx';
import StatusMessage from './StatusMessage.jsx';

export default function Catalog() {
  const [allProducts, setAllProducts] = useState([]);
  const [stockProducts, setStockProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [category, setCategory] = useState('all');
  const [maxPrice, setMaxPrice] = useState(9999);
  const [cart, setCart] = useState([]);
}

// fetch products once
  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        if (!active) return;
        setAllProducts(data);
        setStockProducts(data);
        setLoading(false);
      } catch (err) {
        if (!active) return;
        setErrorMsg('Could not load products');
        setLoading(false);
      }
    }
    load();

    // cleanup flag to avoid state set after unmount
    return () => { active = false; };
  }, []);

  // simulate stock changing over time
  useEffect(() => {
    const id = setInterval(() => {
      setStockProducts(prev => {
        return prev.map(p => {
          // drop stock randomly but never below 0
          const drop = Math.random() < 0.3 ? 1 : 0;
          return { ...p, stock: Math.max(0, p.stock - drop) };
        });
      });
    }, 5000);

    // cleanup interval
    return () => clearInterval(id);
  }, []);

  // filter products by category and price, then by current stock state
  const visibleProducts = stockProducts.filter(p => {
    const matchCategory = category === 'all' ? true : p.category === category;
    const matchPrice = p.price <= maxPrice;
    return matchCategory && matchPrice;
  });

  // add to cart callback
  function handleAddToCart(id) {
    // find product
    const prod = stockProducts.find(p => p.id === id);
    if (!prod) return;
    if (prod.stock <= 0) return; // cannot add if out of stock

    // add immutable
    setCart(prev => {
      const found = prev.find(item => item.id === id);
      if (found) {
        return prev.map(item =>
          item.id === id ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        return [...prev, { id: prod.id, name: prod.name, price: prod.price, qty: 1 }];
      }
    });
  }

  // cart decrease one item
  function handleDecrementItem(id) {
    setCart(prev => {
      return prev
        .map(item => item.id === id ? { ...item, qty: item.qty - 1 } : item)
        .filter(item => item.qty > 0);
    });
  }

  // cart reset
  function handleResetCart() {
    setCart([]);
  }

  return (
    <div className="space-y-6 p-4">
      <h2 className="text-xl font-bold">Mini Storefront</h2>

      <div className="flex flex-col gap-4 md:flex-row">
        <CategoryFilter value={category} onChange={setCategory} />
        <PriceFilter value={maxPrice} onChange={setMaxPrice} />
      </div>

      <CartSummary cart={cart} onDecrement={handleDecrementItem} onReset={handleResetCart} />

      <StatusMessage loading={loading} error={errorMsg} products={visibleProducts} />

      <ProductList products={visibleProducts} onAddToCart={handleAddToCart} />
    </div>
  );

  