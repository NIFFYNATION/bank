import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  BuildingLibraryIcon,
  UserIcon,
  CheckBadgeIcon,
  BanknotesIcon,
  ArrowUpRightIcon,
  ClockIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';

const banks = [
  'Bank of Finance',
  'United Bank',
  'Global Trust',
  'Prime Savings',
  'Metro Bank',
];

const beneficiaries = [
  { name: 'Alice Johnson', account: '0123456789', bank: 'Global Trust' },
  { name: 'Michael Smith', account: '2233445566', bank: 'United Bank' },
  { name: 'Tech Services LLC', account: '9988776655', bank: 'Bank of Finance' },
];

export default function LocalTransfer() {
  const [form, setForm] = useState({
    recipientName: '',
    bank: banks[0],
    accountNumber: '',
    amount: '',
    description: '',
    schedule: false,
    transferType: 'Interbank', // or 'Same Bank'
  });

  const resolvedName = useMemo(() => {
    // Simulate name resolution when account number length is 10
    if (form.accountNumber && form.accountNumber.length === 10) {
      return 'Resolved: John Doe';
    }
    return '';
  }, [form.accountNumber]);

  const fees = useMemo(() => {
    const amt = parseFloat(form.amount || 0);
    const base = Math.max(0, amt * 0.005); // 0.5%
    const network = form.transferType === 'Interbank' ? 0.5 : 0; // small interbank network fee
    return { baseFee: base, networkFee: network, total: base + network };
  }, [form.amount, form.transferType]);

  const canSubmit = useMemo(() => {
    return form.bank && form.accountNumber.length === 10 && parseFloat(form.amount) > 0;
  }, [form]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const applyBeneficiary = (b) => {
    setForm((prev) => ({
      ...prev,
      recipientName: b.name,
      bank: b.bank,
      accountNumber: b.account,
    }));
  };

  return (
    <div className="space-y-8 mt-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Local Transfer</h1>
          <p className="text-sm text-gray-600 mt-1">Send money locally with instant or interbank transfers.</p>
        </div>
      </div>

      {/* Beneficiaries */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <UserIcon className="w-5 h-5 text-indigo-600" />
          <h2 className="text-lg font-semibold text-gray-900">Quick Beneficiaries</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {beneficiaries.map((b) => (
            <button
              key={b.account}
              onClick={() => applyBeneficiary(b)}
              className="px-4 py-2 rounded-full border border-gray-200 hover:bg-gray-50 text-sm"
            >
              {b.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="xl:col-span-2 bg-white rounded-2xl shadow-lg p-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600">Recipient Name</label>
              <input
                name="recipientName"
                value={form.recipientName}
                onChange={handleChange}
                placeholder="John Doe"
                className="mt-1 w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Bank</label>
              <select
                name="bank"
                value={form.bank}
                onChange={handleChange}
                className="mt-1 w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none"
              >
                {banks.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-600">Account Number</label>
              <input
                name="accountNumber"
                value={form.accountNumber}
                onChange={handleChange}
                placeholder="0123456789"
                maxLength={10}
                className="mt-1 w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none"
              />
              {resolvedName && (
                <div className="mt-2 flex items-center text-green-700 text-sm">
                  <CheckBadgeIcon className="w-4 h-4 mr-1" /> {resolvedName}
                </div>
              )}
            </div>
            <div>
              <label className="text-sm text-gray-600">Transfer Type</label>
              <select
                name="transferType"
                value={form.transferType}
                onChange={handleChange}
                className="mt-1 w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none"
              >
                <option value="Interbank">Interbank</option>
                <option value="Same Bank">Same Bank</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-600">Amount</label>
              <input
                name="amount"
                value={form.amount}
                onChange={handleChange}
                placeholder="0.00"
                type="number"
                className="mt-1 w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Schedule Transfer</label>
              <div className="flex items-center gap-3 mt-1">
                <input
                  type="checkbox"
                  name="schedule"
                  checked={form.schedule}
                  onChange={handleChange}
                />
                <ClockIcon className="w-5 h-5 text-indigo-600" />
                <span className="text-sm text-gray-600">Run later</span>
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="text-sm text-gray-600">Description (optional)</label>
              <input
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="e.g., Rent for April"
                className="mt-1 w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              className="px-5 py-2 rounded-lg border border-gray-200 hover:bg-gray-50"
              onClick={() => setForm({ recipientName: '', bank: banks[0], accountNumber: '', amount: '', description: '', schedule: false, transferType: 'Interbank' })}
            >
              Reset
            </button>
            <button
              disabled={!canSubmit}
              className={`px-5 py-2 rounded-lg text-white transition-colors ${canSubmit ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-300 cursor-not-allowed'}`}
            >
              Send Now
            </button>
          </div>
        </motion.div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-6 space-y-6"
        >
          <div className="flex items-center gap-2">
            <BuildingLibraryIcon className="w-6 h-6 text-indigo-600" />
            <h2 className="text-lg font-semibold text-gray-900">Payment Summary</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-gray-50">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <BanknotesIcon className="w-4 h-4 text-indigo-600" />
                Amount
              </div>
              <div className="text-2xl font-bold text-gray-900 mt-2">${(parseFloat(form.amount || 0)).toLocaleString()}</div>
              <p className="text-xs text-gray-500 mt-1">Local currency assumed.</p>
            </div>
            <div className="p-4 rounded-xl bg-gray-50">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <ArrowUpRightIcon className="w-4 h-4 text-indigo-600" />
                Fees
              </div>
              <div className="mt-2 space-y-1 text-sm">
                <div className="flex justify-between"><span>Base fee</span><span className="font-medium">${fees.baseFee.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>Network fee</span><span className="font-medium">${fees.networkFee.toFixed(2)}</span></div>
                <div className="flex justify-between text-gray-900 font-semibold"><span>Total fees</span><span>${fees.total.toFixed(2)}</span></div>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-green-50 border border-green-200">
            <div className="flex items-center gap-2 text-green-700">
              <ShieldCheckIcon className="w-5 h-5" />
              <span className="font-medium">Protected transfer</span>
            </div>
            <p className="text-sm text-green-700 mt-1">We verify recipient bank details and encrypt transaction data.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

