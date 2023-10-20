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
  getBookAndAuthor,
  updateMultiple,
} = require("./controllers");

bookRouter.post("/", addBook);
bookRouter.get("/titleTwo/:titleTwo", getBookAndAuthor);

bookRouter.get("/", findAllBooks);

bookRouter.put("/update", updateMultiple);

// bookRouter.get("/:author", findBookByAuthor);

bookRouter.put("/:title", updateBookDynamic);

bookRouter.delete("/delete", deleteByTitle);

bookRouter.delete("/deleteAll", deleteAll);

// bookRouter.get("/titleTwo/:titleTwo", getBookAndAuthor);

module.exports = bookRouter;
