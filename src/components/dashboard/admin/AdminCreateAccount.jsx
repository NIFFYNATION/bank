import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useBankStore, formatCurrency } from '../../../store/useBankStore';

export default function AdminCreateAccount() {
  const createOrUpdateAccount = useBankStore((state) => state.createOrUpdateAccount);
  const currentBalance = useBankStore((state) => state.currentBalance);
  const firstName = useBankStore((state) => state.firstName);
  const lastName = useBankStore((state) => state.lastName);

  const [form, setForm] = useState({
    firstName: firstName || '',
    lastName: lastName || '',
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
  const [createdAccount, setCreatedAccount] = useState(null);

  const generateAccountNumber = () => {
    // 11-digit pseudo-random account number
    return String(Math.floor(10000000000 + Math.random() * 90000000000));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setStatus({ type: 'error', message: 'Password and Confirm Password must match.' });
      return;
    }

    const generatedAccountNumber = generateAccountNumber();

    const payload = {
      ...form,
      accountNumber: generatedAccountNumber,
    };

    try {
      createOrUpdateAccount(payload);
      setCreatedAccount(payload);
      setStatus({ type: 'success', message: 'Account created successfully.' });
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
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-light"
                placeholder="e.g. John"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-light"
                placeholder="e.g. Doe"
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
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-light"
                placeholder="e.g. user@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={form.phoneNumber}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-light"
                placeholder="e.g. +1 555 000 0000"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1">
                Number of Transactions
              </label>
              <input
                type="number"
                name="numberOfTransactions"
                value={form.numberOfTransactions}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-light"
                min="0"
                step="1"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1">
                Unit / Scale
              </label>
              <input
                type="text"
                name="unitScale"
                value={form.unitScale}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-light"
                placeholder="e.g. Personal, Corporate"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1">
                City
              </label>
              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-light"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1">
                Country
              </label>
              <input
                type="text"
                name="country"
                value={form.country}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-light"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-text-secondary mb-1">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-light"
                placeholder="Street, building, etc."
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1">
                ZIP / Postal Code
              </label>
              <input
                type="text"
                name="zipCode"
                value={form.zipCode}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-light"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1">
                Spend Status
              </label>
              <select
                name="spendStatus"
                value={form.spendStatus}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-light"
                required
              >
                <option value="">Select status</option>
                <option value="Normal">Normal</option>
                <option value="High Risk">High Risk</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1">
                Active Status
              </label>
              <select
                name="activeStatus"
                value={form.activeStatus}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-light"
                required
              >
                <option value="">Select status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Blocked">Blocked</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1">
                Send OTP to Login
              </label>
              <select
                name="sendOtpToLogin"
                value={form.sendOtpToLogin}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-light"
                required
              >
                <option value="">Select option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
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

            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-light"
                placeholder="Re-type password"
                required
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-primary text-background text-sm font-semibold shadow-sm hover:bg-primary-light transition-colors"
            >
              Create Account
            </button>
          </div>
        </form>
      </motion.div>

      {createdAccount && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="mt-6 bg-background rounded-2xl shadow-md p-6 md:p-8"
        >
          <h2 className="text-lg font-bold text-primary mb-4">Created Account Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-text-secondary">Account Number</span>
              <div className="font-semibold text-primary">{createdAccount.accountNumber}</div>
            </div>
            <div>
              <span className="text-text-secondary">Name</span>
              <div className="font-semibold text-primary">
                {createdAccount.firstName} {createdAccount.lastName}
              </div>
            </div>
            <div>
              <span className="text-text-secondary">Email</span>
              <div className="font-semibold text-primary">{createdAccount.email}</div>
            </div>
            <div>
              <span className="text-text-secondary">Phone</span>
              <div className="font-semibold text-primary">{createdAccount.phoneNumber}</div>
            </div>
            <div>
              <span className="text-text-secondary">Current Balance</span>
              <div className="font-semibold text-primary">
                {formatCurrency(Number(createdAccount.currentBalance || 0))}
              </div>
            </div>
            <div>
              <span className="text-text-secondary">Monthly Income</span>
              <div className="font-semibold text-primary">
                {formatCurrency(Number(createdAccount.monthlyIncome || 0))}
              </div>
            </div>
            <div>
              <span className="text-text-secondary">Monthly Outgoing</span>
              <div className="font-semibold text-primary">
                {formatCurrency(Number(createdAccount.monthlyOutgoing || 0))}
              </div>
            </div>
            <div>
              <span className="text-text-secondary">Transaction Limit</span>
              <div className="font-semibold text-primary">
                {formatCurrency(Number(createdAccount.transactionLimit || 0))}
              </div>
            </div>
            <div>
              <span className="text-text-secondary">Account Age</span>
              <div className="font-semibold text-primary">
                {createdAccount.accountAgeYears} years
              </div>
            </div>
            <div>
              <span className="text-text-secondary">Number of Transactions</span>
              <div className="font-semibold text-primary">
                {createdAccount.numberOfTransactions}
              </div>
            </div>
            <div>
              <span className="text-text-secondary">Unit / Scale</span>
              <div className="font-semibold text-primary">
                {createdAccount.unitScale}
              </div>
            </div>
            <div>
              <span className="text-text-secondary">Location</span>
              <div className="font-semibold text-primary">
                {createdAccount.city}, {createdAccount.country}
              </div>
            </div>
            <div className="md:col-span-2">
              <span className="text-text-secondary">Address</span>
              <div className="font-semibold text-primary">
                {createdAccount.address}, {createdAccount.zipCode}
              </div>
            </div>
            <div>
              <span className="text-text-secondary">Spend Status</span>
              <div className="font-semibold text-primary">
                {createdAccount.spendStatus}
              </div>
            </div>
            <div>
              <span className="text-text-secondary">Active Status</span>
              <div className="font-semibold text-primary">
                {createdAccount.activeStatus}
              </div>
            </div>
            <div>
              <span className="text-text-secondary">Send OTP to Login</span>
              <div className="font-semibold text-primary">
                {createdAccount.sendOtpToLogin}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

