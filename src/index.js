const express = require('express');

const app = express();

const PORT = 3000;

const DB = {
  AUTHORS: [
    {
      "id": 1,
      "name": "Brion Silva",
      "company": "WSO2"
    },
    {
      "id": 2,
      "name": "Omal Wijegunawardane",
      "company": "WSO2"
    },
    {
      "id": 3,
      "name": "Chathuranga Dissanayake",
      "company": "WSO2"
    }
  ],
  SESSIONS: [
    {
      "id": 1,
      "title": "Node.js & Firebase",
      "description": "Become an expert in CRUD operations",
      "authors": [
        {
          "id": 1,
          "name": "Brion Silva",
          "company": "WSO2"
        },
        {
          "id": 2,
          "name": "Omal Wijegunawardane",
          "company": "WSO2"
        }
      ]
    },
    {
      "id": 2,
      "title": "Flutter & AppGyver",
      "description": "Hands on session on Flutter & AppGyver",
      "authors": [
        {
          "id": 3,
          "name": "Chathuranga Dissanayake",
          "company": "WSO2"
        }
      ]
    }
  ]
}

// Middlewares
app.use(express.json());

// Index route.
app.get('/', (req, res) => {
  res.status(200).send({
    message: 'Welcome to IDEALIZE 2023 REST API...',
  });
});

// Get all sessions.
app.get('/sessions', (req, res) => {
  res.status(200).json(DB.SESSIONS);
});

// Get a specific session.
app.get('/sessions/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const session = DB.SESSIONS.find(session => session.id === id);

  if (session) {
    res.status(200).json(session);
  } else {
    res.status(404).json({ message: `No session found for the given session id: ${id}.` });
  }
});

// Add a session.
app.post('/sessions', (req, res) => {
  const session = {
    id: DB.SESSIONS.length + 1,
    ...req.body
  };

  DB.SESSIONS.push(session);

  res.status(201).json(session);
});

// Update a session.
app.put('/sessions/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const toUpdate = {
    id,
    ...req.body
  };
  const foundIndex = DB.SESSIONS.findIndex(session => session.id === id);

  if (foundIndex !== -1) {
    DB.SESSIONS.splice(foundIndex, 1, toUpdate);
  
    res.status(200).json(DB.SESSIONS[foundIndex]);
  } else {
    res.status(404).json({ message: `No session found for the given session id: ${id}.`})
  }
});

// Deletes a session.
app.delete('/sessions/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const foundIndex = DB.SESSIONS.findIndex(session => session.id === id);

  if (foundIndex !== -1) {
    DB.SESSIONS.splice(foundIndex, 1);

    res.sendStatus(204);
  } else {
    res.status(404).json({ message: `No session found for the given session id: ${id}.`})
  }
});

// Get all authors.
app.get('/authors', (req, res) => {
  res.status(200).json(DB.AUTHORS);
});

// Get a specific author.
app.get('/authors/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const author = DB.AUTHORS.find(author => author.id === id);

  if (author) {
    res.status(200).json(author);
  } else {
    res.status(404).json({ message: `No author found for the given author id: ${id}.` });
  }
});

// Add an author.
app.post('/authors', (req, res) => {
  const author = {
    id: DB.AUTHORS.length + 1,
    ...req.body
  };

  DB.AUTHORS.push(author);

  res.status(201).json(author);
});

// Update an author.
app.put('/authors/:id', (req, res) => {
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
});

// Deletes an author.
app.delete('/authors/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const foundIndex = DB.AUTHORS.findIndex(author => author.id === id);

  if (foundIndex !== -1) {
    DB.AUTHORS.splice(foundIndex, 1);

    res.sendStatus(204);
  } else {
    res.status(404).json({ message: `No author found for the given author id: ${id}.`})
  }
});

app.listen(PORT, () => {
  console.log(`The server has started on port ${PORT}...`);
});
