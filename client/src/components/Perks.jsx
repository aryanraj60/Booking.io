import React, { useState } from "react";
import { AiOutlineWifi } from "react-icons/ai";
import { CiParking1 } from "react-icons/ci";
import { MdScreenshotMonitor } from "react-icons/md";
import { FiRadio } from "react-icons/fi";
import { MdPets } from "react-icons/md";

const Perks = ({ perks, setPerks }) => {
  const handleCbClick = (e) => {
    const { name, checked } = e.target;
    if (checked) {
      setPerks([...perks, name]);
    } else {
      const filterPerks = perks.filter((perk) => perk !== name);
      setPerks(filterPerks);
    }
  };

  return (
    <>
      <h2 className="text-2xl px-2 py-1">Perks</h2>
      <p className="px-2 pb-1 text-base text-gray-400">Select Your Perks</p>
      <div className="flex items-center flex-wrap gap-2">
        <div class="flex items-center space-x-1 p-4 px-6 rounded-xl bg-slate-100">
          <input
            id="default-checkbox"
            type="checkbox"
            name="Wifi"
            checked={perks.includes("Wifi")}
            onClick={handleCbClick}
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
          />
          <AiOutlineWifi size={20} />
          <label
            for="default-checkbox"
            class="text-sm font-medium text-gray-900"
          >
            Wifi
          </label>
        </div>
        <div class="flex items-center space-x-1 p-4 px-6 rounded-xl bg-slate-100">
          <input
            id="default-checkbox"
            type="checkbox"
            name="Free Parking"
            checked={perks.includes("Free Parking")}
            onClick={handleCbClick}
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
          />
          <CiParking1 size={20} />
          <label
            for="default-checkbox"
            class="ml-2 text-sm font-medium text-gray-900"
          >
            Free Parking
          </label>
        </div>
        <div class="flex items-center space-x-1 p-4 px-6 rounded-xl bg-slate-100">
          <input
            id="default-checkbox"
            type="checkbox"
            onClick={handleCbClick}
            name="Televison"
            checked={perks.includes("Televison")}
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
          />
          <MdScreenshotMonitor size={20} />
          <label
            for="default-checkbox"
            class="ml-2 text-sm font-medium text-gray-900"
          >
            Television
          </label>
        </div>
        <div class="flex items-center space-x-1 p-4 px-6 rounded-xl bg-slate-100">
          <input
            id="default-checkbox"
            type="checkbox"
            onClick={handleCbClick}
            name="Radio"
            checked={perks.includes("Radio")}
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
          />
          <FiRadio size={25} />
          <label
            for="default-checkbox"
            class="ml-2 text-sm font-medium text-gray-900"
          >
            Radio
          </label>
        </div>
        <div class="flex items-center space-x-1 p-4 px-6 rounded-xl bg-slate-100">
          <input
            id="default-checkbox"
            type="checkbox"
            onClick={handleCbClick}
            name="Pets"
            checked={perks.includes("Pets")}
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
          />
          <MdPets size={25} />
          <label
            for="default-checkbox"
            class="ml-2 text-sm font-medium text-gray-900"
          >
            Pets
          </label>
        </div>
      </div>
    </>
  );
};

export default Perks;
