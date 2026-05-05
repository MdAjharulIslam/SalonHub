import axios from "axios";
import React, { useEffect, useState } from "react";

interface DashboardStats {
  service: number;
 allBooking: number;
  pendingBooking: number;
  user: number;
      totalServices:string[];

}

const DashboardHome: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    service: 0,
    allBooking: 0,
    pendingBooking: 0,
    user: 0,
    totalServices :['']

  });

  const fetchDashboardStats = async () => {
    try {
      const { data } = await axios.get("/api/admin/dashboard", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });

      if (data.success) {
         setStats({
          service: data.service,
          allBooking: data.allBooking,
          user: data.user,
          pendingBooking: data.pendingBooking, 
          totalServices:data.totalServices


        });
      }
    } catch (error) {
      console.error("Failed to load dashboard stats");
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

 return (
  <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
    
    {/* Header */}
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-gray-800">
        Dashboard
      </h2>
      <p className="text-sm text-gray-500">
        Overview of your platform statistics
      </p>
    </div>

    {/* Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

      <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
          Total Services
        </p>
        <p className="text-2xl font-semibold text-gray-800 mt-2">
          {stats.service}
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
          Total Bookings
        </p>
        <p className="text-2xl font-semibold text-gray-800 mt-2">
          {stats.allBooking}
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
          Pending Bookings
        </p>
        <p className="text-2xl font-semibold text-yellow-500 mt-2">
          {stats.pendingBooking}
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
          Total Users
        </p>
        <p className="text-2xl font-semibold text-primary mt-2">
          {stats.user}
        </p>
      </div>

    </div>

  </div>
);
};

export default DashboardHome;
