import React from 'react';

export default function Dropdown({ options, value, onChange }) {
  return (
    <select
      className="bg-gray-50 border border-gray-200 rounded px-3 py-1 text-sm font-medium text-gray-500 focus:outline-none"
      value={value}
      onChange={onChange}
      style={{ minWidth: 90 }}
    >
      {options.map(opt => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  );
}