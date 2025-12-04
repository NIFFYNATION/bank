import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  GlobeAltIcon,
  BuildingLibraryIcon,
  IdentificationIcon,
  BanknotesIcon,
  ArrowsRightLeftIcon,
  ShieldCheckIcon,
  CurrencyDollarIcon,
  UserIcon,
  CalendarDaysIcon,
} from '@heroicons/react/24/outline';

const currencies = ['USD', 'EUR', 'GBP', 'NGN'];
const countries = ['United States', 'United Kingdom', 'Germany', 'Nigeria', 'Canada', 'France'];

export default function InternationalWire() {
  const [form, setForm] = useState({
    recipientName: '',
    country: 'United States',
    address: '',
    bankName: '',
    swift: '',
    iban: '',
    accountNumber: '',
    currency: 'USD',
    amount: '',
    purpose: '',
    scheduleDate: '',
  });

  const exchangeRate = useMemo(() => {
    // Mock FX rates relative to USD
    const rates = { USD: 1, EUR: 0.92, GBP: 0.78, NGN: 1550 };
    return rates[form.currency] || 1;
  }, [form.currency]);

  const fees = useMemo(() => {
    const amount = parseFloat(form.amount || 0);
    const baseFee = amount > 0 ? Math.max(10, amount * 0.01) : 0; // 1% or $10 min
    const swiftFee = form.swift ? 5 : 0;
    return { baseFee, swiftFee, total: baseFee + swiftFee };
  }, [form.amount, form.swift]);

  const canSubmit = useMemo(() => {
    return (
      form.recipientName && form.bankName && form.swift && form.currency && parseFloat(form.amount) > 0
    );
  }, [form]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-8 mt-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">International Wire Transfer</h1>
          <p className="text-sm text-gray-600 mt-1">Send money globally with secure SWIFT transfers and live FX overview.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="xl:col-span-2 bg-white rounded-2xl shadow-lg p-6"
        >
          {/* Recipient Details */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <UserIcon className="w-5 h-5 text-indigo-600" />
              <h2 className="text-lg font-semibold text-gray-900">Recipient Details</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">Full Name</label>
                <input
                  name="recipientName"
                  value={form.recipientName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="mt-1 w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">Country</label>
                <select
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  className="mt-1 w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none"
                >
                  {countries.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="text-sm text-gray-600">Address (optional)</label>
                <input
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Street, City, ZIP"
                  className="mt-1 w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Bank Details */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <BuildingLibraryIcon className="w-5 h-5 text-indigo-600" />
              <h2 className="text-lg font-semibold text-gray-900">Bank Details</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">Bank Name</label>
                <input
                  name="bankName"
                  value={form.bankName}
                  onChange={handleChange}
                  placeholder="Bank of Finance"
                  className="mt-1 w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">SWIFT/BIC</label>
                <input
                  name="swift"
                  value={form.swift}
                  onChange={handleChange}
                  placeholder="BOFAUS3N"
                  className="mt-1 w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">IBAN</label>
                <input
                  name="iban"
                  value={form.iban}
                  onChange={handleChange}
                  placeholder="GB33BUKB20201555555555"
                  className="mt-1 w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">Account Number</label>
                <input
                  name="accountNumber"
                  value={form.accountNumber}
                  onChange={handleChange}
                  placeholder="1234567890"
                  className="mt-1 w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Transfer Details */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <BanknotesIcon className="w-5 h-5 text-indigo-600" />
              <h2 className="text-lg font-semibold text-gray-900">Transfer Details</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm text-gray-600">Currency</label>
                <select
                  name="currency"
                  value={form.currency}
                  onChange={handleChange}
                  className="mt-1 w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none"
                >
                  {currencies.map((cur) => (
                    <option key={cur} value={cur}>{cur}</option>
                  ))}
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
                <label className="text-sm text-gray-600">Schedule (optional)</label>
                <input
                  type="date"
                  name="scheduleDate"
                  value={form.scheduleDate}
                  onChange={handleChange}
                  className="mt-1 w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="text-sm text-gray-600">Transfer Purpose</label>
              <textarea
                name="purpose"
                value={form.purpose}
                onChange={handleChange}
                placeholder="e.g., Invoice payment for services"
                className="mt-1 w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none"
                rows={3}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              className="px-5 py-2 rounded-lg border border-gray-200 hover:bg-gray-50"
              onClick={() => setForm({
                recipientName: '', country: 'United States', address: '', bankName: '', swift: '', iban: '', accountNumber: '', currency: 'USD', amount: '', purpose: '', scheduleDate: ''
              })}
            >
              Reset
            </button>
            <button
              disabled={!canSubmit}
              className={`px-5 py-2 rounded-lg text-white transition-colors ${canSubmit ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-300 cursor-not-allowed'}`}
            >
              Review Transfer
            </button>
          </div>
        </motion.div>

        {/* Summary & FX */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-6 space-y-6"
        >
          <div className="flex items-center gap-2">
            <GlobeAltIcon className="w-6 h-6 text-indigo-600" />
            <h2 className="text-lg font-semibold text-gray-900">FX & Fees Overview</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-gray-50">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <ArrowsRightLeftIcon className="w-4 h-4 text-indigo-600" />
                Exchange Rate
              </div>
              <div className="text-2xl font-bold text-gray-900 mt-2">1 USD ≈ {exchangeRate.toLocaleString()} {form.currency}</div>
              <p className="text-xs text-gray-500 mt-1">Rates are indicative and may vary slightly at execution.</p>
            </div>
            <div className="p-4 rounded-xl bg-gray-50">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CurrencyDollarIcon className="w-4 h-4 text-indigo-600" />
                Fees Breakdown
              </div>
              <div className="mt-2 space-y-1 text-sm">
                <div className="flex justify-between"><span>Base fee</span><span className="font-medium">${fees.baseFee.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>SWIFT handling</span><span className="font-medium">${fees.swiftFee.toFixed(2)}</span></div>
                <div className="flex justify-between text-gray-900 font-semibold"><span>Total fees</span><span>${fees.total.toFixed(2)}</span></div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-green-50 border border-green-200">
            <div className="flex items-center gap-2 text-green-700">
              <ShieldCheckIcon className="w-5 h-5" />
              <span className="font-medium">Secure SWIFT transfer</span>
            </div>
            <p className="text-sm text-green-700 mt-1">We encrypt your payment details and comply with global AML/KYC policies.</p>
          </div>

          <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
            <div className="flex items-center gap-2 text-blue-700">
              <CalendarDaysIcon className="w-5 h-5" />
              <span className="font-medium">Estimated Delivery</span>
            </div>
            <p className="text-sm text-blue-700 mt-1">International wires typically arrive within 1–3 business days.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
