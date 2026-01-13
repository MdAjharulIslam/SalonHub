import React from "react";
import Home from "./pages/Home";
import Login from "./components/Login";
import { useAppContext } from "./context/AppContext";
import Footer from "./components/Footer";
import { Route, Routes, } from "react-router-dom";
import About from "./pages/About";
import Navbar from "./components/Navbar";

const App: React.FC = () => {
  const { showLogin } = useAppContext();

  return (
    <div className="">
      < Navbar />
      {showLogin && <Login />}

        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
        </Routes>

      <Footer />
    </div>
  );
};

export default App;
