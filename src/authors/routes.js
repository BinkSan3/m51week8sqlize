const { Router } = require("express");
const authorRouter = Router();

const Author = require("./model");
const Book = require("../books/model");

const {
  addAuthor,
  findAuthorByNameAndAllBooks,
  getAllAuthors,
  getAuthorAndBooks,
} = require("./controllers");

authorRouter.post("/", addAuthor);

authorRouter.get("/:authorName", findAuthorByNameAndAllBooks);

authorRouter.get("/", getAllAuthors);

authorRouter.get("/authorNameTwo/:authorNameTwo", getAuthorAndBooks);

module.exports = authorRouter;
