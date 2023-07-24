const express = require('express');
const { getSessions, getSession, createSession, updateSession, deleteSession } = require('./controllers/sessions');
const { getAuthors, getAuthor, createAuthor, updateAuthor, deleteAuthor } = require('./controllers/authors');

const app = express();

const PORT = 3000;

// Middlewares
app.use(express.json());

// Index.
app.get('/', (req, res) => {
  res.status(200).send({
    message: 'Welcome to IDEALIZE 2023 REST API...',
  });
});

// Sessions.
app.get('/sessions', getSessions);
app.get('/sessions/:id', getSession);
app.post('/sessions', createSession);
app.put('/sessions/:id', updateSession);
app.delete('/sessions/:id', deleteSession);

// Authors.
app.get('/authors', getAuthors);
app.get('/authors/:id', getAuthor);
app.post('/authors', createAuthor);
app.put('/authors/:id', updateAuthor);
app.delete('/authors/:id', deleteAuthor);

app.listen(PORT, () => {
  console.log(`The server has started on port ${PORT}...`);
});
