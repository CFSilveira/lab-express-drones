// ℹ️ package responsible to make the connection with mongodb
// https://www.npmjs.com/package/mongoose
const mongoose = require("mongoose");

const Drone = require('../models/Drone.model');

const droneArray = [
{name: "Rita", propellers: 6, maxSpeed: 31},
{name: "Carlos", propellers: 1, maxSpeed: 3},
{name: "Plipa", propellers: 15, maxSpeed: 69}
]

// ℹ️ Sets the MongoDB URI for our app to have access to it.
// If no env has been set, we dynamically set it to whatever the folder name was upon the creation of the app

const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/lab-express-drones";

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });

  Drone.create(droneArray)
  .then((dronesFromDb) => {
    console.log(`Created ${dronesFromDb.length} drones`);
    mongoose.disconnect(() => console.log('Connection closed'));
  })
  .catch((err) => console.log(err));
