const express = require('express');
const { getSessions, getSession, createSession, updateSession, deleteSession } = require('../controllers/sessions');

const router = express.Router();

router.get('/', getSessions);
router.get('/:id', getSession);
router.post('/', createSession);
router.put('/:id', updateSession);
router.delete('/:id', deleteSession);

module.exports = router;
