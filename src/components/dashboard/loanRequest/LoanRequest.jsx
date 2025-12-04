import React, { useMemo, useState } from 'react';
import { CurrencyDollarIcon, DocumentTextIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import SectionCard from '../../common/SectionCard';
import LabeledField from '../../common/LabeledField';
import SummaryCard from '../../common/SummaryCard';

function aprFromScore(score) {
  const s = Number(score || 0);
  if (s >= 750) return 0.05;
  if (s >= 700) return 0.07;
  if (s >= 650) return 0.09;
  return 0.12;
}

export default function LoanRequest() {
  const [form, setForm] = useState({ amount: '', term: '', purpose: '', income: '', score: '' });
  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const calculation = useMemo(() => {
    const P = parseFloat(form.amount || '0');
    const n = parseInt(form.term || '0', 10);
    const apr = aprFromScore(form.score);
    const r = apr / 12;
    if (!P || !n || !r) return { apr, monthly: 0, total: 0 };
    const monthly = P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const total = monthly * n;
    return { apr, monthly, total };
  }, [form]);

  const valid = useMemo(() => {
    return parseFloat(form.amount || '0') > 0 && parseInt(form.term || '0', 10) > 0 && form.purpose;
  }, [form]);

  return (
    <div className="space-y-8">
      <SectionCard title="Loan Request" subtitle="Apply for a personal loan with transparent terms" icon={DocumentTextIcon}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <LabeledField label="Loan Amount" type="number" step="0.01" name="amount" value={form.amount} onChange={update} placeholder="0.00" required />
          <LabeledField label="Term (months)" type="number" name="term" value={form.term} onChange={update} placeholder="12" required />
          <LabeledField label="Purpose" name="purpose" value={form.purpose} onChange={update} required options={[
            { label: 'Debt Consolidation', value: 'debt' },
            { label: 'Home Improvement', value: 'home' },
            { label: 'Education', value: 'education' },
            { label: 'Auto', value: 'auto' },
            { label: 'Other', value: 'other' },
          ]} />
          <LabeledField label="Annual Income (optional)" type="number" name="income" value={form.income} onChange={update} placeholder="0.00" />
          <LabeledField label="Credit Score (optional)" type="number" name="score" value={form.score} onChange={update} placeholder="700" />
        </div>

        <div className="mt-6 flex items-center gap-3">
          <button
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white ${valid ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-300 cursor-not-allowed'}`}
            disabled={!valid}
          >
            <CurrencyDollarIcon className="w-4 h-4" />
            Request Loan
          </button>
          <div className="flex items-center text-sm text-gray-600">
            <ChartBarIcon className="w-4 h-4 mr-1 text-indigo-600" />
            Instant estimate calculated below
          </div>
        </div>
      </SectionCard>

      <SummaryCard
        title="Estimated Terms"
        items={[
          { label: 'APR', value: `${(calculation.apr * 100).toFixed(2)}%` },
          { label: 'Monthly Payment', value: calculation.monthly ? `$${calculation.monthly.toFixed(2)}` : '-' , accent: true},
          { label: 'Total Repayment', value: calculation.total ? `$${calculation.total.toFixed(2)}` : '-' },
        ]}
      />
    </div>
  );
}

