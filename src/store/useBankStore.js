import { create } from 'zustand';

// Helper to format currency
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

// --- Random transaction generator utilities ---
const RANDOM_TRANSACTION_NAMES = [
  'Salary Credit',
  'Rent Payment',
  'Grocery Store',
  'Online Shopping',
  'Utility Bill',
  'Restaurant',
  'ATM Withdrawal',
  'Subscription Charge',
  'Fuel Station',
  'Bonus Payment',
];

const RANDOM_CHANNELS = ['Local Transfer', 'International Wire', 'Card', 'Deposit'];

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const toISODate = (date) => date.toISOString().split('T')[0];

export const generateTransactionsInRange = (
  firstTransactionDate,
  lastTransactionDate,
  {
    maxTransactions,
    transactionTypePreference = 'both',
    amountRange = 'thousands',
  } = {}
) => {
  let start = new Date(firstTransactionDate);
  let end = new Date(lastTransactionDate);

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    throw new Error('Invalid date range provided');
  }

  if (start > end) {
    const temp = start;
    start = end;
    end = temp;
  }

  const pickType = () => {
    if (transactionTypePreference === 'credit') return 'Credit';
    if (transactionTypePreference === 'debit') return 'Debit';
    // both or unknown => random
    return Math.random() < 0.5 ? 'Credit' : 'Debit';
  };

  const baseRanges = {
    hundreds: { min: 100, max: 999 },
    thousands: { min: 1000, max: 9999 },
    millions: { min: 100000, max: 2000000 },
  };

  const pickAmountRange = () => {
    if (amountRange === 'hundreds') return baseRanges.hundreds;
    if (amountRange === 'thousands') return baseRanges.thousands;
    if (amountRange === 'millions') return baseRanges.millions;
    if (amountRange === 'hundreds_thousands') {
      return Math.random() < 0.5 ? baseRanges.hundreds : baseRanges.thousands;
    }
    // default to thousands if unknown
    return baseRanges.thousands;
  };

  const transactions = [];
  let current = new Date(start);

  outer: while (current <= end) {
    const txCountForDay = randomInt(0, 3);

    for (let i = 0; i < txCountForDay; i += 1) {
      const { min, max } = pickAmountRange();
      const type = pickType();
      const amount = Number((Math.random() * (max - min) + min).toFixed(2));
      const name =
        RANDOM_TRANSACTION_NAMES[randomInt(0, RANDOM_TRANSACTION_NAMES.length - 1)];
      const channel = RANDOM_CHANNELS[randomInt(0, RANDOM_CHANNELS.length - 1)];

      transactions.push({
        id: `GEN-${Math.floor(Math.random() * 1_000_000)}`,
        name,
        date: toISODate(current),
        description: name,
        type,
        amount,
        channel,
      });

      if (maxTransactions && transactions.length >= maxTransactions) {
        break outer;
      }
    }

    const stepDays = randomInt(1, 3);
    current.setDate(current.getDate() + stepDays);
  }

  if (transactions.length === 0) {
    const { min, max } = pickAmountRange();
    const type = pickType();
    const amount = Number((Math.random() * (max - min) + min).toFixed(2));
    const name =
      RANDOM_TRANSACTION_NAMES[randomInt(0, RANDOM_TRANSACTION_NAMES.length - 1)];
    const channel = RANDOM_CHANNELS[randomInt(0, RANDOM_CHANNELS.length - 1)];

    transactions.push({
      id: `GEN-${Math.floor(Math.random() * 1_000_000)}`,
      name,
      date: toISODate(start),
      description: name,
      type,
      amount,
      channel,
    });
  }

  return transactions.sort((a, b) => new Date(a.date) - new Date(b.date));
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
    name: 'John Doe',
    date: '2023-01-29',
    description: 'Your account was credited with $500.00 from John Doe.',
    type: 'Credit',
    amount: 3000,
    channel: 'Local',
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
  {
    id: 'AWC-077723',
    name: 'Brenda Smith',
    date: '2023-01-29',
    description: 'You transferred the sum of $1000.00 to Brenda Smith.',
    type: 'Debit',
    amount: 200,
    channel: 'International Wire',
  },
];

