# Simple API with GET and POST Endpoints

A simple Express.js API that demonstrates GET and POST endpoints with JSON data handling.

## Features

- **GET /api/users** - Retrieve all users
- **GET /api/users/:id** - Retrieve a specific user by ID
- **POST /api/users** - Create a new user
- **POST /api/posts** - Create a new post/article

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

For development with auto-restart:
```bash
npm run dev
```

The server will start on `http://localhost:3000`

## API Endpoints

### GET /api/users
Retrieve all users.

**Response:**
```json
{
  "success": true,
  "message": "Users retrieved successfully",
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    }
  ]
}
```

### GET /api/users/:id
Retrieve a specific user by ID.

**Response:**
```json
{
  "success": true,
  "message": "User retrieved successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### POST /api/users
Create a new user.

**Request Body:**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "id": 3,
    "name": "Jane Doe",
    "email": "jane@example.com"
  }
}
```

### POST /api/posts
Create a new post/article.

**Request Body:**
```json
{
  "title": "My First Post",
  "content": "This is the content of my first post.",
  "authorId": 1
}
```

**Response:**
```json
{
  "success": true,
  "message": "Post created successfully",
  "data": {
    "id": 1703123456789,
    "title": "My First Post",
    "content": "This is the content of my first post.",
    "authorId": 1,
    "authorName": "John Doe",
    "createdAt": "2023-12-21T10:30:56.789Z"
  }
}
```

## Testing with cURL

### Get all users:
```bash
curl http://localhost:3000/api/users
```

### Get user by ID:
```bash
curl http://localhost:3000/api/users/1
```

### Create a new user:
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Alice Johnson", "email": "alice@example.com"}'
```

### Create a new post:
```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{"title": "Hello World", "content": "This is my first post!", "authorId": 1}'
```

## Error Handling

The API includes proper error handling for:
- Missing required fields
- Duplicate email addresses
- Non-existent users
- Invalid endpoints
- Server errors

All error responses follow this format:
```json
{
  "success": false,
  "message": "Error description"
}
```
