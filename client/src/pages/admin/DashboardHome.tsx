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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      
      
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-gray-500 text-sm">Total Services</h3>
        <p className="text-3xl font-bold mt-2">{stats.service}</p>
      </div>

      
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-gray-500 text-sm">Total Orders</h3>
        <p className="text-3xl font-bold mt-2">{stats.allBooking}</p>
      </div>

      
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-gray-500 text-sm">Pending Orders</h3>
        <p className="text-3xl font-bold mt-2 text-yellow-500">
          {stats.pendingBooking}
        </p>
      </div>

   
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-gray-500 text-sm">Total Users</h3>
        <p className="text-3xl font-bold mt-2 text-primary">
          {stats.user}
        </p>
      </div>

     



    </div>
  );
};

export default DashboardHome;
