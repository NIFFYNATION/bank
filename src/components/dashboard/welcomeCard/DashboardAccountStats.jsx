import React from 'react';
import {
  ArrowPathIcon,
  ArrowUpRightIcon,
  ArrowDownLeftIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { useDashboardData } from '../../../contexts/DashboardDataContext';


export default function DashboardAccountStats() {
  const {
    transactionLimit,
    pendingTransactions,
    transactionVolume,
    accountAge,
  } = useDashboardData();

  const accountStats = [
    { label: 'Transaction Limit', value: transactionLimit, icon: <ArrowPathIcon className="w-5 h-5 text-purple-500" /> },
    { label: 'Pending Transactions', value: pendingTransactions, icon: <ArrowUpRightIcon className="w-5 h-5 text-yellow-500" /> },
    { label: 'Transaction Volume', value: transactionVolume, icon: <ArrowDownLeftIcon className="w-5 h-5 text-green-500" /> },
    { label: 'Account Age', value: accountAge, icon: <UserCircleIcon className="w-5 h-5 text-blue-500" /> },
  ];

  return (
    <div className="rounded-2xl shadow-md p-6 bg-background flex flex-col gap-4">
      <div className="font-bold text-primary mb-2">Account Statistics</div>
      {accountStats.map((stat) => (
        <div key={stat.label} className="flex items-center justify-between py-1">
          <div className="flex items-center gap-2 text-secondary">
            {stat.icon}
            <span className="text-sm">{stat.label}</span>
          </div>
          <span className="font-semibold text-primary">{stat.value}</span>
        </div>
      ))}
    </div>
  );
}