import React from "react";
import { BsFillCloudUploadFill } from "react-icons/bs";
import { useState } from "react";
import axios from "axios";
import { AiFillDelete, AiOutlineStar, AiFillStar } from "react-icons/ai";
import Loader from "./Loader";
import Image from "./Image";

const UploadPhoto = ({ addedPhotos, setAddedPhotos }) => {
  const [photoLink, setPhotoLink] = useState("");
  const [loading, setLoading] = useState(false);

  const addPhotoByLink = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data: fileName } = await axios.post("/upload-by-url", {
        photoLink,
      });
      setAddedPhotos((prev) => {
        return [...prev, fileName];
      });
      setPhotoLink("");
    } catch (e) {
      alert("Invalid Url");
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoUpload = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }

    try {
      setLoading(true);
      const { data: photosArray } = await axios.post("/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setAddedPhotos([...addedPhotos, ...photosArray]);
    } catch (e) {
      alert("Error in Uploading, Try again later!");
    } finally {
      setLoading(false);
    }
  };

  const removePhoto = (photoId) => {
    const filterPhotos = addedPhotos.filter((photo) => {
      return photo !== photoId;
    });
    setAddedPhotos(filterPhotos);
  };

  const setAsMain = (photoId) => {
    const filterPhotos = addedPhotos.filter((photo) => {
      return photo !== photoId;
    });
    setAddedPhotos([photoId, ...filterPhotos]);
  };

  return (
    <>
      <h2 className="text-2xl px-2 py-1">Upload Photos</h2>
      <p className="px-2 pb-1 text-base text-gray-400">
        Upload photos of this place
      </p>
      <div className="flex flex-row items-center justify-between">
        <input
          type="text"
          value={photoLink}
          onChange={(e) => {
            setPhotoLink(e.target.value);
          }}
          placeholder="Upload photo using a url"
          className="w-[80%] py-2 px-2 border-2 border-gray-400 rounded-2xl text-gray-800"
        />
        <button
          onClick={addPhotoByLink}
          className="px-2 py-2 bg-red-500 text-white rounded-md"
        >
          Add Photo
        </button>
      </div>
      <div className="px-2 py-2 mt-2">
        <div class="flex items-center justify-center w-full">
          <label
            for="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-44 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              {loading ? (
                <Loader w="w-10" color="fill-red-500" />
              ) : (
                <>
                  <BsFillCloudUploadFill size={25} color="black" />
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    PNG, JPG
                  </p>
                </>
              )}
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              multiple
              accept=".jpg,.png"
              onChange={handlePhotoUpload}
            />
          </label>
        </div>
      </div>
      <div className="mt-2 gap-2 grid grid-cols-3 md:grid-cols-4 ">
        {addedPhotos.length > 0 &&
          addedPhotos.map((photo) => {
            return (
              <div className="relative" key={photo}>
                <button
                  onClick={(ev) => {
                    ev.preventDefault();
                    removePhoto(photo);
                  }}
                  className="absolute right-0 p-2 text-white bg-black/70 rounded-r-lg"
                >
                  <AiFillDelete size={25} />
                </button>
                <button
                  onClick={(ev) => {
                    ev.preventDefault();
                    setAsMain(photo);
                  }}
                  className="absolute left-0 p-2 text-white bg-black/70 rounded-r-lg"
                >
                  {addedPhotos[0] === photo ? (
                    <AiFillStar size={25} />
                  ) : (
                    <AiOutlineStar size={25} />
                  )}
                </button>
                <Image
                  src={photo}
                  className="rounded-xl w-full h-32 object-cover"
                />
              </div>
            );
          })}
      </div>
    </>
  );
};

export default UploadPhoto;
