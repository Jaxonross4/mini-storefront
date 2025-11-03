'use client';

export default function CategoryFilter({ value, onChange }) {
  return (
    <label className="flex flex-col text-sm">
      <span className="font-medium">Category</span>
      <select
        className="border rounded p-1"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="all">All</option>
        <option value="Gear">Gear</option>
        <option value="Apparel">Apparel</option>
        <option value="Footwear">Footwear</option>
        <option value="Accessories">Accessories</option>
      </select>
    </label>
  );
}