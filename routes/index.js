const router = require("express").Router();
const users = require("./user");
const articles = require("./articles");
const { createUser, loginUser } = require("../controllers/user");
const {
  validateUserLogin,
  validateCreateUser,
} = require("../middlewares/validation");

const NotFoundError = require("../errors/notFoundError");
const handleAuthorization = require("../middlewares/auth");

router.use("/users", handleAuthorization, users);
router.use("/articles", articles);

router.post("/signup", validateCreateUser, createUser);
router.post("/signin", validateUserLogin, loginUser);

router.use((req, res, next) => {
  next(new NotFoundError("Resource not found"));
});

module.exports = router;
