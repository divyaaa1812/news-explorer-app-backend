const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const UnauthorizedError = require("../errors/unauthorizedError");

const handleAuthorization = (req, res, next) => {
  // get authorization from the header
  const { authorization } = req.headers;

  // check the header exists and starts with 'Bearer '
  if (!authorization || !authorization.startsWith("Bearer ")) {
    next(new UnauthorizedError("authorization error"));
  }
  // get token
  const token = authorization.replace("Bearer ", "");
  let payload;
  try {
    payload = jwt.verify(
      token,
      process.env.NODE_ENV === "production" ? JWT_SECRET : "secret-key-dev",
    );
  } catch {
    next(new UnauthorizedError("authorization error"));
  }
  req.user = payload;

  res.header("Access-Control-Allow-Origin", "*");
  next();
};

module.exports = handleAuthorization;
