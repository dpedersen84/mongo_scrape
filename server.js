const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const routes = require("./routes");
// const path = require("path");
// const cheerio = require("cheerio");
// const axios = require("axios");

const app = express();

// const db = require("./models");

const PORT = process.env.PORT || 3001;

// If deployed, use the deployed database. Otherwise use the local mongo_scrape database
// const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongo_scrape";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
// mongoose.Promise = Promise;
// mongoose.connect(MONGODB_URI);

// Configure middleware
// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Use express.static to serve the public folder as a static directory
// app.use(express.static("public"));

// Connect to Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/mongo_scrape")
    .then(() =>  console.log('Connected to MongoDB'))
    .catch((err) => console.error(err));
// Routes
app.use(routes);

// Listen
app.listen(PORT, () => {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});