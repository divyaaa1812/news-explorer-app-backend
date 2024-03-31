const SavedArticle = require("../models/article");
const BadRequestError = require("../errors/badRequestError");
const ForbiddenError = require("../errors/forbiddenError");
const NotFoundError = require("../errors/notFoundError");
const statusCode = require("../utils/constants");

const addSavedArticle = (req, res, next) => {
  const {
    key,
    keyword,
    title,
    description,
    publishedAt,
    source,
    url,
    urlToImage,
    category,
  } = req.body;
  SavedArticle.create({
    key,
    keyword,
    title,
    description,
    publishedAt,
    source: source.name,
    url,
    urlToImage,
    owner: req.user._id,
    category,
  })
    .then((savednews) => {
      console.log(savednews);
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

const getSavedArticles = (req, res, next) => {
  SavedArticle.find({ owner: req.user._id })
    .then((items) => {
      res.send(items);
    })
    .catch((e) => {
      next(e);
    });
};

const deleteSavedArticle = (req, res, next) => {
  const { articleId: key } = req.params;
  SavedArticle.findOneAndDelete({ key })
    .then(() => {
      res.status(statusCode.SUCCESS).send({ message: "200 Ok" });
    })
    .catch((e) => {
      if (e.name === "DocumentNotFoundError") {
        next(new NotFoundError("Not Found"));
      } else if (e.name === "CastError") {
        next(new BadRequestError("CastError"));
      } else {
        next(e);
      }
    });
};

module.exports = { addSavedArticle, getSavedArticles, deleteSavedArticle };
