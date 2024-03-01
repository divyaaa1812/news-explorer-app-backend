const express = require("express");
const { createUser, getCurrentUser } = require("../controllers/user");
const { getUserSavedArticles } = require("../controllers/articles");

const router = express.Router();

router.post("/", createUser);
router.get("/users/me", getCurrentUser);
router.get("/articles", getUserSavedArticles);

module.exports = router;
