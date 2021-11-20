///////////////////////////////
// DEPENDENCIES
////////////////////////////////
// get .env variables
require("dotenv").config();
// pull PORT from .env, give default value of 3000
const { PORT = 3000 } = process.env;
// import express
const express = require("express");
// create application object
const app = express();
// import mongoose
const mongoose = require("mongoose");
// import middlware
const cors = require("cors");
const morgan = require("morgan");


///////////////////////////////
// DATABASE CONNECTION
////////////////////////////////
// Establish Connection
mongoose.connect(URL_MONGODB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  // Connection Events
  mongoose.connection
    .on("open", () => console.log("Your are connected to mongoose"))
    .on("close", () => console.log("Your are disconnected from mongoose"))
    .on("error", (error) => console.log(error));

    ///////////////////////////////
// MODELS
////////////////////////////////
const MakeUpsSchema = new mongoose.Schema({
    brand: String,
    name: String,
    price: Number,
    imagen_link: String,
    description: String,
    product_type: String,
    tag_list: [String],

  });
  
  const Makeups = mongoose.model("Makeups", MakeupsSchema);
  
  ///////////////////////////////
  // MiddleWare
  ////////////////////////////////
  app.use(cors()); // to prevent cors errors, open access to all origins
  app.use(morgan("dev")); // logging
  app.use(express.json()); // parse json bodies

///////////////////////////////
// ROUTES
////////////////////////////////
// create a test route
app.get("/", (req, res) => {
    res.send("Is time to shine");
  });

  //  INDEX ROUTE
app.get("/makeups", async (req, res) => {
    try {
      // send all makeups
      res.json(await Makeups.find({}));
    } catch (error) {
      //send error
      res.status(400).json(error);
    }
  });
  ///////////////////////////////
  // LISTENER
  ////////////////////////////////
  app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));