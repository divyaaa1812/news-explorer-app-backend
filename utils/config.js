const JWT_SECRET =
  process.env.NODE_ENV === "production"
    ? process.env.JWT_SECRET
    : "secret-key-dev";

module.exports = { JWT_SECRET };
