import React from 'react';

export default function StatusPill({ status }) {
  const color =
    status === 'Completed'
      ? 'bg-green-50 text-green-600 border-green-200'
      : 'bg-red-50 text-red-500 border-red-200';
  return (
    <span
      className={`inline-block px-3 py-1 rounded-full border text-xs font-semibold ${color}`}
    >
      {status}
    </span>
  );
}