import React from "react";

const baseURL = import.meta.env.VITE_BASE_URL;

console.log(baseURL);
const Image = ({ src, ...rest }) => {
  return <img {...rest} src={src} />;
};

export default Image;
