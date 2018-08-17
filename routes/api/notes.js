const express = require("express");
const router = express.Router();

const notesController = require("../../controllers/note.ctrl");

// Match with "/api/notes/:id"
router.route("/:id")
    .delete(notesController.deleteNote)

module.exports = router;