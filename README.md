<p align="center" style="padding-top: 20px">
  <img src="./docs/resources/images/cover.png">
</p>

## Table of Contents

- [Installation](#installation-💻)
- [Configuration](#configuration-⚙️)
- [Usage](#usage-🛠️)
- [API Endpoints](#api-endpoints-🚀)
- [Middleware](#middleware-⚙️)
- [Contributing](#contributing-🙋)
- [License](#license-📜)

## Installation 💻

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Install the required dependencies using `npm install`.

## Configuration ⚙️

1. Open http://firebase.google.com and Go to console.
2. Create a new project.
3. Select **Web** to add your web app.
4. Copy the Firebase configuration and add it to the `.env` file at the root of your project.
```bash
apiKey="xxxx",
authDomain="xxxx",
projectId="xxxx",
storageBucket="xxxx",
messagingSenderId="xxxx",
appId="xxxx"
```
5. Go to your `Project settings` -> `Service accounts` and select `Node.js`. Generate new **private key** and add the json file in the in `src/firebase` folder and rename it to `private-key.json`. 

## Usage 🛠️

To start the Node app, run the following command:

```bash
npm start
```

The app will be available at http://localhost:3000.

## API Endpoints 🚀

### Sessions

- **GET** `/sessions` - Get all sessions.
- **GET** `/sessions/:id` - Get a specific session by ID.
- **POST** `/sessions` - Create a new session.
- **PUT** `/sessions/:id` - Update a session by ID.
- **DELETE** `/sessions/:id` - Delete a session by ID.

### Authors

- **GET** `/authors` - Get all authors.
- **GET** `/authors/:id` - Get a specific author by ID.
- **POST** `/authors` - Create a new author.
- **PUT** `/authors/:id` - Update an author by ID.
- **DELETE** `/authors/:id` - Delete an author by ID.

## Middleware :gear:

### isValidAccessToken Middleware

The `isValidAccessToken` middleware is responsible for validating the access token in incoming requests. It checks the `Authorization` header for a bearer token and verifies its authenticity. If the token is valid, the request is allowed to proceed to the next handler. If the token is invalid or missing, the middleware will respond with an appropriate error status.

Usage:

```javascript
const isValidAccessToken = (req, res, next) => {
  // Access token validation logic here
  // If token is valid, call next()
  // If token is invalid or missing, send an error response
};

app.use(isValidAccessToken);
```

Note: Replace the access token validation logic with your actual implementation.


Please make sure to replace the comment in the `isValidAccessToken` middleware with your actual access token validation logic.

## Contributing 🙋

Contributions are welcome! If you find any bugs or have ideas for improvement, feel free to open an issue or submit a pull request.

## License 📜

This project is licensed under the MIT License. Feel free to use and modify it according to your needs.
