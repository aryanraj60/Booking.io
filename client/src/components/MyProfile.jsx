import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const MyProfile = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await axios.post("/logout");
    setUser(null);
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-lg text-center text-white font-semibold pt-14">
        Logged in as {user?.name} ({user?.email})
      </h3>
      <button
        onClick={handleLogout}
        className="mt-10 w-48 py-2 bg-red-500 rounded-2xl text-white"
      >
        Logout
      </button>
    </div>
  );
};

export default MyProfile;
