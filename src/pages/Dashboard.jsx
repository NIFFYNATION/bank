import React from 'react';
import {
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CreditCardIcon,
  BanknotesIcon,
  UserCircleIcon,
  ArrowPathIcon,
  ArrowUpRightIcon,
  ArrowDownLeftIcon,
  DocumentTextIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';

const summaryCards = [
  {
    label: 'Current Balance',
    value: '$1,181,860',
    icon: <CreditCardIcon className="w-6 h-6 text-primary" />,
  },
  {
    label: 'Monthly Income',
    value: '$0',
    icon: <ArrowTrendingUpIcon className="w-6 h-6 text-green-500" />,
  },
  {
    label: 'Monthly Outgoing',
    value: '$0',
    icon: <ArrowTrendingDownIcon className="w-6 h-6 text-red-500" />,
  },
  {
    label: 'Transaction Limit',
    value: '$500,000.00',
    icon: <ArrowPathIcon className="w-6 h-6 text-purple-500" />,
  },
];

const accountStats = [
  { label: 'Transaction Limit', value: '$500,000.00', icon: <ArrowPathIcon className="w-5 h-5 text-purple-500" /> },
  { label: 'Pending Transactions', value: '$15,200.00', icon: <ArrowUpRightIcon className="w-5 h-5 text-yellow-500" /> },
  { label: 'Transaction Volume', value: '$658,342.82', icon: <ArrowDownLeftIcon className="w-5 h-5 text-green-500" /> },
  { label: 'Account Age', value: '5 years', icon: <UserCircleIcon className="w-5 h-5 text-blue-500" /> },
];

const actions = [
  { label: 'Account Info', icon: <UserCircleIcon className="w-7 h-7 text-color-primary" /> },
  { label: 'Send Money', icon: <BanknotesIcon className="w-7 h-7 text-green-500" /> },
  { label: 'Deposit', icon: <ArrowTrendingUpIcon className="w-7 h-7 text-blue-500" /> },
  { label: 'History', icon: <DocumentTextIcon className="w-7 h-7 text-purple-500" /> },
];

const quickTransfers = [
  { label: 'Local Transfer', desc: '0% Handling charges', icon: <BanknotesIcon className="w-6 h-6 text-primary" /> },
  { label: 'International Transfer', desc: 'Flat rate: 2% fee', icon: <ArrowTrendingUpIcon className="w-6 h-6 text-blue-500" /> },
];



 // Get today's date in a readable format
 const today = new Date();
 const dateString = today.toLocaleDateString('en-US', {
   weekday: 'long',
   year: 'numeric',
   month: 'long',
   day: 'numeric'
 });

export default function Dashboard() {
  
  return (
    <div className="flex flex-col gap-6 p-4 md:p-8" >
      {/* Top summary cards */}
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

      {/* Main content area */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main blue card */}
        <div className="flex-1">
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
                <div className="font-bold text-lg">real</div>
              </div>
              <div className="text-xs opacity-80">
              {dateString}

              </div>
            </div>
            <div className="text-sm opacity-80">Available Balance</div>
            <div className="text-3xl font-bold">$1,181,860 USD</div>
           <div className='flex flex-col md:flex-row justify-between'>
           <div>
           <div className="flex items-center gap-2 text-xs">
              <span className='text-sm'>Your Account Number</span>
              <span className="ml-2 px-2 py-0.5 rounded bg-green-500 text-white text-xs">Active</span>
            </div>
            <div className="font-mono text-lg tracking-wider">77990250980</div>
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
        </div>

        {/* Account statistics */}
        <div className="w-full lg:w-80 flex-shrink-0">
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
        </div>
      </div>

      {/* Actions and Quick Transfer */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Actions */}
        <div className="flex-1">
          <div className="mb-2 font-bold text-text-primary">What would you like to do today?</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {actions.map((action) => (
              <button
                key={action.label}
                className="flex flex-col items-center justify-center gap-2 rounded-xl p-4 py-6 md:py-17 bg-background shadow hover:bg-primary-light hover:text-white transition"
                style={{  color: 'var(--color-text-primary)' }}
              >
                {action.icon}
                <span className="font-semibold">{action.label}</span>
              </button>
            ))}
          </div>
        </div>
        {/* Quick Transfer */}
        <div className="w-full lg:w-80 flex-shrink-0">
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
        </div>
      </div>
    </div>
  );
}