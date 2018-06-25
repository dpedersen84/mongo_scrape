const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
const cheerio = require("cheerio");
const axios = require("axios");

// Enable Express
const app = express();

let db = require("./models");

let PORT = 8080;

// Configure middleware
// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// Connect to Mongo DB
mongoose.connect("mongodb://localhost/mongo_scrape");

// Handlebars
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes
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

// Route for favorite articles in database
app.get("/articles/favorites", function(req, res) {
    db.Article.find({favorite: true})
        .then(function(dbArticle) {
            console.log(dbArticle);
            res.json(dbArticle);
        })
        // .catch(function(err) {
                //     res.json(err);
                // });
});

// Route for a single favorite Article in database, populate associated notes
app.get("/articles/favorites/:id", function(req, res) {
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
app.put("/articles/:id", function(req, res) {
    console.log("add favorite");
    db.Article.findByIdAndUpdate({ _id: req.params.id }, { favorite: true })
        .then(function(dbArticle) {
            res.json(dbArticle);
        })
        // .catch(function(err) {
                //     res.json(err);
                // });
})

// Route to remove single Article in database from favorites
app.put("/articles/favorites/:id", function(req, res) {
    console.log("remove favorite");
    db.Article.findByIdAndUpdate({ _id: req.params.id}, { favorite: false})
        .then(function(dbArticle) {
            res.json(dbArticle);
        })
        // .catch(function(err) {
                //     res.json(err);
                // });
})

// Route to save/update an Article's note
app.post("/articles/favorites/:id", function(req, res) {
    console.log("create new note");

    db.Note.create(req.body)
        .then(function(dbNote) {
            return db.Article.findOneAndUpdate({_id: req.params.id}, {note: dbNote._id}, {new: true});
        })
        .then(function(dbArticle) {
            res.json(dbArticle);
        })
        // .catch(function(err) {
                //     res.json(err);
                // });
})

// Route to delete note from Article
app.delete("/articles/favorites/:id", function(req, res) {
    db.Note.findByIdAndRemove({_id: req.params.id})
    .then(function(dbArticle) {
        res.json(dbArticle);
    })
    // .catch(function(err) {
                //     res.json(err);
                // });
})

// Route to favorites page
app.get("/favorites", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/favorites.html"));
})

// Listen
app.listen(PORT, function() {
    console.log("App is running on Port " + PORT + "!");
});