import React from "react";
import { Link } from "react-router-dom";
import Image from "./Image";

const PlaceCard = ({ place }) => {
  const { title, photos, address, price, _id } = place;
  return (
    <Link to={`/place/${_id}`}>
      <div className="rounded-2xl">
        {photos[0] && (
          <Image
            src={photos[0]}
            className="rounded-2xl aspect-square object-cover"
          />
        )}
      </div>

      <div className="mt-1">
        <h3 className="font-bold text-base">{address}</h3>
        <h2 className="text-sm truncate py-1 font-medium text-gray-500">
          {place.title}
        </h2>
        <p>
          <span className="font-bold">&#8377;{price}</span> per night
        </p>
      </div>
    </Link>
  );
};

export default PlaceCard;
