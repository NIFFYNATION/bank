import React from 'react'
import { SidebarProvider } from '../../contexts/SidebarContext';
import Sidebar from './Sidebar';
import DashboardHeader from './DashboardHeader';
import { Outlet } from 'react-router-dom';


function DashboardLayout({ children }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 mt-16 transition-all duration-300 ml-0 lg:ml-8 pl-[8px] sm:pl-[30px] md:pl-[60px] xl:pl-[260px] p-2 sm:p-10">
          <DashboardHeader />
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  )
}

export default DashboardLayout