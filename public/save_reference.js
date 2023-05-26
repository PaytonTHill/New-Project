const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Create a MySQL connection pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'your_username',
    password: 'your_password',
    database: 'your_database'
});

// Save a reference to the database
app.post('/save_reference', (req, res) => {
    const { name, email, content } = req.body;

    // Execute the SQL statement to insert the reference
    pool.query('INSERT INTO references (name, email, content) VALUES (?, ?, ?)', [name, email, content], (err, result) => {
        if (err) {
            console.error(err);
            res.sendStatus(500);
        } else {
            res.sendStatus(200);
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
