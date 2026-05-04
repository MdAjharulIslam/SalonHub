import React, { useState, useEffect } from "react";
import type { ChangeEvent } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Navbar: React.FC = () => {
  const { login, setLogin, setShowLogin, search, setSearch, setToken } = useAppContext();
  
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [ setActiveTab] = useState<string>("");

  const navigate = useNavigate();

  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setLogin(false);
    navigate('/');
    toast.success("Logged out successfully!");
    setMobileOpen(false);
  };

  const handleSearchSubmit = ( ) => {
    if (search.trim()) {
      navigate(`/service?search=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled 
            ? "bg-white/95 backdrop-blur-xl shadow-lg py-2" 
            : "bg-gray-300/90 backdrop-blur-sm py-3"
        } px-6 md:px-16 lg:px-24 xl:px-32`}
      >
        <div className="flex items-center justify-between">
          
         
          <NavLink to="/" className="relative group">
            <img
              src={assets.logo}
              alt="logo"
              className={`h-28 transition-all duration-300 ${
                scrolled ? "scale-110" : "scale-125"
              } hover:scale-135 group-hover:rotate-1`}
            />
            <div className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-purple-600 group-hover:w-full transition-all duration-300" />
          </NavLink>

         
          <div className="hidden md:flex gap-8 items-center">

          
            <div className="relative group">
              <div className="flex items-center gap-2 bg-white/50 backdrop-blur-sm border border-gray-300/50 rounded-full px-4 py-1.5 shadow-sm hover:shadow-md transition-all duration-300 focus-within:border-primary focus-within:shadow-lg">
                <input
                  type="text"
                  placeholder="Search services..."
                  value={search}
                  onChange={handleSearchChange}
                  onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit(e)}
                  className="py-1.5 w-48 lg:w-64 bg-transparent outline-none placeholder-gray-500 text-sm"
                />
                <button onClick={handleSearchSubmit} className="cursor-pointer">
                  <img src={assets.search_icon} alt="search" className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" />
                </button>
              </div>
            </div>
            
            {[
              { path: "/", label: "Home", icon: "🏠" },
              { path: "/service", label: "All Services", icon: "✨" },
              { path: "/about", label: "About", icon: "📖" },
              { path: "/contact", label: "Contact Us", icon: "📞" }
            ].map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => `
                  relative group text-lg font-medium transition-all duration-300
                  ${isActive 
                    ? "text-transparent bg-gradient-to-r from-primary to-purple-600 bg-clip-text" 
                    : "text-gray-700 hover:text-primary"
                  }
                `}
                onClick={() => setActiveTab(link.path)}
              >
                <span className="flex items-center gap-1">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">{link.icon}</span>
                  {link.label}
                </span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-purple-600 group-hover:w-full transition-all duration-300" />
              </NavLink>
            ))}

            
            {!login ? (
              <button
                className="relative overflow-hidden group bg-gradient-to-r from-primary to-purple-600 px-6 py-2.5 rounded-full text-white font-medium shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105"
                onClick={() => setShowLogin(true)}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Sign In
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            ) : (
              <div className="flex items-center gap-4">
                
                <div className="relative group">
                  <button className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-purple-600 flex items-center justify-center text-white font-semibold shadow-md hover:scale-105 transition-transform">
                    U
                  </button>
                  
                 
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <div className="py-2">
                      <button
                        onClick={() => {
                          navigate("/myBooking");
                          setMobileOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gradient-to-r hover:from-primary/10 hover:to-purple-600/10 transition-colors flex items-center gap-2"
                      >
                        <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        My Bookings
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                      </button>
                    </div>
                  </div>
                </div>

             
                <ul className="flex gap-4">
                  <li
                    onClick={() => navigate("myBooking")}
                    className="cursor-pointer text-gray-700 hover:text-primary transition-colors"
                  >
                    My Bookings
                  </li>
                  <li
                    onClick={handleLogout}
                    className="cursor-pointer text-gray-700 hover:text-red-500 transition-colors"
                  >
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>

          
          <div className="md:hidden relative">
            <button
              className="relative overflow-hidden group bg-gradient-to-r from-primary to-purple-600 px-5 py-2.5 rounded-full text-white font-medium shadow-md hover:shadow-lg transition-all duration-300"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <span className="flex items-center gap-2">
                {mobileOpen ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
                Menu
              </span>
            </button>

           
            {mobileOpen && (
              <div className="absolute right-0 top-full mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-slide-down">
                <div className="p-4 space-y-3">
                  {/* Mobile Search */}
                  <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 mb-2">
                    <input
                      type="text"
                      placeholder="Search services..."
                      value={search}
                      onChange={handleSearchChange}
                      onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit(e)}
                      className="flex-1 bg-transparent outline-none text-sm"
                    />
                    <button onClick={handleSearchSubmit}>
                      <img src={assets.search_icon} alt="search" className="w-4 h-4 opacity-60" />
                    </button>
                  </div>

                  
                  {[
                    { path: "/", label: "Home", icon: "🏠" },
                    { path: "/service", label: "All Services", icon: "✨" },
                    { path: "/about", label: "About", icon: "📖" },
                    { path: "/contact", label: "Contact Us", icon: "📞" }
                  ].map((link) => (
                    <NavLink
                      key={link.path}
                      to={link.path}
                      className={({ isActive }) => `
                        flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                        ${isActive 
                          ? "bg-gradient-to-r from-primary/10 to-purple-600/10 text-primary font-semibold" 
                          : "text-gray-700 hover:bg-gray-100"
                        }
                      `}
                      onClick={() => setMobileOpen(false)}
                    >
                      <span className="text-xl">{link.icon}</span>
                      {link.label}
                    </NavLink>
                  ))}

                 
                  <div className="h-px bg-gray-200 my-2" />

                 
                  {!login ? (
                    <button
                      className="w-full bg-gradient-to-r from-primary to-purple-600 text-white px-6 py-3 rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                      onClick={() => {
                        setShowLogin(true);
                        setMobileOpen(false);
                      }}
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Sign In
                    </button>
                  ) : (
                    <div className="space-y-2">
                      <button
                        onClick={() => {
                          navigate("/myBooking");
                          setMobileOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        My Bookings
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

     
      <div className="h-32" />

      <style>{`
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-down {
          animation: slide-down 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default Navbar;