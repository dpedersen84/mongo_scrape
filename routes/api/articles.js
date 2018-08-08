const express = require("express");
const router = express.Router();
const Article = require("../../models/Article");
const Note = require("../../models/Note");
const axios = require("axios");
const cheerio = require("cheerio");

// Main scrape route
router.get("/scrape", (req, res) => {
    axios.get("http://www.theonion.com").then((response) => {
        
        let $ = cheerio.load(response.data);

        $("h1 a").each(function(i, element) {

            let result = {};

            result.title = $(this).text();
            result.link = $(this).attr("href");
            result.favorite = false;
            result.image = $("picture").children("img").attr("src");
            result.date = Date.now();

            Article.create(result)
                .then((dbArticles) => {
                    console.log(dbArticles);
                })
                .catch(function(err) {
                    res.json(err);
                });
            
        });
        res.send("Done scraping The Onion!");
    });
});

// Route for all Articles in database
router.get("/", (req, res) => {
    Article
        .find({})
        .then(dbArticles => {
            res.json(dbArticles);
        })
        .catch(err => {
            res.json(err);
        });
});

// Route for a single Article in database, populate associated notes
router.get("/:id", (req, res) => {
    Article.findOne({_id: req.params.id})
        .populate("note")
        .then(dbArticle => {
            console.log(dbArticle);
            res.json(dbArticle);
        })
        .catch(err => {
            res.json(err);
        });
});

// Route to update single Article in database to a favorite
// this does not work if it is a put
router.put("/:id", (req, res) => {
    console.log("add favorite");
    Article.findByIdAndUpdate({ _id: req.params.id }, { favorite: true })
        .then(dbArticle => {
            res.json(dbArticle);
        })
        .catch(err => {
            res.json(err);
        });
})

// Route to remove single Article in database from favorites
router.put("/:id", (req, res) => {
    console.log("remove favorite");
    Article.findByIdAndUpdate({ _id: req.params.id }, { favorite: false })
        .then(dbArticle => {
            res.json(dbArticle);
        })
        .catch(err => {
            res.json(err);
        });
})

// Route to save/update an Article's note
router.post("/:id", (req, res) => {
    console.log("create new note");

    Note.create(req.body)
        .then(dbNote => {
            return db.Article.findOneAndUpdate({_id: req.params.id}, {note: dbNote._id}, {new: true});
        })
        .then(dbArticle => {
            res.json(dbArticle);
        })
        .catch(err => {
            res.json(err);
        });
})

// Route to delete note from Article
router.delete("/:id", (req, res) => {
    Note.findByIdAndRemove({_id: req.params.id})
    .then(dbArticle => {
        res.json(dbArticle);
    })
    .catch(err => {
        res.json(err);
    });
})

// Route to favorites page
router.get("/favorites", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/favorites.html"));
})

module.exports = router;