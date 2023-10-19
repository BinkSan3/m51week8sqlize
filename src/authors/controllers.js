const Author = require("./model");
const Book = require("../books/model");

const addAuthor = async (req, res) => {
  const newAuthor = await Author.create({
    authorName: req.body.authorName,
  });
  const successResponse = {
    message: "success",
    newAuthor,
  };
  res.send(successResponse);
};

const findAuthorByNameAndAllBooks = async (req, res) => {
  const foundAuthor = await Author.findAll({
    where: {
      authorName: req.params.authorName,
    },
  });
  const findBooksByAuthor = await Book.findAll({
    where: {
      author: req.params.authorName,
    },
  });
  const successResponse = {
    message: "success",
    author: foundAuthor,
    findBooksByAuthor,
  };
  res.send(successResponse);
};

module.exports = { addAuthor, findAuthorByNameAndAllBooks };
