const express = require('express');

const app = express();

const PORT = 3000;

const DB = {
  SESSIONS: [
    {
      "id": 1,
      "title": "Node.js & Firebase",
      "description": "Become an expert in CRUD operations",
      "authors": [
        {
          "name": "Brion Silva",
          "company": "WSO2"
        },
        {
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
          "name": "Chathuranga Dissanayake",
          "company": "WSO2"
        }
      ]
    }
  ]
}

app.use(express.json());

// Welcome route
app.get('/api', (req, res) => {
  res.status(200).send({
    message: 'Welcome to IDEALIZE 2023 REST API...',
  });
});

// Get all sessions
app.get('/api/sessions', (req, res) => {
  res.status(200).json(DB.SESSIONS);
});

// Get specific session
app.get('/api/sessions/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  const session = DB.SESSIONS.find((session) => session.id === id);

  if (session) {
    res.status(200).json(session);
  } else {
    res.status(404).json({ message: `No session found for the given session id: ${id}.` });
  }
});

// Add a sessions
app.post('/api/sessions', (req, res) => {
  const session = {
    id: DB.SESSIONS.length + 1,
    ...req.body
  };

  DB.SESSIONS.push(session);
  res.status(201).json(DB.SESSIONS);
});

// Update a session
app.put('/api/sessions/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const updatedSession = req.body;
  const foundIndex = DB.SESSIONS.findIndex((session) => session.id === id);

  if (foundIndex !== -1) {
    DB.SESSIONS.splice(foundIndex, 1, {
      id,
      ...updatedSession
    });
  
    res.status(200).json(DB.SESSIONS[foundIndex]);
  } else {
    res.status(404).json({ message: `No session found for the given session id: ${id}.`})
  }
});

app.delete('/api/sessions/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const foundIndex = DB.SESSIONS.findIndex((session) => session.id === id);

  if (foundIndex !== -1) {
    DB.SESSIONS.splice(foundIndex, 1);
    res.json({ message: 'Session deleted successfully' });
  } else {
    res.status(404).json({ message: `No session found for the given session id: ${id}.`})
  }
});

app.listen(PORT, () => {
  console.log(`The server has started on port ${PORT}...`);
});
