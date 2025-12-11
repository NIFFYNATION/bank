import React, { useMemo, useState } from 'react';
import { BanknotesIcon, CurrencyDollarIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';
import SectionCard from '../../common/SectionCard';
import LabeledField from '../../common/LabeledField';
import SummaryCard from '../../common/SummaryCard';
import { useBankStore } from '../../../store/useBankStore';
import { motion } from 'framer-motion';

export default function Deposit() {
  const { depositMoney } = useBankStore();
  const [status, setStatus] = useState({ type: '', message: '' });
  const [form, setForm] = useState({
    amount: '',
    account: '',
    method: 'electronic',
    reference: '',
    date: '',
  });

  const update = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (status.message) setStatus({ type: '', message: '' });
  };

  const valid = useMemo(() => {
    const amt = parseFloat(form.amount || '0');
    return amt > 0 && form.account;
  }, [form]);

  const summary = useMemo(() => {
    const amt = parseFloat(form.amount || '0');
    const fee = 0;
    const net = amt - fee;
    return [
      { label: 'Amount', value: amt ? `$${amt.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '-' },
      { label: 'Fee', value: `$${fee.toFixed(2)}` },
      { label: 'Net Deposit', value: amt ? `$${net.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '-', accent: true },
    ];
  }, [form]);

  const handleSubmit = () => {
    if (!valid) return;

    try {
      depositMoney({
        amount: parseFloat(form.amount),
        description: form.reference || `Deposit via ${form.method}`,
        method: form.method,
        account: form.account,
        date: form.date
      });

      setStatus({ type: 'success', message: 'Deposit successful! Funds have been added to your account.' });
      setForm({
        amount: '',
        account: '',
        method: 'electronic',
        reference: '',
        date: '',
      });
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    }
  };

  return (
    <div className="space-y-8">
      {status.message && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-xl border ${status.type === 'error' ? 'bg-red-50 border-red-200 text-red-700' : 'bg-green-50 border-green-200 text-green-700'}`}
        >
          {status.message}
        </motion.div>
      )}

      <SectionCard
        title="Deposit Funds"
        subtitle="Add money to your account quickly and securely"
        icon={BanknotesIcon}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <LabeledField label="Amount" type="number" step="0.01" name="amount" value={form.amount} onChange={update} placeholder="0.00" required />
          <LabeledField label="Account" name="account" value={form.account} onChange={update} placeholder="e.g., Checking •••• 1234" required />
          <LabeledField label="Method" name="method" value={form.method} onChange={update} required options={[
            { label: 'Cash', value: 'cash' },
            { label: 'Cheque', value: 'cheque' },
            { label: 'Electronic Transfer', value: 'electronic' },
          ]} />
          <LabeledField label="Reference (optional)" name="reference" value={form.reference} onChange={update} placeholder="Add a note" />
          <LabeledField label="Date" type="date" name="date" value={form.date} onChange={update} />
        </div>

        <div className="mt-6 flex items-center gap-3">
          <button
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white ${valid ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-300 cursor-not-allowed'}`}
            disabled={!valid}
            onClick={handleSubmit}
          >
            <CurrencyDollarIcon className="w-4 h-4" />
            Submit Deposit
          </button>
          <div className="flex items-center text-sm text-gray-600">
            <CalendarDaysIcon className="w-4 h-4 mr-1 text-indigo-600" />
            Same-day processing for electronic deposits
          </div>
        </div>
      </SectionCard>

      <SummaryCard title="Deposit Summary" items={summary} />
    </div>
  );
}