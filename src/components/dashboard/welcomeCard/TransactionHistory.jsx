import React from 'react';
import Dropdown from "../../common/Dropdown";
import StatusPill from "../../common/StatusPill";

const transactions = [
  {
    name: 'Anastasia',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    id: 'FVB-092412',
    date: 'Sep 29, 2023',
    status: 'Completed',
    amount: '$12,200',
  },
  {
    name: 'Daniel',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    id: 'DEW-076213',
    date: 'Sep 16, 2023',
    status: 'Pending',
    amount: '$6,640',
  },
  {
    name: 'Monica',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    id: 'KMN-072309',
    date: 'Oct 23, 2023',
    status: 'Completed',
    amount: '$23,450',
  },
];

export default function TransactionHistory() {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-lg text-gray-900">Transaction History</h2>
        <Dropdown options={['Monthly']} value="Monthly" />
      </div>
      <div className="overflow-x-auto max-w-[280px] sm:max-w-[650px] lg:max-w-full w-full">
        <table className="min-w-[900px] overflow-x-auto w-full text-sm">
          <thead>
            <tr className="text-gray-400 text-left">
              <th className="font-medium pb-2">Name</th>
              <th className="font-medium pb-2">Transaction ID</th>
              <th className="font-medium pb-2">Date</th>
              <th className="font-medium pb-2">Status</th>
              <th className="font-medium pb-2 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(tx => (
              <tr key={tx.id} className="border-t last:border-b-0 border-gray-100">
                <td className="py-3">
                  ddddddddddddddddddddddddddddddddddd
                </td>
                <td className="py-3">{tx.id}</td>
                <td className="py-3">{tx.date}</td>
                <td className="py-3">
                  <StatusPill status={tx.status} />
                </td>
                <td className="py-3 text-right font-semibold text-gray-900">{tx.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}