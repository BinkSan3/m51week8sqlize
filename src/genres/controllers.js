const Genre = require("./model");
const Book = require("../books/model");

const addGenre = async (req, res) => {
  try {
    const newGenre = await Genre.create(req.body);
    console.log(newGenre);

    res.status(201).json({ message: "success", newGenre });
  } catch (error) {
    if (error.name === "sequelizeUniqueConstraintError") {
      res.stats(412).json({ message: error.message, error });
    }
    res.status(500).json({ message: error.message, error });
  }
};

const getAllGenres = async (req, res) => {
  try {
    const genres = await Genre.findAll();

    res.status(200).json({ message: "success", genres });
  } catch (error) {
    res.status(500).json({ message: error.message, error });
  }
};

const getGenresAndBooks = async (req, res) => {
  try {
    const genre = await Genre.findOne({
      where: { genre: req.params.genreTwo },
      include: Book,
    });

    res.status(200).json({ message: "success", genre });
  } catch (error) {
    res.status(500).json({ message: error.message, error });
  }
};

module.exports = { addGenre, getAllGenres, getGenresAndBooks };
