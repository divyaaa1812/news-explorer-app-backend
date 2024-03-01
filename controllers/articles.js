const articles = require("../routes/articles");
const SavedArticle = require("../models/article");
const BadRequestError = require("../errors/badRequestError");
const NotFoundError = require("../errors/notFoundError");
const ForbiddenError = require("../errors/forbiddenError");

const getUserSavedArticles = (req, res, next) => {
  SavedArticle.create({ keyword, title, text, date, source, link, image })
    .then((savednews) => {
      res.send({ data: savednews });
    })
    .catch((e) => {
      if (e.name === "ValidationError") {
        next(new BadRequestError("Invalid request data"));
      } else {
        next(e);
      }
    });
};

module.exports = { getUserSavedArticles };
