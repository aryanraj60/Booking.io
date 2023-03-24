import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { v2 as cloudinary } from "cloudinary";
import connectDB from "./mongodb/connect.js";
import User from "./mongodb/models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import imageDownloader from "image-downloader";
import multer from "multer";
import fs from "fs";
import PlaceModel from "./mongodb/models/Place.js";
import BookingModel from "./mongodb/models/Booking.js";
import mime from "mime-types";

dotenv.config();
const jwtSecret = process.env.JWT_SECRET;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

app.use(
  cors({
    credentials: true,
    origin: process.env.ORIGIN_URL,
  })
);

cloudinary.config({
  cloud_name: "dxvef6wbj",
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const getUserDataFromToken = (req) => {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, (err, userInfo) => {
      if (err) throw err;
      resolve(userInfo);
    });
  });
};

const uploadToCloudinary = async (path, mimemtype) => {
  const parts = mimemtype.split("/");
  const ext = parts[parts.length - 1];
  const newFileName = Date.now() + "." + ext;
  const { secure_url } = await cloudinary.uploader.upload(path, {
    public_id: newFileName,
  });
  return secure_url;
};

app.get("/server/profile", (req, res) => {
  connectDB(process.env.MONGODB_URL);
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userInfo) => {
      if (err) throw err;

      const { name, email, _id } = await User.findById(userInfo.userId);

      res.status(200).json({ name, email, _id });
    });
  } else {
    res.json(null);
  }
});

app.get("/server/user-places", (req, res) => {
  connectDB(process.env.MONGODB_URL);
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userInfo) => {
      if (err) throw err;
      const { userId } = userInfo;
      try {
        const userPlaces = await PlaceModel.find({ owner: userId });

        res.status(200).json(userPlaces);
      } catch (e) {
        res.status(500).json(e);
      }
    });
  } else {
    res.json(null);
  }
});

app.get("/server/places/:id", async (req, res) => {
  connectDB(process.env.MONGODB_URL);
  const { id } = req.params;
  try {
    const placeDoc = await PlaceModel.findById(id);
    res.status(200).json(placeDoc);
  } catch (e) {
    res.status(500).json(e);
  }
});

app.get("/server/places", async (req, res) => {
  connectDB(process.env.MONGODB_URL);
  try {
    const placesDoc = await PlaceModel.find();
    res.status(200).json(placesDoc);
  } catch (e) {
    res.status(500).json(e);
  }
});

app.get("/server/bookings", async (req, res) => {
  connectDB(process.env.MONGODB_URL);
  try {
    const { userId } = await getUserDataFromToken(req);
    const userBookingDocs = await BookingModel.find({ user: userId }).populate(
      "place"
    );

    res.status(200).json(userBookingDocs);
  } catch (e) {
    res.status(500).json(e);
  }
});

app.post("/server/register", async (req, res) => {
  connectDB(process.env.MONGODB_URL);
  const { name, email, password } = req.body;
  try {
    const userDoc = await User.create({
      name,
      email,
      password,
    });

    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
});

app.post("/server/login", async (req, res) => {
  connectDB(process.env.MONGODB_URL);
  const { email, password } = req.body;

  const userDoc = await User.findOne({ email });

  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);

    if (passOk) {
      jwt.sign(
        {
          userId: userDoc._id,
        },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res.status(200).cookie("token", token).json(userDoc);
        }
      );
    } else {
      res.status(422).json("Password is not correct");
    }
  } else {
    res.status(401).json("User not found");
  }
});

app.post("/server/logout", (req, res) => {
  res.cookie("token", "").json("Logout Success!");
});

app.post("/server/upload-by-url", async (req, res) => {
  const { photoLink } = req.body;
  const newName = Date.now() + ".jpg";
  try {
    await imageDownloader.image({
      url: photoLink,
      dest: "/tmp/" + newName,
    });
    const uploadedUrl = await uploadToCloudinary(
      "/tmp/" + newName,
      mime.lookup("/tmp/" + newName)
    );
    res.status(200).json(uploadedUrl);
  } catch (e) {
    res.status(415).json(e);
  }
});

const photosMiddleware = multer({ dest: "/tmp" });

app.post(
  "/server/upload",
  photosMiddleware.array("photos", 20),
  async (req, res) => {
    const uploadedImages = [];
    for (let i = 0; i < req.files.length; i++) {
      const { path, mimetype } = req.files[i];
      const fileUrl = await uploadToCloudinary(path, mimetype);
      uploadedImages.push(fileUrl);
    }
    if (uploadedImages.length > 0) {
      res.status(200).json(uploadedImages);
    } else {
      res.status(415).json([]);
    }
  }
);

app.post("/server/addPlace", (req, res) => {
  connectDB(process.env.MONGODB_URL);
  const { token } = req.cookies;
  const {
    title,
    address,
    photos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuest: maxGuests,
    price,
  } = req.body;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userInfo) => {
      if (err) throw err;
      try {
        const newPlaceDoc = await PlaceModel.create({
          owner: userInfo.userId,
          title,
          address,
          photos,
          description,
          perks,
          extraInfo,
          checkIn,
          checkOut,
          maxGuests,
          price,
        });
        res.status(200).json(newPlaceDoc);
      } catch (e) {
        res.status(500).json(e);
      }
    });
  } else {
    res.json(null);
  }
});

app.post("/server/bookings", async (req, res) => {
  connectDB(process.env.MONGODB_URL);
  const {
    place,
    checkIn,
    checkOut,
    maxGuests,
    fullName,
    email,
    price,
    name,
    user,
  } = req.body;
  try {
    const bookedDoc = await BookingModel.find({ place: place, user: user });

    if (bookedDoc) {
      res.status(200).json("already Booked");
    } else {
      const bookingDoc = await BookingModel.create({
        place,
        user,
        checkIn,
        checkOut,
        maxGuests,
        fullName,
        email,
        price,
        name,
      });
      res.status(200).json(bookingDoc);
    }
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

app.put("/server/update-place", async (req, res) => {
  connectDB(process.env.MONGODB_URL);
  const { token } = req.cookies;
  const {
    id,
    title,
    address,
    photos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuest: maxGuests,
    price,
  } = req.body;

  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userInfo) => {
      if (err) throw err;
      try {
        const placeDoc = await PlaceModel.findById(id);

        if (placeDoc.owner.toString() === userInfo.userId) {
          placeDoc.set({
            title,
            address,
            photos,
            description,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests,
            price,
          });
          await placeDoc.save();
          res.status(200).json("Ok");
        }
      } catch (e) {
        console.log(e);
        res.status(500).json(e);
      }
    });
  } else {
    res.json(null);
  }
});

const startServer = () => {
  try {
    app.listen(4000, () => {
      console.log("Server started on port 4000!");
    });
  } catch (e) {
    console.log("Error", e);
  }
};

startServer();
