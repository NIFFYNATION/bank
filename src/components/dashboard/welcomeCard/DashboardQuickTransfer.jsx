import React from 'react';
import {
  BanknotesIcon,
  ArrowTrendingUpIcon,
} from '@heroicons/react/24/outline';

export default function DashboardQuickTransfer() {
  const quickTransfers = [
    { label: 'Local Transfer', desc: '0% Handling charges', icon: <BanknotesIcon className="w-6 h-6 text-primary" /> },
    { label: 'International Transfer', desc: 'Flat rate: 2% fee', icon: <ArrowTrendingUpIcon className="w-6 h-6 text-blue-500" /> },
  ];

  return (
    <div className="rounded-2xl shadow-md p-6 bg-background flex flex-col gap-4">
      <div className="font-bold text-primary mb-2">Quick Transfer</div>
      {quickTransfers.map((qt) => (
        <div key={qt.label} className="flex items-center gap-3 py-2 border-b last:border-b-0 border-background-alt">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-background-alt">
            {qt.icon}
          </div>
          <div>
            <div className="font-semibold text-text-primary">{qt.label}</div>
            <div className="text-xs text-text-secondary">{qt.desc}</div>
          </div>
        </div>
      ))}
    </div>
  );
}