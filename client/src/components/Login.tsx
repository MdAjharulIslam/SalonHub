import React, { useState,  } from "react";
import type {FormEvent, ChangeEvent} from 'react'
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

interface LoginResponse {
  success: boolean;
  message?: string;
  token?: string;
}

const Login: React.FC = () => {
  const [state, setState] = useState<"login" | "register">("login");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();
  const { setShowLogin, setLogin, setToken } = useAppContext();

  const onSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();

      const { data } = await axios.post<LoginResponse>(
        `/api/user/${state}`,
        { name, email, password }
      );

      if (data.success) {
        toast.success(data.message || "Login Successfully");
        navigate("/");
        setShowLogin(false);
        setLogin(true);
        if (data.token) {
          setToken(data.token);
          localStorage.setItem("token", data.token);
        }
      } else {
        toast.error(data.message || "An error occurred");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error?.message || "An error occurred");
    }
  };

  return (
    <div
      onClick={() => setShowLogin(false)}
      className="fixed inset-0 z-30 flex items-center justify-center bg-black/60 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col sm:flex-row w-80 sm:w-[700px] rounded-xl shadow-2xl overflow-hidden bg-white"
      >
       
        <div className="hidden sm:flex flex-col justify-center items-center bg-gradient-to-br from-purple-400 via-pink-400 to-red-400 w-full sm:w-1/2 p-8 text-white animate-fadeIn">
          <h2 className="text-3xl font-bold mb-4">Welcome to SalonHub!</h2>
          <p className="text-center text-lg animate-pulse">
            Book your favorite services with ease
          </p>
          <div className="mt-6 w-32 h-32 rounded-full bg-white/20 animate-bounce" />
        </div>

        
        <form
          onSubmit={onSubmitHandler}
          className="flex flex-col gap-5 w-full sm:w-1/2 p-8 bg-white"
        >
          <h2 className="text-3xl font-bold text-center text-gray-800">
            <span className="text-primary">User</span>{" "}
            {state === "login" ? "Login" : "Sign Up"}
          </h2>

          {state === "register" && (
            <div className="w-full flex flex-col">
              <label className="text-gray-600 mb-1 font-medium">Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary transition"
                required
              />
            </div>
          )}

          <div className="w-full flex flex-col">
            <label className="text-gray-600 mb-1 font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary transition"
              required
            />
          </div>

          <div className="w-full flex flex-col">
            <label className="text-gray-600 mb-1 font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary transition"
              required
            />
          </div>

          <p className="text-center text-sm text-gray-500">
            {state === "register" ? "Already have an account?" : "Create an account?"}{" "}
            <span
              onClick={() => setState(state === "login" ? "register" : "login")}
              className="text-primary font-semibold cursor-pointer hover:underline"
            >
              Click here
            </span>
          </p>

          <button
            type="submit"
            className="bg-primary hover:bg-primary-dull text-white font-semibold py-2 rounded-lg shadow-md transition-all transform hover:scale-105"
          >
            {state === "register" ? "Create Account" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
