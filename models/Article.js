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

    }
});

let Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;