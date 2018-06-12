const express = require("express");
const mongojs = require("mongojs");
const request = require("request");
const cheerio = require("cheerio");

// Express
const app = express();

// Database config
const databaseUrl = "mongo_scrape";
const collections = ["scrapedData"];

// Connect db variable to database
let db = mongojs(databaseUrl, collections);

db.on("error", function(error) {
    console.log("Database Error:", error);
})

// Main route
app.get("/", function(req, res) {
    res.send("Hello World!");
})

// Main scrape route
app.get("/main", function(req, res) {
    request("http://www.theonion.com", function(error, response, html) {
        
        let $ = cheerio.load(html);

        $("h1.headline").each(function(i, element) {

            let text = $(element).text();
            let link = $(element).children().attr("href");
            
            db.scrapedData.insert({text: text, link: link}, function(err, data) {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log("Scraped!!");
                }
                
            })
        })
        res.send("Done scraping The Onion!");
    })
})

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
app.listen(3000, function() {
    console.log("App is running on Port 3000!");
})