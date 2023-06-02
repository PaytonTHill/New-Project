const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

let users = [
  { id: 1, username: 'user1', password: 'password1' },
  { id: 2, username: 'user2', password: 'password2' }
];

// Serve the HTML file directly
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  // Send the login.html file as the response
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ error: 'Invalid username or password.' });
  }

  // Send the success message as the response
  res.json({ message: 'Login successful' });
});

// Route handler for serving Portfolio.html
app.get('/Portfolio.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Portfolio.html'));
});

// Protected routes
app.all('/items*', (req, res, next) => {
  // Perform authentication check here
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized.' });
  }

  // Extract token
  const token = authorization.split(' ')[1];

  // Verify token validity (optional)
  // You can add your own JWT verification logic here

  next();
});

// Start the server
app.listen(4000, () => {
  console.log('Server started on port 4000');
});
