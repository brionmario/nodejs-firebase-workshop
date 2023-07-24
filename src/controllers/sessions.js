const { db } = require('../firebase/admin');

const SESSION_COLLECTION = 'sessions';

/**
 * Get all the sessions.
 * @param {*} req - Request object.
 * @param {*} res - Response object.
 */
const getSessions = (req, res) => {
  const sessionRef = db.collection(SESSION_COLLECTION);

  sessionRef
    .get()
    .then((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return res.status(201).json(data);
    })
    .catch((error) => {
      return res.status(500).json({
        message: 'Error while getting the sessions.',
        error: error,
      });
    });
};

/**
 * Get a specific session.
 * @param {*} req - Request object.
 * @param {*} res - Response object.
 */
const getSession = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const sessionRef = db.collection(SESSION_COLLECTION).where('id', '==', id);

  sessionRef
    .get()
    .then((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      if (data.length === 0) {
        return res.status(404).json({
          message: `No session found for the given session id: ${id}.`,
        });
      }

      return res.status(201).json(data);
    })
    .catch((error) => {
      return res.status(500).json({
        message: 'Error while getting the session.',
        error: error,
      });
    });
};

/**
 * Create a new session.
 * @param {*} req - Request object.
 * @param {*} res - Response object.
 */
const createSession = async (req, res) => {
  const sessionRef = db.collection(SESSION_COLLECTION);
  const snapshot = await sessionRef.count().get();
  const docId = snapshot.data().count + 1;

  const session = {
    id: docId,
    ...req.body,
  };

  sessionRef
    .doc(docId.toString())
    .set(session)
    .then((docRef) => {
      return res.status(201).json({
        id: docRef.id,
        ...session,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        message: 'Error while adding the session.',
        error: error,
      });
    });
};

/**
 * Update a specific session.
 * @param {*} req - Request object.
 * @param {*} res - Response object.
 */
const updateSession = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const updatedSession = req.body;

  const sessionDocRef = db.collection(SESSION_COLLECTION).doc(id.toString());

  sessionDocRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        sessionDocRef
          .update(updatedSession)
          .then(() => {
            return res.status(201).json({
              id: doc.id,
              ...updatedSession,
            });
          })
          .catch((error) => {
            return res.status(500).json({
              message: 'Error while updating session.',
              error: error,
            });
          });
      } else {
        return res.status(404).json({
          message: `No session found for the given session id: ${id}.`,
        });
      }
    })
    .catch((error) => {
      return res.status(500).json({
        message: 'Error while getting the session to update.',
        error: error,
      });
    });
};

/**
 * Deletes a specific session.
 * @param {*} req - Request object.
 * @param {*} res - Response object.
 */
const deleteSession = (req, res) => {
  const id = parseInt(req.params.id, 10);

  const sessionDocRef = db.collection(SESSION_COLLECTION).doc(id.toString());

  sessionDocRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        sessionDocRef.delete().then(() => {
          return res.status(201).json({
              message: `Session with id ${id} deleted successfully.`,
          });
        });
      } else {
        return res.status(404).json({
            message: `No session found for the given session id: ${id}.`,
        });
      }
    })
    .catch((error) => {
      return res.status(500).json({
        message: 'Error while getting the session to delete.',
        error: error,
      });
    });
};

module.exports = {
  getSessions,
  getSession,
  createSession,
  updateSession,
  deleteSession,
};
