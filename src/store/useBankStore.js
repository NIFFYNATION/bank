import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Helper to format currency
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

// --- Random transaction generator utilities ---

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const toISODate = (date) => date.toISOString().split('T')[0];

// --- Procedural random name generators (no hardcoded mock lists) ---
const FIRST_NAMES = [
  'James', 'Maria', 'Robert', 'Linda', 'David', 'Sarah', 'Michael', 'Emma',
  'William', 'Olivia', 'Daniel', 'Sophia', 'Andrew', 'Isabella', 'Thomas',
  'Mia', 'Charles', 'Amelia', 'Joseph', 'Charlotte', 'Richard', 'Grace',
  'Nathan', 'Chloe', 'Samuel', 'Lily', 'Benjamin', 'Zoe', 'Henry', 'Ella',
  'Alexander', 'Hannah', 'Patrick', 'Victoria', 'George', 'Natalie', 'Oscar',
  'Leah', 'Felix', 'Ruby', 'Marcus', 'Eva', 'Adrian', 'Ivy', 'Lucas',
  'Stella', 'Ethan', 'Clara', 'Owen', 'Nora',
];

const LAST_NAMES = [
  'Anderson', 'Martinez', 'Thompson', 'Garcia', 'Robinson', 'Clark', 'Lewis',
  'Walker', 'Hall', 'Young', 'Allen', 'King', 'Wright', 'Hill', 'Scott',
  'Green', 'Adams', 'Baker', 'Nelson', 'Carter', 'Mitchell', 'Perez',
  'Roberts', 'Turner', 'Phillips', 'Campbell', 'Parker', 'Evans', 'Edwards',
  'Collins', 'Stewart', 'Morris', 'Murphy', 'Rivera', 'Cook', 'Rogers',
  'Morgan', 'Cooper', 'Reed', 'Ward', 'Bailey', 'Brooks', 'Kelly',
  'Howard', 'Flores', 'Sanders', 'Price', 'Bennett', 'Ross', 'Wood',
];

const BUSINESS_NAMES = [
  'TechNova Solutions', 'Apex Global Services', 'Meridian Holdings', 'Pinnacle Corp',
  'Vanguard Enterprises', 'Summit Financial', 'Horizon Dynamics', 'Stellar Industries',
  'Crestline Partners', 'Quantum Analytics', 'NovaBridge Inc', 'Silverstone Group',
  'Atlas Ventures', 'Eclipse Digital', 'Fortuna Capital', 'Zenith Logistics',
  'Cobalt Systems', 'Ironclad Security', 'Prism Health', 'Lumen Energy',
  'Skyward Aviation', 'Bluecrest Marine', 'Redwood Properties', 'Opal Retail',
  'Cascade Solutions', 'Emerald Trading', 'Titanium Labs', 'Pacific Investments',
  'Granite Construction', 'Sapphire Media', 'Phoenix Consulting', 'Nordic Shipping',
];

const CHANNELS = [
  'Local Transfer', 'International Wire', 'Card', 'Deposit',
  'ACH Transfer', 'Mobile Payment', 'Online Banking', 'Direct Debit', 'Cheque', 'POS Terminal', 'Wire Transfer',
];

const CREDIT_DESCRIPTIONS = [
  'Funds deposited to account', 'Refund processed',
  'Investment return credited', 'Bonus payment received', 'Commission earned',
  'Dividend payout', 'Insurance claim settled',
  'Cashback reward credited', 'Grant funds received', 'Reimbursement processed',
  'Transfer received', 'Settlement funds credited',
  'Interest payment received', 'Tax refund processed',
  'Escrow release', 'Revenue share payment',
];

const DEBIT_DESCRIPTIONS = [
  'Payment for services rendered', 'Monthly subscription charge', 'Invoice settlement',
  'Utility bill payment', 'Insurance premium paid', 'Loan installment deducted',
  'Rent payment processed', 'Equipment purchase', 'Maintenance fee charged',
  'Consulting fee paid',
  'Travel expense', 'Office supplies purchase', 'Membership fee deducted',
  'Tax payment submitted', 'Legal services payment', 'Shipping charges paid',
  'Training program fee', 'Annual audit fee',
];

const ID_PREFIXES = [
  'TXN', 'REF', 'PAY', 'INV', 'ACH', 'WIR', 'CRD', 'DEB',
  'FND', 'SET', 'CLR', 'RMT', 'BNK', 'EFT', 'NTF', 'SWF',
];

const randomPick = (arr) => arr[randomInt(0, arr.length - 1)];

const generateRandomId = () => {
  const prefix = randomPick(ID_PREFIXES);
  const num = String(randomInt(100000, 999999));
  return `${prefix}-${num}`;
};

const generateRandomName = () => {
  // 40% chance of being a business name, 60% chance of a person name
  if (Math.random() < 0.4) {
    return randomPick(BUSINESS_NAMES);
  }
  return `${randomPick(FIRST_NAMES)} ${randomPick(LAST_NAMES)}`;
};

const generateDescription = (type) => {
  return type === 'Credit'
    ? randomPick(CREDIT_DESCRIPTIONS)
    : randomPick(DEBIT_DESCRIPTIONS);
};

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
      const name = generateRandomName();
      const channel = randomPick(CHANNELS);
      const description = generateDescription(type);

      transactions.push({
        id: generateRandomId(),
        name,
        date: toISODate(current),
        description,
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
    const name = generateRandomName();
    const channel = randomPick(CHANNELS);
    const description = generateDescription(type);

    transactions.push({
      id: generateRandomId(),
      name,
      date: toISODate(start),
      description,
      type,
      amount,
      channel,
    });
  }

  return transactions.sort((a, b) => new Date(a.date) - new Date(b.date));
};

export const useBankStore = create(
  persist(
    (set, get) => ({
      // --- State ---
      currentBalance: 0,
      monthlyIncome: 0,
      monthlyOutgoing: 0,
      transactionLimit: 0,
      pendingTransactions: 0,
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
      transactions: [],

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
          id: generateRandomId(),
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
          id: generateRandomId(),
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
    }),
    {
      name: 'bank-store',
      partialize: (state) => {
        // Exclude password from being persisted for security
        const { userPassword, ...rest } = state;
        return rest;
      },
    }
  )
);
