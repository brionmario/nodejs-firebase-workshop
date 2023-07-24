const express = require('express');
const sessionsRouter = require('./routes/sessions');
const authorsRouter = require('./routes/authors');

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
app.use('/sessions', sessionsRouter);

// Authors.
app.use('/authors', authorsRouter);

app.listen(PORT, () => {
  console.log(`The server has started on port ${PORT}...`);
});
