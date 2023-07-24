const db = require('../db.json');

/**
 * Get all the sessions.
 * @param {*} req - Request object.
 * @param {*} res - Response object.
 */
const getSessions = (req, res) => {
  res.status(200).json(db.sessions);
};

/**
 * Get a specific session.
 * @param {*} req - Request object.
 * @param {*} res - Response object.
 */
const getSession = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const session = db.sessions.find(session => session.id === id);

  if (session) {
    res.status(200).json(session);
  } else {
    res.status(404).json({ message: `No session found for the given session id: ${id}.` });
  }
};

/**
 * Create a new session.
 * @param {*} req - Request object.
 * @param {*} res - Response object.
 */
const createSession = (req, res) => {
  const session = {
    id: db.sessions.length + 1,
    ...req.body
  };

  db.sessions.push(session);

  res.status(201).json(session);
};

/**
 * Update a specific session.
 * @param {*} req - Request object.
 * @param {*} res - Response object.
 */
const updateSession = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const toUpdate = {
    id,
    ...req.body
  };
  const foundIndex = db.sessions.findIndex(session => session.id === id);

  if (foundIndex !== -1) {
    db.sessions.splice(foundIndex, 1, toUpdate);
  
    res.status(200).json(db.sessions[foundIndex]);
  } else {
    res.status(404).json({ message: `No session found for the given session id: ${id}.`})
  }
};

/**
 * Deletes a specific session.
 * @param {*} req - Request object.
 * @param {*} res - Response object.
 */
const deleteSession = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const foundIndex = db.sessions.findIndex(session => session.id === id);

  if (foundIndex !== -1) {
    db.sessions.splice(foundIndex, 1);

    res.sendStatus(204);
  } else {
    res.status(404).json({ message: `No session found for the given session id: ${id}.`})
  }
};

module.exports = {
  getSessions,
  getSession,
  createSession,
  updateSession,
  deleteSession
};
