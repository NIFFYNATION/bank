import React, { useState } from 'react';
import { motion, number } from 'framer-motion';
import { useBankStore, formatCurrency } from '../../../store/useBankStore';
import { address, p } from 'framer-motion/client';

export default function AdminCreateAccount() {
  const createOrUpdateAccount = useBankStore((state) => state.createOrUpdateAccount);
  const currentBalance = useBankStore((state) => state.currentBalance);
  const firstName = useBankStore((state) => state.firstName);
  const lastName = useBankStore((state) => state.lastName);

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    accountNumber: '',
    currentBalance: currentBalance || '',
    monthlyIncome: '',
    monthlyOutgoing: '',
    transactionLimit: '',
    email: '',
    phoneNumber: '',
    numberOfTransactions: '',
    unitScale: '',
    city: '',
    country: '',
    address: '',
    zipCode: '',
    spendStatus: '',
    activeStatus: '',
    sendOtpToLogin: '',
    accountAgeYears: '',
    password: '',
    confirmPassword: '',
  });

  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      createOrUpdateAccount(form);
      setStatus({ type: 'success', message: 'Account created/updated successfully.' });
    } catch (error) {
      setStatus({ type: 'error', message: error.message || 'Something went wrong.' });
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="bg-background rounded-2xl shadow-md p-6 md:p-8"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-primary">Admin - Create Account</h1>
            <p className="text-sm text-text-secondary mt-1">
              Set up a new user account with initial balances, limits, and password.
            </p>
          </div>
          <div className="text-right text-xs md:text-sm text-text-secondary">
            <div className="font-semibold text-primary">Preview Balance</div>
            <div>{formatCurrency(currentBalance || 0)}</div>
          </div>
        </div>

        {status && (
          <div
            className={`mb-4 rounded-lg px-4 py-3 text-sm ${
              status.type === 'success'
                ? 'bg-green-50 text-green-700 border border-green-200'
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}
          >
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1">
                User Name
              </label>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-light"
                placeholder="e.g. John Doe"
                required
              />
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-light"
                placeholder="e.g. John Doe"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1">
                Account Number
              </label>
              <input
                type="text"
                name="accountNumber"
                value={form.accountNumber}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-light"
                placeholder="e.g. 77990250980"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1">
                Current Balance (USD)
              </label>
              <input
                type="number"
                name="currentBalance"
                value={form.currentBalance}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-light"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1">
                Monthly Income (USD)
              </label>
              <input
                type="number"
                name="monthlyIncome"
                value={form.monthlyIncome}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-light"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1">
                Monthly Outgoing (USD)
              </label>
              <input
                type="number"
                name="monthlyOutgoing"
                value={form.monthlyOutgoing}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-light"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1">
                Transaction Limit (USD)
              </label>
              <input
                type="number"
                name="transactionLimit"
                value={form.transactionLimit}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-light"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1">
                Account Age (years)
              </label>
              <input
                type="number"
                name="accountAgeYears"
                value={form.accountAgeYears}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-light"
                min="0"
                step="1"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-light"
                placeholder="Assign a secure password"
                required
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-primary text-background text-sm font-semibold shadow-sm hover:bg-primary-light transition-colors"
            >
              Save Account
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

