import React from 'react';
import { useSidebar } from '../../contexts/SidebarContext';

function DashboardHeader() {
  const { toggleSidebar, isCollapsed } = useSidebar();

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
      className={` border-b border-quaternary md:border-[#D9D9D9] fixed top-0 right-0 ${
        isCollapsed ? 'left-0 lg:left-[80px]' : 'left-0 lg:left-[250px]'
      } h-[80px] bg-white z-20 transition-all justify-between duration-300 flex items-center px-6 shadow-sm`}
      style={{ minHeight: 80 }}
    >
      {/* Hamburger button when sidebar is collapsed */}
      {isCollapsed && (
        <button
          onClick={toggleSidebar}
          className="ml-0 md:ml-16 lg:ml-4 p-2  rounded hover:bg-gray-100 transition"
          aria-label="Open sidebar"
        >
          {/* Hamburger icon SVG */}
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
      )}

      {/* Date on the left */}
      <div className="flex-1 text-gray-500 font-medium text-sm hidden lg:block">
        {dateString}
      </div>

      {/* Right side: balance, notification, avatar */}
      <div className="flex items-center gap-6">
        {/* Balance */}
        <div className="flex items-center gap-2 bg-[#f5f7fa] px-4 py-2 rounded-lg shadow-sm">
          <span className="text-gray-500 text-xs">Balance:</span>
          <span className="font-bold text-blue-700">$1,181,860</span>
        </div>

        {/* Notification bell */}
        <button className="relative p-2 rounded-full hover:bg-gray-100 transition">
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0 1 18 14.158V11a6.002 6.002 0 0 0-4-5.659V5a2 2 0 1 0-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 1 1-6 0v-1m6 0H9" />
          </svg>
          {/* Notification dot */}
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        {/* User avatar */}
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
          {/* Replace with <img src={user.avatar} ... /> if you have user data */}
          <span className="text-gray-600 font-bold">R</span>
        </div>
      </div>
    </header>
  );
}

export default DashboardHeader;