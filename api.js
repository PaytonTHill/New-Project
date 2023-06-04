const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/reference.js', (req, res, next) => {
  res.setHeader('Cache-Control', 'no-store');
  next();
});

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'referencedb',
});

connection.connect((error) => {
  if (error) {
    console.error('Error connecting to MySQL:', error);
  } else {
    console.log('Connected to MySQL database');
  }
});

// Define users array for JSON authentication
let users = [
  { id: 1, username: 'user1', password: 'password1' },
  { id: 2, username: 'user2', password: 'password2' }
];

app.get('/api/references', (req, res) => {
  connection.query('SELECT * FROM references_table', (error, results) => {
    if (error) {
      console.error('Error fetching references:', error);
      res.status(500).json({ error: 'Failed to fetch references' });
    } else {
      res.json(results);
    }
  });
});

app.post('/api/addReference', (req, res) => {
  const { name, email, reference_content } = req.body;

  connection.query(
    'INSERT INTO references_table (name, email, reference_content) VALUES (?, ?, ?)',
    [name, email, reference_content],
    (error, results) => {
      if (error) {
        console.error('Error adding reference:', error);
        res.status(500).json({ error: 'Failed to add reference' });
      } else {
        console.log('Reference added successfully');
        res.json({ success: true });
      }
    }
  );
});

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

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
