const { Router } = require("express");
const authorRouter = Router();

const Author = require("./model");
const Book = require("../books/model");

const { addAuthor, findAuthorByNameAndAllBooks } = require("./controllers");

authorRouter.post("/", addAuthor);

authorRouter.get("/:authorName", findAuthorByNameAndAllBooks);

module.exports = authorRouter;
