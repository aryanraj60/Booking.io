import mongoose from "mongoose";

const connectDB = (url) => {
  console.log("Connect DB RUnning");
  mongoose
    .connect(url)
    .then(() => {
      console.log("MongoDB Connected!");
    })
    .catch((e) => {
      console.log("Error Connecting Mongodb", e);
    });
};

export default connectDB;
