# dyno-backend

Express backend application with REST APIs.

## Description

This project is a backend application built using Express.js. It provides a set of RESTful APIs for various functionalities. The application includes middleware for logging requests, handling errors, and managing CORS. It also uses security best practices with Helmet and rate limiting.

## Installation

To get started with this project, follow the steps below:

1. **Clone the repository:**

   ```sh
   git clone git@github.com:tripathirajan/dyno-backend.git
   cd dyno-backend
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Set up environment variables:**
   ```sh
   NODE_ENV=development
   PORT=3000
   ```
4. **Run the application:**

   For development:

   ```sh
   npm run start:dev
   ```

   For production:

   ```sh
   npm start
   ```

5. **Run tests:**
   ```sh
   npm run test
   ```

## Features

- RESTful APIs
- Request logging
- Error handling
- CORS management
- Security with Helmet
- Rate limiting
- JSON Web Token (JWT) authentication
- Redis integration
- Socket.io for real-time communication
- Swagger for API documentation

## Dependencies

- express
- express-session
- helmet
- jsonwebtoken
- redis
- socket.io
- swagger-jsdoc
- swagger-ui-express
- winston

## Dev Dependencies

- eslint
- jest
- nodemon
- prettier

## License

This project is licensed under the MIT License.
