const { JWT_SECRET_PROD } = process.env;

const JWT_SECRET =
  process.env.NODE_ENV === "production" ? JWT_SECRET_PROD : "Secret-Dev-key";

module.exports = { JWT_SECRET };
