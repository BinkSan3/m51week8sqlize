const { Router } = require("express");
const bookRouter = Router();

const Book = require("./model");
const {
  addBook,
  findAllBooks,
  findBookByAuthor,
  updateBookDynamic,
  deleteByTitle,
  deleteAll,
} = require("./controllers");

bookRouter.post("/", addBook);

bookRouter.get("/", findAllBooks);

bookRouter.get("/:author", findBookByAuthor);

bookRouter.put("/:title", updateBookDynamic);

bookRouter.delete("/delete", deleteByTitle);

bookRouter.delete("/deleteAll", deleteAll);

module.exports = bookRouter;
