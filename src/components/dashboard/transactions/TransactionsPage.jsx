import React from 'react'
import { Button } from '../../common/Button'
import TransactionHistory from './TransactionHistory'
import DashboardSummaryCards from '../welcomeCard/DashboardSummaryCards';
import { months, getCurrentMonth } from '../../../utils/constants';

function TransactionsPage() {

  const [selectedMonth, setSelectedMonth] = React.useState(getCurrentMonth());

  return (
    <div className="flex flex-col gap-6 p-4 md:p-8">
        <DashboardSummaryCards />

      {/* Header and Actions */}
      <div className="flex flex-col gap-4">
        {/* Breadcrumbs and Title */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <div className="text-xs text-gray-400 font-medium mb-1">
              Dashboard <span className="mx-1">&gt;</span> <span className="text-gray-700">Transactions</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
          </div>
          <div className="flex gap-2 mt-2 sm:mt-0">
            <Button variant='outline' size='md' shape='roundedMd' >
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              Filter
            </Button>
            <Button variant='primary' size='md' shape='roundedMd' >
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 5v14M5 12h14" />
              </svg>
              Export
            </Button>
          </div>
        </div>
        {/* Search Input */}
        <div className="w-full">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by transaction id..."
              className="w-full rounded-lg border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </span>
          </div>
        </div>
      </div>
      <TransactionHistory
            months={months}
            selectedMonth={selectedMonth}
            onMonthChange={setSelectedMonth}
          />
    </div>
  )
}

export default TransactionsPage
