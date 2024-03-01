const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const users = require("../models/user");
const UnauthorizedError = require("../errors/unauthorizedError");
const BadRequestError = require("../errors/badRequestError");
const NotFoundError = require("../errors/notFoundError");
const ConflictError = require("../errors/conflictError");

const createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  users
    .findOne({ email })
    .select("+password")
    .then((existingUser) => {
      if (existingUser) {
        next(new ConflictError("This email already exists in Database"));
      } else {
        bcrypt.hash(password, 10).then((hash) =>
          users
            .create({ name, email, password: hash })
            .then((newUser) => {
              res
                .status(statusCode.SUCCESS)
                .send({ name, email, _id: newUser._id });
            })
            .catch((e) => {
              if (e.name === "ValidationError") {
                next(new BadRequestError(e.message));
              }
              next(e);
            }),
        );
      }
    })
    .catch((e) => {
      if (e.name === "ValidationError") {
        next(new BadRequestError(e.message));
      } else {
        next(e);
      }
    });
};

const getCurrentUser = (req, res, next) => {
  const userId = req.user._id;
  users
    .findById(userId)
    .orFail()
    .then((currentuser) => {
      console.log(currentuser);
      res.send(currentuser);
    })
    .catch((e) => {
      console.log(e);
    });
};

module.exports = {
  getCurrentUser,
  createUser,
};
