import React, { useEffect, useState } from "react";
import UploadPhoto from "./UploadPhoto";
import TimePicker from "react-time-picker";
import Perks from "./Perks";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const AddPlaceForm = () => {
  const [checkIn, setCheckIn] = useState("08:00");
  const [checkOut, setCheckOut] = useState("12:00");
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [perks, setPerks] = useState([]);
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const [maxGuest, setMaxGuest] = useState(1);
  const [price, setPrice] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title && address && addedPhotos.length) {
      const formData = {
        title,
        checkIn,
        checkOut,
        address,
        perks,
        description,
        extraInfo,
        maxGuest,
        photos: addedPhotos,
        price,
      };

      if (id) {
        try {
          await axios.put("/update-place", {
            id,
            ...formData,
          });
          navigate("/account/places");
        } catch (e) {
          alert("There is a problem in updating this place");
        }
      } else {
        try {
          await axios.post("/addPlace", formData);
          navigate("/account/places");
        } catch (e) {
          alert("There is a problem in addding a place");
        }
      }
    } else {
      alert("Please fill required fields!");
    }
  };

  useEffect(() => {
    if (id) {
      axios.get(`/places/${id}`).then((response) => {
        const {
          title,
          address,
          photos,
          perks,
          description,
          extraInfo,
          checkIn,
          checkOut,
          maxGuests,
          price,
        } = response.data;
        setTitle(title);
        setAddedPhotos(photos);
        setAddress(address);
        setPerks(perks);
        setDescription(description);
        setExtraInfo(extraInfo);
        setCheckIn(checkIn);
        setCheckOut(checkOut);
        setMaxGuest(maxGuests);
        setPrice(price);
      });
    }
  }, []);

  return (
    <>
      <form className="mt-10 max-w-3xl m-auto" onSubmit={handleSubmit}>
        <div>
          <h2 className="text-2xl px-2 py-1">Title</h2>
          <p className="px-2 text-base pb-1 text-gray-400">
            A short title for your home
          </p>
          <input
            type="text"
            value={title}
            required
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            placeholder="Title: Ex- My Beautiful home"
            className="w-full py-2 px-2 border-2 border-gray-400 rounded-2xl text-gray-800 bg-slate-100"
          />
        </div>

        <div className="py-2">
          <h2 className="text-2xl px-2 py-1">Address</h2>
          <p className="px-2 pb-1 text-base text-gray-400">
            Enter Location of this place
          </p>
          <input
            type="text"
            value={address}
            required
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            placeholder="Enter the address of your home"
            className="w-full py-2 px-2 border-2 border-gray-400 rounded-2xl text-gray-800 bg-slate-100"
          />
        </div>

        <div className="py-2">
          <UploadPhoto
            addedPhotos={addedPhotos}
            setAddedPhotos={setAddedPhotos}
          />
        </div>

        <div className="py-2">
          <h2 className="text-2xl px-2 py-1">Description</h2>
          <p className="px-2 pb-1 text-base text-gray-400">
            Enter information about this place
          </p>
          <textarea
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            placeholder="Enter information about this place"
            className="w-full py-2 px-2 border-2 border-gray-400 rounded-2xl h-28 text-gray-800 bg-slate-100"
          />
        </div>

        <div className="py-2">
          <Perks perks={perks} setPerks={setPerks} />
        </div>

        <div className="py-2">
          <h2 className="text-2xl py-1">Check In and Check Out Time</h2>
          <p className="pb-1 text-base text-gray-400">
            Enter information about this place
          </p>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div>
              <p>Check In Time</p>
              <TimePicker
                value={checkIn}
                onChange={setCheckIn}
                className="w-full"
              />
            </div>
            <div>
              <p>Check Out Time</p>
              <TimePicker
                value={checkOut}
                onChange={setCheckOut}
                className="w-full"
              />
            </div>
            <div>
              <p>Max Number of Guests</p>
              <input
                value={maxGuest}
                onChange={(e) => {
                  setMaxGuest(e.target.value);
                }}
                type="number"
                placeholder="0"
                className="border placeholder:text-gray-700 w-full bg-transparent"
              />
            </div>
            <div>
              <p>Price Per Night</p>
              <input
                value={price}
                required
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                type="number"
                min="0"
                placeholder="Rs.2000"
                className="border placeholder:text-gray-700 w-full bg-transparent"
              />
            </div>
          </div>
        </div>
        <div className="my-4 flex items-center justify-center">
          <button className="bg-red-500 w-full text-white py-2 rounded-xl">
            Save
          </button>
        </div>
      </form>
    </>
  );
};

export default AddPlaceForm;
