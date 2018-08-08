const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const routes = require("./routes");
const path = require("path");
const cheerio = require("cheerio");
const axios = require("axios");

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
mongoose.connect("mongodb://localhost:27017/mongo_scrape" , { useNewUrlParser: true });

// Routes
app.use(routes);
// // Main scrape route
// app.get("/scrape", (req, res) => {
//     axios.get("http://www.theonion.com").then((response) => {
        
//         let $ = cheerio.load(response.data);

//         $("h1 a").each(function(i, element) {

//             let result = {};

//             result.title = $(this).text();
//             result.link = $(this).attr("href");
//             result.favorite = false;
//             result.image = $("picture").children("img").attr("src");
//             result.date = Date.now();

//             db.Article.create(result)
//                 .then((dbArticles) => {
//                     console.log(dbArticles);
//                 })
//                 .catch(function(err) {
//                     res.json(err);
//                 });
            
//         });
//         res.send("Done scraping The Onion!");
//     });
// });

// // Route for all Articles in database
// app.get("/articles", (req, res) => {
//     db.Article
//         .find({})
//         .then(dbArticles => {
//             res.json(dbArticles);
//         })
//         .catch(err => {
//             res.json(err);
//         });
// });

// // Route for a single Article in database, populate associated notes
// app.get("/articles/:id", (req, res) => {
//     db.Article.findOne({_id: req.params.id})
//         .populate("note")
//         .then(dbArticle => {
//             console.log(dbArticle);
//             res.json(dbArticle);
//         })
//         .catch(err => {
//             res.json(err);
//         });
// });

// // Route to update single Article in database to a favorite
// // this does not work if it is a put
// app.put("/articles/:id", (req, res) => {
//     console.log("add favorite");
//     db.Article.findByIdAndUpdate({ _id: req.params.id }, { favorite: true })
//         .then(dbArticle => {
//             res.json(dbArticle);
//         })
//         .catch(err => {
//             res.json(err);
//         });
// })

// // Route to remove single Article in database from favorites
// app.put("/articles/:id", (req, res) => {
//     console.log("remove favorite");
//     db.Article.findByIdAndUpdate({ _id: req.params.id }, { favorite: false })
//         .then(dbArticle => {
//             res.json(dbArticle);
//         })
//         .catch(err => {
//             res.json(err);
//         });
// })

// // Route to save/update an Article's note
// app.post("/articles/:id", (req, res) => {
//     console.log("create new note");

//     db.Note.create(req.body)
//         .then(dbNote => {
//             return db.Article.findOneAndUpdate({_id: req.params.id}, {note: dbNote._id}, {new: true});
//         })
//         .then(dbArticle => {
//             res.json(dbArticle);
//         })
//         .catch(err => {
//             res.json(err);
//         });
// })

// // Route to delete note from Article
// app.delete("/articles/:id", (req, res) => {
//     db.Note.findByIdAndRemove({_id: req.params.id})
//     .then(dbArticle => {
//         res.json(dbArticle);
//     })
//     .catch(err => {
//         res.json(err);
//     });
// })

// // Route to favorites page
// app.get("/favorites", (req, res) => {
//     res.sendFile(path.join(__dirname, "/public/favorites.html"));
// })

// Listen
app.listen(PORT, () => {
    console.log("App is running on Port " + PORT + "!");
});