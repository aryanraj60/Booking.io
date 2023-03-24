import React, { useState, useContext, useEffect } from "react";
import { differenceInCalendarDays } from "date-fns";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../Context/UserContext";

const BookingWidget = ({ place }) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [totalGuest, setTotalGuest] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  let numOfNights = 0;
  if (checkIn && checkOut) {
    numOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  const reservePlace = async (ev) => {
    ev.preventDefault();
    if (!user) {
      alert("Please Sign In / Sign Up to book a place.");
      navigate("/login");
    }
    const { _id } = user;
    const data = {
      place: place._id,
      user: _id,
      checkIn,
      checkOut,
      maxGuests: totalGuest,
      name: fullName,
      email,
      price: place.price * numOfNights,
    };
    try {
      const response = await axios.post("/bookings", data);
      if (response.data == "already Booked") {
        alert("Already Booked");
      } else {
        navigate(`/account/bookings/${response.data._id}`);
      }
    } catch (e) {
      alert("Error Occur While Booking!");
    }
  };

  useEffect(() => {
    if (user) {
      setFullName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  return (
    <form
      className="bg-gray-900 text-gray-300 p-4 shadow rounded-2xl"
      onSubmit={reservePlace}
    >
      <h2 className="text-center text-2xl font-medium text-gray-100">
        Price: &#8377;{place.price} / per night
      </h2>
      <div className="border rounded-2xl mt-2">
        <div className="flex items-center border-b">
          <div className="py-3 px-2">
            <label>Check In:</label>
            <input
              type="date"
              required
              className="bg-gray-100 rounded-sm px-2 mt-1 text-gray-700"
              onChange={(ev) => setCheckIn(ev.target.value)}
            />
          </div>
          <div className="py-3 px-2 border-l">
            <label>Check Out:</label>
            <input
              type="date"
              required
              className="bg-gray-100 rounded-sm px-2 mt-1 text-gray-700"
              onChange={(ev) => setCheckOut(ev.target.value)}
            />
          </div>
        </div>
        <div className="py-3 px-2">
          <label>Number of guests:</label>
          <input
            type="number"
            value={totalGuest}
            min="1"
            required
            onChange={(ev) => setTotalGuest(ev.target.value)}
            className="border w-full py-1 px-2 rounded-xl border-gray-300 text-gray-700"
          />
        </div>
        {numOfNights > 0 && (
          <div>
            <div className="py-3 px-2">
              <label>Full Name:</label>
              <input
                type="text"
                value={fullName}
                required
                onChange={(ev) => setFullName(ev.target.value)}
                className="border w-full py-1 px-2 rounded-xl border-gray-300 text-gray-700"
              />
            </div>
            <div className="py-3 px-2">
              <label>Email:</label>
              <input
                type="email"
                required
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
                className="border w-full py-1 px-2 rounded-xl border-gray-300 text-gray-700"
              />
            </div>
          </div>
        )}
      </div>
      <button
        type="submit"
        className="bg-red-600 w-full py-2 rounded-xl mt-2 text-white"
      >
        Reserve{" "}
        {numOfNights > 0 && <span>&#8377;{place.price * numOfNights}</span>}
      </button>
    </form>
  );
};

export default BookingWidget;