export const useBankStore = create((set, get) => ({
  // --- State ---
  currentBalance: 0,
  monthlyIncome: 0, // Sum of credits in current month (mock)
  monthlyOutgoing: 0, // Sum of debits in current month (mock)
  transactionLimit: 0,
  pendingTransactions: 0, // value of pending
  transactionVolume: 0,
  accountAge: ' ',
  accountNumber: ' ',
  accountStatus: ' ',
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  numberOfTransactions: 0,
  unitScale: '',
  city: '',
  country: '',
  address: '',
  zipCode: '',
  spendStatus: '',
  sendOtpToLogin: '',
  firstTransactionDate: '',
  lastTransactionDate: '',
  transactionTypePreference: '',
  amountRange: '',
  currency: 'USD',
  transactions: INITIAL_TRANSACTIONS,

  // --- Actions ---

  // Admin: Create or update a user account
  createOrUpdateAccount: ({
    firstName,
    lastName,
    accountNumber,
    currentBalance,
    accountAgeYears,
    email,
    phoneNumber,
    numberOfTransactions,
    firstTransactionDate,
    lastTransactionDate,
    transactionTypePreference,
    amountRange,
    unitScale,
    city,
    country,
    address,
    zipCode,
    spendStatus,
    activeStatus,
    sendOtpToLogin,
    password,
  }) => {
    const numericBalance = Number(currentBalance) || 0;
    const numericTransactions = Number(numberOfTransactions) || 0;

    // Simple derived statistics based on balance
    const pendingTransactions = numericBalance * 0.02; // 2% of balance
    const transactionVolume = numericBalance * 0.5; // 50% of balance

    let generatedTransactions = get().transactions;
    try {
      if (firstTransactionDate && lastTransactionDate) {
        generatedTransactions = generateTransactionsInRange(
          firstTransactionDate,
          lastTransactionDate,
          {
            maxTransactions: numericTransactions || undefined,
            transactionTypePreference,
            amountRange,
          }
        );
      }
    } catch (e) {
      // If generation fails, keep existing transactions
    }

    // Derive monthly income/outgoing from generated history
    const monthlyIncome = generatedTransactions
      .filter((tx) => tx.type === 'Credit')
      .reduce((sum, tx) => sum + Number(tx.amount || 0), 0);

    const monthlyOutgoing = generatedTransactions
      .filter((tx) => tx.type === 'Debit')
      .reduce((sum, tx) => sum + Number(tx.amount || 0), 0);

    const transactionLimit = numericBalance * 0.4;

    set({
      firstName: firstName || '',
      lastName: lastName || '',
      userName: `${firstName || ''} ${lastName || ''}`.trim() || 'New User',
      accountNumber: accountNumber || '0000000000',
      currentBalance: numericBalance,
      monthlyIncome,
      monthlyOutgoing,
      transactionLimit,
      pendingTransactions,
      transactionVolume,
      accountAge: accountAgeYears ? `${accountAgeYears} years` : '0 years',
      email: email || '',
      phoneNumber: phoneNumber || '',
      numberOfTransactions: numericTransactions,
      unitScale: unitScale || '',
      city: city || '',
      country: country || '',
      address: address || '',
      zipCode: zipCode || '',
      spendStatus: spendStatus || '',
      sendOtpToLogin: sendOtpToLogin || '',
      userPassword: password || '',
      accountStatus: activeStatus || 'Active',
      firstTransactionDate: firstTransactionDate || '',
      lastTransactionDate: lastTransactionDate || '',
      transactionTypePreference: transactionTypePreference || '',
      amountRange: amountRange || '',
      transactions: generatedTransactions,
    });
  },

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
