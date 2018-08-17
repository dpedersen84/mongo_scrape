const router = require("express").Router();
const articleRoutes = require("./articles.js");
const favoriteRoutes = require("./favorites.js");
const noteRoutes = require("./notes.js");

// Image routing
router.use("/articles", articleRoutes);
router.use("/favorites", favoriteRoutes);
router.use("/notes", noteRoutes);

module.exports = router;