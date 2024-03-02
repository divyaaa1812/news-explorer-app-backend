const router = require("express").Router();
const { getUserSavedArticles } = require("../controllers/articles");

router.post("/saved-news", getUserSavedArticles);

module.exports = router;
