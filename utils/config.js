const JWT_SECRET =
  process.env.NODE_ENV === "production"
    ? process.env.JWT_SECRET
    : "Secret-Dev-key";

module.exports = { JWT_SECRET };
