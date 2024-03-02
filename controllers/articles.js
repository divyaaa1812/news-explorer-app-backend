const SavedArticle = require("../models/article");
const BadRequestError = require("../errors/badRequestError");

const getUserSavedArticles = (req, res, next) => {
  const { keyword, title, text, date, source, link, image } = req.body;
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
