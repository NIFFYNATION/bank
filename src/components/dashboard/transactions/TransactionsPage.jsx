import React, { useState, useMemo } from 'react'
import { Button } from '../../common/Button'
import TransactionHistory from './TransactionHistory'
import DashboardSummaryCards from '../welcomeCard/DashboardSummaryCards';
import { useBankStore } from '../../../store/useBankStore';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// ── helpers ───────────────────────────────────────────────────────────────
const fmtDate = (d) =>
  d ? new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—';
const fmtCurrency = (n) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n || 0);
const fmtTime = (t) => {
  if (!t) return '';
  const [h, m] = t.split(':').map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${h >= 12 ? 'PM' : 'AM'}`;
};

// ── Export Modal ───────────────────────────────────────────────────────────
function ExportModal({ transactions, store, onClose }) {
  const [exportRange, setExportRange] = useState({ start: '', end: '' });
  const [error, setError] = useState('');

  const preview = useMemo(() => {
    return [...transactions]
      .filter(tx => {
        const inStart = exportRange.start ? new Date(tx.date) >= new Date(exportRange.start) : true;
        const inEnd = exportRange.end ? new Date(tx.date) <= new Date(exportRange.end) : true;
        return inStart && inEnd;
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [transactions, exportRange]);

  // Running balance for preview
  const previewWithBalance = useMemo(() => {
    let bal = store.currentBalance || 0;
    // walk forward from oldest to newest and subtract debits / add credits
    const sorted = [...preview].sort((a, b) => new Date(a.date) - new Date(b.date));
    // adjust opening balance by reversing the net effect of all visible txs (so it opens at the right value)
    const netEffect = sorted.reduce((s, tx) => s + (tx.type === 'Credit' ? tx.amount : -tx.amount), 0);
    let running = (store.currentBalance || 0) - netEffect;
    return sorted.map(tx => {
      running += tx.type === 'Credit' ? tx.amount : -tx.amount;
      return { ...tx, balance: running };
    });
  }, [preview, store.currentBalance]);

  // Totals
  const totalCredit = preview.filter(t => t.type === 'Credit').reduce((s, t) => s + t.amount, 0);
  const totalDebit = preview.filter(t => t.type === 'Debit').reduce((s, t) => s + t.amount, 0);

  const handleExport = () => {
    if (!exportRange.start || !exportRange.end) {
      setError('Please select both a start and end date.');
      return;
    }
    if (new Date(exportRange.start) > new Date(exportRange.end)) {
      setError('Start date cannot be after end date.');
      return;
    }
    if (preview.length === 0) {
      setError('No transactions in this range.');
      return;
    }
    setError('');

    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
    const pageW = doc.internal.pageSize.getWidth();
    const margin = 14;

    // ── Header band ──
    doc.setFillColor(30, 41, 90); // deep navy
    doc.rect(0, 0, pageW, 32, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('NIFFYBANK', margin, 14);

    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text('Official Statement of Account', margin, 21);
    doc.text(`Generated: ${new Date().toLocaleString()}`, margin, 27);

    doc.setFontSize(9);
    doc.text('CONFIDENTIAL', pageW - margin, 14, { align: 'right' });

    // ── Account info block ──
    const accountName = `${store.firstName || ''} ${store.lastName || ''}`.trim() || 'Account Holder';
    doc.setTextColor(40, 40, 40);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('Account Information', margin, 44);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    const accountLines = [
      ['Account Name:', accountName],
      ['Account Number:', store.accountNumber || '—'],
      ['Email:', store.email || '—'],
      ['Phone:', store.phoneNumber || '—'],
      ['Address:', [store.address, store.city, store.zipCode, store.country].filter(Boolean).join(', ') || '—'],
      ['Account Status:', store.accountStatus || '—'],
    ];
    let y = 50;
    accountLines.forEach(([label, val]) => {
      doc.setFont('helvetica', 'bold');
      doc.text(label, margin, y);
      doc.setFont('helvetica', 'normal');
      doc.text(String(val), margin + 40, y);
      y += 6;
    });

    // Period on right side of account block
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text('Statement Period', pageW - margin - 60, 44);
    doc.setFont('helvetica', 'normal');
    doc.text(`From: ${fmtDate(exportRange.start)}`, pageW - margin - 60, 50);
    doc.text(`To:   ${fmtDate(exportRange.end)}`, pageW - margin - 60, 56);

    // ── Summary band ──
    const summaryY = y + 4;
    doc.setFillColor(245, 247, 255);
    doc.roundedRect(margin, summaryY, pageW - margin * 2, 22, 3, 3, 'F');

    const cols = [margin + 6, margin + 58, margin + 110, margin + 150];
    const labels = ['Opening Balance', 'Total Credits', 'Total Debits', 'Closing Balance'];
    const openBal = previewWithBalance.length > 0
      ? previewWithBalance[0].balance - (previewWithBalance[0].type === 'Credit' ? previewWithBalance[0].amount : -previewWithBalance[0].amount)
      : store.currentBalance;
    const values = [
      fmtCurrency(openBal),
      `+${fmtCurrency(totalCredit)}`,
      `-${fmtCurrency(totalDebit)}`,
      fmtCurrency(store.currentBalance),
    ];
    const colors = [[90, 90, 90], [22, 163, 74], [220, 38, 38], [30, 41, 90]];

    labels.forEach((lbl, i) => {
      doc.setFontSize(7);
      doc.setTextColor(130, 130, 130);
      doc.setFont('helvetica', 'normal');
      doc.text(lbl, cols[i], summaryY + 7);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...colors[i]);
      doc.text(values[i], cols[i], summaryY + 15);
    });

    // ── Transactions table ──
    doc.setTextColor(40, 40, 40);
    doc.autoTable({
      head: [['Date', 'Time', 'Ref ID', 'Description', 'Name / Party', 'Channel', 'Debit (DR)', 'Credit (CR)', 'Balance']],
      body: previewWithBalance.map(tx => [
        tx.date,
        fmtTime(tx.time) || '—',
        tx.id,
        tx.description,
        tx.name,
        tx.channel,
        tx.type === 'Debit' ? `$${tx.amount.toFixed(2)}` : '',
        tx.type === 'Credit' ? `$${tx.amount.toFixed(2)}` : '',
        `$${tx.balance.toFixed(2)}`,
      ]),
      startY: summaryY + 28,
      styles: { fontSize: 7, cellPadding: 2 },
      headStyles: { fillColor: [30, 41, 90], textColor: 255, fontStyle: 'bold', fontSize: 7 },
      alternateRowStyles: { fillColor: [248, 249, 255] },
      columnStyles: {
        0: { cellWidth: 18 },
        1: { cellWidth: 14 },
        2: { cellWidth: 24 },
        3: { cellWidth: 34 },
        4: { cellWidth: 28 },
        5: { cellWidth: 20 },
        6: { cellWidth: 18, halign: 'right', textColor: [220, 38, 38] },
        7: { cellWidth: 18, halign: 'right', textColor: [22, 163, 74] },
        8: { cellWidth: 18, halign: 'right', fontStyle: 'bold' },
      },
      didParseCell(data) {
        // colour DR/CR columns header
        if (data.section === 'head' && (data.column.index === 6 || data.column.index === 7)) {
          data.cell.styles.textColor = 255;
        }
      },
    });

    // ── Footer ──
    const finalY = doc.lastAutoTable.finalY + 6;
    doc.setFontSize(7);
    doc.setTextColor(160, 160, 160);
    doc.setFont('helvetica', 'normal');
    doc.text('This is a computer-generated statement and does not require a signature.', pageW / 2, finalY, { align: 'center' });
    doc.text('NiffyBank · Confidential · For account holder use only', pageW / 2, finalY + 4, { align: 'center' });

    doc.save(`statement_${exportRange.start}_to_${exportRange.end}.pdf`);
    onClose();
  };

  const accountName = `${store.firstName || ''} ${store.lastName || ''}`.trim() || 'Account Holder';
  const hasRange = exportRange.start && exportRange.end;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl flex flex-col md:flex-row overflow-hidden max-h-[90vh]">

        {/* ── Left: Controls ── */}
        <div className="w-full md:w-72 shrink-0 bg-gray-50 border-r border-gray-200 p-6 flex flex-col gap-5">
          <div>
            <h2 className="text-base font-bold text-gray-900">Statement of Account</h2>
            <p className="text-xs text-gray-500 mt-0.5">Select a date range to generate</p>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">From Date</label>
              <input
                type="date"
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                value={exportRange.start}
                onChange={e => setExportRange(r => ({ ...r, start: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">To Date</label>
              <input
                type="date"
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                value={exportRange.end}
                onChange={e => setExportRange(r => ({ ...r, end: e.target.value }))}
              />
            </div>
          </div>

          {/* Stats */}
          {hasRange && (
            <div className="space-y-2 text-sm">
              <div className="flex justify-between py-1.5 border-b border-gray-200">
                <span className="text-gray-500">Transactions</span>
                <span className="font-semibold text-gray-800">{preview.length}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-200">
                <span className="text-gray-500">Total Credits</span>
                <span className="font-semibold text-green-600">{fmtCurrency(totalCredit)}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-gray-500">Total Debits</span>
                <span className="font-semibold text-red-500">{fmtCurrency(totalDebit)}</span>
              </div>
            </div>
          )}

          {error && (
            <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>
          )}

          <div className="mt-auto flex flex-col gap-2">
            <button
              onClick={handleExport}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#1e2a5a] hover:bg-[#1a2450] text-white text-sm font-semibold py-2.5 transition-colors"
            >
              <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 5v14M5 19h14M5 12l7 7 7-7" />
              </svg>
              Download Statement
            </button>
            <button
              onClick={onClose}
              className="w-full rounded-xl border border-gray-200 text-gray-600 text-sm font-medium py-2 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>

        {/* ── Right: Statement Preview ── */}
        <div className="flex-1 overflow-y-auto p-6 bg-white">

          {/* Mini bank statement */}
          <div className="border border-gray-200 rounded-xl overflow-hidden text-[11px] font-sans shadow-sm">

            {/* Letterhead */}
            <div className="bg-[#1e2a5a] text-white px-5 py-4 flex items-start justify-between">
              <div>
                <div className="text-base font-bold tracking-wide">NIFFYBANK</div>
                <div className="text-[10px] text-blue-200 mt-0.5">Official Statement of Account</div>
              </div>
              <div className="text-right text-[10px] text-blue-200">
                <div className="text-white font-semibold">CONFIDENTIAL</div>
                <div className="mt-0.5">Generated {new Date().toLocaleDateString()}</div>
              </div>
            </div>

            {/* Account & period info */}
            <div className="grid grid-cols-2 gap-4 px-5 py-4 border-b border-gray-100">
              <div className="space-y-1.5">
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wide mb-2">Account Details</div>
                {[
                  ['Account Name', accountName],
                  ['Account No.', store.accountNumber || '—'],
                  ['Email', store.email || '—'],
                  ['Phone', store.phoneNumber || '—'],
                  ['Status', store.accountStatus || '—'],
                ].map(([k, v]) => (
                  <div key={k} className="flex gap-2">
                    <span className="text-gray-400 w-24 shrink-0">{k}</span>
                    <span className="font-medium text-gray-800">{v}</span>
                  </div>
                ))}
              </div>
              <div className="text-right space-y-1.5">
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wide mb-2">Statement Period</div>
                <div className="text-gray-500">From</div>
                <div className="text-gray-900 font-semibold">{hasRange ? fmtDate(exportRange.start) : '—'}</div>
                <div className="text-gray-500 mt-1">To</div>
                <div className="text-gray-900 font-semibold">{hasRange ? fmtDate(exportRange.end) : '—'}</div>
              </div>
            </div>

            {/* Balance summary */}
            <div className="grid grid-cols-4 divide-x divide-gray-100 bg-blue-50/60 border-b border-gray-100">
              {[
                { label: 'Closing Balance', value: fmtCurrency(store.currentBalance), color: 'text-[#1e2a5a]' },
                { label: 'Total Credits', value: fmtCurrency(totalCredit), color: 'text-green-600' },
                { label: 'Total Debits', value: fmtCurrency(totalDebit), color: 'text-red-500' },
                { label: 'Transactions', value: preview.length, color: 'text-gray-700' },
              ].map(({ label, value, color }) => (
                <div key={label} className="px-4 py-3 text-center">
                  <div className="text-[9px] text-gray-400 mb-1">{label}</div>
                  <div className={`font-bold ${color}`}>{value}</div>
                </div>
              ))}
            </div>

            {/* Transactions table */}
            {!hasRange ? (
              <div className="py-12 text-center text-gray-400 text-xs">
                Select a date range to preview your statement
              </div>
            ) : preview.length === 0 ? (
              <div className="py-12 text-center text-gray-400 text-xs">
                No transactions found in the selected range
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-[10px]">
                  <thead>
                    <tr className="bg-[#1e2a5a] text-white">
                      {['Date', 'Time', 'Ref ID', 'Description', 'Channel', 'DR', 'CR', 'Balance'].map(h => (
                        <th key={h} className={`px-2 py-2 font-semibold ${['DR', 'CR', 'Balance'].includes(h) ? 'text-right' : 'text-left'}`}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {previewWithBalance.map((tx, i) => (
                      <tr key={tx.id} className={i % 2 === 0 ? 'bg-white' : 'bg-blue-50/30'}>
                        <td className="px-2 py-1.5 text-gray-600 whitespace-nowrap">{tx.date}</td>
                        <td className="px-2 py-1.5 text-gray-500 whitespace-nowrap">{fmtTime(tx.time) || '—'}</td>
                        <td className="px-2 py-1.5 font-mono text-gray-500 whitespace-nowrap">{tx.id}</td>
                        <td className="px-2 py-1.5 text-gray-700 max-w-[120px] truncate">{tx.description}</td>
                        <td className="px-2 py-1.5 text-gray-500 whitespace-nowrap">{tx.channel}</td>
                        <td className="px-2 py-1.5 text-right text-red-500 font-medium whitespace-nowrap">
                          {tx.type === 'Debit' ? `$${tx.amount.toFixed(2)}` : ''}
                        </td>
                        <td className="px-2 py-1.5 text-right text-green-600 font-medium whitespace-nowrap">
                          {tx.type === 'Credit' ? `$${tx.amount.toFixed(2)}` : ''}
                        </td>
                        <td className="px-2 py-1.5 text-right font-semibold text-gray-900 whitespace-nowrap">
                          ${tx.balance.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-gray-200 bg-gray-50 font-bold">
                      <td colSpan={5} className="px-2 py-2 text-gray-600">Totals</td>
                      <td className="px-2 py-2 text-right text-red-500">${totalDebit.toFixed(2)}</td>
                      <td className="px-2 py-2 text-right text-green-600">${totalCredit.toFixed(2)}</td>
                      <td className="px-2 py-2 text-right text-[#1e2a5a]">{fmtCurrency(store.currentBalance)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            )}

            {/* Footer note */}
            <div className="px-5 py-3 border-t border-gray-100 text-[9px] text-gray-400 text-center">
              This is a computer-generated statement and does not require a signature. NiffyBank · Confidential · For account holder use only.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────
function TransactionsPage() {
  const store = useBankStore();
  const { transactions } = store;
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [visibleCount, setVisibleCount] = useState(10);
  const [showExportModal, setShowExportModal] = useState(false);

  const PAGE_SIZE = 10;

  const filteredTransactions = useMemo(() => {
    setVisibleCount(PAGE_SIZE);
    return transactions.filter(tx => {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        tx.id.toLowerCase().includes(query) ||
        tx.name.toLowerCase().includes(query) ||
        tx.description.toLowerCase().includes(query);

      let matchesDate = true;
      if (dateRange.start) matchesDate = matchesDate && new Date(tx.date) >= new Date(dateRange.start);
      if (dateRange.end) matchesDate = matchesDate && new Date(tx.date) <= new Date(dateRange.end);

      return matchesSearch && matchesDate;
    });
  }, [transactions, searchQuery, dateRange]);

  const visibleTransactions = filteredTransactions.slice(0, visibleCount);
  const hasMore = visibleCount < filteredTransactions.length;

  return (
    <div className="flex flex-col gap-6 p-4 md:p-8">
      {showExportModal && (
        <ExportModal
          transactions={transactions}
          store={store}
          onClose={() => setShowExportModal(false)}
        />
      )}

      <DashboardSummaryCards />

      {/* Header and Actions */}
      <div className="flex flex-col gap-4">
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
            <Button variant='primary' size='md' shape='roundedMd' onClick={() => setShowExportModal(true)}>
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 5v14M5 19h14M5 12l7 7 7-7" />
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

      <TransactionHistory transactions={visibleTransactions} />

      {/* Load More */}
      <div className="flex flex-col items-center gap-3 py-4">
        <p className="text-sm text-gray-400">
          Showing {visibleTransactions.length} of {filteredTransactions.length} transactions
        </p>
        {hasMore && (
          <button
            onClick={() => setVisibleCount(c => c + PAGE_SIZE)}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 hover:border-primary transition-colors shadow-sm"
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
            Load More
          </button>
        )}
        {!hasMore && filteredTransactions.length > 0 && (
          <p className="text-xs text-gray-400">All transactions loaded</p>
        )}
      </div>
    </div>
  )
}

export default TransactionsPage


