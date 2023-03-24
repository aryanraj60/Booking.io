import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { BsPinMap } from "react-icons/bs";
import BookingWidget from "../components/BookingWidget";
import Loader from "../components/Loader";
import Image from "../components/Image";
const PlacePage = () => {
  const [place, setPlace] = useState(null);
  const { id } = useParams();
  const [showPhotos, setShowPhotos] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    axios.get(`/places/${id}`).then((res) => {
      const { data } = res;
      setPlace(data);
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

  if (showPhotos) {
    return (
      <div className="bg-black absolute inset-0 w-full min-h-screen">
        <button
          onClick={() => setShowPhotos(false)}
          className="flex fixed items-center px-2 py-2 bg-black/40 rounded-2xl right-4 shadow-md shadow-black/20 top-7 text-white"
        >
          <AiOutlineClose size={20} />
          <p>Close Photos</p>
        </button>
        <div className="grid bg-black gap-4 p-10">
          {place?.photos?.length > 0 &&
            place.photos.map((photo) => (
              <div key={photo}>
                <Image src={`${photo}`} className="w-full object-cover" />
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="-mx-2">
      {place && (
        <div className="pt-3 px-4 max-w-7xl m-auto">
          <h2 className="capitalize mt-2 text-2xl lg:text-3xl text-gray-200 font-medium">
            {place.title}
          </h2>
          <a
            target="_blank"
            href={`https://maps.google.com/?q=${place.address}`}
            className="flex items-center gap-2 my-2 text-sm font-bold underline"
          >
            <BsPinMap size={20} />
            <p>{place.address}</p>
          </a>
          <div className="relative mt-5">
            <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
              {place.photos?.[0] && (
                <div>
                  <Image
                    className="aspect-square h-full object-cover"
                    src={`${place.photos[0]}`}
                  />
                </div>
              )}
              <div>
                {place.photos?.[1] && (
                  <Image
                    className="aspect-square object-cover"
                    src={`${place.photos[1]}`}
                  />
                )}
                <div className="overflow-hidden">
                  {place.photos?.[2] && (
                    <Image
                      className="aspect-square object-cover relative top-2"
                      src={`${place.photos[2]}`}
                    />
                  )}
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowPhotos(true)}
              className="absolute bg-black bottom-2 right-2 px-2 py-2 text-sm rounded-md shadow-md shadow-black/50"
            >
              Show more photos
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] mt-5 gap-2 my-4">
            <div className="my-2 text-gray-200">
              <h2 className="text-2xl font-bold mb-1">Description</h2>
              <p className="text-start">{place.description}</p>
              <div className="flex flex-col mt-3">
                <p>
                  Check In: <span className="font-bold">{place.checkIn}</span>
                </p>
                <p>
                  Check Out: <span className="font-bold">{place.checkOut}</span>
                </p>
                <p>
                  Max Guests:{" "}
                  <span className="font-bold">{place.maxGuests}</span>
                </p>
              </div>
            </div>

            <div>
              <BookingWidget place={place} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlacePage;
