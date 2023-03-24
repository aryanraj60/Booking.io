import React, { useContext, useState } from "react";
import { UserContext } from "../Context/UserContext";
import { useNavigate, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import MyProfile from "../components/MyProfile";
import MyPlaces from "../components/MyPlaces";
import AccountNav from "../components/AccountNav";
import AddPlaceForm from "../components/AddPlaceForm";
import MyBookings from "../components/MyBookings";

const AccountPage = () => {
  const { user, ready, setUser } = useContext(UserContext);

  const navigate = useNavigate();
  let { subpage, id, action } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  if (!ready) {
    return "Loading";
  }

  const renderComponent = (currentPage) => {
    if (currentPage === "profile") {
      return <MyProfile user={user} setUser={setUser} />;
    } else if (currentPage === "places") {
      return <MyPlaces />;
    } else if (currentPage === "edit-places") {
      return <AddPlaceForm />;
    } else if (currentPage === "bookings") {
      return <MyBookings />;
    }
  };

  if (ready && !user) {
    navigate("/login");
  }

  return (
    <div>
      <div className="mt-12 max-w-6xl m-auto">
        <AccountNav />

        <div>{renderComponent(subpage)}</div>
      </div>
    </div>
  );
};

export default AccountPage;
