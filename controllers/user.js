const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Users = require("../models/user");
const BadRequestError = require("../errors/badRequestError");
const ConflictError = require("../errors/conflictError");
const UnauthorizedError = require("../errors/unauthorizedError");
const NotFoundError = require("../errors/notFoundError");
const { JWT_SECRET } = require("../utils/config");
const statusCode = require("../utils/constants");

const createUser = (req, res, next) => {
  const {
    username = "test20005",
    email = "test2005@gmail.com",
    password = "1234567890",
  } = req.body;
  console.log(req.body);
  return Users.findOne({ email })
    .select("+password")
    .then((existingUser) => {
      if (existingUser) {
        next(new ConflictError("This email already exists in Database"));
      } else {
        console.log("encoding password");
        bcrypt.hash(password, 10).then((hash) =>
          Users.create({ username, email, password: hash })
            .then((newUser) => {
              res
                .status(statusCode.SUCCESS)
                .send({ username, email, _id: newUser._id });
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

const loginUser = (req, res, next) => {
  const { email, password } = req.body;
  return Users.findUserByCredentials(email, password)
    .then((registereduser) => {
      // create a token
      const token = jwt.sign(
        { _id: registereduser._id },
        process.env.NODE_ENV === "production" ? JWT_SECRET : "secret-key-dev",
        {
          expiresIn: "7d",
        },
      );
      res.status(201).send({ token });
    })
    .catch((e) => {
      if (e.message === "Incorrect email or password") {
        next(new UnauthorizedError("Invalid login"));
      } else {
        next(e);
      }
    });
};

const getCurrentUser = (req, res, next) => {
  const userId = req.user._id;
  console.log(userId);
  return Users.findById(userId)
    .then((currentuser) => {
      res.send(currentuser);
    })
    .catch((e) => {
      if (e.name === "DocumentNotFoundError") {
        next(new NotFoundError("User not found"));
      } else if (e.name === "CastError") {
        next(new BadRequestError("Invalid request"));
      } else {
        next(e);
      }
    });
};

module.exports = {
  getCurrentUser,
  createUser,
  loginUser,
};
