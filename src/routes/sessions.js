const express = require('express');
const { getSessions, getSession, createSession, updateSession, deleteSession } = require('../controllers/sessions');
const { isValidAccessToken } = require('../middlewares/auth');

const router = express.Router();

router.get('/', getSessions);
router.get('/:id', getSession);
router.post('/', isValidAccessToken, createSession);
router.put('/:id', isValidAccessToken, updateSession);
router.delete('/:id', isValidAccessToken, deleteSession);

module.exports = router;
