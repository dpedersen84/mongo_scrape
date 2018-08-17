db = require("../models");

module.exports = {

    deleteNote: (req, res) => {
        db.Note
            .findByIdAndRemove({ _id: req.params.id} )
            .then(dbNote => db.Favorite.findOneAndUpdate({ _id: req.params.id}, {$pull: { _id: dbNote._id }}))
            .then(dbFavorite => res.json(dbFavorite))
            .catch(err => res.json(err))
    }


};