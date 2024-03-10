const { JWT = "secret-dev-key", JWTProd } = process.env;

const JWT_SECRET = process.env.NODE_ENV === "production" ? JWTProd : JWT;

module.exports = { JWT_SECRET };
