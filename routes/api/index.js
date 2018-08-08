const router = require("express").Router();
const articleRoutes = require("./articles.js");

// Image routing
router.use("/articles", articleRoutes);

module.exports = router;