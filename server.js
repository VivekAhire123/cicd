const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());

let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
];

// GET endpoint - Get all users
app.get('/api/users', (req, res) => {
  res.json({
    success: true,
    message: 'Users retrieved successfully',
    data: users
  });
});

// GET endpoint - Get user by ID
app.get('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }
  
  res.json({
    success: true,
    message: 'User retrieved successfully',
    data: user
  });
});

// POST endpoint - Create a new user
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  
  // Basic validation
  if (!name || !email) {
    return res.status(400).json({
      success: false,
      message: 'Name and email are required'
    });
  }
  
  // Check if email already exists
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(409).json({
      success: false,
      message: 'User with this email already exists'
    });
  }
  
  // Create new user
  const newUser = {
    id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
    name,
    email
  };
  
  users.push(newUser);
  
  res.status(201).json({
    success: true,
    message: 'User created successfully',
    data: newUser
  });
});

// POST endpoint - Create a new post/article
app.post('/api/posts', (req, res) => {
  const { title, content, authorId } = req.body;
  
  // Basic validation
  if (!title || !content || !authorId) {
    return res.status(400).json({
      success: false,
      message: 'Title, content, and authorId are required'
    });
  }
  
  // Check if author exists
  const author = users.find(u => u.id === parseInt(authorId));
  if (!author) {
    return res.status(404).json({
      success: false,
      message: 'Author not found'
    });
  }
  
  // Create new post
  const newPost = {
    id: Date.now(), // Simple ID generation
    title,
    content,
    authorId: parseInt(authorId),
    authorName: author.name,
    createdAt: new Date().toISOString()
  };
  
  res.status(201).json({
    success: true,
    message: 'Post created successfully',
    data: newPost
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to the Simple API',
    endpoints: {
      'GET /api/users': 'Get all users',
      'GET /api/users/:id': 'Get user by ID',
      'POST /api/users': 'Create a new user',
      'POST /api/posts': 'Create a new post'
    }
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!'
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log('  GET  /api/users     - Get all users');
  console.log('  GET  /api/users/:id - Get user by ID');
  console.log('  POST /api/users     - Create a new user');
  console.log('  POST /api/posts     - Create a new post');
});

module.exports = app;
