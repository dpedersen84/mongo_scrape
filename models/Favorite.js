let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let FavoriteSchema = new Schema({

    title: {
        type: String,
        unique: true,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    }
});

let Favorite = mongoose.model("Favorite", FavoriteSchema);

module.exports = Favorite;