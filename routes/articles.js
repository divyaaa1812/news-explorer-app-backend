const router = require("express").Router();
const {
  addSavedArticle,
  deleteSavedArticle,
  getSavedArticles,
} = require("../controllers/articles");
const handleAuthorization = require("../middlewares/auth");
const { validateSavedArticle } = require("../middlewares/validation");

// router.post("/saved-news", addSavedArticles);
router.post("/", handleAuthorization, validateSavedArticle, addSavedArticle);
router.get("/", handleAuthorization, getSavedArticles);
router.delete("/:articleId", handleAuthorization, deleteSavedArticle);

module.exports = router;
