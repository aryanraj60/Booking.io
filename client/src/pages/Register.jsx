import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import { encryptPassword } from "../utils";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();

    const hashedPassword = encryptPassword(password);

    try {
      setIsLoading(true);
      await axios.post("/register", {
        name,
        email,
        password: hashedPassword,
      });

      alert("Registration Successfull");
      navigate("/login");
    } catch (e) {
      alert("Registration failed, Please try again later!");
      console.log("Error", e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-4 grow flex justify-center items-center">
      <div className="border-2 border-gray-400 rounded-2xl md:w-[60%] mb-40">
        <div className="py-4 border-b-2">
          <h2 className="font-semibold text-2xl md:text-3xl text-white text-center">
            Register
          </h2>
        </div>

        <div className="py-6 px-3">
          <h2 className="text-white text-2xl font-semibold text-center">
            Welcome to Booking.io
          </h2>

          <form className="py-6 space-y-4" onSubmit={registerUser}>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="Keanu Reeves"
              className="border rounded-md placeholder:text-slate-500 px-2 py-2 w-full text-gray-800"
            />
            <input
              type="email"
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="your@email.com"
              className="border rounded-md placeholder:text-slate-500 px-2 py-2 w-full text-gray-800"
            />
            <input
              type="password"
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="password"
              className="border rounded-md placeholder:text-slate-500 px-2 py-2 w-full text-gray-800"
            />

            <button
              type="submit"
              className="bg-red-500 w-full text-white text-base py-2 rounded-lg"
            >
              {isLoading ? (
                <div className="flex justify-center items-center">
                  <Loader w="w-10" />
                </div>
              ) : (
                "Register"
              )}
            </button>

            <div className="flex items-center justify-center gap-1">
              <p className="text-gray-300">Already a member?</p>
              <Link to="/login" className="underline font-semibold">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
