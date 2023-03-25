import React, { useEffect, useState } from "react";
import axios from "axios";
import PlaceCard from "../components/PlaceCard";
import Loader from "../components/Loader";
import Footer from "../components/Footer";

const Home = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get("/places").then((response) => {
      const { data: placesData } = response;
      setPlaces(placesData);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="h-[calc(100vh-100px)] flex items-center justify-center">
        <Loader w="w-20" />
      </div>
    );
  }

  return (
    <div className="home">
      <div className="mt-3">
        {places.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {places.map((place) => (
              <PlaceCard place={place} key={place._id} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
