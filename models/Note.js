let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let NoteSchema = new Schema({

    body: String,
    date: Date,
    
});

let Note = mongoose.model("Note", NoteSchema);

module.exports = Note;