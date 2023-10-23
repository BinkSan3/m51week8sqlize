const Book = require("./model");
const Author = require("../authors/model");
const Genre = require("../genres/model");
const { Sequelize } = require("sequelize");

const addBook = async (req, res) => {
  try {
    const newBook = await Book.create(req.body);
    console.log(newBook);

    res.status(201).json({ message: "success", newBook });
  } catch (error) {
    if (error.name === "sequelizeUniqueConstraintError") {
      res.stats(412).json({ message: error.message, error });
    }
    res.status(500).json({ message: error.message, error });
  }
};

const findAllBooks = async (req, res) => {
  try {
    const findBooks = await Book.findAll();
    if (findBooks.length >= 1) {
      res.status(200).json({ message: "success", findBooks });
      return;
    }

    res.status(404).json({ message: "failure" });
  } catch (error) {
    res.status(500).json({ message: error.message, error });
  }
};

const findBookByAuthor = async (req, res) => {
  const findBook = await Book.findAll({
    where: {
      author: req.params.author,
    },
  });
  const successResponse = {
    message: "success",
    findBook: findBook,
  };
  res.send(successResponse);
};

const updateBookDynamic = async (req, res) => {
  const updateBookDynamically = await Book.update(
    {
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
    },
    {
      where: {
        title: req.params.title,
      },
    }
  );

  const successResponse = {
    message: "success",
    updateBookDynamically: updateBookDynamically,
  };
  res.send(successResponse);
};

const deleteByTitle = async (req, res) => {
  const deleteThisBook = await Book.destroy({
    where: {
      title: req.body.title,
    },
  });

  const successResponse = {
    message: "success",
    deleteThisBook,
  };
  res.send(successResponse);
};

const deleteAll = async (req, res) => {
  const destroyAll = await Book.destroy({
    truncate: true,
  });

  const successResponse = {
    message: "success",
    destroyAll,
  };
  res.send(successResponse);
};

const getBookAndAuthor = async (req, res) => {
  try {
    const book = await Book.findOne({
      where: { title: req.params.titleTwo },
    });

    const author = await book.getAuthor();
    book.dataValues.author = author.dataValues;

    const genre = await book.getGenre();
    book.dataValues.genre = genre.dataValues;

    res.status(200).json({ message: "success", book });
  } catch (error) {
    res.status(500).json({ message: error.message, error });
  }
};

const updateMultiple = async (req, res) => {
  try {
    const booksToUpdate = await Book.findAll();
    console.log(booksToUpdate);
    for (const book of booksToUpdate) {
      const genreRecord = await Genre.findOne({
        where: {
          genre: book.genre,
        },
      });

      if (genreRecord) {
        const updated = await Book.update(
          { GenreId: genreRecord.id },
          {
            where: { title: book.title },
          }
        );
      }
    }

    const checkBooks = await Book.findAll();
    console.log(`Updated ${booksToUpdate.length} records.`);

    res.status(200).json({ message: "success", checkBooks });
  } catch (error) {
    res.status(500).json({ message: error.message, error });
  }
};

module.exports = {
  addBook,
  findAllBooks,
  findBookByAuthor,
  updateBookDynamic,
  deleteByTitle,
  deleteAll,
  getBookAndAuthor,
  updateMultiple,
};
