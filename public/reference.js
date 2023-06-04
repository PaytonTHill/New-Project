const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

const connection = mysql.createConnection({
  host: 'localhost', // Replace with the MySQL server host
  user: 'root', // Use 'root' as the MySQL username
  password: '', // No password for the root user
  database: 'referencedb', // Replace with your MySQL database name
});

// Serve static files from the "public" directory
app.use(express.static('public'));

// Parse JSON request bodies
app.use(express.json());

// Add reference route
app.post('/api/addReference', (req, res) => {
  const { name, email, reference_content } = req.body;
  const newReference = {
    name,
    email,
    reference_content,
  };

  connection.query('INSERT INTO reference_table SET ?', newReference, (error, result) => {
    if (error) {
      console.error('Error executing database query:', error);
      res.status(500).json({ error: 'An error occurred while adding the reference.' });
      return;
    }
    console.log('Reference inserted successfully');
    res.json({ message: 'Reference added successfully.' });
  });
});

// Fetch references route
app.get('/api/references', (req, res) => {
  connection.query('SELECT * FROM reference_table', (error, results) => {
    if (error) {
      console.error('Error executing database query:', error);
      res.status(500).json({ error: 'An error occurred while fetching the references.' });
      return;
    }
    res.json(results);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
