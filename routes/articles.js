const router = require("express").Router();
const {
  addSavedArticle,
  deleteSavedArticle,
  getSavedArticles,
} = require("../controllers/articles");
const handleAuthorization = require("../middlewares/auth");

// router.post("/saved-news", addSavedArticles);
router.post("/", handleAuthorization, addSavedArticle);
router.get("/", getSavedArticles);
router.delete("/:articleId", handleAuthorization, deleteSavedArticle);

module.exports = router;
