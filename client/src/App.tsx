import React from "react";
import Home from "./pages/Home";
import Login from "./components/Login";
import { useAppContext } from "./context/AppContext";
import Footer from "./components/Footer";
import { Route, Routes, } from "react-router-dom";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
 import AllServices from "./pages/AllServices";
import CategoryPage from "./pages/CategoryPage";
import SingleServicesPage from "./pages/SingleServicesPage";
import BookingPage from "./pages/BookingPage";
import MyBooking from "./pages/MyBooking";
import Dashboard from "./pages/admin/Dashboard";
import AddService from "./pages/admin/AddService";
import AllServicesAdmin from "./pages/admin/AllServicesAdmin";
import AllOrders from "./pages/admin/AllOrders";
import { useLocation } from "react-router-dom";
import DashboardHome from "./pages/admin/DashboardHome";
import AdminLogin from "./components/AdminLogin";
import ContactPage from "./pages/ContactPaje";

const App: React.FC = () => {
  const { showLogin } = useAppContext();
  const location = useLocation();

  // hide navbar on admin pages
  const hideNavbar = location.pathname.startsWith("/admin");

  return (
    <div className="">
      <Toaster position="top-center" reverseOrder={false} />
      {!hideNavbar && <Navbar />}
      {showLogin && <Login />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/service" element={<AllServices />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/category/:firstName" element={<CategoryPage />} />
        <Route path="/service/:serviceId" element={<SingleServicesPage />} />
        <Route path="/service/:serviceId/booking" element={<BookingPage />} />
        <Route path="/myBooking" element={<MyBooking />} />
<Route path="/admin/login" element={<AdminLogin />} />
  <Route path="/admin" element={<Dashboard />}>
    <Route index element={<DashboardHome />} />
    <Route path="dashboard" element={<DashboardHome />} /> 
    <Route path="add-service" element={<AddService />} />
    <Route path="all-services" element={<AllServicesAdmin />} />
    <Route path="all-orders" element={<AllOrders />} />
  </Route>
</Routes>
   

      {!hideNavbar && <Footer />}
    </div>
  );
};
export default App;