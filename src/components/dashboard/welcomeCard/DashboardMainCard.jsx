import React from 'react';
import {
  UserCircleIcon,
  ArrowPathIcon,
  ArrowUpRightIcon,
} from '@heroicons/react/24/outline';
import { useDashboardData } from '../../../contexts/DashboardDataContext';

export default function DashboardMainCard() {
  const { currentBalance, accountNumber, accountStatus, userName } = useDashboardData();

  // Get today's date in a readable format
  const today = new Date();
  const dateString = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div
      className="rounded-2xl p-6 shadow-md flex flex-col gap-4"
      style={{
        background: 'linear-gradient(135deg, var(--color-primary) 80%, var(--color-primary-light) 100%)',
        color: 'white',
      }}
    >
      <div className="flex justify-between items-center gap-3">
        <div>
          <UserCircleIcon className="w-10 h-10 text-white" />
          <div className="text-sm">Good Morning</div>
          <div className="font-bold text-lg">{userName}</div>
        </div>
        <div className="text-xs opacity-80">{dateString}</div>
      </div>
      <div className="text-sm opacity-80">Available Balance</div>
      <div className="text-3xl font-bold">{currentBalance}</div>
      <div className='flex flex-col md:flex-row justify-between'>
        <div>
          <div className="flex items-center gap-2 text-xs">
            <span className='text-sm'>Your Account Number</span>
            <span className="ml-2 px-2 py-0.5 rounded bg-green-500 text-white text-xs">{accountStatus}</span>
          </div>
          <div className="font-mono text-lg tracking-wider">{accountNumber}</div>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="flex gap-2">
            <button
              className="flex items-center gap-1 px-4 py-2 rounded bg-white text-primary font-semibold shadow hover:bg-primary-light hover:text-white transition"
            >
              <ArrowPathIcon className="w-5 h-5" />
              Transactions
            </button>
            <button
              className="flex items-center gap-1 px-4 py-2 rounded bg-white text-primary font-semibold shadow hover:bg-primary-light hover:text-white transition"
              style={{ border: 'none' }}
            >
              <ArrowUpRightIcon className="w-5 h-5" />
              Top up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}