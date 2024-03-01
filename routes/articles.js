const router = require("express").Router();
const { getUserSavedArticles } = require("../controllers/articles");

router.post("/articles", getUserSavedArticles);

module.exports = router;
