import React, { createContext, useContext } from 'react';

// Hardcoded demo data (replace with API data as needed)
const dashboardData = {
  currentBalance: '$1,181,860',
  monthlyIncome: '$0',
  monthlyOutgoing: '$0',
  transactionLimit: '$500,000.00',
  pendingTransactions: '$15,200.00',
  transactionVolume: '$658,342.82',
  accountAge: '5 years',
  accountNumber: '77990250980',
  accountStatus: 'Active',
  userName: 'real',
  currency: 'USD',
};

const DashboardDataContext = createContext(dashboardData);

export function DashboardDataProvider({ children }) {
  // You could fetch and update data here in the future
  return (
    <DashboardDataContext.Provider value={dashboardData}>
      {children}
    </DashboardDataContext.Provider>
  );
}

export function useDashboardData() {
  return useContext(DashboardDataContext);
}

