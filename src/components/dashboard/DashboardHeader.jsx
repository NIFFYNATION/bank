import React from 'react';
import { useSidebar } from '../../contexts/SidebarContext';
import { useDashboardData } from '../../contexts/DashboardDataContext';
import { BellIcon, UserCircleIcon } from '@heroicons/react/24/outline';

function DashboardHeader() {
  const { isCollapsed, toggleSidebar } = useSidebar();
  const { currentBalance, userName } = useDashboardData();

  // Get today's date in a readable format
  const today = new Date();
  const dateString = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <header
      className={`border-b border-primary-light fixed top-0 right-0 ${
        isCollapsed ? 'left-0 lg:left-[80px]' : 'left-0 lg:left-[250px]'
      } h-[80px] bg-white z-20 transition-all justify-between duration-300 flex items-center px-6 shadow-sm`}
      style={{ minHeight: 80, fontFamily: 'Poppins, sans-serif' }}
    >
      {/* Hamburger button when sidebar is collapsed */}
      {isCollapsed && (
        <button
          onClick={toggleSidebar}
          className="mr-4 p-2 rounded hover:bg-primary-light transition"
          aria-label="Open sidebar"
        >
          {/* Hamburger icon SVG */}
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
      )}

      {/* Date on the left */}
      <div className="flex-1 text-text-secondary font-medium text-sm hidden md:block">
        {dateString}
      </div>

      {/* Right side: balance, notification, avatar */}
      <div className="flex items-center gap-6">
        {/* Balance */}
        <div className="flex items-center gap-2 bg-background-alt px-4 py-2 rounded-lg shadow-sm">
          <span className="text-text-secondary text-xs">Balance:</span>
          <span className="font-bold text-primary">{currentBalance}</span>
        </div>

        {/* Notification bell */}
        <button className="relative w-6 h-6 transition">
          <BellIcon className="  text-primary hover:text-background rounded-full hover:bg-primary-light" />
          {/* Notification dot */}
          <span className="absolute bottom-5 left-4 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        {/* User avatar */}
        <div className="w-10 h-10 rounded-full bg-background-alt flex items-center justify-center overflow-hidden">
          {/* Replace with <img src={user.avatar} ... /> if you have user data */}
          <span className="text-primary font-bold text-lg">
            {userName ? userName[0].toUpperCase() : 'U'}
          </span>
        </div>
      </div>
    </header>
  );
}

export default DashboardHeader;