const db = require('../db.json');

/**
 * Get all authors.
 * @param {*} req - Request object.
 * @param {*} res - Response object.
 */
const getAuthors = (req, res) => {
  res.status(200).json(db.authors);
};

/**
 * Get a specific author.
 * @param {*} req - Request object.
 * @param {*} res - Response object.
 */
const getAuthor = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const author = db.authors.find(author => author.id === id);

  if (author) {
    res.status(200).json(author);
  } else {
    res.status(404).json({ message: `No author found for the given author id: ${id}.` });
  }
};

/**
 * Create a new author.
 * @param {*} req - Request object.
 * @param {*} res - Response object.
 */
const createAuthor = (req, res) => {
  const author = {
    id: db.authors.length + 1,
    ...req.body
  };

  db.authors.push(author);

  res.status(201).json(author);
};

/**
 * Update a specific author.
 * @param {*} req - Request object.
 * @param {*} res - Response object.
 */
const updateAuthor = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const toUpdate = {
    id,
    ...req.body
  };
  const foundIndex = db.authors.findIndex(author => author.id === id);

  if (foundIndex !== -1) {
    db.authors.splice(foundIndex, 1, toUpdate);

    res.status(200).json(db.authors[foundIndex]);
  } else {
    res.status(404).json({ message: `No author found for the given author id: ${id}.`})
  }
};

/**
 * Delete a specific author.
 * @param {*} req - Request object.
 * @param {*} res - Response object.
 */
const deleteAuthor = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const foundIndex = db.authors.findIndex(author => author.id === id);

  if (foundIndex !== -1) {
    db.authors.splice(foundIndex, 1);

    res.sendStatus(204);
  } else {
    res.status(404).json({ message: `No author found for the given author id: ${id}.`})
  }
};

module.exports = {
  getAuthors,
  getAuthor,
  createAuthor,
  updateAuthor,
  deleteAuthor
};
