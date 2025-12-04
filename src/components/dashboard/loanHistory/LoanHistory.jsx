import React from 'react';
import { ClipboardDocumentListIcon } from '@heroicons/react/24/outline';
import SectionCard from '../../common/SectionCard';

const sampleLoans = [
  { id: 'LN-1024', amount: 8000, term: 24, status: 'Active', paid: 3200, started: '2024-04-10' },
  { id: 'LN-1001', amount: 5000, term: 12, status: 'Closed', paid: 5000, started: '2023-01-02' },
  { id: 'LN-1030', amount: 12000, term: 36, status: 'Pending', paid: 0, started: '2024-09-01' },
  { id: 'LN-0990', amount: 20000, term: 48, status: 'Active', paid: 8500, started: '2023-06-20' },
];

const statusStyles = {
  Active: 'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200',
  Closed: 'bg-green-50 text-green-700 ring-1 ring-green-200',
  Pending: 'bg-yellow-50 text-yellow-700 ring-1 ring-yellow-200',
};

export default function LoanHistory() {
  return (
    <div className="space-y-8">
      <SectionCard title="Loan History" subtitle="Overview of your past and current loans" icon={ClipboardDocumentListIcon}>
        <div className="overflow-hidden rounded-lg border border-gray-100">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Loan ID</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Amount</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Term</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Paid</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Status</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Start Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {sampleLoans.map((loan) => (
                <tr key={loan.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm font-mono text-gray-900">{loan.id}</td>
                  <td className="px-4 py-2 text-sm text-gray-900">${loan.amount.toLocaleString()}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{loan.term} mo</td>
                  <td className="px-4 py-2 text-sm text-gray-700">${loan.paid.toLocaleString()}</td>
                  <td className="px-4 py-2">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[loan.status]}`}>
                      {loan.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">{loan.started}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}

