let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let ArticleSchema = new Schema({

    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    favorite: {
        type: Boolean,
    },
    image: {
        type: String
    }
});

let Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;