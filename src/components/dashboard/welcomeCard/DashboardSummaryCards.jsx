import React from 'react';
import {
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CreditCardIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';
import { useBankStore, formatCurrency } from '../../../store/useBankStore';

export default function DashboardSummaryCards() {
  const { currentBalance, monthlyIncome, monthlyOutgoing, transactionLimit } = useBankStore();

  const summaryCards = [
    {
      label: 'Current Balance',
      value: formatCurrency(currentBalance),
      icon: <CreditCardIcon className="w-6 h-6 text-primary" />,
    },
    {
      label: 'Monthly Income',
      value: formatCurrency(monthlyIncome),
      icon: <ArrowTrendingUpIcon className="w-6 h-6 text-green-500" />,
    },
    {
      label: 'Monthly Outgoing',
      value: formatCurrency(monthlyOutgoing),
      icon: <ArrowTrendingDownIcon className="w-6 h-6 text-red-500" />,
    },
    {
      label: 'Transaction Limit',
      value: formatCurrency(transactionLimit),
      icon: <ArrowPathIcon className="w-6 h-6 text-purple-500" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {summaryCards.map((card) => (
        <div
          key={card.label}
          className="flex items-center gap-4 rounded-xl shadow-sm p-4 bg-background"
        >
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-background-alt">
            {card.icon}
          </div>
          <div>
            <div className="text-xs text-text-secondary font-medium">{card.label}</div>
            <div className="text-lg font-bold text-primary">{card.value}</div>
          </div>
        </div>
      ))}
    </div>
  );
}