const Author = require("./model");
const Book = require("../books/model");
const Genre = require("../genres/model");

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

const getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.findAll();

    res.status(200).json({ message: "success", authors });
  } catch (error) {
    res.status(500).json({ message: error.message, error });
  }
};

const getAuthorAndBooks = async (req, res) => {
  try {
    const author = await Author.findOne({
      where: { authorName: req.params.authorNameTwo },
      include: Book,
    });
    console.log(author.Books);
    const genresArray = author.Books;
    for (let i = 0; i < genresArray.length; i++) {
      // console.log(genresArray[i]);
      // genresArray[i].dataValues.genre = (
      //   await Genre.findOne({
      //     where: { id: genresArray[i].dataValues.GenreId },
      //   })
      // ).genre;
      const genre = await Genre.findOne({
        where: { id: genresArray[i].dataValues.GenreId },
      });
      // genresArray[i].dataValues.newGenre = genre.dataValues.genre;
      // console.log(genre);
    }

    res.status(200).json({ message: "success", author });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message, error });
  }
};

module.exports = {
  addAuthor,
  findAuthorByNameAndAllBooks,
  getAllAuthors,
  getAuthorAndBooks,
};
