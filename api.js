const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const connection = mysql.createConnection({
  host: 'localhost', // MySQL server host
  user: 'root', // MySQL username (leave empty for no username)
  password: '', // MySQL password (leave empty for no password)
  database: 'referencedb', // MySQL database name
});

connection.connect((error) => {
  if (error) {
    console.error('Error connecting to MySQL:', error);
  } else {
    console.log('Connected to MySQL database');
  }
});

let users = [
  { id: 1, username: 'user1', password: 'password1' },
  { id: 2, username: 'user2', password: 'password2' }
];

// Serve the HTML files directly
app.use(express.static(path.join(__dirname, 'public')));

app.get('/login', (req, res) => {
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

app.get('/Portfolio.html', (req, res) => {
  // Send the portfolio.html file as the response
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

app.get('/data', (req, res) => {
  connection.query('SELECT * FROM reference_table', (error, results) => {
    if (error) {
      console.error('Error executing database query:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(results);
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
