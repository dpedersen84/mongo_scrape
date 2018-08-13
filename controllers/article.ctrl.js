const db = require("../models");

module.exports = {
    
    findAll: (req, res) => {
        db.Article
            .find({})
            .then(dbArticles => res.json(dbArticles))
            .catch(err => res.json(err))
    },

    findById: (req, res) => {
        db.Article
            .findOne({_id: req.params.id})
            .populate("note")
            .then(dbArticle => {console.log(dbArticle), res.json(dbArticle)})
            .catch(err => res.json(err))
    },

    create: (req, res) => {
        db.Article
            .create(result)
            .then(dbArticles => {console.log(dbArticles), res.json(dbArticles)})
            .catch(err => res.json(err))
    },

    update: (req, res) => {
        db.Article
            .findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(dbArticle => res.json(dbArticle))
            .catch(err => res.json(err))
    },

    remove: (req, res) => {
        db.Article
            .findById({ _id: req.params.id })
            .then(dbArticle => dbArticle.remove())
            .then(dbArticle => res.json(dbArticle))
            .catch(err => res.json(err))
    },

    saveNote: (req, res) => {
        db.Note
            .create(req.body) 
            .then(dbNote => db.Article.findOneAndUpdate({ _id: req.params.id}, {note: dbNote._id}, {new: true }))
            .then(dbArticle => res.json(dbArticle))
            .catch(err => res.json(err))
    },

    deleteNote: (req, res) => {
        db.Note
            .findByIdAndRemove({ _id: req.params.id} )
            .then(dbArticle => res.json(dbArticle))
            .catch(err => res.json(err))
    }
};