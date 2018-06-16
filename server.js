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
//=================================================================================
// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// Connect to Mongo DB
mongoose.connect("mongodb://localhost/mongo_scrape");

// Routes
//=================================================================================

// Main scrape route
app.get("/scrape", function(req, res) {
    axios.get("http://www.theonion.com").then(function(response) {
        
        let $ = cheerio.load(response.data);

        $("h1 a").each(function(i, element) {

            let result = {};

            result.title = $(this).text();
            result.link = $(this).attr("href");
            result.favorite = false;

            db.Article.create(result)
                .then(function(dbArticles) {
                    console.log(dbArticles);
                })
                // .catch(function(err) {
                //     res.json(err);
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
        // .catch(function(err) {
                //     res.json(err);
                // });
});

// Route for a single Article in database, populate associated notes
app.get("/articles/:id", function(req, res) {
    db.Article.findOne({_id: req.params.id})
        .populate("note")
        .then(function(dbArticle) {
            console.log(dbArticle);
            res.json(dbArticle);
        })
        // .catch(function(err) {
                //     res.json(err);
                // });
});

// Route to update single Article in database to a favorite
app.post("/articles/:id", function(req, res) {
    db.Article.findOneAndUpdate({ _id: req.params.id }, { favorite: true })
        .then(function(dbArticle) {
            res.json(dbArticle);
        })
        // .catch(function(err) {
                //     res.json(err);
                // });
})

// Listen
app.listen(PORT, function() {
    console.log("App is running on Port " + PORT + "!");
});


//=================================================================================
//=================================================================================
// Saving old routes in case I want to implement them in the future...
//=================================================================================
//=================================================================================
// // Sports
// app.get("/sports", function(req, res) {
//     request("http://sports.theonion.com", function(error, response, html) {

//         let $ = cheerio.load(html);

//         $("h1.headline").each(function(i, element) {

//             let text = $(element).text();
//             let link = $(element).children().attr("href");
//             let topic = "Sports";
            
//             db.scrapedData.insert({text: text, link: link, topic: topic}, function(err, data) {
                
//                 if (err) {
//                     console.log(err);
//                 }
//                 else {
//                     console.log("Scraped!")
//                 }

//             })

//         })

//     })
//     res.send("Done scraping Sports!")
// })

// // Local
// app.get("/local", function(req, res) {
//     request("http://local.theonion.com", function(error, response, html) {

//         let $ = cheerio.load(html);

//         $("h1.headline").each(function(i, element) {

//             let text = $(element).text();
//             let link = $(element).children().attr("href");
//             let topic = "Local";

//             db.scrapedData.insert({text: text, link: link, topic: topic}, function(err, data) {

//                 if (err) {
//                     console.log(err);
//                 }
//                 else {
//                     console.log("Scraped!");
//                 }
//             })
//         })
//     })
//     res.send("Done scraping Local!");
// })

// // Politics
// app.get("/politics", function(req, res) {
//     request("http://politics.theonion.com", function(error, response, html) {

//         let $ = cheerio.load(html);

//         $("h1.headline").each(function(i, element) {

//             let text = $(element).text();
//             let link = $(element).children().attr("href");
//             let topic = "Politics";

//             db.scrapedData.insert({text: text, link: link, topic: topic}, function(err, data) {

//                 if (err) {
//                     console.log(err);
//                 }
//                 else {
//                     console.log("Scraped!");
//                 }
//             })
//         })
//     })
//     res.send("Done scraping Politics!");
// })

// // Entertainment
// app.get("/entertainment", function(req, res) {
//     request("http://entertainment.theonion.com", function(error, response, html) {

//         let $ = cheerio.load(html);

//         $("h1.headline").each(function(i, element) {

//             let text = $(element).text();
//             let link = $(element).children().attr("href");
//             let topic = "Entertainment";

//             db.scrapedData.insert({text: text, link: link, topic: topic}, function(err, data) {

//                 if (err) {
//                     console.log(err);
//                 }
//                 else {
//                     console.log("Scraped!");
//                 }
//             })
//         })
//     })
//     res.send("Done scraping Entertainment!");
// })