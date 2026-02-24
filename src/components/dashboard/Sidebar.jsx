import React, { useState, useEffect } from 'react'
import { useSidebar } from '../../contexts/SidebarContext'
import '../../styles/scrollbar.css'; // Import the global scrollbar CSS
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const user = {
  name: 'real real',
  id: '77990250980',
  kyc: true,
  avatar: '', // Add avatar URL if available
};

const menuSections = [
  {
    title: 'MAIN MENU',
    items: [
      { label: 'Dashboard', icon: '/icons/dashboard.svg', to: "/dashboard" },
      { label: 'Transactions', icon: '/icons/transactions.svg', to: "/dashboard/transactionspage" },
      { label: 'Cards', icon: '/icons/cards.svg', to: "/dashboard/cards" },
    ],
  },
  {
    title: 'TRANSFERS',
    items: [
      { label: 'Local Transfer', icon: '/icons/local-transfer.svg', to: "/dashboard/local-transfer" },
      { label: 'International Wire', icon: '/icons/international-wire.svg', to: "/dashboard/international-wire" },
      { label: 'Deposit', icon: '/icons/deposit.svg', to: "/dashboard/deposit" },
    ],
  },
  {
    title: 'SERVICES',
    items: [
      { label: 'Loan Request', icon: '/icons/loan.svg', to: "/dashboard/loan-request" },
      { label: 'IRS Tax Refund', icon: '/icons/tax.svg', to: "/dashboard/irs-tax-refund" },
      { label: 'Loan History', icon: '/icons/history.svg', to: "/dashboard/loan-history" },
    ],
  },
  {
    title: 'ACCOUNT',
    items: [
      { label: 'Settings', icon: '/icons/settings.svg', to: "/dashboard/settings" },
    ],
  },
];

function MenuSection({ title, items }) {
  const { isCollapsed } = useSidebar();
  return (
    <div className="mb-4">
      {!isCollapsed && <div className="text-sm font-bold text-text-primary px-4 mb-2 mt-4">{title}</div>}
      <ul>
        {items.map((item) => (
          <li key={item.label} className={`py-2 ${isCollapsed ? 'justify-center' : ''}`}>
            {item.to ? (
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${isActive
                    ? 'bg-primary hover:bg-primary-light text-text-grey font-semibold'
                    : 'text-text-primary hover:bg-gray-100'
                  }`
                }
                end
              >
                <img src={item.icon} alt="" className="w-6 h-6" />
                {!isCollapsed && <span className='font-semibold'>{item.label}</span>}
              </NavLink>
            ) : (
              <div className={`flex items-center gap-3 px-4 py-2 rounded-lg text-text-primary`}>
                <img src={item.icon} alt="" className="w-6 h-6" />
                {!isCollapsed && <span className='font-semibold'>{item.label}</span>}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Sidebar() {
  const { isCollapsed, toggleSidebar } = useSidebar();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // If on mobile and collapsed, hide the sidebar completely
  if (isMobile && isCollapsed) {
    return null;
  }

  return (
    <aside
      className={`flex flex-col overflow-y-auto overflow-x-hidden fixed z-100 bg-background sidebar-scrollbar items-center shadow-md py-4  transition-all duration-300 h-screen 
        ${isCollapsed ? 'w-[80px]' : 'w-[249px] '}`}
    >
      {/* Logo and Close Button */}
      <div className="mb-6 flex items-center justify-between w-full px-4">
        <img src="/logo.svg" alt="Logo" className="h-8" />
        {/* Show close button on desktop when expanded, and always on mobile */}
        {((!isCollapsed && !isMobile) || isMobile) && (
          <button
            onClick={toggleSidebar}
            className="ml-auto p-2 rounded transition bg-background-alt text-primary"
            aria-label="Close sidebar"
          >
            {/* X icon SVG */}
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Profile */}
      <div className="flex flex-col items-center px-4 mb-6">
        <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center mb-2">
          {/* Avatar or initials */}
          {user.avatar ? (
            <img src={user.avatar} alt="avatar" className="w-full h-full rounded-full" />
          ) : (
            <span className="text-2xl font-bold text-gray-600">R</span>
          )}
        </div>
        {!isCollapsed && (
          <>
            <div className="font-semibold text-text-primary">{user.name}</div>
            <div className="text-xs text-text-secondary mb-1">Account No: {user.id}</div>
            {user.kyc && (
              <div className="flex items-center text-xs text-success mb-2">
                <span className="w-2 h-2 bg-success rounded-full mr-1"></span>
                KYC Verified
              </div>
            )}
            <div className="flex gap-2 w-full">
              <Link to="/dashboard/profile" className="flex-1 py-1 px-5 text-xs border rounded text-text-primary hover:bg-gray-100 text-center">Profile</Link>
              <button onClick={handleLogout} className="flex-1 py-1 px-5 text-xs border rounded text-white bg-danger hover:bg-red-600">Logout</button>
            </div>
          </>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 ">
        {menuSections.map((section) => (
          <MenuSection key={section.title} {...section} />
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar