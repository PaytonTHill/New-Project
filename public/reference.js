const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost', // Replace with the MySQL server host
  user: '', // No username
  password: '', // No password
  database: 'referencedb', // Replace with your MySQL database name
});

function Reference() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [content, setContent] = React.useState('');
  const [references, setReferences] = React.useState([]);

  React.useEffect(() => {
    fetchReferences();
  }, []);

  function fetchReferences() {
    connection.query('SELECT * FROM reference_table', (error, results) => {
      if (error) {
        console.error('Error executing database query:', error);
        return;
      }
      setReferences(results);
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (name && email && content) {
      const newReference = {
        name,
        email,
        reference_content: content, // Use 'reference_content' as the column name for the reference content
      };

      connection.query('INSERT INTO reference_table SET ?', newReference, (error, result) => {
        if (error) {
          console.error('Error executing database query:', error);
          return;
        }
        console.log('Reference inserted successfully');
        fetchReferences(); // Fetch references again to update the list
      });

      setName('');
      setEmail('');
      setContent('');
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Add Reference</h2>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="content">Reference:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>

      <div id="reference-list">
        {references.map((reference) => (
          <div key={reference.id} className="reference">
            <div className="reference-header">
              <h3>{reference.name}</h3>
              <p>{reference.email}</p>
            </div>
            <p>{reference.reference_content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

ReactDOM.render(<Reference />, document.getElementById('references'));