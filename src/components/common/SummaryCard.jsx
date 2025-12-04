import React from 'react';

export default function SummaryCard({ items = [], footer, title = 'Summary' }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-base font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((it, idx) => (
          <div key={idx} className="flex items-center justify-between">
            <span className="text-sm text-gray-600">{it.label}</span>
            <span className={it.accent ? 'text-sm font-semibold text-indigo-600' : 'text-sm font-semibold text-gray-900'}>
              {it.value}
            </span>
          </div>
        ))}
      </div>
      {footer && <div className="mt-4">{footer}</div>}
    </div>
  );
}

