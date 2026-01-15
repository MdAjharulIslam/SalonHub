import React, { useState, ChangeEvent } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Navbar: React.FC = () => {
  const {login, setLogin, showLogin, setShowLogin,search,setSearch, token, setToken} = useAppContext();
  
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };


 const handleLogout = () => {
  
  localStorage.removeItem("token");
  setToken(null);
  
 
  setLogin(false);
  navigate('/')
  
  toast.success("Logged out successfully!");
};


  return (
    <nav className="w-full bg-gray-300 px-6 md:px-16 lg:px-24 xl:px-32 h-fit flex items-center justify-between relative">
      
     
      <NavLink to="/">
        <img
          src={assets.logo}
          alt="logo"
          className="h-28 scale-125 hover:scale-135 transition-transform"
        />
      </NavLink>

      
      <div className="hidden md:flex gap-10 items-center">

        <div className="hidden md:flex items-center text-sm gap-2 border border-gray-400 px-3 rounded-full">
          <input
            type="text"
            placeholder="Search products"
            value={search}
            onChange={handleSearchChange}
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
          />
          <img src={assets.search_icon} alt="search" className="w-4 h-4" />
        </div>
        <NavLink className="text-xl" to="/">
          Home
        </NavLink>
        <NavLink className="text-xl" to="/service">
          All Service
        </NavLink>
        <NavLink className="text-xl" to="/about">
          About
        </NavLink>
        <NavLink className="text-xl" to="/contact">
          Contact Us
        </NavLink>

        

        {!login ? (
          <button
            className="text-xl bg-gradient-to-r from-primary to-purple-600 px-6 py-2 rounded-full"
            onClick={() => setShowLogin(true)}
          >
            Login
          </button>
        ) : (
          <ul className="flex gap-6">
            <li
              onClick={() => navigate("myBooking")}
              className="cursor-pointer hover:text-primary"
            >
              My Bookings
            </li>
            <li
              onClick={() => {setLogin(!login);
                 handleLogout()}}
              
              className="cursor-pointer hover:text-red-500"
            >
              Logout
            </li>
          </ul>
        )}
      </div>

      
      <div className="md:hidden relative">
        <button
          className="bg-gradient-to-r from-primary to-purple-600 px-4 py-2 rounded-full text-black hover:bg-primary-dull"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          Menu
        </button>

       
        {mobileOpen && (
          <div className="absolute right-0 top-full mt-2 w-48 bg-gray-200 border border-gray-400 rounded-lg shadow-lg flex flex-col gap-4 p-4 z-50">
            <NavLink
              className="text-lg hover:text-primary"
              to="/"
              onClick={() => setMobileOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              className="text-lg hover:text-primary"
              to="/service"
              onClick={() => setMobileOpen(false)}
            >
              All Service
            </NavLink>
            <NavLink
              className="text-lg hover:text-primary"
              to="/about"
              onClick={() => setMobileOpen(false)}
            >
              About
            </NavLink>

            <NavLink
              className="text-lg hover:text-primary"
              to="/contact"
              onClick={() => setMobileOpen(false)}
            >
              Contact Us
            </NavLink>
            {!login ? (
              <button
                className="text-lg bg-gradient-to-r from-primary to-purple-600 text-black px-6 py-2 rounded-full"
                onClick={() => {
                  setShowLogin(true);
                  setMobileOpen(false);
                }}
              >
                Login
              </button>
            ) : (
              <ul className="flex flex-col gap-2">
                <li
                  onClick={() => {
                    navigate("myBooking");
                    setMobileOpen(false);
                  }}
                  className="cursor-pointer hover:text-primary"
                >
                  My Bookings
                </li>
                <li
                  onClick={() => {
                    setLogin(!login);
                    setMobileOpen(false);
                  }}
                  className="cursor-pointer hover:text-red-500"
                >
                  Logout
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
