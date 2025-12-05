import { create } from 'zustand';

// Helper to format currency
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

// Initial Mock Data
const INITIAL_TRANSACTIONS = [
  {
    id: 'QWE-231213',
    name: 'Anastasia',
    date: '2023-09-29',
    description: 'Salary Credit',
    type: 'Credit',
    amount: 12200,
    channel: 'Local Transfer',
  },
  {
    id: 'ZXC-072349',
    name: 'Netflix',
    date: '2023-09-29',
    description: 'Monthly Subscription',
    type: 'Debit',
    amount: 15.99,
    channel: 'Card',
  },
  {
    id: 'ADC-076223',
    name: 'Anastasia',
    date: '2023-01-29',
    description: 'Payment received',
    type: 'Credit',
    amount: 500,
    channel: 'International Wire',
  },
];

export const useBankStore = create((set, get) => ({
  // --- State ---
  currentBalance: 1181860,
  monthlyIncome: 12700, // Sum of credits in current month (mock)
  monthlyOutgoing: 15.99, // Sum of debits in current month (mock)
  transactionLimit: 500000,
  pendingTransactions: 15200, // value of pending
  transactionVolume: 658342.82,
  accountAge: '5 years',
  accountNumber: '77990250980',
  accountStatus: 'Active',
  userName: 'Alex',
  currency: 'USD',
  transactions: INITIAL_TRANSACTIONS,

  // --- Actions ---
  
  // Send Money (Debit)
  sendMoney: ({ to, amount, description, channel = 'Local Transfer' }) => {
    const { currentBalance, monthlyOutgoing, transactionLimit, transactionVolume } = get();
    const numAmount = parseFloat(amount);

    // Validation
    if (isNaN(numAmount) || numAmount <= 0) {
      throw new Error('Invalid amount');
    }
    if (numAmount > currentBalance) {
      throw new Error('Insufficient funds');
    }
    if (numAmount > transactionLimit) {
      throw new Error('Transaction limit exceeded');
    }

    const newTransaction = {
      id: `TRX-${Math.floor(Math.random() * 1000000)}`,
      name: to,
      date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
      description: description || 'Transfer',
      type: 'Debit',
      amount: numAmount,
      channel,
    };

    set({
      currentBalance: currentBalance - numAmount,
      monthlyOutgoing: monthlyOutgoing + numAmount,
      transactionVolume: transactionVolume + numAmount,
      transactions: [newTransaction, ...get().transactions],
    });
  },

  // Receive Money (Credit) - e.g. from Deposit
  depositMoney: ({ from, amount, description, channel = 'Deposit' }) => {
    const { currentBalance, monthlyIncome, transactionVolume } = get();
    const numAmount = parseFloat(amount);

    if (isNaN(numAmount) || numAmount <= 0) {
      throw new Error('Invalid amount');
    }

    const newTransaction = {
      id: `DEP-${Math.floor(Math.random() * 1000000)}`,
      name: from || 'Self',
      date: new Date().toISOString().split('T')[0],
      description: description || 'Deposit',
      type: 'Credit',
      amount: numAmount,
      channel,
    };

    set({
      currentBalance: currentBalance + numAmount,
      monthlyIncome: monthlyIncome + numAmount,
      transactionVolume: transactionVolume + numAmount,
      transactions: [newTransaction, ...get().transactions],
    });
  },
}));
