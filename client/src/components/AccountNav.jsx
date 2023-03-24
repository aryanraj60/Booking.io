import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineMenu } from "react-icons/ai";
import { AiOutlineHome } from "react-icons/ai";
import { useParams } from "react-router-dom";

const AccountNav = () => {
  let { subpage } = useParams();

  if (subpage === undefined) {
    subpage = "profile";
  }

  const applyBg = (buttonName) => {
    if (buttonName === subpage) {
      return "bg-red-500";
    } else {
      return "bg-gray-400";
    }
  };

  console.log("Account Nav", subpage);
  return (
    <div className="flex flex-row gap-2 md:gap-10 justify-center">
      <Link
        to="/account/profile"
        className={`py-2 ${applyBg(
          "profile"
        )} flex gap-1 px-3 items-center rounded-2xl`}
      >
        <AiOutlineUser size={20} />
        <p>My Profile</p>
      </Link>
      <Link
        to="/account/bookings"
        className={`py-2 ${applyBg(
          "bookings"
        )} flex gap-1 px-3 items-center rounded-2xl`}
      >
        <AiOutlineMenu size={20} />
        <p>My Bookings</p>
      </Link>
      <Link
        to="/account/places"
        className={`py-2 ${applyBg(
          "places"
        )} flex gap-1 px-3 items-center rounded-2xl`}
      >
        <AiOutlineHome size={20} />
        <p>My Accommodations</p>
      </Link>
    </div>
  );
};

export default AccountNav;
