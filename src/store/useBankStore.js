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

// Produces a random HH:MM time string
const generateRandomTime = () => {
  const h = String(randomInt(0, 23)).padStart(2, '0');
  const m = String(randomInt(0, 59)).padStart(2, '0');
  return `${h}:${m}`;
};

// Current local time as HH:MM
const currentTime = () => {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
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

  // Calculate the total number of days in the range
  const msInDay = 24 * 60 * 60 * 1000;
  const totalDays = Math.max(1, Math.floor((end.getTime() - start.getTime()) / msInDay));

  // Determine how many transactions to generate.
  // If no cap, derive a natural density: roughly 1 per 3-5 days.
  const count = maxTransactions
    ? Math.max(1, Number(maxTransactions))
    : Math.max(1, Math.floor(totalDays / randomInt(3, 5)));

  // Generate each transaction with a random date uniformly distributed
  // across the full [start, end] range — this guarantees spread.
  const transactions = Array.from({ length: count }, () => {
    const randomDayOffset = randomInt(0, totalDays);
    const txDate = new Date(start.getTime() + randomDayOffset * msInDay);
    const type = pickType();
    const { min, max } = pickAmountRange();
    const amount = Number((Math.random() * (max - min) + min).toFixed(2));

    return {
      id: generateRandomId(),
      name: generateRandomName(),
      date: toISODate(txDate),
      time: generateRandomTime(),
      description: generateDescription(type),
      type,
      amount,
      channel: randomPick(CHANNELS),
    };
  });

  return transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
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
      cards: [],

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
        city,
        country,
        address,
        zipCode,
        spendStatus,
        accountStatus,
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

        // Generate Cards dynamically based on the user's name
        const holderName = `${firstName || ''} ${lastName || ''}`.trim() || 'Valued Customer';
        const expiryYear = new Date().getFullYear() + 3;
        const expiryMonth = String(new Date().getMonth() + 1).padStart(2, '0');

        const generatedCards = [
          {
            id: 1,
            type: 'Visa Platinum',
            number: `**** **** **** ${String(Math.floor(Math.random() * 9000) + 1000)}`,
            holder: holderName,
            expires: `${expiryMonth}/${String(expiryYear).slice(2)}`,
            balance: numericBalance,
            color: 'from-purple-500 to-indigo-600',
            logo: '/icons/cards.svg'
          },
          {
            id: 2,
            type: 'Mastercard Gold',
            number: `**** **** **** ${String(Math.floor(Math.random() * 9000) + 1000)}`,
            holder: holderName,
            expires: `${String((new Date().getMonth() + 4) % 12 || 12).padStart(2, '0')}/${String(expiryYear + 1).slice(2)}`,
            balance: numericBalance * 0.4, // Second card gets a portion of the balance for realism
            color: 'from-amber-500 to-orange-600',
            logo: '/icons/cards.svg'
          }
        ];

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
          city: city || '',
          country: country || '',
          address: address || '',
          zipCode: zipCode || '',
          spendStatus: spendStatus || '',
          sendOtpToLogin: sendOtpToLogin || '',
          userPassword: password || '',
          accountStatus: accountStatus || 'Active',
          firstTransactionDate: firstTransactionDate || '',
          lastTransactionDate: lastTransactionDate || '',
          transactionTypePreference: transactionTypePreference || '',
          amountRange: amountRange || '',
          transactions: generatedTransactions,
          cards: generatedCards,
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
          date: new Date().toISOString().split('T')[0],
          time: currentTime(),
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
          time: currentTime(),
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

      // Admin: Manually add a transaction
      addManualTransaction: ({ date, name, description, channel, type, amount }) => {
        const { currentBalance, monthlyIncome, monthlyOutgoing, transactionVolume } = get();
        const numAmount = parseFloat(amount);

        if (isNaN(numAmount) || numAmount <= 0) {
          throw new Error('Invalid amount');
        }

        const newTransaction = {
          id: generateRandomId(),
          name: name || 'Unknown',
          date: date || new Date().toISOString().split('T')[0],
          time: generateRandomTime(),
          description: description || (type === 'Credit' ? 'Manual credit' : 'Manual debit'),
          type: type || 'Credit',
          amount: numAmount,
          channel: channel || 'Local Transfer',
        };

        const updates = {
          transactionVolume: transactionVolume + numAmount,
          transactions: [...get().transactions, newTransaction].sort(
            (a, b) => new Date(a.date) - new Date(b.date)
          ),
        };

        // if (type === 'Credit') {
        //   updates.currentBalance = currentBalance + numAmount;
        //   updates.monthlyIncome = monthlyIncome + numAmount;
        // } else {
        //   updates.currentBalance = currentBalance - numAmount;
        //   updates.monthlyOutgoing = monthlyOutgoing + numAmount;
        // }

        set(updates);
      },

      // Admin: Delete a transaction by ID
      deleteTransaction: (txId) => {
        set({
          transactions: get().transactions.filter((tx) => tx.id !== txId),
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
