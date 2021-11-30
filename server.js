///////////////////////////////
// DEPENDENCIES
////////////////////////////////
// get .env variables
require("dotenv").config();
// pull PORT from .env, give default value of 3000
const { PORT = 3000, URL_MONGODB } = process.env;
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
    quantity: Number,
    price: Number,
    image_link: String,
    description: String,
    product_type: String,
    tag_list: Array,

  });
  
  const MakeUps = mongoose.model("Makeups", MakeUpsSchema);
  
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
    app.get("/cart", async (req, res) => {
        try {
        // send all cart
        res.json(await MakeUps.find({}));
        } catch (error) {
        //send error
        res.status(400).json({error});
        }
    });
// CREATE ROUTE
app.post("/cart", async (req, res) => {
    try {
      // send all people
      res.json(await MakeUps.create(req.body));
    } catch (error) {
      //send error
      res.status(400).json(error);
    }
  });
// UPDATE ROUTE
    app.put("/cart/:id", async (req, res) => {
        try {
        // send all cart
        res.json(
            await MakeUps.findByIdAndUpdate(req.params.id, req.body, { new: true })
        );
        } catch (error) {
        //send error
        res.status(400).json({error});
        }
    });
// DELETE ROUTE
    app.delete("/cart/:id", async (req, res) => {
        try {
        // send all cart
        res.json(await MakeUps.findByIdAndRemove(req.params.id));
        } catch (error) {
        //send error
        res.status(400).json({error});
        }
    });

  ///////////////////////////////
  // LISTENER
  ////////////////////////////////
  app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));