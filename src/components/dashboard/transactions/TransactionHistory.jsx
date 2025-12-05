import React from 'react';
import Dropdown from "../../common/Dropdown";
import {Button} from "../../common/Button";
import { Link } from 'react-router-dom';
import { useBankStore } from '../../../store/useBankStore';

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// Removed static transactions array

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatAmount(amount, type) {
  return `${type === 'Debit' ? '-' : '+'}$${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function ChannelBadge({ channel }) {
  let icon = null;
  let color = '';
  if (channel === 'Local Transfer') {
    icon = '🏦'; color = 'bg-blue-50 text-blue-600 border-blue-200';
  } else if (channel === 'International Wire') {
    icon = '🌐'; color = 'bg-purple-50 text-purple-600 border-purple-200';
  } else if (channel === 'Card') {
    icon = '💳'; color = 'bg-orange-50 text-orange-600 border-orange-200';
  } else if (channel === 'Deposit') {
    icon = '💰'; color = 'bg-green-50 text-green-600 border-green-200';
  } else {
    icon = '📄'; color = 'bg-gray-50 text-gray-600 border-gray-200';
  }
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full border text-xs font-medium ${color}`}>
      <span>{icon}</span> {channel}
    </span>
  );
}

export default function TransactionHistory({ months = months, selectedMonth = months[0], onMonthChange }) {
  const { transactions } = useBankStore();

  // Filter transactions by selected month
  const filteredTransactions = transactions.filter(tx => {
    const txDate = new Date(tx.date);
    const txMonth = months[txDate.getMonth()];
    return txMonth === selectedMonth;
  });

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <div className='flex justify-end pb-6'>
      <Link to='/dashboard/transactionspage' className='bg-primary-light rounded-lg py-3 px-4 text-background' variant="primary" >View All Transactions</Link>

      </div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-lg text-gray-900">Transaction History</h2>
        <Dropdown options={months} value={selectedMonth} onChange={e => onMonthChange(e.target.value)} />
      </div>
      <div className="overflow-x-auto max-w-[280px] sm:max-w-[650px] lg:max-w-full w-full">
        <table className="min-w-[900px] overflow-x-auto w-full text-sm">
          <thead>
            <tr className="text-gray-400 text-left">
              <th className="font-medium pb-2">Date</th>
              <th className="font-medium pb-2">ID</th>
              <th className="font-medium pb-2">Name</th>
              <th className="font-medium pb-2">Description</th>
              <th className="font-medium pb-2">Channel</th>
              <th className="font-medium pb-2">Type</th>
              <th className="font-medium pb-2 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-400">No transactions for this month.</td>
              </tr>
            ) : (
              filteredTransactions.map(tx => (
                <tr key={tx.id} className="border-t last:border-b-0 border-gray-100 hover:bg-gray-50 transition-colors duration-150">
                  <td className="py-4 px-2 text-gray-600">{formatDate(tx.date)}</td>
                  <td className="py-4 px-2 font-mono text-sm text-gray-500">{tx.id}</td>
                  <td className="py-4 px-2 font-medium text-gray-900">{tx.name}</td>
                  <td className="py-4 px-2 text-gray-600">{tx.description}</td>
                  <td className="py-4 px-2"><ChannelBadge channel={tx.channel} /></td>
                  <td className="py-4 px-2">
                    <span className={`inline-block px-3 py-1.5 rounded-full border text-xs font-semibold shadow-sm ${tx.type === 'Credit' ? 'bg-green-50 text-green-600 border-green-200' : 'bg-red-50 text-red-500 border-red-200'}`}>{tx.type}</span>
                  </td>
                  <td className={`py-4 px-2 text-right font-semibold ${tx.type === 'Credit' ? 'text-green-600' : 'text-red-500'}`}>{formatAmount(tx.amount, tx.type)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}