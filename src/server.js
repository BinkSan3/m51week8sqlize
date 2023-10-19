require("dotenv").config();
const express = require("express");

const Book = require("./books/model");
const Author = require("./authors/model");

const port = process.env.PORT || 5001;

const bookRouter = require("./books/routes");
const authorRouter = require("./authors/routes");

const app = express();

app.use(express.json());

app.use("/books", bookRouter);
app.use("/authors", authorRouter);

const syncTables = async () => {
  await Author.hasMany(Book);
  await Book.belongsTo(Author);

  await Book.sync();
  await Author.sync();
};

app.get("/health", (req, res) => {
  res.status(200).json({ message: "API is healthy" });
});

app.listen(port, () => {
  syncTables();
  console.log("Server is listening");
});
