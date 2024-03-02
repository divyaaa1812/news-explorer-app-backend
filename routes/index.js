const router = require("express").Router();
const users = require("./user");
const articles = require("./articles");
const { createUser, getCurrentUser } = require("../controllers/user");
const { getUserSavedArticles } = require("../controllers/articles");
const NotFoundError = require("../errors/notFoundError");

router.post("/signup", createUser);
router.get("/users/me", getCurrentUser);

router.post("/saved-news", getUserSavedArticles);

router.use((req, res, next) => {
  next(new NotFoundError("Resource not found"));
});

module.exports = router;
