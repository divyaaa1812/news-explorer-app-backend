const express = require("express");
const { createUser, getCurrentUser } = require("../controllers/user");

const router = express.Router();

// router.post("/signup", createUser);
// router.get("/users/me", getCurrentUser);

module.exports = router;
