const DB = require('../db');

/**
 * Get all authors.
 * @param {*} req - Request object.
 * @param {*} res - Response object.
 */
const getAuthors = (req, res) => {
  res.status(200).json(DB.AUTHORS);
};

/**
 * Get a specific author.
 * @param {*} req - Request object.
 * @param {*} res - Response object.
 */
const getAuthor = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const author = DB.AUTHORS.find(author => author.id === id);

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
    id: DB.AUTHORS.length + 1,
    ...req.body
  };

  DB.AUTHORS.push(author);

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
  const foundIndex = DB.AUTHORS.findIndex(author => author.id === id);

  if (foundIndex !== -1) {
    DB.AUTHORS.splice(foundIndex, 1, toUpdate);

    res.status(200).json(DB.AUTHORS[foundIndex]);
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
  const foundIndex = DB.AUTHORS.findIndex(author => author.id === id);

  if (foundIndex !== -1) {
    DB.AUTHORS.splice(foundIndex, 1);

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
