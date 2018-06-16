const express = require("express");
// const mongojs = require("mongojs");
// const request = require("request");
const cheerio = require("cheerio");
const bodyParser = require("body-parser");
const axios = require("axios");
const logger = require("morgan");
const mongoose = require("mongoose");

// Express
const app = express();

let db = require("./models");

let PORT = 8080;

// Configure middleware
// ===========================================================
// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// Connect to Mongo DB
mongoose.connect("mongodb://localhost/mongo_scrape");

// Routes
// ===========================================================
// Main route
app.get("/", function(req, res) {
    console.log("Hello World!");
    res.send("Hello World!");
})

// Main scrape route
app.get("/scrape", function(req, res) {
    axios.get("http://www.theonion.com").then(function(response) {
        
        let $ = cheerio.load(response.data);

        $("h1 a").each(function(i, element) {

            let result = {};

            result.title = $(this).text();
            result.link = $(this).attr("href");

            db.Article.create(result)
                .then(function(dbArticles) {
                    console.log(dbArticles);
                })
                // .catch(function(err) {
                //     return res.json(err);
                // });
            
        });
        res.send("Done scraping The Onion!");
    });
});

// Route for all Articles in database
app.get("/articles", function(req, res) {
    db.Article.find({})
        .then(function(dbArticles) {
            res.json(dbArticles);
        })
});
// Sports
app.get("/sports", function(req, res) {
    request("http://sports.theonion.com", function(error, response, html) {

        let $ = cheerio.load(html);

        $("h1.headline").each(function(i, element) {

            let text = $(element).text();
            let link = $(element).children().attr("href");
            let topic = "Sports";
            
            db.scrapedData.insert({text: text, link: link, topic: topic}, function(err, data) {
                
                if (err) {
                    console.log(err);
                }
                else {
                    console.log("Scraped!")
                }

            })

        })

    })
    res.send("Done scraping Sports!")
})

// Local
app.get("/local", function(req, res) {
    request("http://local.theonion.com", function(error, response, html) {

        let $ = cheerio.load(html);

        $("h1.headline").each(function(i, element) {

            let text = $(element).text();
            let link = $(element).children().attr("href");
            let topic = "Local";

            db.scrapedData.insert({text: text, link: link, topic: topic}, function(err, data) {

                if (err) {
                    console.log(err);
                }
                else {
                    console.log("Scraped!");
                }
            })
        })
    })
    res.send("Done scraping Local!");
})

// Politics
app.get("/politics", function(req, res) {
    request("http://politics.theonion.com", function(error, response, html) {

        let $ = cheerio.load(html);

        $("h1.headline").each(function(i, element) {

            let text = $(element).text();
            let link = $(element).children().attr("href");
            let topic = "Politics";

            db.scrapedData.insert({text: text, link: link, topic: topic}, function(err, data) {

                if (err) {
                    console.log(err);
                }
                else {
                    console.log("Scraped!");
                }
            })
        })
    })
    res.send("Done scraping Politics!");
})

// Entertainment
app.get("/entertainment", function(req, res) {
    request("http://entertainment.theonion.com", function(error, response, html) {

        let $ = cheerio.load(html);

        $("h1.headline").each(function(i, element) {

            let text = $(element).text();
            let link = $(element).children().attr("href");
            let topic = "Entertainment";

            db.scrapedData.insert({text: text, link: link, topic: topic}, function(err, data) {

                if (err) {
                    console.log(err);
                }
                else {
                    console.log("Scraped!");
                }
            })
        })
    })
    res.send("Done scraping Entertainment!");
})

// Listen
app.listen(PORT, function() {
    console.log("App is running on Port " + PORT + "!");
})