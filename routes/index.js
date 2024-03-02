const router = require("express").Router();
const users = require("./user");
const articles = require("./articles");
const { createUser, loginUser } = require("../controllers/user");

const NotFoundError = require("../errors/notFoundError");
const handleAuthorization = require("../middlewares/auth");

router.use("/users", handleAuthorization, users);
router.use("/articles", articles);

router.post("/signup", createUser);
router.post("/signin", loginUser);

router.use((req, res, next) => {
  next(new NotFoundError("Resource not found"));
});

module.exports = router;
