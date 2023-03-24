import axios from "axios";
import React, { useEffect, useState } from "react";
import BookingCard from "./BookingCard";
const MyBookings = () => {
  const [loading, setLoading] = useState(false);
  const [bookedPlaces, setBookedPlaces] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios.get("/bookings").then((res) => {
      const { data: userBookedPlaces } = res;
      setBookedPlaces(userBookedPlaces);
      setLoading(false);
    });
  }, []);

  return (
    <div className="max-w-5xl m-auto pb-4 mt-5 space-y-3">
      {bookedPlaces.length > 0 &&
        bookedPlaces.map((bookedPlace) => (
          <BookingCard bookedPlace={bookedPlace} key={bookedPlace._id} />
        ))}
    </div>
  );
};

export default MyBookings;
