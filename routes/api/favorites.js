const express = require("express");
const router = express.Router();
// const articlesController = require("../../controllers/article.ctrl");
const favoritesController = require("../../controllers/favorite.ctrl");

// Match with "/api/favorites"
router.route("/")
    .get(favoritesController.findAll)
    .post(favoritesController.create);

// Match with "/api/favorites/:id"
router.route("/:id")
    .get(favoritesController.findById)
    .put(favoritesController.update)
    .delete(favoritesController.remove)
    .post(favoritesController.saveNote)
    .delete(favoritesController.deleteNote);

    module.exports = router;