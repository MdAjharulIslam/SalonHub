import React, { useState, useEffect } from "react";
import type { ChangeEvent } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Navbar: React.FC = () => {
  const { login, setLogin, setShowLogin, search, setSearch, setToken } =
    useAppContext();

  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  const navigate = useNavigate();

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Search input
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  // Search submit
  const handleSearchSubmit = () => {
    if (search.trim()) {
      navigate(`/service?search=${encodeURIComponent(search.trim())}`);
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setLogin(false);
    navigate("/");
    toast.success("Logged out successfully!");
    setMobileOpen(false);
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

          {/* Logo */}
          <NavLink to="/">
            <img
              src={assets.logo}
              alt="logo"
              className="h-24 transition-all duration-300 scale-175 hover:scale-185"
            />
          </NavLink>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center">

            {/* Search */}
            <div className="flex items-center gap-2 bg-white/50 border rounded-full px-4 py-1.5">
              <input
                type="text"
                placeholder="Search services..."
                value={search}
                onChange={handleSearchChange}
                onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit()}
                className="bg-transparent outline-none w-48 lg:w-64 text-sm"
              />
              <button onClick={handleSearchSubmit}>
                <img src={assets.search_icon} className="w-4 h-4" />
              </button>
            </div>

            {/* Links */}
            {[
              { path: "/", label: "Home" },
              { path: "/service", label: "All Services" },
              { path: "/about", label: "About" },
              { path: "/contact", label: "Contact" },
            ].map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  isActive ? "text-primary font-semibold" : "text-gray-700"
                }
              >
                {link.label}
              </NavLink>
            ))}

            {/* Auth */}
            {!login ? (
              <button
                onClick={() => setShowLogin(true)}
                className="bg-gradient-to-r from-primary to-purple-500 text-white px-5 py-2 rounded-full cursor-pointer hover:scale-105 transition-all"
              >
                Sign In
              </button>
            ) : (
              <div className="flex gap-4 items-center">
                <button
                  onClick={() => navigate("/myBooking")}
                  className="text-gray-700"
                >
                  My Bookings
                </button>

                <button onClick={handleLogout} className="text-red-500">
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="bg-primary text-white px-4 py-2 rounded-full"
            >
              Menu
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden mt-4 bg-white rounded-xl shadow p-4 space-y-3">

            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={handleSearchChange}
              onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit()}
              className="w-full border p-2 rounded"
            />

            {[
              { path: "/", label: "Home" },
              { path: "/service", label: "All Services" },
              { path: "/about", label: "About" },
              { path: "/contact", label: "Contact" },
            ].map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className="block py-2"
              >
                {link.label}
              </NavLink>
            ))}

            {!login ? (
              <button
                onClick={() => {
                  setShowLogin(true);
                  setMobileOpen(false);
                }}
                className="w-full bg-primary text-white py-2 rounded"
              >
                Sign In
              </button>
            ) : (
              <>
                <button
                  onClick={() => navigate("/myBooking")}
                  className="w-full py-2"
                >
                  My Bookings
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full text-red-500 py-2"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </nav>

      {/* Spacer */}
      <div className="h-24" />
    </>
  );
};

export default Navbar;