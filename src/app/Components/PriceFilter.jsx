'use client';

export default function PriceFilter({ value, onChange }) {
  return (
    <label className="flex flex-col text-sm">
      <span className="font-medium">Max Price</span>
      <input
        className="border rounded p-1"
        type="number"
        min="1"
        value={value}
        onChange={(e) => {
          const v = Number(e.target.value);
          onChange(Number.isFinite(v) && v > 0 ? v : 1);
        }}
      />
    </label>
  );
}