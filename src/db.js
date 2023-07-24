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

module.exports = DB;
