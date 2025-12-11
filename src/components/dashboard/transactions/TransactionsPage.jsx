import React, { useState, useMemo } from 'react'
import { Button } from '../../common/Button'
import TransactionHistory from './TransactionHistory'
import DashboardSummaryCards from '../welcomeCard/DashboardSummaryCards';
import { months, getCurrentMonth } from '../../../utils/constants';
import { useBankStore } from '../../../store/useBankStore';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function TransactionsPage() {
  const { transactions } = useBankStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  // Filter logic
  const filteredTransactions = useMemo(() => {
    return transactions.filter(tx => {
      // Search
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        tx.id.toLowerCase().includes(query) ||
        tx.name.toLowerCase().includes(query) ||
        tx.description.toLowerCase().includes(query);

      // Date Range
      let matchesDate = true;
      if (dateRange.start) {
        matchesDate = matchesDate && new Date(tx.date) >= new Date(dateRange.start);
      }
      if (dateRange.end) {
        matchesDate = matchesDate && new Date(tx.date) <= new Date(dateRange.end);
      }

      return matchesSearch && matchesDate;
    });
  }, [transactions, searchQuery, dateRange]);

  const handleExport = () => {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(18);
    doc.text('Transaction History', 14, 22);

    // Add filter summary
    doc.setFontSize(10);
    const dateText = dateRange.start ? `From: ${dateRange.start} To: ${dateRange.end || 'Now'}` : 'All Dates';
    doc.text(dateText, 14, 30);

    // Table
    const tableColumn = ["Date", "ID", "Name", "Description", "Type", "Amount"];
    const tableRows = [];

    filteredTransactions.forEach(tx => {
      const transactionData = [
        tx.date,
        tx.id,
        tx.name,
        tx.description,
        tx.type,
        `$${tx.amount.toFixed(2)}`
      ];
      tableRows.push(transactionData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 35,
    });

    doc.save('transactions.pdf');
  };

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
            <Button variant='outline' size='md' shape='roundedMd' onClick={() => setShowFilters(!showFilters)}>
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              Filter
            </Button>
            <Button variant='primary' size='md' shape='roundedMd' onClick={handleExport}>
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 5v14M5 12h14" />
              </svg>
              Export PDF
            </Button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Start Date</label>
              <input
                type="date"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 bg-white border"
                value={dateRange.start}
                onChange={e => setDateRange({ ...dateRange, start: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">End Date</label>
              <input
                type="date"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2 bg-white border"
                value={dateRange.end}
                onChange={e => setDateRange({ ...dateRange, end: e.target.value })}
              />
            </div>
          </div>
        )}

        {/* Search Input */}
        <div className="w-full">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by ID, name, or description..."
              className="w-full rounded-lg border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
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
        transactions={filteredTransactions}
      />
    </div>
  )
}

export default TransactionsPage
