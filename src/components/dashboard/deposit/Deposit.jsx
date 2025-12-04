import React, { useMemo, useState } from 'react';
import { BanknotesIcon, CurrencyDollarIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';
import SectionCard from '../../common/SectionCard';
import LabeledField from '../../common/LabeledField';
import SummaryCard from '../../common/SummaryCard';

export default function Deposit() {
  const [form, setForm] = useState({
    amount: '',
    account: '',
    method: '',
    reference: '',
    date: '',
  });

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const valid = useMemo(() => {
    const amt = parseFloat(form.amount || '0');
    return amt > 0 && form.account && form.method;
  }, [form]);

  const summary = useMemo(() => {
    const amt = parseFloat(form.amount || '0');
    const fee = 0;
    const net = amt - fee;
    return [
      { label: 'Amount', value: amt ? `$${amt.toFixed(2)}` : '-' },
      { label: 'Fee', value: `$${fee.toFixed(2)}` },
      { label: 'Net Deposit', value: amt ? `$${net.toFixed(2)}` : '-' , accent: true},
    ];
  }, [form]);

  return (
    <div className="space-y-8">
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

