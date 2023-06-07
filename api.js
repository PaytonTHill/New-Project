const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

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
  console.log('API: GET request received at /api/references');
  connection.query('SELECT * FROM reference_table', (error, results) => {
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
  console.log('Received request to /api/addReference');
  console.log('Request body', req.body);

  // Generate a unique ID for the new reference
  const referenceId = uuidv4();

  connection.query(
    'INSERT INTO reference_table (id, name, email, reference_content) VALUES (?, ?, ?, ?)',
    [referenceId, name, email, reference_content],
    (error, results) => {
      if (error) {
        console.error('Error adding reference:', error);
        res.status(500).json({ error: 'Failed to add reference' });
      } else {
        console.log('Reference added successfully');
        res.json({ success: true, id: referenceId });
      }
    }
  );
});

app.delete('/api/deleteReference/:id', (req, res) => {
  const referenceId = req.params.id;
  console.log('Deleting reference...', referenceId); 

  connection.query(
    'DELETE FROM reference_table WHERE id = ?',
    [referenceId],
    (error, results) => {
      if (error) {
        console.error('Error deleting reference:', error);
        res.status(500).json({ error: 'Failed to delete reference' });
      } else {
        console.log('Reference deleted successfully'); 
        res.json({ success: true });
      }
    }
  );
});


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
app.listen(3000, 'localhost', () => {
  console.log('Server started on port 3000');
});
