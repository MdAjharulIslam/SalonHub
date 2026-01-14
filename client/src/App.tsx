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


const App: React.FC = () => {
  const { showLogin } = useAppContext();

  return (
    <div className="">
        <Toaster position="top-center" reverseOrder={false} />
      < Navbar />
      {showLogin && <Login />}

        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/service" element={<AllServices/>} />
          <Route path="/about" element={<About/>}/>
          <Route path="/category/:firstName" element={<CategoryPage/>}/>
        </Routes>

      <Footer />
    </div>
  );
};

export default App;
