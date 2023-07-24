const express = require('express');
const { getAuthors, getAuthor, createAuthor, updateAuthor, deleteAuthor } = require('../controllers/authors');
const { isValidAccessToken } = require('../middlewares/auth');

const router = express.Router();

router.get('/', getAuthors);
router.get('/:id', getAuthor);
router.post('/', isValidAccessToken, createAuthor);
router.put('/:id', isValidAccessToken, updateAuthor);
router.delete('/:id', isValidAccessToken, deleteAuthor);

module.exports = router;
