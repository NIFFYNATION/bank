import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Dashboard from './pages/Dashboard';
import Homepage from './pages/Homepage';
import DashboardLayout from './components/dashboard/DashboardLayout';
import TransactionsPage from './components/dashboard/transactions/TransactionsPage';
import Cards from './components/dashboard/cards/cards';
import InternationalWire from './components/dashboard/internationalWire/InternationalWire';
import LocalTransfer from './components/dashboard/localTransfer/LocalTransfer';
import Deposit from './components/dashboard/deposit/Deposit';
import LoanRequest from './components/dashboard/loanRequest/LoanRequest';
import LoanHistory from './components/dashboard/loanHistory/LoanHistory';
import IrsTaxRefund from './components/dashboard/irsTaxRefund/IrsTaxRefund';
import Settings from './components/dashboard/settings/Settings';
import Signin from './components/common/auth/Signin';
import Signup from './components/common/auth/Signup';
import Profile from './components/dashboard/profile/Profile';
import AdminCreateAccount from './components/dashboard/admin/AdminCreateAccount';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: (
            <Homepage />
        ),
      },
      {
        path: '/signin',
        element: <Signin />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
      {
        path: '/admin',
        element: <AdminCreateAccount />,
      },
      {
        path: '/dashboard',
        element: (
          <DashboardLayout />
        ),
        children: [
          { path: '', element: <Dashboard /> },
          { path: 'transactionspage', element: <TransactionsPage /> },
          { path: 'cards', element: <Cards /> },
          { path: 'international-wire', element: <InternationalWire /> },
          { path: 'local-transfer', element: <LocalTransfer /> },
          { path: 'deposit', element: <Deposit /> },
          { path: 'loan-request', element: <LoanRequest /> },
          { path: 'loan-history', element: <LoanHistory /> },
          { path: 'irs-tax-refund', element: <IrsTaxRefund /> },
          { path: 'settings', element: <Settings /> },
          { path: 'profile', element: <Profile /> },
        ],
      },
    ],
  },
]);
