const { Router } = require("express");
const genreRouter = Router();

const Genre = require("./model");
const { addGenre, getAllGenres, getGenresAndBooks } = require("./controllers");

genreRouter.post("/", addGenre);

genreRouter.get("/", getAllGenres);

genreRouter.get("/:genreTwo", getGenresAndBooks);

module.exports = genreRouter;
