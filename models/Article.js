let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let ArticleSchema = new Schema({

    title: {
        type: String,
        unique: true,
        required: true
    },
    link: {
        type: String,
        unique: true,
        required: true
    },
    image: {
        type: String
    },
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    },
    date: {
        type: Date,
    }
});

let Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;