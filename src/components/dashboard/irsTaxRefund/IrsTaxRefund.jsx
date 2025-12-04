import React, { useMemo, useState } from 'react';
import { ReceiptRefundIcon, ShieldCheckIcon, BanknotesIcon } from '@heroicons/react/24/outline';
import SectionCard from '../../common/SectionCard';
import LabeledField from '../../common/LabeledField';
import SummaryCard from '../../common/SummaryCard';

function maskAccount(num) {
  if (!num) return '-';
  const s = String(num);
  return s.length <= 4 ? s : `•••• ${s.slice(-4)}`;
}

export default function IrsTaxRefund() {
  const [form, setForm] = useState({
    taxId: '',
    filingStatus: '',
    refundMethod: 'deposit',
    accountNumber: '',
    routingNumber: '',
    expectedRefund: '',
  });
  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const valid = useMemo(() => {
    const amt = parseFloat(form.expectedRefund || '0');
    const isDeposit = form.refundMethod === 'deposit';
    return form.taxId && form.filingStatus && amt > 0 && (!isDeposit || (form.accountNumber && form.routingNumber));
  }, [form]);

  const summaryItems = [
    { label: 'Refund Method', value: form.refundMethod === 'deposit' ? 'Direct Deposit' : 'Cheque' },
    { label: 'Expected Refund', value: form.expectedRefund ? `$${parseFloat(form.expectedRefund).toFixed(2)}` : '-' , accent: true},
    { label: 'Deposit Account', value: form.refundMethod === 'deposit' ? maskAccount(form.accountNumber) : '-' },
  ];

  return (
    <div className="space-y-8">
      <SectionCard title="IRS Tax Refund" subtitle="Setup your tax refund with secure direct deposit" icon={ReceiptRefundIcon}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <LabeledField label="Tax ID (SSN/EIN)" name="taxId" value={form.taxId} onChange={update} placeholder="XXX-XX-XXXX" required />
          <LabeledField label="Filing Status" name="filingStatus" value={form.filingStatus} onChange={update} required options={[
            { label: 'Single', value: 'single' },
            { label: 'Married Filing Jointly', value: 'mfj' },
            { label: 'Married Filing Separately', value: 'mfs' },
            { label: 'Head of Household', value: 'hoh' },
            { label: 'Qualifying Widow(er)', value: 'qw' },
          ]} />
          <LabeledField label="Refund Method" name="refundMethod" value={form.refundMethod} onChange={update} options={[
            { label: 'Direct Deposit', value: 'deposit' },
            { label: 'Cheque', value: 'cheque' },
          ]} />

          {form.refundMethod === 'deposit' && (
            <>
              <LabeledField label="Account Number" name="accountNumber" value={form.accountNumber} onChange={update} placeholder="Enter account number" required />
              <LabeledField label="Routing Number" name="routingNumber" value={form.routingNumber} onChange={update} placeholder="Enter routing number" required />
            </>
          )}

          <LabeledField label="Expected Refund" type="number" step="0.01" name="expectedRefund" value={form.expectedRefund} onChange={update} placeholder="0.00" required />
        </div>

        <div className="mt-6 flex items-center gap-3">
          <button
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white ${valid ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-300 cursor-not-allowed'}`}
            disabled={!valid}
          >
            <BanknotesIcon className="w-4 h-4" />
            Submit Refund Setup
          </button>
          <div className="flex items-center text-sm text-gray-600">
            <ShieldCheckIcon className="w-4 h-4 mr-1 text-indigo-600" />
            Your data is encrypted in transit and at rest
          </div>
        </div>
      </SectionCard>

      <SummaryCard title="Refund Summary" items={summaryItems} />
    </div>
  );
}

