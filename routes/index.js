const router = require("express").Router();
const users = require("./user");
const articles = require("./articles");
const { createUser } = require("../controllers/user");
const NotFoundError = require("../errors/notFoundError");

router.post("/signup", createUser);

router.use((req, res, next) => {
  next(new NotFoundError("Resource not found"));
});

module.exports = router;
