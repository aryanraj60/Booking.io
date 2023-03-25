import axios from "axios";
import React, { useEffect, useState } from "react";
import { RiAddLine } from "react-icons/ri";
import { Link, useParams } from "react-router-dom";
import AddPlaceForm from "./AddPlaceForm";
import MyPlaceCard from "./MyPlaceCard";
import Loader from "./Loader";

const MyPlaces = () => {
  const { action } = useParams();
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/user-places")
      .then(({ data: userPlaces }) => {
        setPlaces(userPlaces);
        setLoading(false);
      })
      .catch((e) => {})
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="h-[calc(100vh-80px)] flex justify-center items-center">
        <Loader w="w-24" />
      </div>
    );
  }

  return (
    <div>
      {action !== "new" && (
        <div className="flex justify-center py-8">
          <Link
            to={"/account/places/new"}
            className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-red-500 text-white"
          >
            <RiAddLine size={30} className="text-white" />
            <span>Add New Places</span>
          </Link>
        </div>
      )}
      {places.length > 0 && action !== "new" && (
        <div className="max-w-5xl m-auto flex flex-col items-center gap-5 pb-4">
          {places.map((place) => (
            <MyPlaceCard place={place} key={place._id} />
          ))}
        </div>
      )}
      {action === "new" && (
        <div>
          <AddPlaceForm />
        </div>
      )}
    </div>
  );
};

export default MyPlaces;
