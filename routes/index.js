const router = require("express").Router();
const users = require("./user");
const articles = require("./articles");
const { createUser, getCurrentUser, login } = require("../controllers/user");
const {
  addSavedArticles,
  deleteSavedArticle,
} = require("../controllers/articles");
const NotFoundError = require("../errors/notFoundError");
const handleAuthorization = require("../middlewares/auth");

router.post("/signup", createUser);
router.get("/users/me", handleAuthorization, getCurrentUser);
router.post("/signin", login);

router.post("/saved-news", handleAuthorization, addSavedArticles);
router.delete("/articles/:articleId", handleAuthorization, deleteSavedArticle);

router.use((req, res, next) => {
  next(new NotFoundError("Resource not found"));
});

module.exports = router;
