const router = require("express").Router();
const articleRoutes = require("./articles.js");
const favoriteRoutes = require("./favorites.js");

// Image routing
router.use("/articles", articleRoutes);
router.use("/favorites", favoriteRoutes);

module.exports = router;