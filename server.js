const express = require("express");
const mongojs = require("mongojs");
const request = require("request");
const cheerio = require("cheerio");

// Express
const app = express();

// Database config
const databaseUrl = "mongo_scrape";
const collections = ["scrapedData"];

let db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
    console.log("Database Error:", error);
})

// Main route

// Scrape route
app.get("/scraper", function(req, res) {
    request("http://www.theonion.com", function(error, response, html) {
        
        let $ = cheerio.load(html);

        $("h1.headline").each(function(i, element) {

            let text = $(element).text();
            let link = $(element).attr("href");
            
            db.scrapedData.insert({text: text}, function(err, data) {
                console.log("Scraped!!");
            })
        })

        res.send("Done!");

    })
})

// Listen
app.listen(3000, function() {
    console.log("App is running on Port 3000!");
})