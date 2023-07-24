const express = require('express');
const { getAuthors, getAuthor, createAuthor, updateAuthor, deleteAuthor } = require('../controllers/authors');

const router = express.Router();

router.get('/', getAuthors);
router.get('/:id', getAuthor);
router.post('/', createAuthor);
router.put('/:id', updateAuthor);
router.delete('/:id', deleteAuthor);

module.exports = router;
