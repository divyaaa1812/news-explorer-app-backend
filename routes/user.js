const express = require("express");
const { getCurrentUser } = require("../controllers/user");
const handleAuthorization = require("../middlewares/auth");

const router = express.Router();

router.get("/me", handleAuthorization, getCurrentUser);

module.exports = router;
