import { createBrowserRouter } from 'react-router-dom';

import App from './App';
import Dashboard from './pages/Dashboard';
import Homepage from './pages/Homepage';
import DashboardLayout from './components/dashboard/DashboardLayout';


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
        path: '/dashboard',
        element: (
          <DashboardLayout />
        ),
        children: [
          { path: '', element: <Dashboard /> },
        
        ],
      },
     
    ],
  },
]);
