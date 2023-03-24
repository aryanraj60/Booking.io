import { differenceInCalendarDays, format } from "date-fns";
import React from "react";
import Image from "./Image";

const BookingCard = ({ bookedPlace }) => {
  const { place, checkIn, checkOut, price } = bookedPlace;

  return (
    <div className="flex gap-2 bg-gray-800 rounded-md">
      <div className="w-48 ml-1 rounded-xl shrink-0">
        <Image
          src={place.photos[0]}
          className="object-cover h-full rounded-xl"
        />
      </div>
      <div className="py-2 px-1 grow">
        <h2 className="mb-2 text-xl font-semibold">{place.title}</h2>
        <div className="space-y-2">
          <p>
            {format(new Date(checkIn), "yyyy-MM-dd")}
            {" -> "}
            {format(new Date(checkOut), "yyyy-MM-dd")}
          </p>
          <p>
            Total Nights: &rarr;{" "}
            {differenceInCalendarDays(new Date(checkOut), new Date(checkIn))}
          </p>
          <p>Total Price: &#8377;{price}</p>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
