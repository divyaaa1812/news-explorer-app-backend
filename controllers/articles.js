const SavedArticle = require("../models/article");
const BadRequestError = require("../errors/badRequestError");

const addSavedArticles = (req, res, next) => {
  const { keyword, title, text, date, source, link, image, owner } = req.body;
  SavedArticle.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: req.user._id,
  })
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

const deleteSavedArticle = (req, res, next) => {
  const { articleId } = req.params;
  const userId = req.user._id;
  SavedArticle.findById(articleId)
    .orFail()
    .then((item) => {
      // If logged in user is not owner of the item
      if (userId !== item.owner.toString()) {
        next(new ForbiddenError("No Access to perform this action"));
      }
      // else find by item id and delete
      return SavedArticle.findByIdAndDelete(articleId)
        .orFail()
        .then(() => {
          res.status(200).send({ message: "200 Ok" });
        });
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
module.exports = { addSavedArticles, deleteSavedArticle };
