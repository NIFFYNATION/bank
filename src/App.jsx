import {  useEffect } from 'react';
import { Outlet } from 'react-router-dom'




function App() {
  
  return (
    
    <div className="min-h-screen">
            {/* Fixed position theme toggle */}
            <div className="fixed bottom-20 right-4 z-50">
              {/* dd */}
            </div>

            <Outlet />
            {/* Mobile Tab Navigation */}
            <div className="md:hidden pt-32">      
            </div>
          </div>
  )
}
export default App