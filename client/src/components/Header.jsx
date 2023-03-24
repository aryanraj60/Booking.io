import React, { useContext } from "react";
import logo from "../assets/logo.png";
import { BiSearch } from "react-icons/bi";
import { BsGlobe2 } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { UserContext } from "../Context/UserContext";
import { Link } from "react-router-dom";

const Header = () => {
  const { user } = useContext(UserContext);

  return (
    <header className="px-2 md:px-6 py-4 flex justify-between items-center border-b-2">
      <div className="flex justify-center items-center">
        <Link to={"/"} className="flex items-center gap-2">
          <img src={logo} alt="logo" className="w-16" />
          <h2 className="text-2xl text-gray-100 font-bold">Booking.io</h2>
        </Link>
      </div>

      <div className="flex items-center py-3">
        <div className="flex items-center gap-2 px-2 py-2 rounded-3xl border-2">
          <GiHamburgerMenu size={20} />
          <Link
            to={user ? "/account" : "/login"}
            className="flex items-center justify-between gap-1"
          >
            <CgProfile size={25} />
            {user?.name && (
              <p className="max-w-[150px] max-h-[24px] overflow-hidden text-base capitalize text-white">
                {user.name}
              </p>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
