import React from 'react';
import { DashboardDataProvider } from '../contexts/DashboardDataContext';
import DashboardSummaryCards from '../components/dashboard/welcomeCard/DashboardSummaryCards';
import DashboardMainCard from '../components/dashboard/welcomeCard/DashboardMainCard';
import DashboardAccountStats from '../components/dashboard/welcomeCard/DashboardAccountStats';
import DashboardActions from '../components/dashboard/welcomeCard/DashboardActions';
import DashboardQuickTransfer from '../components/dashboard/welcomeCard/DashboardQuickTransfer';
import TransactionHistory from '../components/dashboard/transactions/TransactionHistory';
import CashFlowReport from '../components/dashboard/welcomeCard/CashFlowReport';

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function DashboardPage() {
  const [selectedMonth, setSelectedMonth] = React.useState(months[0]);

  return (
    <DashboardDataProvider>
      <div className="flex flex-col gap-6 p-4 md:p-8">
        <DashboardSummaryCards />
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <DashboardMainCard />
          </div>
          <div className="w-full lg:w-80 flex-shrink-0">
            <DashboardAccountStats />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <DashboardActions />
          </div>
          <div className="w-full lg:w-80 flex-shrink-0">
            <DashboardQuickTransfer />
          </div>
        </div>
        <div className="w-full mx-auto flex flex-col gap-8">
          <CashFlowReport
            months={months}
            selectedMonth={selectedMonth}
            onMonthChange={setSelectedMonth}
          />
          <TransactionHistory
            months={months}
            selectedMonth={selectedMonth}
            onMonthChange={setSelectedMonth}
          />
        </div>
      </div>
    </DashboardDataProvider>
  );
}