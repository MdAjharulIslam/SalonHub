import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiPackage,
  FiShoppingCart,
  FiPlusCircle,
  FiMenu,
  FiX,
  FiArrowLeft,
} from "react-icons/fi";

const Dashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
const navigate = useNavigate()

  const handleLogout = async ()=>{
    localStorage.removeItem("adminToken")
    navigate("/admin/login")
    
  }
  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">

      
      <div
        className={`
          fixed inset-y-0 left-0 z-50 bg-primary text-white w-64 flex-shrink-0
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:relative lg:translate-x-0
        `}
      >
        
        <div className="flex items-center justify-between lg:justify-center h-20 px-6 border-b border-primary-dull">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-primary-dull"
            onClick={() => setSidebarOpen(false)}
          >
            <FiX size={20} />
          </button>
        </div>

        
        <nav className="flex flex-col mt-6 px-4 space-y-2">
          <Link
            to=""
            className="flex items-center px-4 py-3 rounded-lg hover:bg-primary-dull transition-colors gap-3"
            onClick={() => setSidebarOpen(false)}
          >
            <FiHome size={20} />
            <span>Dashboard</span>
          </Link>

          <Link
            to="add-service"
            className="flex items-center px-4 py-3 rounded-lg hover:bg-primary-dull transition-colors gap-3"
            onClick={() => setSidebarOpen(false)}
          >
            <FiPlusCircle size={20} />
            <span>Add Service</span>
          </Link>

          <Link
            to="all-services"
            className="flex items-center px-4 py-3 rounded-lg hover:bg-primary-dull transition-colors gap-3"
            onClick={() => setSidebarOpen(false)}
          >
            <FiPackage size={20} />
            <span>All Services</span>
          </Link>

          <Link
            to="all-orders"
            className="flex items-center px-4 py-3 rounded-lg hover:bg-primary-dull transition-colors gap-3"
            onClick={() => setSidebarOpen(false)}
          >
            <FiShoppingCart size={20} />
            <span>All Orders</span>
          </Link>
        </nav>
      </div>

      
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      
      <div className="flex-1 flex flex-col overflow-hidden">
       
        <div className="flex items-center justify-between h-20 px-4 sm:px-6 bg-primary text-white border-b border-primary-dull flex-shrink-0">
          
          
          <button
            className="p-2 rounded-lg hover:bg-primary-dull lg:hidden transition-colors"
            onClick={() => setSidebarOpen(true)}
          >
            <FiMenu size={24} />
          </button>

          <h2 className="text-lg sm:text-xl font-semibold">Dashboard</h2>

          
          <button onClick={handleLogout} className="px-4 py-2 bg-gray-200 rounded-2xl">LogOut</button>

          <Link
            to="/"
            className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-white text-primary font-medium hover:bg-gray-100 transition-colors text-sm sm:text-base"
          >
            
            <FiArrowLeft size={18} />
            
            <span className="hidden sm:inline">Go to Site</span>
            <span className="sm:hidden">Home</span>
          </Link>
        </div>

        
        <div className="flex-1 overflow-auto bg-gray-100">
          <div className="p-4 sm:p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;