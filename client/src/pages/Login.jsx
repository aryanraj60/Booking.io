import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/login", {
        email,
        password,
      });

      alert("Login Successful!");
      setUser(response.data);
      setRedirect(true);
    } catch (e) {
      if (e.response.status === 401) {
        alert("You are not registered!");
      } else if (e.response.status === 422) {
        alert("Password is not correct!");
      } else {
        alert("Login Falied! Please try again later!");
      }
    }
  };

  if (redirect) {
    navigate("/");
  }

  return (
    <div className="mt-4 grow flex justify-center items-center">
      <div className="border-2 border-gray-400 rounded-2xl md:w-[60%] mb-40">
        <div className="py-4 border-b-2">
          <h2 className="font-semibold text-2xl md:text-3xl text-white text-center">
            Log in
          </h2>
        </div>

        <div className="py-6 px-3">
          <h2 className="text-white text-2xl font-semibold text-center">
            Welcome to Booking.io
          </h2>

          <form className="py-6 space-y-4" onSubmit={handleLogin}>
            <input
              type="email"
              required
              placeholder="your@email.com"
              className="border rounded-md placeholder:text-slate-500 px-2 py-2 w-full bg-gray-200 text-gray-800"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              vale={email}
            />
            <input
              type="password"
              required
              placeholder="password"
              className="border rounded-md placeholder:text-slate-500 px-2 py-2 w-full bg-gray-200 text-gray-800"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
            />

            <button
              type="submit"
              className="bg-red-500 w-full text-white text-base py-2 rounded-lg"
            >
              Login
            </button>

            <div className="flex items-center justify-center gap-1">
              <p className="text-gray-400">Don't have an account yet?</p>
              <Link to="/register" className="underline font-semibold">
                Register Now
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
