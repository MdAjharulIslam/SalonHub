import React, { useState, FormEvent, ChangeEvent } from "react";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [state, setState] = useState<"login" | "register">("login");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();
  const { setShowLogin,setLogin } = useAppContext();

  const onSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      navigate("/")
      setShowLogin(false)
      setLogin(true)
      // login/register logic here
    } catch (error) {
        console.error(error.message)
    }
  };

 

  return (
    <div
      onClick={() => setShowLogin(false)}
      className="fixed inset-0 z-30 flex items-center justify-center bg-black/60 backdrop-blur-sm"
    >
      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-5 w-80 sm:w-[400px] p-8 rounded-xl shadow-2xl border border-gray-100 bg-gradient-to-br from-white via-gray-100 to-white"
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
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
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
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
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
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            className="border border-gray-300 rounded-lg p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary transition"
            required
          />
        </div>

        {/* Toggle Login/Register */}
        <p className="text-center text-sm text-gray-500">
          {state === "register"
            ? "Already have an account?"
            : "Create an account?"}{" "}
          <span
            onClick={() =>
              setState(state === "login" ? "register" : "login")
            }
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
  );
};

export default Login;
