const mongoose = require("mongoose");
const validator = require("validator");

const newsArticles = new mongoose.Schema({
  keyword: {
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  publishedAt: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isURL(value),
      message: "Link is not valid",
    },
  },
  urlToImage: {
    type: String,
  },
  owner: {
    required: true,
    type: mongoose.ObjectId,
    ref: "user",
    default: "hidden",
  },
});

module.exports = mongoose.model("newsitems", newsArticles);
