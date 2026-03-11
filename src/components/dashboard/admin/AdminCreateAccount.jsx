import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useBankStore, formatCurrency } from '../../../store/useBankStore';

export default function AdminCreateAccount() {
  const createOrUpdateAccount = useBankStore((state) => state.createOrUpdateAccount);
  const addManualTransaction = useBankStore((state) => state.addManualTransaction);
  const deleteTransaction = useBankStore((state) => state.deleteTransaction);
  const firstName = useBankStore((state) => state.firstName);
  const lastName = useBankStore((state) => state.lastName);
  const transactions = useBankStore((state) => state.transactions);
  const storeMonthlyIncome = useBankStore((state) => state.monthlyIncome);
  const storeMonthlyOutgoing = useBankStore((state) => state.monthlyOutgoing);
  const storeTransactionLimit = useBankStore((state) => state.transactionLimit);
  const [form, setForm] = useState({
    firstName: firstName || '',
    lastName: lastName || '',
    accountNumber: '',
    currentBalance: '',
    email: '',
    phoneNumber: '',
    numberOfTransactions: '',
    firstTransactionDate: '',
    lastTransactionDate: '',
    transactionTypePreference: '',
    amountRange: '',
    city: '',
    country: '',
    address: '',
    zipCode: '',
    spendStatus: '',
    accountStatus: '',
    sendOtpToLogin: '',
    accountAgeYears: '',
    password: '',
    confirmPassword: '',
  });

  const [status, setStatus] = useState(null);
  const [createdAccount, setCreatedAccount] = useState(null);
  const [manualTx, setManualTx] = useState({
    date: '',
    name: '',
    description: '',
    channel: '',
    type: '',
    amount: '',
  });
  const [manualTxStatus, setManualTxStatus] = useState(null);

  const handleManualTxChange = (e) => {
    const { name, value } = e.target;
    setManualTx((prev) => ({ ...prev, [name]: value }));
  };

  const handleManualTxSubmit = (e) => {
    e.preventDefault();
    try {
      addManualTransaction(manualTx);
      setManualTxStatus({ type: 'success', message: 'Transaction added successfully.' });
      setManualTx({ date: '', name: '', description: '', channel: '', type: '', amount: '' });
    } catch (error) {
      setManualTxStatus({ type: 'error', message: error.message || 'Failed to add transaction.' });
    }
  };

  const generateAccountNumber = () => {
    // 11-digit pseudo-random account number
    return String(Math.floor(10000000000 + Math.random() * 90000000000));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const numericBalance = Number(form.currentBalance) || 0;

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
    <div className="w-full max-w-6xl my-8 mx-auto">
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

        </div>

        {status && (
          <div
            className={`mb-4 rounded-lg px-4 py-3 text-sm ${status.type === 'success'
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
                Number of Transactions you want to generate
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

              <div className="mt-3">
                <label className="block text-xs font-medium text-text-secondary mb-1">
                  Transaction Starts?
                </label>
                <input
                  type="date"
                  name="firstTransactionDate"
                  value={form.firstTransactionDate}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-light"
                  required
                />
              </div>

              <div className="mt-3">
                <label className="block text-xs font-medium text-text-secondary mb-1">
                  Transaction Ends?
                </label>
                <input
                  type="date"
                  name="lastTransactionDate"
                  value={form.lastTransactionDate}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-light"
                  required
                />
              </div>

              <div className="mt-3">
                <label className="block text-xs font-medium text-text-secondary mb-1">
                  Type of Transactions
                </label>
                <select
                  name="transactionTypePreference"
                  value={form.transactionTypePreference}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-light"
                  required
                >
                  <option value="">Select type</option>
                  <option value="credit">Credit only</option>
                  <option value="debit">Debit only</option>
                  <option value="both">Both credit and debit</option>
                </select>
              </div>

              <div className="mt-3">
                <label className="block text-xs font-medium text-text-secondary mb-1">
                  Amount Range
                </label>
                <select
                  name="amountRange"
                  value={form.amountRange}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-light"
                  required
                >
                  <option value="">Select range</option>
                  <option value="hundreds">Hundreds (100 - 999)</option>
                  <option value="thousands">Thousands (1,000 - 9,999)</option>
                  <option value="hundreds_thousands">Hundreds &amp; Thousands (100 - 9,999)</option>
                  <option value="millions">Millions (100,000+)</option>
                </select>
              </div>
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
                Account Status
              </label>
              <select
                name="accountStatus"
                value={form.accountStatus}
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
                {formatCurrency(Number(storeMonthlyIncome || 0))}
              </div>
            </div>
            <div>
              <span className="text-text-secondary">Monthly Outgoing</span>
              <div className="font-semibold text-primary">
                {formatCurrency(Number(storeMonthlyOutgoing || 0))}
              </div>
            </div>
            <div>
              <span className="text-text-secondary">Transaction Limit</span>
              <div className="font-semibold text-primary">
                {formatCurrency(Number(storeTransactionLimit || 0))}
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
              <span className="text-text-secondary">Transaction Type Preference</span>
              <div className="font-semibold text-primary">
                {createdAccount.transactionTypePreference}
              </div>
            </div>
            <div>
              <span className="text-text-secondary">Amount Range</span>
              <div className="font-semibold text-primary">
                {createdAccount.amountRange}
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
              <span className="text-text-secondary">Account Status</span>
              <div className="font-semibold text-primary">
                {createdAccount.accountStatus}
              </div>
            </div>
            <div>
              <span className="text-text-secondary">Send OTP to Login</span>
              <div className="font-semibold text-primary">
                {createdAccount.sendOtpToLogin}
              </div>
            </div>
          </div>

          {/* Manual Transaction Form */}
          <div className="mt-8 border-t border-gray-100 pt-6">
            <h3 className="text-md font-semibold text-primary mb-4">
              Add Transaction Manually
            </h3>

            {manualTxStatus && (
              <div
                className={`mb-4 rounded-lg px-4 py-3 text-sm ${manualTxStatus.type === 'success'
                  ? 'bg-green-50 text-green-700 border border-green-200'
                  : 'bg-red-50 text-red-700 border border-red-200'
                  }`}
              >
                {manualTxStatus.message}
              </div>
            )}

            <form onSubmit={handleManualTxSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-text-secondary mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={manualTx.date}
                    onChange={handleManualTxChange}
                    className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-light"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-text-secondary mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={manualTx.name}
                    onChange={handleManualTxChange}
                    className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-light"
                    placeholder="e.g. John Smith"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-text-secondary mb-1">
                    Description
                  </label>
                  <input
                    type="text"
                    name="description"
                    value={manualTx.description}
                    onChange={handleManualTxChange}
                    className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-light"
                    placeholder="e.g. Salary payment"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-text-secondary mb-1">
                    Channel
                  </label>
                  <select
                    name="channel"
                    value={manualTx.channel}
                    onChange={handleManualTxChange}
                    className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-light"
                    required
                  >
                    <option value="">Select channel</option>
                    <option value="Local Transfer">Local Transfer</option>
                    <option value="International Wire">International Wire</option>
                    <option value="Card">Card</option>
                    <option value="Deposit">Deposit</option>
                    <option value="ACH Transfer">ACH Transfer</option>
                    <option value="Mobile Payment">Mobile Payment</option>
                    <option value="Online Banking">Online Banking</option>
                    <option value="Direct Debit">Direct Debit</option>
                    <option value="Cheque">Cheque</option>
                    <option value="POS Terminal">POS Terminal</option>
                    <option value="Wire Transfer">Wire Transfer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-text-secondary mb-1">
                    Type
                  </label>
                  <select
                    name="type"
                    value={manualTx.type}
                    onChange={handleManualTxChange}
                    className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-light"
                    required
                  >
                    <option value="">Select type</option>
                    <option value="Credit">Credit</option>
                    <option value="Debit">Debit</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-text-secondary mb-1">
                    Amount (USD)
                  </label>
                  <input
                    type="number"
                    name="amount"
                    value={manualTx.amount}
                    onChange={handleManualTxChange}
                    className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-light"
                    min="0.01"
                    step="0.01"
                    placeholder="e.g. 1500.00"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center px-5 py-2 rounded-xl bg-green-600 text-white text-sm font-semibold shadow-sm hover:bg-green-700 transition-colors"
                >
                  + Add Transaction
                </button>
              </div>
            </form>
          </div>

          {Array.isArray(transactions) && transactions.length > 0 && (
            <div className="mt-8">
              <h3 className="text-md font-semibold text-primary mb-3">
                Generated Transactions
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full text-xs md:text-sm">
                  <thead>
                    <tr className="text-text-secondary border-b border-gray-100">
                      <th className="py-2 pr-3 text-left">Date</th>
                      <th className="py-2 pr-3 text-left">Transaction ID</th>
                      <th className="py-2 pr-3 text-left">Name</th>
                      <th className="py-2 pr-3 text-left">Description</th>
                      <th className="py-2 pr-3 text-left">Channel</th>
                      <th className="py-2 pr-3 text-left">Type</th>
                      <th className="py-2 pl-3 text-right">Amount</th>
                      <th className="py-2 pl-3 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((tx) => (
                      <tr
                        key={tx.id}
                        className="border-b border-gray-50 last:border-b-0 hover:bg-gray-50"
                      >
                        <td className="py-2 pr-3 text-text-secondary">{tx.date}</td>
                        <td className="py-2 pr-3 font-mono text-text-secondary">{tx.id}</td>
                        <td className="py-2 pr-3 font-medium text-primary">{tx.name}</td>
                        <td className="py-2 pr-3 text-text-secondary">
                          {tx.description}
                        </td>
                        <td className="py-2 pr-3 text-text-secondary">{tx.channel}</td>
                        <td className="py-2 pr-3">
                          <span
                            className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-semibold ${tx.type === 'Credit'
                              ? 'bg-green-50 text-green-600 border border-green-200'
                              : 'bg-red-50 text-red-500 border border-red-200'
                              }`}
                          >
                            {tx.type}
                          </span>
                        </td>
                        <td
                          className={`py-2 pl-3 text-right font-semibold ${tx.type === 'Credit' ? 'text-green-600' : 'text-red-500'
                            }`}
                        >
                          {formatCurrency(tx.amount)}
                        </td>
                        <td className="py-2 pl-3 text-center">
                          <button
                            type="button"
                            onClick={() => deleteTransaction(tx.id)}
                            className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-700 transition-colors"
                            title="Delete transaction"
                          >
                            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m2 0v14a2 2 0 01-2 2H8a2 2 0 01-2-2V6h12zM10 11v6M14 11v6" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}


        </motion.div>
      )}
    </div>
  );
}

