import React from 'react';
import {
  UserCircleIcon,
  BanknotesIcon,
  ArrowTrendingUpIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';

export default function DashboardActions() {
  const actions = [
    { label: 'Account Info', icon: <UserCircleIcon className="w-7 h-7 text-color-primary" /> },
    { label: 'Send Money', icon: <BanknotesIcon className="w-7 h-7 text-green-500" /> },
    { label: 'Deposit', icon: <ArrowTrendingUpIcon className="w-7 h-7 text-blue-500" /> },
    { label: 'History', icon: <DocumentTextIcon className="w-7 h-7 text-purple-500" /> },
  ];

  return (
    <div>
      <div className="mb-2 font-bold text-text-primary">What would you like to do today?</div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {actions.map((action) => (
          <button
            key={action.label}
            className="flex flex-col items-center justify-center gap-2 rounded-xl p-4 py-6 md:py-17 bg-background shadow text-primary hover:text-background hover:bg-primary transition"
          >
            {action.icon}
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
}