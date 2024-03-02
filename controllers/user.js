const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Users = require("../models/user");
const BadRequestError = require("../errors/badRequestError");
const ConflictError = require("../errors/conflictError");
const UnauthorizedError = require("../errors/unauthorizedError");
const { JWT_SECRET } = require("../utils/config");

const createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  Users.findOne({ email })
    .select("+password")
    .then((existingUser) => {
      if (existingUser) {
        next(new ConflictError("This email already exists in Database"));
      } else {
        console.log(password);
        bcrypt.hash(password, 10).then((hash) =>
          Users.create({ name, email, password: hash })
            .then((newUser) => {
              res.status(200).send({ name, email, _id: newUser._id });
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

const login = (req, res, next) => {
  const { email, password } = req.body;
  return Users.findUserByCredentials(email, password)
    .then((registereduser) => {
      // create a token
      const token = jwt.sign({ _id: registereduser._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
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
  Users.findById(userId)
    .then((currentuser) => {
      console.log(currentuser);
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
  login,
};
