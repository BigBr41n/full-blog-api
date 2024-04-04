# MERN Blog API

## Description

This is a RESTful API for managing users and posts for a MERN stack blog application.

## Installation

1. Clone the repository:
```
git clone https://github.com/BigBr41n/full-blog-api.git
```



2. Install dependencies:

```
npm install
```


3. Set up environment variables:

Create a `.env` file in the root directory and add the following variables:

```
MONGODB_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
```


Replace `<your-mongodb-uri>` with your MongoDB connection string and `<your-jwt-secret>` with a secret key for JWT token generation.

4. Run the server:

```
npm start
``` 



## File Tree

- .env
- .gitignore
- api
  - config
    - db.js
  - controllers
    - postControllers.js
    - userController.js
  - middleware
    - authMiddle.js
    - errMid.js
  - models
    - errorModel.js
    - post.js
    - user.js
  - routes
    - post.js
    - user.js
- app.js
- package-lock.json
- package.json
- server.js
- uploads



## Usage

### Endpoints

#### Users

- `POST /api/users/register`: Register a new user.
- `POST /api/users/login`: Login an existing user.
- `GET /api/users/:id`: Get user profile by ID.
- `POST /api/users/change-avatar`: Change user avatar (Protected route).
- `PATCH /api/users/edit-user`: Edit user details (Protected route).
- `GET /api/users/authors`: Get all authors.

#### Posts

- `POST /api/posts`: Create a new post (Protected route).
- `GET /api/posts`: Get all posts.
- `GET /api/posts/:id`: Get a single post by ID.
- `GET /api/posts/category/:category`: Get posts by category.
- `GET /api/posts/users/:id`: Get posts by author.
- `PATCH /api/posts/:id`: Update a post (Protected route).
- `DELETE /api/posts/:id`: Delete a post (Protected route).

### Error Handling

The API handles errors with custom middleware. It returns appropriate HTTP status codes and error messages in JSON format.

### File Uploads

The API allows users to upload images for their avatars and post thumbnails. Uploaded files are stored in the `/uploads` directory.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.


