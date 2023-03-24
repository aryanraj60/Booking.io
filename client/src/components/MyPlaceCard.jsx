import React from "react";
import { Link } from "react-router-dom";
import Image from "./Image";

const MyPlaceCard = ({ place }) => {
  const { title, description, photos, _id } = place;

  const truncateString = (desc) => {
    const maxWords = 80;

    if (desc.split(" ").length > maxWords) {
      let truncatedText = desc.split(" ").splice(0, maxWords).join(" ");
      truncatedText += "...";
      return truncatedText;
    } else {
      return desc;
    }
  };

  return (
    <Link
      to={`/account/edit-places/edit/${_id}`}
      className="flex gap-2 bg-gray-800 rounded-md cursor-pointer items-center shadow-sm shadow-slate-200"
    >
      <div className="w-32 h-32 grow shrink-0 ml-1 rounded-xl">
        <Image src={photos[0]} className="h-full object-cover rounded-xl" />
      </div>
      <div className="py-2 px-1 grow-0 shrink">
        <h2 className="mb-2 text-xl font-semibold">{title}</h2>
        <p className="text-gray-200 text-sm md:text-base px-1">
          {truncateString(description)}
        </p>
      </div>
    </Link>
  );
};

export default MyPlaceCard;
