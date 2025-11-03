'use client';

export default function CartSummary({ cart, onDecrement, onReset }) {
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.qty * item.price, 0);

  return (
    <div className="border rounded p-4 flex flex-col gap-2 bg-gray-50">
      <div className="text-sm">Items in Cart: <strong>{totalItems}</strong></div>
      <div className="text-sm">Total: <strong>${totalPrice}</strong></div>

      <div className="flex gap-2 flex-wrap">
        {cart.map(item => (
          <button
            key={item.id}
            className="text-xs border rounded px-2 py-1 bg-white"
            onClick={() => onDecrement(item.id)}
          >
            -1 {item.name}
          </button>
        ))}
      </div>

      <button
        className="bg-red-600 text-white text-xs py-1 px-2 rounded"
        onClick={onReset}
      >
        Clear Cart
      </button>
    </div>
  );
}
