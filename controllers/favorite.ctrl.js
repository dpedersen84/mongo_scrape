const db = require("../models");

module.exports = {
    
    findAll: (req, res) => {
        db.Favorite
            .find({})
            .then(dbFavorites => res.json(dbFavorites))
            .catch(err => res.json(err))
    },

    findById: (req, res) => {
        db.Favorite
            .findOne({_id: req.params.id})
            .populate("note")
            .then(dbFavorite => {console.log(dbFavorite), res.json(dbFavorite)})
            .catch(err => res.json(err))
    },

    create: (req, res) => {
        db.Favorite
            .create(req.body)
            .then(dbFavorites => {console.log(dbFavorites), res.json(dbFavorites)})
            .catch(err => res.json(err))
    },

    update: (req, res) => {
        db.Favorite
            .findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(dbFavorite => res.json(dbFavorite))
            .catch(err => res.json(err))
    },

    remove: (req, res) => {
        db.Favorite
            .findById({ _id: req.params.id })
            .then(dbFavorite => dbFavorite.remove())
            .then(dbFavorite => res.json(dbFavorite))
            .catch(err => res.json(err))
    },

    saveNote: (req, res) => {
        db.Note
            .create(req.body) 
            .then(dbNote => db.Favorite.findOneAndUpdate({ _id: req.params.id}, {note: dbNote._id}, {new: true }))
            .then(dbFavorite => res.json(dbFavorite))
            .catch(err => res.json(err))
    },

    deleteNote: (req, res) => {
        db.Note
            .findByIdAndRemove({ _id: req.params.id} )
            .then(dbFavorite => res.json(dbFavorite))
            .catch(err => res.json(err))
    }
};